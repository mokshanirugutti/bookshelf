import { useState, useEffect } from 'react';
import { BooksResponse } from '@/types';

const useBooks = () => {
  const [data, setData] = useState<BooksResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3000/books');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const result: BooksResponse = await response.json();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { data, loading, error };
};

export default useBooks;
