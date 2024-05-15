'use client'

import { IStatusBar } from '@/Interfaces/Interfaces'
import React from 'react'
import Timer from './Timer'

const StatusBar = (props: IStatusBar) => {
  console.log(props)
  return (
    <div className=' bg-status rounded-[20px] px-[100px] py-[10px] font-Roboto text-textGray w-full h-[75px] flex justify-between items-center text-2xl cursor-default'>
        {props.time && <Timer initialTime={props.time}/>}
        {props.teamName && <div>{"Team: " + props.teamName}</div>}
        {props.user && <div>{"Player: " + props.user}</div>}        
        {<div>{"Speaker: " + props.Speaker}</div>}
        {<div>{"Round: " +props.roundNumber + " of " + props.roundTotal}</div>}
        {<div>{"Role: " + props.role}</div>}
        {<div>{"1-Point-Word: " + props.OnePointWord}</div>}
        {<div>{ "3-Point-Word: " + props.ThreePointWord}</div>}
    </div>
  )
}

export default StatusBar