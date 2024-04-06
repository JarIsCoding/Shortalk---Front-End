'use client'

import React from 'react'
import Image from 'next/image';
import PinkArrow from '@/app/assets/PinkArrow.png'

const ThreePointBtn = () => {
  return (
    <div className=' rounded-2xl border-2 border-black h-[75px] bg-lmagenta flex justify-between items-center px-4 space-x-4'>
        <div className=' font-LuckiestGuy text-[40px] text-dmagenta'>3-Points</div>
        <Image src={PinkArrow} alt='pink arrow' width={50} height={40}/>
    </div>
  )
}

export default ThreePointBtn