import { IName } from '@/Interfaces/Interfaces'
import { useAppContext } from '@/context/Context'
import React from 'react'

const Name = (props: IName) => {

  const {Team1NameList, setTeam1NameList, Team2NameList, setTeam2NameList} = useAppContext();




  const handleClick = (id: number) => {
    let teamNameList: string[] = [];
    switch(props.teamNumber){
      case 1:
        teamNameList = [...Team1NameList];
        teamNameList.splice(id-1,1);
        setTeam1NameList(teamNameList);
        break;
      case 2:
        teamNameList = [...Team2NameList];
        teamNameList.splice(id-1,1);
        setTeam2NameList(teamNameList);
        break;
      default:
        break;
    }
  }

  return (
    <div onClick={()=>handleClick(props.id)} className=' flex flex-row justify-between text-[20px] font-Roboto px-3'>
        <div>{props.id}.</div>
        <div>{props.name}</div>
        <div className=' cursor-pointer text-dred'>X</div>
    </div>
  )
}

export default Name