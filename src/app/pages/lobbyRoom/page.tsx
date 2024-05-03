'use client'
import DiceBtn from '@/app/components/DiceBtn'
import NavBar from '@/app/components/NavBar'
import StartBtn from '@/app/components/StartBtn'
import TeamListPNP from '@/app/components/TeamListPNP'
import { useAppContext } from '@/context/Context'
import { shuffleArray } from '@/utils/utils'
import { Button, Modal } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import React, { ReactElement, useEffect, useState } from 'react'
import OnlineTeamName from '@/app/components/OnlineTeamName'
import FriendsTab from '@/app/components/FriendsTab'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

const LobbyPage = () => {
  const router = useRouter();

  const { Team1Name, Team2Name, Team1NameList, Team2NameList, setTeam1NameList, setTeam2NameList, shuffle, setShuffle, roundTime, setRoundTime, numberOfRounds, setNumberOfRounds, setTeam, setSpeaker, setNumberOfTurns, conn, setConnection, userData, lobbyRoomName } = useAppContext();

  const [isReady, setIsReady] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<{ username: string; msg: string; }[]>([]);

  const [selectedRounds, setSelectedRounds] = useState('1');
  const [selectedMinutes, setSelectedMinutes] = useState('1');
  const [selectedSeconds, setSelectedSeconds] = useState('0');

  const maxRounds: number = 10;
  const maxMinutes: number = 5;
  const maxSeconds: number = 59;

  const joinRoom = async (username: string, lobbyroom: string) => {
    try {
      const conn = new HubConnectionBuilder()
        .withUrl("https://shortalkapi.azurewebsites.net/lobby")
        .configureLogging(LogLevel.Information)
        .build();

      // .withUrl("http://localhost:5151/lobby")
      // .configureLogging(LogLevel.Information)
      // .build();

      // set up handler
      conn.on("JoinSpecificLobbyRoom", (username: string, msg: string) => { // Specify the types for parameters
        setMessages(messages => [...messages, { username, msg }])
        console.log("msg: ", msg);
      });

      conn.on("ReceiveSpecificMessage", (username: string, msg: string) => { // Specify the types for parameters
        setMessages(messages => [...messages, { username, msg }])
      })

      await conn.start();
      await conn.invoke("JoinSpecificLobbyRoom", { username, lobbyroom });


      setConnection(conn);
      console.log('success')
    } catch (e) {
      console.log(e);
    }
  }

  const sendMessage = async (msg: string) => {
    console.log(conn)
    try {
      conn && await conn.invoke("SendMessage", msg);
    } catch (e) {
      console.log(e)
    }
  }

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
      setTeam1NameList(shuffleArray(Team1NameList))
      setTeam2NameList(shuffleArray(Team2NameList))
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
      setNumberOfTurns(Math.max(Team1NameList.length, Team2NameList.length) * numberOfRounds);
      router.push('/pages/intermissionPnpPage')
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage(message);
      setMessage('');
    }
  };

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
      setWarning('Give each team a name');
    } else if (numberOfPlayers < 4) {
      setWarning('At least 4 players must be playing');
    } else if (differenceInPlayers > 1) {
      setWarning('Teams can only vary by max 1 player')
    } else if (time < 30) {
      setWarning('Rounds must take a minimum of 30 seconds')
    } else {
      setWarning('');
      setIsReady(true);
    }

  }, [Team1Name, Team2Name, Team1NameList, Team2NameList, roundTime, selectedMinutes, selectedSeconds, selectedRounds])

  useEffect(() => {
    joinRoom(userData.username, lobbyRoomName)
  }, [])

  const [openModal, setOpenModal] = useState(false);

  // START OF RETURN CODE
  return (
    <div>
      {/* Friends Tab */}
      <div className={`absolute right-0 pt-24 `}>
        <FriendsTab />
      </div>

      {/* Navbar */}
      <div className='relative'>
        <NavBar title={"Room ID: " + lobbyRoomName} />
        <div className="absolute top-6 right-0 mr-10 flex">
        </div>
      </div>

      {/* Body */}
      <div className='flex flex-col items-center space-y-16 pt-20 pr-72'>

        <div className='flex flex-row'>
          <OnlineTeamName />
          <div className=' flex flex-col items-center space-y-10'>
            <Button size="xl" className='w-[230px] h-[50px] bg-dblue mt-5'>
              <p className='font-Roboto text-white px-10 flex items-center'>Toggle Team</p>
            </Button>
            <div className='flex justify-center'>
              <DiceBtn />
            </div>
            <div className='' onClick={handleStartClick}>
              <StartBtn isReady={isReady} />
            </div>
          </div>
          <OnlineTeamName />
        </div>

        <div className=' flex flex-col items-center space-y-4'>
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
          <div className='flex flex-row justify-between whitespace-nowrap items-center w-[400px]'>
            <div className=' font-LuckiestGuy text-dblue text-3xl mr-5'>ScoreKeeper</div>
            <select name="" id=""></select>
          </div>
        </div>

        <div className='w-[1003px] h-[224px] bg-lgray border-[#52576F] border-[20px] p-4'>
          <div className='h-[70%] overflow-y-auto flex flex-col-reverse'>
            <div>
              {
                messages.map((msg, ix) => {
                  return (
                    <p key={ix} className=' font-Roboto'> <span className=' font-RobotoBold'>{msg.username}</span> {" - "} <span>{msg.msg}</span> </p>
                  )
                })

              }
            </div>
          </div>
          <input onChange={(e) => { setMessage(e.target.value) }} onKeyDown={handleKeyDown} value={message} type="text" placeholder='Type to Chat' className='w-[930px] h-[38]' />
        </div>
      </div>
    </div>
  )
}

export default LobbyPage