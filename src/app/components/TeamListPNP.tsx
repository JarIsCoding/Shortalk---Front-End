'use client'
import { ITeamListPNP } from '@/Interfaces/Interfaces';
import { useAppContext } from '@/context/Context'
import React, { useEffect, useState } from 'react'
import Name from './Name';
import { shuffleArray } from '@/utils/utils';

const TeamListPNP = (props: ITeamListPNP) => {

  const { Team1Name, setTeam1Name, Team2Name, setTeam2Name, Team1NameList, Team2NameList, setTeam1NameList, setTeam2NameList, shuffle, setShuffle } = useAppContext();
  const [teamName, setTeamName] = useState<string>('');
  const [name, setName] = useState<string>('');
  

  const handleClick = () => {
    let teamList: string[] = [];
    switch (props.teamNumber) {
      case 1:
        teamList = [...Team1NameList];
        name && teamList.push(name)
        setTeam1NameList(teamList);
        break;
      case 2:
        teamList = [...Team2NameList];
        name && teamList.push(name)
        setTeam2NameList(teamList);
        break;
      default:
        console.log('Error')
    }
    setName('');
  }


  const renderNameList = (teamList: string[]) => {

    const renderedList = [];

    for (let i = 0; i < teamList.length; i++) {
      renderedList.push(<Name key={i} id={i + 1} name={teamList[i]} teamNumber={props.teamNumber} />)
    }

    return renderedList;
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  useEffect(() => {
    switch (props.teamNumber) {
      case 1:
        setTeam1Name(teamName);
        break;
      case 2:
        setTeam2Name(teamName)
        break;
      default:
        console.log('Error')
    }
  }, [teamName])

  useEffect(() => {
    switch (props.teamNumber) {
      case 1:
        if(Team1Name == ''){
          setTeamName('')
        }
        break;
      case 2:
        if(Team2Name == ''){
          setTeamName('')
        }
        break;
      default:
        console.log('Error')
    }
  },[Team1Name, Team2Name])

  return (
    <div className=' space-y-5 sm:w-[350px] w-[300px]'>
      <div className='md:flex flex-row justify-between whitespace-nowrap items-center'>
        <div className=' font-LuckiestGuy text-dblue text-3xl mr-5'>Team Name</div>
        <div className=''>
          <input value={teamName} className=' w-full h-7' maxLength={16} type="text" name="" id="" onChange={(e) => setTeamName(e.target.value)} />
        </div>
      </div>

      <div className=' bg-white rounded-lg w-full h-[275px] p-[10px] flex flex-col'>
        <div className=' font-Roboto text-xl underline w-full text-center'>Team: {teamName}</div>
        <div id='NamesContainer' className='h-full overflow-auto'>
          {
            (props.teamNumber == 1) ? renderNameList(Team1NameList) : renderNameList(Team2NameList)
          }
        </div>
        <div className=' md:flex md:flex-row md:space-x-5 grid grid-cols-1'>
          <input className='w-full border-2 border-[#551F00] rounded-lg font-Roboto text-[20px] placeholder:text-[20px]'
            type="text" name="" id="" placeholder='Player Name'
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            value={name}
            maxLength={20}
          />
          <div className='flex justify-center'>
            <div className='cursor-pointer rounded-2xl border-2 border-black w-[100%] h-[50px] bg-dblue flex justify-center items-center px-4'
              onClick={handleClick}
            >
              <div className=' font-RobotoBold tracking-wider text-[20px] text-white'>ADD</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default TeamListPNP