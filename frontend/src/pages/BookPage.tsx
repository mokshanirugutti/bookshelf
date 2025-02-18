import ReviewBox from '@/components/ReviewBox';
import { Badge } from '@/components/ui/badge';
import RatingStars from '@/components/ui/RatingStars';
import { useUser } from '@/context/UserContext';
import useBook from '@/hooks/useBook';
import { User2Icon } from 'lucide-react';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setReviews } from '@/redux/reviewsSlice';
import { RootState } from '@/store';

const BookPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { user } = useUser();
  const { data, loading, error } = useBook(bookId!);
  const dispatch = useDispatch();
  const reviews = useSelector((state: RootState) => state.reviews.reviews);

  useEffect(() => {
    if (data?.book.reviews) {
      dispatch(setReviews(data.book.reviews));
    }
  }, [data, dispatch]);

  if (loading) return <div>Loading book details...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='pagePadding border max-w-2xl mx-auto my-10 py-10'>
      <div className='flex gap-2'>
        <div>
          <img src={data?.book.bookCover} alt={data?.book.title} className='w-48 h-48' />
        </div>
        <div>
          <h1 className='text-2xl capitalize my-2 font-semibold'>{data?.book.title}</h1>
          <p className='my-2 font-normal'>{data?.book.description}</p>
          <Badge variant='outline' className='gap-1.5 py-2'>
            <span className='size-1.5 rounded-full bg-emerald-500' aria-hidden='true'></span>
            {data?.book.genre}
          </Badge>
          <p className='my-2 text-foreground/80'>Author: {data?.book.author}</p>
          <p>Price: ₹{data?.book.price}</p>
          <p>Rating: {data?.book.rating} stars</p>
        </div>
      </div>

      <h3 className='mt-6 font-semibold'>Reviews</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review._id} className='border rounded-md p-2 my-2'>
            <div className='flex gap-2 items-center'>
              <User2Icon />
              <div>
                <p className='mb-1'>{review.content}</p>
                <RatingStars value={review.rating} />
              </div>
            </div>
          </li>
        ))}
      </ul>

      {user ? <ReviewBox bookId={bookId!} /> : <div className='text-center text-red-500 mt-4'>Login to post a review</div>}
    </div>
  );
};

export default BookPage;