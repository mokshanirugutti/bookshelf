import { useUser } from '@/context/UserContext'
import React from 'react'

const ProfilePage : React.FC = () => {
    const {user} = useUser();

  return (
    <div className='pagePadding'>
        <div className='max-w-2xl mx-auto relative'>

            <div className=' h-48 w-full'>
                <img src={user?.profilePicture} alt="" className='h-64 w-64 rounded-lg absolute top-28 left-2 border-2 shadow-md' />
            </div>
            <div className='bg-foreground h-52 w-full rounded-md'>
                <h1 className='text-4xl font-bold text-center text-background my-2'>{user?.username}</h1>
                <p className='text-sm text-center text-background'>{user?.email}</p>
            </div>
        </div>

    </div>
  )
}

export default ProfilePage