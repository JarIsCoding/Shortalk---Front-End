import { ICard } from '@/Interfaces/Interfaces'
import React from 'react'

const Card = (props: ICard) => {
  return (
    <div className='h-[550px] w-[400px] flex flex-col justify-between rounded-xl border-2 border-black bg-dblue'>
        <div className='  w-full h-[30px]'></div>
        <div className=' w-full h-full font-Roboto text-[38px] border-b-2 border-black bg-white flex justify-center items-center'>{props.top}</div>
        <div className=' w-full h-full font-Roboto text-[38px] bg-white flex justify-center items-center'>{props.bottom}</div>
        <div className='  w-full h-[30px]'></div>
    </div>
  )
}

export default Card