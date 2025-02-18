import { useState, useEffect } from 'react';
import axios from 'axios';
import { BookResponse } from '@/types';

const useBook = (id: string) => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [data, setData] = useState<BookResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get<BookResponse>(`${URL}/books/${id}`);
        setData(response.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  return { data, loading, error };
};

export default useBook;