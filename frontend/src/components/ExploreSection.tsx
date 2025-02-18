import React from 'react'
import ReadingIllustrations from './illustrations/ReadingIllustrations'
import { InteractiveHoverButton } from './magicui/interactive-hover-button'
import { Link } from 'react-router'

const ExploreSection : React.FC = () => {
  return (
    <div className='h-screen flex flex-col md:flex-row items-center md:justify-around'>
      <div className='order-2 md:order-1'>
        <ReadingIllustrations/>
      </div>
    
        <div className='order-1 md:order-2'>
            <h1 className='text-4xl font-bold'>Pick your next book</h1>
            <p className='text-base w-3/4 my-1 mb-3'> Find best reviews from fellow readers like you, and pick you next book to read</p>
            <Link to={'/books'}>
            <InteractiveHoverButton>
                View Books
            </InteractiveHoverButton>
            </Link>
        </div>
    </div>
  )
}

export default ExploreSection