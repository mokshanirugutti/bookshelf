import ReviewBox from '@/components/ReviewBox';
import RatingStars from '@/components/ui/RatingStars';
import { useUser } from '@/context/UserContext';
import useBook from '@/hooks/useBook';
import { User2Icon } from 'lucide-react';
import React, { useState } from 'react';
import { useParams } from 'react-router';

const BookPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { user } = useUser();
  const { data, loading, error } = useBook(bookId!);
  const [value, setValue] = useState([3]);
  const [content, setContent] = useState('');

  if (loading) return <div>Loading book details...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleReviewPosted = () => {
    
    setContent('');
    setValue([3]);
  };

  return (
    <div className='pagePadding border max-w-2xl mx-auto my-10 py-10'>
      <div className='flex gap-2'>
        <div>
          <img src={data?.book.image || data?.book.bookCover} alt={data?.book.title} className="w-64 h-64" />
        </div>

        <div>
          <h1 className='text-2xl capitalize my-2 font-semibold'>{data?.book.title}</h1>
          <p className='my-2 font-normal'>{data?.book.description}</p>
          <p className='my-2 text-foreground/80'>Author: {data?.book.author}</p>
          <p>Price: ₹{data?.book.price}</p>
          <p>Rating: {data?.book.rating} stars</p>
        </div>
      </div>

      <h3 className='mt-6 font-semibold'>Reviews</h3>
      <ul>
        {data?.book.reviews.map((review) => (
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

      {user ? (
        <ReviewBox
          bookId={bookId!}
          value={value}
          setValue={setValue}
          content={content}
          setContent={setContent}
          onReviewPosted={handleReviewPosted}
        />
      ) : (
        <div className='text-center text-red-500 mt-4'>Login to post a review</div>
      )}
    </div>
  );
};

export default BookPage;
