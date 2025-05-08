import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { allMenusAtom } from "@/store/menuAtom";
import { Menu } from "@/interfaces/menu/menu";

const useGetAllProducts = () => {
  const URL =
    "https://nextjs-server-rho.vercel.app/api/products/getAllProducts/route";
  const [, setData] = useAtom(allMenusAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Type for error

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(URL);
        if (!res.ok) throw new Error("Network response was not ok");
        const resJson: Menu[] = await res.json(); // Specify the expected type
        setData(resJson);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setData]);

  return { loading, error };
};

export default useGetAllProducts;
