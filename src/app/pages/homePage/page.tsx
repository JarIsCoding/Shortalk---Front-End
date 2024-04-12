"use client"

import NavBar from '@/app/components/NavBar'
import React, { useState } from 'react'
import Image from 'next/image';
import { Button } from "flowbite-react";
import FriendsPic from '@/app/assets/FriendsPic.png'
import RulesPic from '@/app/assets/RulesPic.png'
import FriendsTab from '@/app/components/FriendsTab';
import { useAppContext } from '@/context/Context';
import { useRouter } from 'next/navigation';

const HomePage = () => {

  const router = useRouter()

  const { userData, setUserData} = useAppContext();

  const [isFriendsOn, setIsFriendsOn] = useState<boolean>(false);

  const handleClick = () => {
    setIsFriendsOn(!isFriendsOn);
  }

  const handlePassAndPlayClick = () => {
    router.push('/pages/passAndPlayLobby')
  }

  return (

    <div className='bg-lblue min-h-screen w-full Bg relative'>

      <div className={`absolute right-0 pt-24 ${isFriendsOn ? 'block' : 'hidden'}`}>
        <FriendsTab />
      </div>

      {/* Check if user is guest or signed in */}
      {/* Title */}
      <div className='relative'>
        <NavBar title={'Welcome ' + userData.username + ' !'} />
        <div className="absolute top-6 right-0 mr-10 flex">
          {/*NavBar Icons/Buttons*/}
          <Button onClick={() => router.push('rulesPage')} className="bg-clear">
            <Image src={RulesPic} alt="RulesPicture" className="w-35px h-30px rulesNav" />
          </Button>
          <Button onClick={() => {isFriendsOn ? setIsFriendsOn(false) : setIsFriendsOn(true)}} className={`bg-clear`}>
            <Image src={FriendsPic} alt="FriendsPicture" className="w-35px h-30px friendsNav" />
          </Button>
        </div>
      </div>

      <div className='mt-4'>
        {/* Tilted SHORTALK */}
        <div className='pulse'>
          <h1 className='font-LuckiestGuy text-dblue px-10 h-[100px] text-5xl -rotate-12 pl-96 shortOut w-[90%]'>SHORTALK</h1>
        </div>
        {/* Buttons */}
        <Button size="" className='w-[450px] h-[130px] mx-auto my-4 bg-dblue'>
          <p className='font-LuckiestGuy text-white px-10 h-[100px] text-4xl flex items-center'>Create A Room</p>
        </Button>

        <Button size="xl" className='w-[450px] h-[130px] justify-center mx-auto my-5 bg-dblue'>
          <p className='font-LuckiestGuy text-white px-10 h-[100px] text-4xl flex items-center'>Join A Room</p>
        </Button>

        <Button onClick={handlePassAndPlayClick} size="xl" className='w-[450px] h-[130px] justify-items-center mx-auto my-4 bg-dblue'>
          <p className='font-LuckiestGuy text-white px-10 h-[100px] text-4xl flex items-center'>Pass N{"'"} Play</p>
        </Button>
      </div>

      <p className='text-[35px] text-center font-LuckiestGuy text-dblue pt-10'>
        Online Currently not working! Please play Pass and play for now. <br /> Sorry for the inconvinence!
      </p>
    </div>
  )
}

export default HomePage
