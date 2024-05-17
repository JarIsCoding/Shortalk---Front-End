'use client'

import React from 'react'
import Image from 'next/image';
import GrayArrow from '@/app/assets/GrayArrow.png'


const SkipBtn = ( {onClick} : {onClick:()=>void}) => {
  return (
    <div onClick={onClick} className=' rounded-2xl border-2 border-black w-[200px] h-[75px] bg-lgray flex justify-between items-center px-4 cursor-pointer'>
        <div className=' font-LuckiestGuy text-[40px] text-dgray'>Skip</div>
        <Image src={GrayArrow} alt='gray arrow' width={50} height={40}/>
    </div>
  )
}

export default SkipBtn