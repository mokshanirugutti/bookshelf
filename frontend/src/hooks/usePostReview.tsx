import { useState } from 'react';
import axios from 'axios';

interface PostReviewResponse {
  message: string;
  book: any;
}

const usePostReview = (bookId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postReview = async (content: string, rating: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`http://localhost:3000/books/review/${bookId}`, {
        content,
        rating,
      });
      setLoading(false);
      return response.data;
    } catch (err: any) {
      setError('Error posting review');
      setLoading(false);
    }
  };

  return { postReview, loading, error };
};

export default usePostReview;
