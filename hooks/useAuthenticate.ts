


    import { useEffect, useState } from "react";
    import { useAtom } from "jotai";
import { authenticateAtom } from "@/store/authenticateAtom";

    
    const useAuthenticate = () => {
      const URL = "https://nextjs-server-rho.vercel.app/api/users/authenticate/route"; 
      const formData = useAtom(authenticateAtom);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
    

        const fetchData = async () => {
          try {
               const response = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {throw new Error('Failed to authenticate');}
     const result = await response.json();
      return result;

          } catch (err) {

              setError(err instanceof Error ? err.message : "Unknown error");
       
          } finally {
            setLoading(false);
          }
        };
    
  
    
      return { loading, error, fetchData };
    };
    
    export default useAuthenticate;
    