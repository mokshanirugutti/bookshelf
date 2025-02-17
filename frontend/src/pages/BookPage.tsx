import RatingStars from '@/components/ui/RatingStars';
import useBook from '@/hooks/useBook';
import { User2Icon } from 'lucide-react';
import React from 'react'
import { useParams } from 'react-router'

const BookPage : React.FC = () => {
    const { bookId } = useParams<{ bookId: string }>();

    const { data, loading, error } = useBook(bookId!);

    if (loading) return <div>Loading book details...</div>;
    if (error) return <div>Error: {error}</div>;
  return (
    <div className='pagePadding border  max-w-2xl mx-auto'>
            <div className='flex gap-2'>
              <div>
                <img src={data?.book.image || data?.book.bookCover} alt={data?.book.title} className="w-64 h-64 " />
              </div>

              <div>
                <h1 className='text-2xl capitalize my-2 font-semibold'>{data?.book.title}</h1>
                <p className='my-2 font-normal'>{data?.book.description}</p>
                <p className='my-2 text-foreground/80'>Author: {data?.book.author}</p>
                <p className=''>Price: ₹{data?.book.price}</p>
                <p>Rating: {data?.book.rating} stars</p>
              </div>
            </div>

      <h3>Reviews</h3>
      <ul>

        {data?.book.reviews.map((review) => (
          <li key={review._id} className='border rounded-md p-2 my-1'>
            <div className='flex gap-2 items-center'>
              <User2Icon/>
              <div>
                <p>{review.content}</p>
                  <RatingStars value={review.rating} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BookPage