import { IStartButton } from '@/Interfaces/Interfaces'
import React from 'react'

const StartBtn = (props:IStartButton) => {

  let className = 'cursor-pointer rounded-2xl w-[200px] h-[100px] flex justify-center items-center px-4 '
  if(props.isReady){
    className += ' bg-dblue border-2 border-black'
  }else{
    className += ' bg-[#97B5D9]'
  }

  return (
    <div className={className}>
        <div className=' font-LuckiestGuy text-[40px] text-white'>Start</div>
    </div>
  )
}

export default StartBtn