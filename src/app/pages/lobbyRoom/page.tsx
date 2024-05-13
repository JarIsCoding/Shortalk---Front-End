'use client'
import DiceBtn from '@/app/components/DiceBtn'
import NavBar from '@/app/components/NavBar'
import StartBtn from '@/app/components/StartBtn'
import TeamListPNP from '@/app/components/TeamListPNP'
import { useAppContext } from '@/context/Context'
import { checkIfPlayersAreReady, formatTime, formatTimeMinutesAndSeconds, renderOptions, shuffleArray } from '@/utils/utils'
import { Button, Modal } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import React, { ReactElement, useEffect, useState } from 'react'
import OnlineTeamName from '@/app/components/OnlineTeamName'
import FriendsTab from '@/app/components/FriendsTab'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { ILobbyRoomBackEnd, ITeamInfo } from '@/Interfaces/Interfaces'

const LobbyPage = () => {

  const router = useRouter();

  const { Team1Name, Team2Name, Team1NameList, Team2NameList, setTeam1NameList, setTeam2NameList, shuffle, setShuffle, roundTime, setRoundTime, numberOfRounds, setNumberOfRounds, setTeam, setSpeaker, setNumberOfTurns, conn, setConnection, userData, lobbyRoomName, host, setHost } = useAppContext();

  const [isReady, setIsReady] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<{ username: string; msg: string; }[]>([]);

  const [Team1Info, setTeam1Info] = useState<ITeamInfo>({} as ITeamInfo);

  const [Team2Info, setTeam2Info] = useState<ITeamInfo>({} as ITeamInfo);

  // const [host, setHost] = useState<string>('');

  const [Team1Names, setTeam1Names] = useState<string[]>(Team1NameList);
  const [Team2Names, setTeam2Names] = useState<string[]>(Team2NameList);

  const [selectedRounds, setSelectedRounds] = useState('1');
  const [selectedMinutes, setSelectedMinutes] = useState('1');
  const [selectedSeconds, setSelectedSeconds] = useState('0');

  const maxRounds: number = 10;
  const maxMinutes: number = 5;
  const maxSeconds: number = 59;

  const setTeamInfos = (lobby: ILobbyRoomBackEnd) => {

    setHost(lobby.Host)

    const team1Info = {
      teamName: "Team1",
      host: lobby.Host,
      members: [
        {
          name: lobby.TeamMemberA1,
          readyStatus: lobby.ReadyStatusA1
        },
        {
          name: lobby.TeamMemberA2,
          readyStatus: lobby.ReadyStatusA2
        },
        {
          name: lobby.TeamMemberA3,
          readyStatus: lobby.ReadyStatusA3
        },
        {
          name: lobby.TeamMemberA4,
          readyStatus: lobby.ReadyStatusA4
        },
        {
          name: lobby.TeamMemberA5,
          readyStatus: lobby.ReadyStatusA5
        }
      ]
    }

    setTeam1Info(team1Info);

    const team2Info = {
      teamName: "Team2",
      host: lobby.Host,
      members: [
        {
          name: lobby.TeamMemberB1,
          readyStatus: lobby.ReadyStatusB1
        },
        {
          name: lobby.TeamMemberB2,
          readyStatus: lobby.ReadyStatusB2
        },
        {
          name: lobby.TeamMemberB3,
          readyStatus: lobby.ReadyStatusB3
        },
        {
          name: lobby.TeamMemberB4,
          readyStatus: lobby.ReadyStatusB4
        },
        {
          name: lobby.TeamMemberB5,
          readyStatus: lobby.ReadyStatusB5
        }
      ]
    }

    setTeam2Info(team2Info)
  }

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
      conn.on("JoinSpecificLobbyRoom", (username: string, msg: string, json: string) => { // Specify the types for parameters
        const lobby: ILobbyRoomBackEnd = JSON.parse(json);
        setTeamInfos(lobby);
        if (userData.username != lobby.Host) {
          setSelectedRounds(`${lobby.NumberOfRounds}`)
        }

        setMessages(messages => [...messages, { username, msg }])
        console.log("msg: ", msg);
        console.log("lobby: ", json);
      });

      conn.on("ReceiveSpecificMessage", (username: string, msg: string) => { // Specify the types for parameters
        setMessages(messages => [...messages, { username, msg }])
      })

      conn.on("TogglePayerAsReady", (json: string) => {

        const lobby: ILobbyRoomBackEnd = JSON.parse(json);
        setTeamInfos(lobby);

      });

      conn.on("ChangeNumberOfRounds", (json: string) => {

        const lobby: ILobbyRoomBackEnd = JSON.parse(json);
        if (userData.username != lobby.Host) {
          setSelectedRounds(`${lobby.NumberOfRounds}`)
        }
        console.log("lobby: ", json);

      });

      conn.on("ChangeTimeLimit", (json: string) => {

        const lobby: ILobbyRoomBackEnd = JSON.parse(json);
        if (userData.username != lobby.Host) {
          const time = formatTimeMinutesAndSeconds(lobby.TimeLimit)
          setSelectedMinutes(time.m);
          setSelectedSeconds(time.ss)
        }
        console.log("lobby: ", json);

      });

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

  const toggleReadiness = async (username: string, lobbyroom: string) => {
    try {
      conn && await conn.invoke("TogglePayerAsReady", { username, lobbyroom });
    } catch (e) {
      console.log(e)
    }
  }

  const changeRounds = async (username: string, lobbyroom: string, numberOfRounds: string) => {
    try {
      conn && await conn.invoke("ChangeNumberOfRounds", { username, lobbyroom }, numberOfRounds);
    } catch (e) {
      console.log(e)
    }
  }

  const changeTimeLimit = async (username: string, lobbyroom: string, timeLimit: string) => {
    try {
      conn && await conn.invoke("changeTimeLimit", { username, lobbyroom }, timeLimit);
    } catch (e) {
      console.log(e)
    }
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

  const handleChangeRounds = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRounds(e.target.value)
    changeRounds(userData.username, lobbyRoomName, e.target.value)

  }

  const handleChangeTimeLimitMinutes = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMinutes(e.target.value)
    const time = parseInt(e.target.value)*60 + parseInt(selectedSeconds);
    changeTimeLimit(userData.username, lobbyRoomName, time.toString())

  }

  const handleChangeTimeLimitSeconds = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSeconds(e.target.value)
    const time = parseInt(selectedMinutes)*60 + parseInt(e.target.value);
    changeTimeLimit(userData.username, lobbyRoomName, time.toString())

  }

  const handleStartClick = () => {
    if (userData.username != host) {
      console.log("This guy is not the host")
      setIsReady(!isReady)
      toggleReadiness(userData.username, lobbyRoomName);
    } else {
      console.log("This guy is our host!")
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
    joinRoom(userData.username, lobbyRoomName)
  }, [])

  useEffect(() => {
    setTeam1NameList(Team1Names)
  }, [Team1Names])

  useEffect(() => {
    setTeam2NameList(Team2Names)
  }, [Team2Names])

  useEffect(() => {
    if (userData.username == host) {
      console.log("Host: " + host);
      if (Team1Info && Team2Info) {
        let res = checkIfPlayersAreReady(Team1Info, Team2Info)
        console.log("Res: " + res)
        if (res) {
          console.log("The players are ready!!!")
        }
        setIsReady(res)
      }
    }
  }, [Team1Info, Team2Info])

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

        <div className='flex flex-row justify-between'>

          <OnlineTeamName teamName={Team1Info.teamName} host={Team1Info.host} members={Team1Info.members} />


          <div className=' flex flex-col items-center space-y-10 mx-10'>
            <Button size="xl" className='w-[230px] h-[50px] bg-dblue mt-5'>
              <p className='font-Roboto text-white px-10 flex items-center'>Toggle Team</p>
            </Button>
            <div className='flex justify-center'>
              <DiceBtn />
            </div>
            <div className='' onClick={handleStartClick}>
              <StartBtn isReady={isReady} isHost={(host == userData.username)} />
            </div>
          </div>
          <OnlineTeamName teamName={Team2Info.teamName} host={Team2Info.host} members={Team2Info.members} />
        </div>

        <div className=' flex flex-col items-center space-y-4'>
          <div className='flex flex-row justify-between whitespace-nowrap items-center w-[400px]'>
            <div className=' font-LuckiestGuy text-dblue text-3xl mr-5'>Number of Rounds:</div>
            {
              (userData.username == host) ?
                <select value={selectedRounds} onChange={(e) => handleChangeRounds(e)} className=' w-[20%] h-10' name='Rounds' id='Rounds'>
                  {renderOptions(1, maxRounds, false)}
                </select>
                :
                <div className=' text-dblue font-LuckiestGuy text-3xl'>{selectedRounds} </div>
            }

          </div>
          <div className='flex flex-row justify-between whitespace-nowrap items-center w-[400px]'>
            <div className=' font-LuckiestGuy text-dblue text-3xl mr-5'>Time Limit:</div>
            <div className='w-[30%] flex justify-end space-x-1' >
              {
                (userData.username == host) ?
                  <select className='h-10' value={selectedMinutes} onChange={(e) => handleChangeTimeLimitMinutes(e)}>
                    {renderOptions(0, maxMinutes, false)}
                  </select>
                  :
                  <div className=' text-dblue font-LuckiestGuy text-3xl'>{selectedMinutes}</div>
              }
              <div className=' text-dblue font-LuckiestGuy text-3xl'>:</div>
              {
                (userData.username == host) ?
                  <select className='h-10' value={selectedSeconds} onChange={(e) => handleChangeTimeLimitSeconds(e)}>
                    {renderOptions(0, maxSeconds, true)}
                  </select>
                  :
                  <div className=' text-dblue font-LuckiestGuy text-3xl'>{selectedSeconds}</div>
              }
            </div>
          </div>
          <div className='flex flex-row justify-between whitespace-nowrap items-center w-[400px]'>
            {/* <div className=' font-LuckiestGuy text-dblue text-3xl mr-5'>ScoreKeeper</div>
            <select name="" id=""></select> */}
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