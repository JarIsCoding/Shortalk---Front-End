import { useAppContext } from '@/context/Context';
import React from 'react'

const FriendsTab = () => {

  const { userData, setUserData } = useAppContext();

  return (
    <div className='Friends w-[300px] min-h-screen text-white text-[20px]'>
      <div className='mx-3'>
        <p className='text-end py-4 font-bold'>{userData.username}</p>
        <p className='text-end pt-2'>Friends</p>
      </div>
      <hr className='opacity-100 mx-2' />

      <div className='mx-3'>
        <p className='underline py-2 tracking-widest font-bold'>Online</p>
        <div className='text-end'>
          Adding friends coming soon!
        </div>
      </div>

      <div className='mx-3'>
        <p className='underline py-2 tracking-widest'>Offline</p>
      </div>

      <div className='mx-3'>
        <p className='underline py-2 tracking-widest'>Pending</p>
      </div>
    </div>

  )
}

export default FriendsTab

