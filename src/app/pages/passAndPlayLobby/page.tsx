'use client'

import DiceBtn from '@/app/components/DiceBtn'
import NavBar from '@/app/components/NavBar'
import StartBtn from '@/app/components/StartBtn'
import TeamListPNP from '@/app/components/TeamListPNP'
import { useAppContext } from '@/context/Context'
import { shuffleArray } from '@/utils/utils'
import { Button, Modal } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const PassAndPlayLobby = () => {

  const router = useRouter();

  const { Team1Name, Team2Name, Team1NameList, Team2NameList, setTeam1NameList, setTeam2NameList, shuffle, setShuffle, roundTime, setRoundTime, numberOfRounds, setNumberOfRounds, setTeam, setSpeaker, setNumberOfTurns, setTurnNumber } = useAppContext();

  const [isReady, setIsReady] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('')

  const [selectedRounds, setSelectedRounds] = useState('1');
  const [selectedMinutes, setSelectedMinutes] = useState('1');
  const [selectedSeconds, setSelectedSeconds] = useState('0');

  const maxRounds: number = 10;
  const maxMinutes: number = 5;
  const maxSeconds: number = 59;

  const renderOptions = (minNum: number, maxNum: number, ifSeconds: boolean) => {
    const renderedOptions = [];
    for (let i = minNum; i <= maxNum; i++) {
      renderedOptions.push(<option key={i} value={i}>{ifSeconds ? String(i).padStart(2, '0') : i}</option>)
    }
    return renderedOptions;
  }

  const shuffleTeams = () => {
    let allPlayers = [...Team1NameList, ...Team2NameList];
    allPlayers = shuffleArray(allPlayers);
    let coinflip = Math.round(Math.random());

    let team1 = [];
    let team2 = [];

    for (let i = 0; i < allPlayers.length; i++) {
      if ((i + coinflip) % 2 == 0) {
        team1.push(allPlayers[i]);
      } else {
        team2.push(allPlayers[i])
      }
    }
    setTeam1NameList(team1);
    setTeam2NameList(team2);
  }

  const handleStartClick = () => {
    if (isReady) {
      let coinflip = Math.round(Math.random());
      // setTeam1NameList(shuffleArray(Team1NameList))
      // setTeam2NameList(shuffleArray(Team2NameList))
      switch (coinflip) {
        case 0:
          setTeam(Team1Name);
          setSpeaker(Team1NameList[0]);
          break;
        case 1:
          setTeam(Team2Name);
          setSpeaker(Team2NameList[0]);
          break;
        default:
          break;
      }
      setNumberOfTurns(Math.max(Team1NameList.length, Team2NameList.length) * 2 * numberOfRounds);
      setTurnNumber(1);
      router.push('/pages/intermissionPnpPage')
    }
  }

  useEffect(() => {
    if (shuffle) {
      setShuffle(false);
      shuffleTeams();
    }
  }, [shuffle])

  useEffect(() => {
    let numberOfPlayers = Team1NameList.length + Team2NameList.length;
    let differenceInPlayers = Math.abs(Team1NameList.length - Team2NameList.length);
    let time = parseInt(selectedMinutes) * 60 + parseInt(selectedSeconds);
    setNumberOfRounds(parseInt(selectedRounds));
    setRoundTime(time)
    setIsReady(false);
    if (!(Team1Name && Team2Name)) {
      setMessage('Give each team a name');
    } else if (Team1Name === Team2Name) {
      setMessage('Teams names cannot be the same')
    } else if (numberOfPlayers < 4) {
      setMessage('At least 4 players must be playing');
    } else if (differenceInPlayers > 1) {
      setMessage('Teams can only vary by max 1 player')
    } else if (time < 5) {
      setMessage('Rounds must take a minimum of 30 seconds')
    } else {
      setMessage('')
      setIsReady(true);
    }

  }, [Team1Name, Team2Name, Team1NameList, Team2NameList, roundTime, selectedMinutes, selectedSeconds, selectedRounds])

  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
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

      <div className='flex flex-col items-center space-y-10 pt-20'>
        <div className='md:flex md:flex-row md:justify-between gap-5 md:items-center grid grid-cols-1'>
          <TeamListPNP teamNumber={1} />
          <div className='flex justify-center'>
              <DiceBtn />
          </div>
          <TeamListPNP teamNumber={2} />
        </div>

        <div className='md:flex flex-row justify-between whitespace-nowrap items-center sm:w-[400px]'>
          <div className=' font-LuckiestGuy text-dblue text-3xl md:text-start text-center'>Number of Rounds:</div>
          <div className='flex justify-center'>
            <select value={selectedRounds} onChange={(e) => setSelectedRounds(e.target.value)} className='h-10' name='Rounds' id='Rounds'>
              {renderOptions(1, maxRounds, false)}
            </select>
          </div>
        </div>

        <div className='md:flex flex-row justify-between whitespace-nowrap items-center sm:w-[400px]'>
          <div className=' font-LuckiestGuy text-dblue text-3xl md:text-start text-center'>Time Limit:</div>
          <div className='w-[100%] flex md:justify-end justify-center space-x-1' >
            <select className='h-10' value={selectedMinutes} onChange={(e) => setSelectedMinutes(e.target.value)}>
              {renderOptions(0, maxMinutes, false)}
            </select>
            <div className=' text-dblue font-LuckiestGuy text-3xl'>:</div>
            <select className='h-10' value={selectedSeconds} onChange={(e) => setSelectedSeconds(e.target.value)}>
              {renderOptions(0, maxSeconds, true)}
            </select>
          </div>
        </div>
        <div onClick={handleStartClick}>
          <StartBtn isReady={isReady} />
        </div>

        <div className='pb-10'>
          <div className=' font-Roboto text-dred'>{message}</div>
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

export default PassAndPlayLobby