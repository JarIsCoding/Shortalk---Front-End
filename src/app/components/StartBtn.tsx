'use client'

import { IStartButton } from '@/Interfaces/Interfaces'
import { useAppContext } from '@/context/Context';
import React, { useEffect, useState } from 'react'

const StartBtn = (props: IStartButton) => {

  const classNameBase = ' rounded-2xl w-[200px] h-[100px] flex justify-center items-center px-4 ';


  const [btnText, setBtnText] = useState<string>('')
  const [className, setClassName] = useState<string>(classNameBase);

  const { setIsAllready } = useAppContext()


  useEffect(() => {
    console.log("isHost: " + props.isHost);
    console.log("isReady " + props.isReady)
    if (props.isHost) {
      setBtnText('Start');
      if (props.isReady) {
        setClassName(classNameBase + ' bg-dblue border-2 border-black cursor-pointer ')
        setIsAllready(true)
      } else {
        setClassName(classNameBase + ' bg-[#97B5D9]')
        setIsAllready(false)
      }
    } else {
      if (props.isReady) {
        setClassName(classNameBase + ' bg-dred cursor-pointer')
        setBtnText('Not Ready');
      } else {
        setClassName(classNameBase + ' bg-dblue border-2 border-black cursor-pointer')
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