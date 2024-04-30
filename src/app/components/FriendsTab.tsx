import { useAppContext } from '@/context/Context';
import { Button } from 'flowbite-react';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import BlueArrow from '../assets/BlueArrow.png'

const FriendsTab = () => {
  const [correctRoom, setCorrectRoom] = useState<boolean>(false)

  const { userData, setUserData } = useAppContext();

  const router = useRouter()

  // This const and function below check if the pathname(page) is the same as the url, if it is then set the bool to true
  const isRoom = usePathname()

  const checkPage = () => {
    if (isRoom === '/pages/homePage') {
      setCorrectRoom(true)
    } else {
      setCorrectRoom(false)
    }
  }

  useEffect(() => {
    checkPage()
  }, [])

  return (
    <div className='Friends w-[300px] min-h-screen text-white text-[20px] z-30 relative'>
      <div className='mx-3 cursor-default'>
        <p className='text-end py-4 font-bold'>{userData.username}</p>
        <p className='text-end pt-2'>Friends</p>
      </div>
      <hr className='opacity-100 mx-2' />

      <div className='mx-3'>
        <p className='underline py-2 tracking-widest font-bold cursor-default'>Online</p>
        <div className='text-end'>
          Adding friends coming soon!
        </div>
      </div>

      {/* Checks if you are in a room, then displays the div need to fill with friend in room data though */}
      <div className={`mx-3 ${correctRoom ? 'hidden' : 'block'}`}>
        <p className='underline py-2 tracking-widest cursor-default'>In Room</p>
        <div className='text-end'>

        </div>
      </div>

      <div className='mx-3'>
        <p className='underline py-2 tracking-widest cursor-default'>Offline</p>
        <div className='text-end'>

        </div>
      </div>

      <div className='mx-3'>
        <p className='underline py-2 tracking-widest cursor-default'>Pending</p>
        <div onClick={() => router.push('/pages/friendAccept')} className='text-end cursor-pointer hover:text-green-500'>
          <p>
            Grog
          </p>
        </div>
      </div>

      <div className={`absolute bottom-24 w-[100%] flex justify-center ${correctRoom ? 'hidden' : 'block'}`}>
        <Button className='bg-dblue w-[200px] h-[50px]' onClick={() => router.push('/pages/friendAddPage')}>
          <p className='text-[16px]'>
            Leave Room
          </p>
        </Button>
      </div>

      <div className='absolute bottom-8 w-[100%] flex justify-center'>
        <Button className='bg-dblue w-[200px] h-[50px]' onClick={() => router.push('/pages/friendAddPage')}>
          <p className='text-[16px]'>
            Add a Friend
          </p>
        </Button>
      </div>
    </div>

  )
}

export default FriendsTab

