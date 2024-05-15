import { ICard } from '@/Interfaces/Interfaces'
import React from 'react'

const Card = (props: ICard) => {
  return (
    <div className='lg:h-[550px] lg:w-[400px] md:h-[500px] md:w-[350px] h-[425px] w-[275px] flex flex-col justify-between rounded-xl border-2 border-black bg-dblue text-center'>
        <div className='  w-full h-[30px]'></div>
        <div className=' w-full h-full font-Roboto text-[38px] border-b-2 border-black bg-white flex justify-center items-center'>{props.top}</div>
        <div className=' w-full h-full font-Roboto text-[38px] bg-white flex justify-center items-center'>{props.bottom}</div>
        <div className='  w-full h-[30px]'></div>
    </div>
  )
}

export default Card