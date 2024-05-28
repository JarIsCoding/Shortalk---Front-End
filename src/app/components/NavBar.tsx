'use client'

import { INavBar } from '@/Interfaces/Interfaces'
import React from 'react'
import Player from './Player'

const NavBar = (props:INavBar) => {
  return (
    <div className=' bg-dblue font-LuckiestGuy text-white lg:px-10 ps-5 md:h-[90px] h-[75px] lg:text-4xl text-2xl flex items-center tracking-widest z-40 relative'>
      <div className='cursor-default sm:w-auto w-1/2'>{props.title} </div>

      <div className='cursor-default sm:w-auto w-1/2 justify-items-end flex'>
      <Player/>
      </div>
      
    </div>
  )
}

export default NavBar