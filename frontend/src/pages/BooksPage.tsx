import React, { useState } from 'react';
import DisplayBooks from '@/components/books/DisplayBooks';
import useGenres from '@/hooks/useGenres';
import SingleSelect from '@/components/SingleSelect';

const BooksPage: React.FC = () => {
  const { genres, loading: loadingGenres, error: genresError } = useGenres();
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  if (loadingGenres) return <div></div>;
  if (genresError) return <div className='pagePadding'>Error: {genresError}</div>;

  return (
    <div className='pagePadding'>
      <h1 className='text-3xl my-3'>Books Page</h1>
      <SingleSelect genres={genres} onSelectGenre={setSelectedGenre} />
      <DisplayBooks selectedGenre={selectedGenre} />
      
    </div>
  );
};

export default BooksPage;