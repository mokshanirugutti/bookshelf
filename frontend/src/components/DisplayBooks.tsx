import React from 'react';
import useBooks from '@/hooks/useBooks';  // Import the custom hook
import { Link } from 'react-router';

const DisplayBooks: React.FC = () => {
  const { data, loading, error } = useBooks();

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='my-5'>
      
      {data && data.books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data?.books.map((book) => (
            <Link 
            to={`/books/${book._id}`}
            >
            <div key={book._id} className="p-4 border rounded-md shadow-md  h-48 flex gap-3 ">
                <div>

              <img
                src={book.image || book.bookCover}  // Handling possible different field names
                alt={book.title}
                className="w-36 h-36  mb-4"
                />
                </div>
                <div>
                    <h3 className="text-xl font-semibold">{book.title}</h3>
                    <p className="text-sm text-gray-600">{book.author}</p>
                    <p className="text-sm">{book.description}</p>
                    <p className="font-bold mt-2">Price: ₹{book.price}</p>
                    <p className="text-sm">Rating: {book.rating} stars</p>
                </div>
            </div>
          </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayBooks;
