import { useState, useEffect } from 'react';
import { BookResponse } from '@/types';

const useBook = (id: string) => {
  const [data, setData] = useState<BookResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:3000/books/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch book');
        }
        const result: BookResponse = await response.json();
        setData(result);
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
