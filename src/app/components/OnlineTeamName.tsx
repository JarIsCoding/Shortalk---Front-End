import { ITeamInfo } from '@/Interfaces/Interfaces';
import { useAppContext } from '@/context/Context';
import { Button } from 'flowbite-react';
import React from 'react'
import Image from 'next/image';
import checkMarck from '@/app/assets/ImReadyCheckMark.png'
import topHat from '@/app/assets/ShortalkLogoTopHat.png'
import trash from '@/app/assets/Trash.png'

interface IOnlineTeam {
  teamName: string;
  host: string;
  members: {
    name: string
    readyStatus: boolean
  }[];
  handleRemove: (playerName: string) => void;
}

const OnlineTeamName = (props: IOnlineTeam) => {

  const { userData, setUserData } = useAppContext();


  return (


    <div className='justify-between whitespace-nowrap items-center space-y-5 md:w-[400px] w-[300px] lg:px-[25px] text-center lg:gap-0 gap-2'>
      <h1 className='underline text-dblue font-Roboto lg:text-4xl text-3xl text-center'>{props.teamName}</h1>
      {
        props.members && props.members.map((member, idx) => {
          return (

            <div key={idx} className=' flex justify-between'>
              <h1 className=' text-dblue font-Roboto lg:text-4xl text-2xl text-center overflow-x-auto removeScrollbar mr-5'>{member.name}</h1>
              {
                (member.name == props.host) ? <Image src={topHat} alt='topHat' className=' w-8 h-8'/> 
                : member.readyStatus ? <Image src={checkMarck} alt='check mark' />
                : <div></div>
              }
              {
                (userData.username == props.host && member.name != props.host && member.name != "") &&
                <Image onClick={() => props.handleRemove(member.name)} src={trash} className='ml-5 cursor-pointer' alt='trash' width={40}  />
              }
            </div>
          )
        })
      }
    </div>







    // Team Names
    //  <div className="container">
    //   <div className="row">
    //     <div className="col-12">

    //     <h1 className='underline text-dblue font-Roboto text-4xl'>Team Cave</h1>

    //     </div>
    //     <div className="col-12">

    //     <h1 className='underline text-dblue font-Roboto text-4xl'></h1>


    //     </div>
    //   </div>
    //  </div>

    /* <div className=' pt-5'>
    <div className='flex flex-row '>
    <h1 className='underline text-dblue font-Roboto text-4xl'>Team Cave</h1>
    </div>
    </div> */

  )
}

export default OnlineTeamName

