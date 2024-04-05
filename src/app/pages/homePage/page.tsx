'use client'
import NavBar from '@/app/components/NavBar'
import React from 'react'
import { Button } from "flowbite-react";



const homePage = () => {
  return (


    <div className='bg-lblue'>
      {/* Check if user is guest or signed in */}
      
    <NavBar title='Welcome LEMONSQUIRT23'/>

      <h1 className=''>SHORTALK</h1>


      <Button size="" className='w-[450px] h-[150px] justify-center'>

        <p className=''>Create A Room</p>

      </Button>
      <Button size="xl" className='w-[450px] h-[150px] justify-center'>

        <p>Join A Room</p>

      </Button>

      <Button size="xl" className='w-[450px] h-[150px] justify-items-center'>

        <p>Pass N' Play</p>

      </Button>



    </div>
  )
}



export default homePage
