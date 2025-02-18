import { useState, useEffect } from 'react';
import axios from 'axios';
import { BooksResponse } from '@/types';

const useBooks = (genre: string | null, page: number, limit: number) => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [data, setData] = useState<BooksResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true); 
      try {
        const response = await axios.get(`${URL}/books`, {
          params: {
            genre: genre || '', 
            limit,
            page 
          },
        });
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [genre, page, limit]);

  return { data, loading, error };
};

export default useBooks;