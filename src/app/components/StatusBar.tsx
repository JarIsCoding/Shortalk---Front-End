import { IStatusBar } from '@/Interfaces/Interfaces'
import React from 'react'
import Timer from './Timer'

const StatusBar = (props: IStatusBar) => {
  return (
    <div className=' bg-status rounded-[20px] px-[100px] py-[10px] font-Roboto text-textGray w-full h-[75px] flex justify-between items-center text-3xl cursor-default'>
        {props.time && <Timer initialTime={props.time}/>}
        {props.Speaker && <div>{"Speaker: " + props.Speaker}</div>}
        {props.teamName && <div>{"Team: " + props.teamName}</div>}
        {(props.roundNumber && props.roundTotal) && <div>{"Round: " +props.roundNumber + " of " + props.roundTotal}</div>}
        {props.role && <div>{"Role: " + props.role}</div>}
        {props.OnePointWord && <div>{"1-Point-Word: " + props.OnePointWord}</div>}
        {props.ThreePointWord && <div>{ "3-Point-Word: " + props.ThreePointWord}</div>}
    </div>

    // Keeping this as a note for myself -jared
    // <StatusBar time='0:00' teamName='Team' roundNumber={0} roundTotal={0} role='Guesser' OnePointWord='Word' ThreePointWord='Word' />
    
  )
}

export default StatusBar