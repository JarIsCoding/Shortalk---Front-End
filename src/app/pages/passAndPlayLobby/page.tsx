import NavBar from '@/app/components/NavBar'
import StartBtn from '@/app/components/StartBtn'
import TeamListPNP from '@/app/components/TeamListPNP'
import React from 'react'

const PassAndPlayLobby = () => {
  return (
    <div>
      <NavBar title="Pass N' Play Settings" />
      <div className='flex flex-col items-center space-y-10 pt-20'>
        <div className='flex flex-row justify-between w-[850px]'>
          <TeamListPNP />
          <TeamListPNP />
        </div>
        <div className='flex flex-row justify-between whitespace-nowrap items-center w-[400px]'>
          <div className=' font-LuckiestGuy text-dblue text-3xl mr-5'>Number of Rounds:</div>
          <select className=' w-[20%] h-6' />
        </div>
        <div className='flex flex-row justify-between whitespace-nowrap items-center w-[400px]'>
          <div className=' font-LuckiestGuy text-dblue text-3xl mr-5'>Time Limit:</div>
          <div className='w-[30%] flex justify-end'>
            <select className='h-6' />
            <select className='h-6' />
          </div>
        </div>
        <StartBtn/>
      </div>
    </div>
  )
}

export default PassAndPlayLobby