import { IStatusBar } from '@/Interfaces/Interfaces'
import React from 'react'

const StatusBar = (props: IStatusBar) => {
  return (
    <div className=' bg-status rounded-[20px] px-[100px] py-[10px] font-Roboto text-textGray w-full h-[100px] flex justify-between items-center text-3xl mt-[40px]'>
        {props.time && <div>{"Time: " + props.time}</div>}
        {props.teamName && <div>{"TEAM: " + props.teamName}</div>}
        {(props.roundNumber && props.roundTotal) && <div>{"Round: " +props.roundNumber + " of " + props.roundTotal}</div>}
        {props.role && <div>{"Role: " + props.role}</div>}
        {props.OnePointWord && <div>{"1-Point-Word: " + props.OnePointWord}</div>}
        {props.ThreePointWord && <div>{ "3-Point-Word: " + props.ThreePointWord}</div>}
    </div>
  )
}

export default StatusBar