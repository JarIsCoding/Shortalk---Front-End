"use client"

import NavBar from '@/app/components/NavBar'
import React from 'react'
import Image from 'next/image';
import { Button} from "flowbite-react";
import FriendsPic from '@/app/assets/FriendsPic.png'
import RulesPic from '@/app/assets/RulesPic.png'


const homePage = () => {
  return (

<div className='bg-lblue min-h-screen w-full Bg relative'>
  {/* Check if user is guest or signed in */}
  {/* Title */}
  <div className='relative'>
    <NavBar title='Welcome LEMONSQUIRT23'/>   
    <div className="absolute top-6 right-0 mr-10 flex">
      {/*NavBar Icons/Buttons*/}
      <Button className="bg-clear">
        <Image src={RulesPic} alt="RulesPicture" className="w-35px h-30px rulesNav"/>
      </Button>
      <Button className='bg-clear '>
        <Image src={FriendsPic} alt="FriendsPicture" className="w-35px h-30px friendsNav"/>
      </Button>
    </div>     
  </div>

    <div className='mt-4'>
      {/* Tilted SHORTALK */}
      <div className='pulse'>
      <h1 className='font-LuckiestGuy text-dblue px-10 h-[100px] text-5xl -rotate-12 pl-96 shortOut'>SHORTALK</h1>
      </div>
    {/* Buttons */}
      <Button size="" className='w-[450px] h-[130px] mx-auto my-4 bg-dblue'>
        <p className='font-LuckiestGuy text-white px-10 h-[100px] text-4xl flex items-center'>Create A Room</p>
      </Button>

      <Button size="xl" className='w-[450px] h-[130px] justify-center mx-auto my-5 bg-dblue'>
        <p className='font-LuckiestGuy text-white px-10 h-[100px] text-4xl flex items-center'>Join A Room</p>
      </Button>

      <Button size="xl" className='w-[450px] h-[130px] justify-items-center mx-auto my-4 bg-dblue'>
        <p className='font-LuckiestGuy text-white px-10 h-[100px] text-4xl flex items-center'>Pass N' Play</p>
      </Button>
      </div>
    </div>
    )
  }

export default homePage
