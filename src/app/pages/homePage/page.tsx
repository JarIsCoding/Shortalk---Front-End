'use client'
import NavBar from '@/app/components/NavBar'
import React from 'react'
import { Button } from "flowbite-react";


const homePage = () => {
  return (

    <div className='bg-lblue min-h-screen w-full Bg'>
      {/* Check if user is guest or signed in */}

      {/* Title */}
    <NavBar title='Welcome LEMONSQUIRT23'/>

    <div className='mt-4'>
      {/* Tilted SHORTALK */}
      <h1 className='font-LuckiestGuy text-dblue px-10 h-[100px] text-4xl -rotate-12 pl-96 shortOut'>SHORTALK</h1>
    {/* Buttons */}
      <Button size="" className='w-[450px] h-[150px] mx-auto my-4 bg-dblue'>
        <p className='font-LuckiestGuy text-white px-10 h-[100px] text-4xl flex items-center'>Create A Room</p>
      </Button>

      <Button size="xl" className='w-[450px] h-[150px] justify-center mx-auto my-4 bg-dblue'>
        <p className='font-LuckiestGuy text-white px-10 h-[100px] text-4xl flex items-center'>Join A Room</p>
      </Button>

      <Button size="xl" className='w-[450px] h-[150px] justify-items-center mx-auto my-4 bg-dblue'>
        <p className='font-LuckiestGuy text-white px-10 h-[100px] text-4xl flex items-center'>Pass N' Play</p>
      </Button>
      </div>
    </div>
    )
  }

  // .shortOut{
  //   text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  //   padding-top: 23px;
  //     }

export default homePage
