'use client'

import { INavBar } from '@/Interfaces/Interfaces'
import React from 'react'

const NavBar = (props:INavBar) => {
  return (
    <div className=' bg-dblue font-LuckiestGuy text-white lg:px-10 px-5 h-[100px] text-4xl flex items-center tracking-widest'>
      <div>{props.title}</div>
    </div>
  )
}

export default NavBar