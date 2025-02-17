import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface RatingStarsProps {
  value: number; 
  maxRating?: number; 
}

const RatingStars: React.FC<RatingStarsProps> = ({ value, maxRating = 5 }) => {
  const fullStars = Math.floor(value); 
  const halfStars = value % 1 !== 0; 
  const emptyStars = maxRating - fullStars - (halfStars ? 1 : 0); 

  return (
    <div className="flex gap-1 my-1">
      {Array.from({ length: fullStars }, (_, i) => (
        <Star key={`full-${i}`} size={16} color="gold" />
      ))}
      {halfStars && <StarHalf size={24} color="gold" />}
      {Array.from({ length: emptyStars }, (_, i) => (
        <Star key={`empty-${i}`} size={16} color="gray" />
      ))}
    </div>
  );
};

export default RatingStars;
