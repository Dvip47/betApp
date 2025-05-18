import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (url, refresh) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("tk");
        if (token) {
          const res = await axios.get(
            url,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res && res.status === 200) {
            console.log(res.data)
            setData(res.data)
          }
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  console.log(data)
  return { data, loading, error };
};

export default useFetch;
