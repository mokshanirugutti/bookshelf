import { useId, useState } from 'react';
import { Textarea } from './ui/textarea';
import RatingSlider from './RatingSlider';
import { Button } from './ui/button';
import usePostReview from '@/hooks/usePostReview';
import { useDispatch } from 'react-redux';
import { addReview } from '@/redux/reviewsSlice';

interface ReviewBoxProps {
  bookId: string;
}

const ReviewBox: React.FC<ReviewBoxProps> = ({ bookId }) => {
  const id = useId();
  const { postReview, loading } = usePostReview(bookId);
  const dispatch = useDispatch();
  const [value, setValue] = useState([3]);
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return alert('Please enter a review.');

    const rating = value[0];
    const result = await postReview(content, rating);
    if (result) {
      dispatch(addReview(result));
      setContent('');
      setValue([3]);
    }
  };

  return (
    <div className='mt-4 border-t pt-4'>
      <form onSubmit={handleSubmit}>
        <div className='group relative mb-4'>
          <Textarea
            id={id}
            placeholder='Write a review...'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='mt-2'
          />
        </div>
        <RatingSlider value={value} setValue={setValue} />
        <Button type='submit' variant='outline' className='mt-3 text-background bg-foreground' disabled={loading}>
          {loading ? 'Posting...' : 'Post Review'}
        </Button>
      </form>
    </div>
  );
};

export default ReviewBox;
