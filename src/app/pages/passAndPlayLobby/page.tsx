import NavBar from '@/app/components/NavBar'
import TeamListPNP from '@/app/components/TeamListPNP'
import React from 'react'

const PassAndPlayLobby = () => {
  return (
    <div>
        <NavBar title="Pass N' Play Settings"/>
        <div className='flex flex-col items-center space-y-10 pt-20'>
          <div className='flex flex-row justify-between w-[850px]'>
              <TeamListPNP/>
              <TeamListPNP/>
          </div>
        </div>
    </div>
  )
}

export default PassAndPlayLobby