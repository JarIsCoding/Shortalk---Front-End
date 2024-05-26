'use client'

import React from 'react'
import Image from 'next/image';
import BlueArrow from '@/app/assets/BlueArrow.png'

const PlayAgainBtn = () => {
  return (
    <div className='text-center rounded-2xl border-2 border-black w-[325px] h-[75px] bg-green pt-2 px-4'>
        <div className=' font-LuckiestGuy text-[40px] text-white tracking-wide'>Play Again?</div>
    </div>
  )
}

export default PlayAgainBtn