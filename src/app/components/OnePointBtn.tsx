'use client'

import React from 'react'
import Image from 'next/image';
import GreenArrow from '@/app/assets/GreenArrow.png'

const OnePointBtn = ({onClick} : {onClick:()=>void}) => {
  return (
    <div onClick={onClick} className=' rounded-2xl border-2 border-black h-[75px] bg-lgreen flex justify-between items-center px-4 space-x-4'>
        <div className=' font-LuckiestGuy text-[40px] text-dgreen'>1-Point</div>
        <Image src={GreenArrow} alt='green arrow' width={50} height={40}/>
    </div>
  )
}

export default OnePointBtn