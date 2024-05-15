"use client"

import BuzzBtn from '@/app/components/BuzzBtn'
import Card from '@/app/components/Card'
import NavBar from '@/app/components/NavBar'
import OnePointBtn from '@/app/components/OnePointBtn'
import PlusOneAudio from '@/app/components/PlusOneAudio'
import SkipBtn from '@/app/components/SkipBtn'
import StatusBar from '@/app/components/StatusBar'
import ThreePointBtn from '@/app/components/ThreePointBtn'
import { useAppContext } from '@/context/Context'
import { getCard } from '@/utils/Dataservices'
import { Button, Modal } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

const PassAndPlayPage = () => {

  const firstRender1 = useRef(true);
  const firstRender2 = useRef(true);
  const firstRender3 = useRef(true);

  const { roundTime, numberOfRounds, Team1Name, Team2Name, team, setTeam, speaker, card, setCard, isTimeUp, setIsTimeUp, turnNumber, setTurnNumber, numberOfTurns, setSpeaker, Team2NameList, Team1NameList, setOnePointWords, OnePointWords, setBuzzWords, BuzzWords, setThreePointWords, ThreePointWords, setSkipWords, SkipWords } = useAppContext();

  const getNextCard = () => {
    let card = getCard();
    setCard(card);
  }

  const SkipBtnHandle = () => {
    setSkipWords([...SkipWords, card]);
    getNextCard();
  }

  const BuzzBtnHandle = () => {
    setBuzzWords([...BuzzWords, card]);
    getNextCard();
  }

  const OnePointBtnHandle = () => {
    setOnePointWords([...OnePointWords, card]);
    getNextCard();
  }

  const ThreePointBtnHandle = () => {
    setThreePointWords([...ThreePointWords, card])
    getNextCard();
  }

//   ### Sound Effects
// +1 - Success 1
// +3 - Winner Bell Gameshow
// Loser - Slow Sad Trombone fail
// Winner - you win sequence
// Buzz - Ice Hockey Sports Buzzer
// Skip - fart
// Game Start - Success Fanfare Trumpets
// PLayer Join -  multi pop
// Quit - finger snap

    function SkipAudio(){
    new Audio("/Audio/fart.mp3").play()
  }

  function PlusOneAudio(){
    new Audio("/Audio/PlusOne.mp3").play()
  }

  function PlusThreeAudio(){
    new Audio("/Audio/PlusThree.mp3").play()
  }

  function BuzzAudio(){
    new Audio("/Audio/HockeyBuzzer.wav").play()
  }

  const router = useRouter()

  useEffect(() => {
    console.log(firstRender1.current)
    if (firstRender1.current) {
      firstRender1.current = false;
    } else {
      if (isTimeUp) {
        setIsTimeUp(false);
        switch (team) {
          case Team1Name:
            console.log(turnNumber);
            setSpeaker(Team2NameList[Math.floor(turnNumber / 2) % Team2NameList.length])
            setTeam(Team2Name);
            break;
          case Team2Name:
            console.log(turnNumber);
            setSpeaker(Team1NameList[Math.floor(turnNumber / 2) % Team1NameList.length])
            setTeam(Team1Name);
            break;
          default:
            break;
        }
      }
    }

  }, [isTimeUp])

  useEffect(() => {
    console.log(firstRender2.current)
    if (firstRender2.current) {
      firstRender2.current = false;
    } else {
      setTurnNumber(turnNumber + 1);
    }

  }, [speaker])

  useEffect(() => {
    console.log(firstRender3.current)
    if (firstRender3.current) {
      firstRender3.current = false;
    } else {
      router.push('/pages/finalScorePnpPage');
    }

  }, [turnNumber])

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className=' bg-lblue h-screen'>

      {/* Navbar */}
      <div className='relative'>
        <NavBar title="Pass N' Play Settings" />
        <div className="absolute top-6 right-0 mr-10 flex z-50">
          <Button onClick={() => setOpenModal(true)} className="bg-clear">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.6661 38.3333C16.6661 38.7754 16.4905 39.1993 16.178 39.5118C15.8654 39.8244 15.4415 40 14.9995 40H3.33322C2.4492 40 1.60138 39.6488 0.976279 39.0237C0.351178 38.3986 0 37.5507 0 36.6667V3.33333C0 2.44928 0.351178 1.60143 0.976279 0.976311C1.60138 0.351189 2.4492 0 3.33322 0H14.9995C15.4415 0 15.8654 0.175595 16.178 0.488156C16.4905 0.800716 16.6661 1.22464 16.6661 1.66667C16.6661 2.10869 16.4905 2.53262 16.178 2.84518C15.8654 3.15774 15.4415 3.33333 14.9995 3.33333H3.33322V36.6667H14.9995C15.4415 36.6667 15.8654 36.8423 16.178 37.1548C16.4905 37.4674 16.6661 37.8913 16.6661 38.3333ZM39.5112 18.8208L31.1781 10.4875C30.8654 10.1748 30.4413 9.99907 29.999 9.99907C29.5568 9.99907 29.1326 10.1748 28.8199 10.4875C28.5072 10.8002 28.3315 11.2244 28.3315 11.6667C28.3315 12.1089 28.5072 12.5331 28.8199 12.8458L34.3093 18.3333H14.9995C14.5575 18.3333 14.1336 18.5089 13.821 18.8215C13.5085 19.134 13.3329 19.558 13.3329 20C13.3329 20.442 13.5085 20.866 13.821 21.1785C14.1336 21.4911 14.5575 21.6667 14.9995 21.6667H34.3093L28.8199 27.1542C28.5072 27.4669 28.3315 27.8911 28.3315 28.3333C28.3315 28.7756 28.5072 29.1998 28.8199 29.5125C29.1326 29.8252 29.5568 30.0009 29.999 30.0009C30.4413 30.0009 30.8654 29.8252 31.1781 29.5125L39.5112 21.1792C39.6662 21.0244 39.7891 20.8406 39.873 20.6382C39.9568 20.4359 40 20.219 40 20C40 19.781 39.9568 19.5641 39.873 19.3618C39.7891 19.1594 39.6662 18.9756 39.5112 18.8208Z" fill="white" />
            </svg>
          </Button>
        </div>
      </div>

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
          <div className=' cursor-pointer' onClick={()=>{SkipBtnHandle(); SkipAudio()}}><SkipBtn /></div>          
          <div className=' cursor-pointer' onClick={()=>{BuzzBtnHandle(); BuzzAudio()}}><BuzzBtn /></div>
          <div className=' cursor-pointer' onClick={()=>{OnePointBtnHandle(); PlusOneAudio()}}><OnePointBtn /></div>
          <div className=' cursor-pointer' onClick={()=>{ThreePointBtnHandle(); PlusThreeAudio()}}><ThreePointBtn /></div>
        </div>
      </div>

      {/* Modal for navbar */}
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-black">
              Are you sure you want to leave?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => { setOpenModal(false); router.push('/pages/homePage') }}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default PassAndPlayPage