'use client'

import { IStatusBar } from '@/Interfaces/Interfaces'
import React from 'react'
import Timer from './Timer'

const StatusBar = (props: IStatusBar) => {
  return (
    <div className=' bg-status rounded-[20px] lg:px-[100px] px-5 py-[10px] font-Roboto text-textGray w-full h-[75px] flex justify-between items-center text-2xl cursor-default'>
        {props.time && <Timer initialTime={props.time}/>}
        {props.teamName && <div>{"Team: " + props.teamName}</div>}
        {props.user && <div>{"Player: " + props.user}</div>}        
        {props.Speaker && <div>{"Speaker: " + props.Speaker}</div>}
        {props.roundNumber && <div>{"Round: " +props.roundNumber + " of " + props.roundTotal}</div>}
        {props.role && <div>{"Role: " + props.role}</div>}
        {props.OnePointWord && <div>{"1-Point-Word: " + props.OnePointWord}</div>}
        {props.ThreePointWord && <div>{ "3-Point-Word: " + props.ThreePointWord}</div>}
    </div>
  )
}

export default StatusBar