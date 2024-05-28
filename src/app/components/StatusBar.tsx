'use client'

import { IStatusBar } from '@/Interfaces/Interfaces'
import React from 'react'
import Timer from './Timer'

const StatusBar = (props: IStatusBar) => {
  return (
    <div className=' bg-status rounded-[20px] lg:px-10 px-5 py-[10px] font-Roboto text-textGray w-full h-[75px] flex justify-between items-center text-2xl cursor-default'>
        {props.time && <Timer initialTime={props.time}/>}
        {props.teamName && <div className=''>{"Team: " + props.teamName}</div>}
        {props.user && <div className=' hidden md:block'>{"Player: " + props.user}</div>}        
        {props.Speaker && <div className=' '>{"Speaker: " + props.Speaker}</div>}
        {props.roundNumber && <div className=' hidden md:block'>{"Round: " +props.roundNumber + " of " + props.roundTotal}</div>}
        {props.role && <div className=' hidden md:block'>{"Role: " + props.role}</div>}
        {props.OnePointWord && <div className=' hidden lg:blockhidden lg:block'>{"1-Point-Word: " + props.OnePointWord}</div>}
        {props.ThreePointWord && <div className=' hidden lg:block'>{ "3-Point-Word: " + props.ThreePointWord}</div>}
    </div>
  )
}

export default StatusBar