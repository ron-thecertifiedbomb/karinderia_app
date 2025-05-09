import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { allMenusAtom, isLoadingAtom } from "@/store/menuAtom";
import { Menu } from "@/interfaces/menu";

const useGetAllMenu = () => {
  const URL = "https://nextjs-server-rho.vercel.app/api/karinderia/getAllMenu/route"; 
  const [, setData] = useAtom(allMenusAtom);
  const [loading, setLoading] = useAtom(isLoadingAtom);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; 

    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error("Network response was not ok");

        const data: Menu[] = await response.json();
        if (isMounted) setData(data);
        setLoading(false)
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [setData]);

  return { loading, error };
};

export default useGetAllMenu;
