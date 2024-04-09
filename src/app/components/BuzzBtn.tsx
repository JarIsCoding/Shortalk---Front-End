'use client'

import React from 'react'
import Image from 'next/image';
import Angry from '@/app/assets/SmileyAngry.png'

const BuzzBtn = () => {
  return (
    <div className=' rounded-2xl border-2 border-black w-[200px] h-[75px] bg-lred flex justify-between items-center px-4'>
        <div className=' font-LuckiestGuy text-[40px] text-dred'>Buzz</div>
        <Image src={Angry} alt='angry face' width={40} height={40}/>
    </div>
  )
}

export default BuzzBtn