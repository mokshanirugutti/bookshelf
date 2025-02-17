import DisplayBooks from '@/components/DisplayBooks'
import React from 'react'

const BooksPage : React.FC = () => {
  return (
    <div className='pagePadding'>
        <h1 className='text-3xl'>Books page</h1>
        <DisplayBooks/>

    </div>
  )
}

export default BooksPage