'use client'

import { INavBar } from '@/Interfaces/Interfaces'
import React from 'react'

const NavBar = (props:INavBar) => {
  return (
    <div className=' bg-dblue font-LuckiestGuy text-white lg:px-10 px-5 h-[100px] text-4xl flex items-center tracking-widest z-40 relative'>
      <div className='cursor-default sm:w-auto w-1/2'>{props.title}</div>
    </div>
  )
}

export default NavBar