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
import { useSwipeable } from 'react-swipeable'

const PassAndPlayPage = () => {

  const firstRender1 = useRef(true);
  const firstRender2 = useRef(true);
  const firstRender3 = useRef(true);

  const { roundTime, numberOfRounds, Team1Name, Team2Name, team, setTeam, speaker, card, setCard, isTimeUp, setIsTimeUp, turnNumber, setTurnNumber, numberOfTurns, setSpeaker, Team2NameList, Team1NameList, setOnePointWords, OnePointWords, setBuzzWords, BuzzWords, setThreePointWords, ThreePointWords, setSkipWords, SkipWords, time, setTime } = useAppContext();

  const [isRoundOver, setIsRoundOver] = useState<boolean>(false);

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

  function SkipAudio() {
    new Audio("/Audio/fart.mp3").play()
  }

  function PlusOneAudio() {
    new Audio("/Audio/PlusOne.mp3").play()
  }

  function PlusThreeAudio() {
    new Audio("/Audio/PlusThree.mp3").play()
  }

  function BuzzAudio() {
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
    } 
    else {
      setIsRoundOver(true)
    }

  }, [speaker])

  useEffect(() => {
    console.log(firstRender3.current)
    if (firstRender3.current) {
      firstRender3.current = false;
    } else {
      router.push('/pages/finalScorePnpPage');
    }

  }, [isRoundOver])

  const [openModal, setOpenModal] = useState(false);

  const [swipeRight, setSwipeRight] = useState(false)
  const [swipeLeft, setSwipeLeft] = useState(false)
  const [swipeUp, setSwipeUp] = useState(false)
  const [swipeDown, setSwipeDown] = useState(false)
  const [isSwiping, setIsSwiping] = useState(false)
  const [anim, setAnim] = useState(false)
  const [anim2, setAnim2] = useState(false)
  const [anim3, setAnim3] = useState(false)
  const [anim4, setAnim4] = useState(false)

  const handleSwipe = useSwipeable({
    onSwiping: () => {
      console.log('Swiping!');
      setIsSwiping(true)
    },
    onSwipedRight: () => {
      console.log('Swiped to the right');
      setSwipeRight(true);
      setSwipeLeft(false);
      setSwipeDown(false);
      setSwipeUp(false)
      setIsSwiping(false)
      ThreePointBtnHandle()
    },
    onSwipedLeft: () => {
      console.log('Swiped to the left');
      setSwipeLeft(true);
      setSwipeRight(false);
      setSwipeDown(false);
      setSwipeUp(false)
      setIsSwiping(false)
      OnePointBtnHandle()
    },
    onSwipedUp: () => {
      console.log('Swiped Upward');
      setSwipeUp(true);
      setSwipeLeft(false);
      setSwipeRight(false);
      setSwipeDown(false)
      setIsSwiping(false)
      BuzzBtnHandle()
    },
    onSwipedDown: () => {
      console.log('Swiped Downward');
      setSwipeDown(true);
      setSwipeLeft(false);
      setSwipeRight(false);
      setIsSwiping(false)
      setSwipeUp(false)
      SkipBtnHandle()
    }
  })

  const animCheck = () => {
    if (swipeUp) {
      setAnim(true)
      setAnim2(false)
      setAnim3(false)
      setAnim4(false)
      console.log('anim1')
    } else if (swipeRight) {
      setAnim2(true)
      setAnim(false)
      setAnim3(false)
      setAnim4(false)
      console.log('anim2')
    } else if (swipeDown) {
      setAnim3(true)
      setAnim(false)
      setAnim2(false)
      setAnim4(false)
      console.log('anim3')
    } else if (swipeLeft) {
      setAnim4(true)
      setAnim(false)
      setAnim2(false)
      setAnim3(false)
      console.log('anim4')
    }
  }

  // useEffect(() => {
  //   animCheck()
  // }, [swipeUp, swipeRight, swipeDown, swipeLeft])

  return (
    <div className=' bg-lblue h-screen'>

      {/* Navbar */}
      <div className='relative'>
        <NavBar title="ShorTalk" />
        <div className="absolute top-6 right-0 mr-10 flex z-50">
          <Button onClick={() => setOpenModal(true)} className="bg-clear">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.6661 38.3333C16.6661 38.7754 16.4905 39.1993 16.178 39.5118C15.8654 39.8244 15.4415 40 14.9995 40H3.33322C2.4492 40 1.60138 39.6488 0.976279 39.0237C0.351178 38.3986 0 37.5507 0 36.6667V3.33333C0 2.44928 0.351178 1.60143 0.976279 0.976311C1.60138 0.351189 2.4492 0 3.33322 0H14.9995C15.4415 0 15.8654 0.175595 16.178 0.488156C16.4905 0.800716 16.6661 1.22464 16.6661 1.66667C16.6661 2.10869 16.4905 2.53262 16.178 2.84518C15.8654 3.15774 15.4415 3.33333 14.9995 3.33333H3.33322V36.6667H14.9995C15.4415 36.6667 15.8654 36.8423 16.178 37.1548C16.4905 37.4674 16.6661 37.8913 16.6661 38.3333ZM39.5112 18.8208L31.1781 10.4875C30.8654 10.1748 30.4413 9.99907 29.999 9.99907C29.5568 9.99907 29.1326 10.1748 28.8199 10.4875C28.5072 10.8002 28.3315 11.2244 28.3315 11.6667C28.3315 12.1089 28.5072 12.5331 28.8199 12.8458L34.3093 18.3333H14.9995C14.5575 18.3333 14.1336 18.5089 13.821 18.8215C13.5085 19.134 13.3329 19.558 13.3329 20C13.3329 20.442 13.5085 20.866 13.821 21.1785C14.1336 21.4911 14.5575 21.6667 14.9995 21.6667H34.3093L28.8199 27.1542C28.5072 27.4669 28.3315 27.8911 28.3315 28.3333C28.3315 28.7756 28.5072 29.1998 28.8199 29.5125C29.1326 29.8252 29.5568 30.0009 29.999 30.0009C30.4413 30.0009 30.8654 29.8252 31.1781 29.5125L39.5112 21.1792C39.6662 21.0244 39.7891 20.8406 39.873 20.6382C39.9568 20.4359 40 20.219 40 20C40 19.781 39.9568 19.5641 39.873 19.3618C39.7891 19.1594 39.6662 18.9756 39.5112 18.8208Z" fill="white" />
            </svg>
          </Button>
        </div>
        <div className='lg:hidden block w-full bg-dblue ps-4 pe-4 pb-4'>
          {/* <StatusBar
            time={roundTime}
            teamName={null}
            roundNumber={1}
            roundTotal={numberOfRounds}
            role={null}
            OnePointWord={null}
            ThreePointWord={null}
            Speaker={null}
            user={null}
          /> */}
        </div>
      </div>

      <div className='lg:hidden block'>
        <div {...handleSwipe} className='w-full h-screen absolute z-20'>
          <div className='flex justify-center h-[10%]'>
            <div className='rounded-b-full h-[20%] bg-red-600 text-red-600 w-[80%]'>.</div>
          </div>
          <div className='flex justify-between items-center h-[80%]'>
            <div className='rounded-e-full h-[80%] bg-green text-green w-5'>.</div>
            <div className='rounded-s-full h-[80%] bg-purple text-purple w-5'>.</div>
          </div>
          <div className='flex justify-center absolute bottom-0 w-[100%]'>
            <div className='rounded-t-full h-[20%] bg-gray-500 text-gray-500 w-[80%]'>.</div>
          </div>
        </div>
      </div>

      <div className='px-10 flex flex-col items-center space-y-5 lg:pt-10 pt-1'>
        <div className='lg:block hidden w-full'>
          <StatusBar
            time={roundTime}
            teamName={team}
            roundNumber={Math.ceil((turnNumber/numberOfTurns)*numberOfRounds)}
            roundTotal={numberOfRounds}
            role={null}
            OnePointWord={null}
            ThreePointWord={null}
            Speaker={speaker}
            user={null}
          />
        </div>

        <div className='lg:static absolute lg:p-0 flex items-center md:pt-20 pt-28 z-10'>
          <Card top={card.top} bottom={card.bottom} isGuessing={false} />
        </div>

        <div className=' w-full px-40 lg:flex justify-between hidden pb-10'>
          <SkipBtn onClick={() => { SkipBtnHandle(); SkipAudio() }} />
          <BuzzBtn onClick={() => { BuzzBtnHandle(); BuzzAudio() }} />
          <OnePointBtn onClick={() => { OnePointBtnHandle(); PlusOneAudio() }} />
          <ThreePointBtn onClick={() => { ThreePointBtnHandle(); PlusThreeAudio() }} />
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