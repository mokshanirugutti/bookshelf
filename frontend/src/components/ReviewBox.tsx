import { useId } from 'react';
import { Textarea } from './ui/textarea';
import RatingSlider from './RatingSlider';
import { Button } from './ui/button';
import usePostReview from '@/hooks/usePostReview';

interface ReviewBoxProps {
  bookId: string;
  value: number[];
  setValue: (newValue: number[]) => void;
  content: string;
  setContent: (newContent: string) => void;
  onReviewPosted: () => void;
}

const ReviewBox: React.FC<ReviewBoxProps> = ({
  bookId,
  value,
  setValue,
  content,
  setContent,
  onReviewPosted,
}) => {
  const id = useId();
  const { postReview, loading } = usePostReview(bookId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return alert('Please enter a review.');

    const rating = value[0];
    const result = await postReview(content, rating);
    if (result) {
      onReviewPosted();
    }
  };

  return (
    <div className='mt-4 border-t pt-4'>
      <form onSubmit={handleSubmit}>
        <div className="group relative mb-4">
          <label
            htmlFor={id}
            className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:top-0 group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground"
          >
            
          </label>
          <Textarea
            id={id}
            placeholder="Write a review..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-2"
          />
        </div>

        <RatingSlider value={value} setValue={setValue} />

        <Button type="submit" variant="outline" className='mt-3' disabled={loading}>
          {loading ? 'Posting...' : 'Post Review'}
        </Button>
      </form>
    </div>
  );
};

export default ReviewBox;
