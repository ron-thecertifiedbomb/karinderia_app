import { useEffect, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { allMenusAtom, isLoadingAtom } from "@/store/menuAtom";
import { Menu } from "@/interfaces/menu";
import { router } from "expo-router";

const useGetAllMenu = () => {
  const URL = "https://nextjs-server-rho.vercel.app/api/karinderia/getAllMenu/route"; 
  const setMenu = useSetAtom(allMenusAtom);
  const [loading, setLoading] = useAtom(isLoadingAtom);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; 

    const fetchData = async () => {
      try {
         
        const response = await fetch(URL);
        if (!response.ok) throw new Error("Network response was not ok");

        const data: Menu[] = await response.json();
         
        if (isMounted) setMenu(data);
        setLoading(false)
           router.replace("/(app)/(tabs)/home"); 
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
  }, [setMenu]);

  return { loading, error };
};

export default useGetAllMenu;
