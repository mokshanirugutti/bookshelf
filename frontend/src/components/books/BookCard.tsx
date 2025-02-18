import React from 'react'
import { useTheme } from '../theme/theme-provider';
import { MagicCard } from '../magicui/magic-card';
import { Badge } from '../ui/badge';

interface BookCardProps {
    title: string;
    bookCover : string;
    author: string;
    description: string;
    genre: string;
    price: number;
    rating: number;
}
const BookCard: React.FC<BookCardProps> = ({title,bookCover, author, description, genre, price, rating}) => {
    const { theme } = useTheme();
    return (
      
        <MagicCard
          className="cursor-pointer flex-col items-center justify-center  "
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        >
               <div className="p-4 h-fit flex gap-6 items-center">
                <img src={bookCover} alt={title} className="w-36 h-36" />
                <div className=''>
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <p className="text-sm text-gray-600">{author}</p>
                    <Badge variant={"secondary"} className="rounded my-1">{genre}</Badge>
                    <p className="text-sm my-1 w-2/3 ">{description}</p>
                    <p className="font-bold mt-1">Price: ₹{price}</p>
                    <p className="text-sm">Rating: {rating} stars</p>
                </div>
                </div>

        </MagicCard>
        
      
    );
}

export default BookCard

