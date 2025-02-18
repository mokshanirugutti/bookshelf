import React from 'react'

const BookSkeleton : React.FC = () => {
  return (
    <div className='flex flex-col md:flex-row justify-around pagePadding mt-10'>

        <div className="border border-neutral-600 shadow rounded-md p-4 max-w-sm w-full mx-auto">
    <div className="animate-pulse flex space-x-4">
        <div className="rounded-md bg-slate-700 h-36 w-36"></div>
        <div className="flex-1 space-y-6 py-1">
        <div className="h-2 bg-slate-700 rounded"></div>
        <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-700 rounded col-span-2"></div>
            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
        </div>
        </div>
    </div>
    </div>

        <div className="border border-neutral-600 shadow rounded-md p-4 max-w-sm w-full mx-auto">
    <div className="animate-pulse flex space-x-4">
        <div className="rounded-md bg-slate-700 h-36 w-36"></div>
        <div className="flex-1 space-y-6 py-1">
        <div className="h-2 bg-slate-700 rounded"></div>
        <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-700 rounded col-span-2"></div>
            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
        </div>
        </div>
    </div>
    </div>
    </div>
  )
}

export default BookSkeleton