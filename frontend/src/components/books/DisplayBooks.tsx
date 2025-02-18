import React, { useState } from 'react';
import useBooks from '@/hooks/useBooks';  // Import the custom hook
import { Link } from 'react-router';
import PaginationComponent from './PaginationComponent';
import BookSkeleton from './BookSkeleton';
import BookCard from './BookCard';

interface DisplayBooksProps {
  selectedGenre: string | null;
}

const DisplayBooks: React.FC<DisplayBooksProps> = ({ selectedGenre }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 4; // Set the number of books per page
  const { data, loading, error } = useBooks(selectedGenre, currentPage, limit);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  if (loading) return <BookSkeleton/>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='my-5'>
      {data && data.books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data?.books.map((book) => (
            <Link key={book._id} to={`/books/${book._id}`}>
              <BookCard title={book.title} bookCover={book.bookCover} author={book.author} description={book.description} genre={book.genre} price={book.price} rating={book.rating}/>
            </Link>
          ))}
        </div>
      )}
      {data &&
      <PaginationComponent currentPage={data?.currentPage} totalPages={data?.totalPages} onPageChange={handlePageChange} />
      }
    </div>
  );
};

export default DisplayBooks;