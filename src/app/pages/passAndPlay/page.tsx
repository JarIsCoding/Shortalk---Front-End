"use client"

import BuzzBtn from '@/app/components/BuzzBtn'
import Card from '@/app/components/Card'
import NavBar from '@/app/components/NavBar'
import OnePointBtn from '@/app/components/OnePointBtn'
import SkipBtn from '@/app/components/SkipBtn'
import StatusBar from '@/app/components/StatusBar'
import ThreePointBtn from '@/app/components/ThreePointBtn'
import { useAppContext } from '@/context/Context'
import { getCard } from '@/utils/Dataservices'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const PassAndPlayPage = () => {

  const { roundTime, numberOfRounds, Team1Name, Team2Name, team, speaker, card, setCard, isTimeUp, setIsTimeUp } = useAppContext();

  const getNextCard = () => {
    let card = getCard();
    setCard(card);
  }

  const router = useRouter()

  if(isTimeUp){
    router.push('/pages/finalScorePnpPage')
  }

  useEffect(() => {
    if(isTimeUp){
      setIsTimeUp(false);
      router.push('/pages/finalScorePnpPage')
    }
  },[isTimeUp])

    return (
      <div className=' bg-lblue h-screen'>
        <NavBar title='Pass And Play' />
        <div className=' px-10 flex flex-col items-center space-y-5 mt-10'>
          <StatusBar
            time={roundTime}
            teamName={team}
            roundNumber={1}
            roundTotal={numberOfRounds}
            role={null}
            OnePointWord={null}
            ThreePointWord={null}
            Speaker={speaker}
          />
          <Card top={card.top} bottom={card.bottom} />
          <div className=' w-full px-40 flex justify-between'>
            <div className=' cursor-pointer' onClick={getNextCard}><BuzzBtn /></div>
            <div className=' cursor-pointer' onClick={getNextCard}><SkipBtn /></div>
            <div className=' cursor-pointer' onClick={getNextCard}><OnePointBtn /></div>
            <div className=' cursor-pointer' onClick={getNextCard}><ThreePointBtn /></div>
          </div>
        </div>
      </div>
    )
  }

export default PassAndPlayPage