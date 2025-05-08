import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { allMenusAtom } from "@/store/menuAtom";
import { Menu } from "@/interfaces/menu/menu";

const useGetAllMenu = () => {
  const URL = "http://10.0.2.2:3001/menu"; 
  const [, setData] = useAtom(allMenusAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; 

    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error("Network response was not ok");

        const data: Menu[] = await response.json();
        if (isMounted) setData(data);
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
