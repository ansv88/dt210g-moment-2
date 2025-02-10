import { useState, useEffect } from "react";

export default function useGet<T>(url: string): {
    data: T,
    error: string | null,
    loading: boolean,
    fetchData: () => void
} {

    //States för komponenten
    const [data, setData] = useState<T>([] as T);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
      }, [url])
    
      const fetchData = async () => {
        try {
          setLoading(true);
    
          const res = await fetch(url);
    
          if (!res.ok) {
            throw Error("Det blev ett fel: " + res.status);
          }
    
          const data = await res.json();
          setData(data);
    
        } catch (error) {
          setError("Det blev ett fel vid inhämtning av data");
        } finally {
          setLoading(false);
        }
      }

    return { data, error, loading, fetchData }
}