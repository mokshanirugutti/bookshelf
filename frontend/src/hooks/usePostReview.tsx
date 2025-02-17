import { useState } from 'react';
import axios from 'axios';
import { useUser } from '@/context/UserContext';


const usePostReview = (bookId: string) => {
  const token = localStorage.getItem('token');
  const {user} = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postReview = async (content: string, rating: number) => {
    setLoading(true);
    setError(null);

    try {
      if(user){
        const response = await axios.post(`http://localhost:3000/books/review/${bookId}`,
          {
            userId: user.id,
            content,
            rating,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        
      );
        setLoading(false);
        return response.data;
      }
    } catch (err: any) {
      setError('Error posting review');
      setLoading(false);
    }
  };

  return { postReview, loading, error };
};

export default usePostReview;
