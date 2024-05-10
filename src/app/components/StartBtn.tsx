'use client'

import { IStartButton } from '@/Interfaces/Interfaces'
import React, { useEffect, useState } from 'react'

const StartBtn = (props: IStartButton) => {

  const classNameBase = 'cursor-pointer rounded-2xl w-[200px] h-[100px] flex justify-center items-center px-4 ';


  const [btnText, setBtnText] = useState<string>('')
  const [className, setClassName] = useState<string>(classNameBase);


  useEffect(() => {
    if (props.isHost) {
      setBtnText('Start');
      if (props.isReady) {
        setClassName(classNameBase + ' bg-dblue border-2 border-black')
      } else {
        setClassName(classNameBase + ' bg-[#97B5D9]')
      }
    } else {
      if (props.isReady) {
        setClassName(classNameBase + ' bg-dred')
        setBtnText('Not Ready');
      } else {
        setClassName(classNameBase + ' bg-dblue border-2 border-black')
        setBtnText('Ready');
      }
    }
  }, [props.isHost, props.isReady])


  return (
    <div className={className}>
      <div className=' font-LuckiestGuy text-[30px] text-white'>{btnText}</div>
    </div>
  )
}

export default StartBtn