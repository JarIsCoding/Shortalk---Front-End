'use client'

import DiceBtn from '@/app/components/DiceBtn'
import NavBar from '@/app/components/NavBar'
import StartBtn from '@/app/components/StartBtn'
import TeamListPNP from '@/app/components/TeamListPNP'
import React, { useState } from 'react'

const PassAndPlayLobby = () => {

  const [selectedRounds, setSelectedRounds] = useState('1');
  const [selectedMinutes, setSelectedMinutes] = useState('1');
  const [selectedSeconds, setSelectedSeconds] = useState('0');

  const maxRounds:number = 10;
  const maxMinutes:number = 5;
  const maxSeconds:number = 59;

  const renderOptions = (minNum:number,maxNum:number, ifSeconds:boolean) => {
    const renderedOptions = [];
    for(let i = minNum; i <= maxNum; i++){
      renderedOptions.push(<option key={i} value={i}>{ifSeconds ? String(i).padStart(2, '0'): i}</option>)
    }
    return renderedOptions;
  }

  // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>, setSelectedOption:React.Dispatch<React.SetStateAction<string>>) => {
  //   setSelectedOption(event.target.value);
  // };

  return (
    <div>
      <NavBar title="Pass N' Play Settings" />
      <div className='flex flex-col items-center space-y-10 pt-20'>
        <div className='flex flex-row justify-between w-[850px] items-center'>
          <TeamListPNP />
          <DiceBtn/>
          <TeamListPNP />
        </div>
        <div className='flex flex-row justify-between whitespace-nowrap items-center w-[400px]'>
          <div className=' font-LuckiestGuy text-dblue text-3xl mr-5'>Number of Rounds:</div>
          <select value={selectedRounds} onChange={(e) => setSelectedRounds(e.target.value)} className=' w-[20%] h-10' name='Rounds' id='Rounds'>
            {renderOptions(1, maxRounds, false)}
          </select>
        </div>
        <div className='flex flex-row justify-between whitespace-nowrap items-center w-[400px]'>
          <div className=' font-LuckiestGuy text-dblue text-3xl mr-5'>Time Limit:</div>
          <div className='w-[30%] flex justify-end space-x-1' >
            <select className='h-10' value={selectedMinutes} onChange={(e) => setSelectedMinutes(e.target.value)}>
            {renderOptions(0, maxMinutes, false)}
            </select>
            <div className=' text-dblue font-LuckiestGuy text-3xl'>:</div>
            <select className='h-10' value={selectedSeconds} onChange={(e) => setSelectedSeconds(e.target.value)}>
            {renderOptions(0, maxSeconds, true)}
            </select>
          </div>
        </div>
        <StartBtn/>
      </div>
    </div>
  )
}

export default PassAndPlayLobby