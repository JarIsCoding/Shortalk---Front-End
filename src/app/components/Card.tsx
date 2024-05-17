import { ICard } from '@/Interfaces/Interfaces'
import React from 'react'
import Image from 'next/image'
import cardBack from '@/app/assets/CardBack.png'

const Card = (props: { top: string, bottom: string, isGuessing: boolean }) => {
  return (
    <div className='h-[550px] w-[400px] flex flex-col justify-between rounded-xl border-2 border-black bg-dblue'>
      <div className='  w-full h-[30px]'></div>
      {props.isGuessing ?
        <div className='w-full h-full'>
          <Image src={cardBack} alt='the back of the card'/>
        </div>
        : 
        <div className=' w-full h-full'>
          <div className=' w-full h-1/2 font-Roboto text-[38px] border-b-2 border-black bg-white flex justify-center items-center'>{props.top}</div>
          <div className=' w-full h-1/2 font-Roboto text-[38px] bg-white flex justify-center items-center'>{props.bottom}</div>
        </div>
      }

      <div className='  w-full h-[30px]'></div>
    </div>
  )
}

export default Card