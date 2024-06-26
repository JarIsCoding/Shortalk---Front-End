'use client'

import React from 'react'
import Image from 'next/image';
import BlueArrow from '@/app/assets/BlueArrow.png'
import { IButton } from '@/Interfaces/Interfaces';

const NextTurnBtn = ( props:IButton) => {
  return (
    <div onClick={props.click} className=' rounded-2xl border-2 border-black w-[325px] h-[75px] bg-[#B7E9F4] flex justify-between items-center px-4 cursor-pointer'>
        <div className=' font-LuckiestGuy text-[40px] text-dblue tracking-wide'>Next Turn</div>
        <Image src={BlueArrow} alt='blue arrow' width={50} height={40}/>
    </div>
  )
}

export default NextTurnBtn