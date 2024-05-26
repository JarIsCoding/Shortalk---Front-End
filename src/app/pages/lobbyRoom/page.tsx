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
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { ILobbyRoomBackEnd, ITeamInfo } from '@/Interfaces/Interfaces'
import { createGameRoom } from '@/utils/Dataservices'
import ShuffleBtn from '@/app/components/Shufflebtn'
import FriendsPic from '@/app/assets/FriendsPic.png'
import Image from 'next/image'

const LobbyPage = () => {

  const router = useRouter();

  const { userData, lobbyRoomName, setIsGameStarting, setIsTimeUp, isTokenCorrect, isAllReady } = useAppContext();

  const [host, setHost] = useState<string>('')

  const [conn, setConnection] = useState<HubConnection>()
  const [isReady, setIsReady] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<{ username: string; msg: string; }[]>([]);

  const [Team1Info, setTeam1Info] = useState<ITeamInfo>({} as ITeamInfo);

  const [Team2Info, setTeam2Info] = useState<ITeamInfo>({} as ITeamInfo);

  const [selectedRounds, setSelectedRounds] = useState('1');
  const [selectedMinutes, setSelectedMinutes] = useState('1');
  const [selectedSeconds, setSelectedSeconds] = useState('30');

  const maxRounds: number = 10;
  const maxMinutes: number = 5;
  const maxSeconds: number = 59;

  useEffect(() => {
    if (!isTokenCorrect) {
      router.push('/');
    }
  }, [isTokenCorrect])

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

  const setCorrectIsReady = (lobby: ILobbyRoomBackEnd) => {
    const PlayerReadinessDict: { [player: string]: boolean } = {}
    PlayerReadinessDict[lobby.TeamMemberA1] = lobby.ReadyStatusA1;
    PlayerReadinessDict[lobby.TeamMemberA2] = lobby.ReadyStatusA2;
    PlayerReadinessDict[lobby.TeamMemberA3] = lobby.ReadyStatusA3;
    PlayerReadinessDict[lobby.TeamMemberA4] = lobby.ReadyStatusA4;
    PlayerReadinessDict[lobby.TeamMemberA5] = lobby.ReadyStatusA5;
    PlayerReadinessDict[lobby.TeamMemberB1] = lobby.ReadyStatusB1;
    PlayerReadinessDict[lobby.TeamMemberB2] = lobby.ReadyStatusB2;
    PlayerReadinessDict[lobby.TeamMemberB3] = lobby.ReadyStatusB3;
    PlayerReadinessDict[lobby.TeamMemberB4] = lobby.ReadyStatusB4;
    PlayerReadinessDict[lobby.TeamMemberB5] = lobby.ReadyStatusB5;

    setIsReady(PlayerReadinessDict[userData.username])
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
          const time = formatTimeMinutesAndSeconds(lobby.TimeLimit)
          setSelectedMinutes(time.m);
          setSelectedSeconds(time.ss)
        }
        setCorrectIsReady(lobby);

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

      conn.on("StartGame", () => {
        router.push('/pages/gamePage')
      })

      conn.on("ToggleTeam", (json: string) => {
        const lobby: ILobbyRoomBackEnd = JSON.parse(json);
        setTeamInfos(lobby);
      })

      conn.on("OnDisconnectedAsync", (msg: string, json: string) => {
        console.log(msg);
        const lobby: ILobbyRoomBackEnd = JSON.parse(json);
        setTeamInfos(lobby);
      })

      conn.on("OnHostDisconnectedAsync", ()=> {
        disconnectFromHub();
        router.push('/pages/homePage')
      })

      conn.on("ShuffleTeams", (json: string) => {
        const lobby: ILobbyRoomBackEnd = JSON.parse(json);
        setTeamInfos(lobby);
      })

      await conn.start();
      await conn.invoke("JoinSpecificLobbyRoom", { username, lobbyroom });

      conn.onclose((error) => {
        console.log(userData.username + " disconnected from the lobby hub");
        if (error) {
          console.error("Disconnection error: ", error);
        }
      });


      setConnection(conn);
      console.log('success')
    } catch (e) {
      console.log(e);
    }
  }

  const disconnectFromHub = () => {
    if (conn) {
      conn.stop()
        .then(() => console.log("Disconnected from the hub"))
        .catch(err => console.error("Error while disconnecting:", err));
    }
  };

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

  const startGame = async (username: string, lobbyroom: string) => {
    const response = await createGameRoom(lobbyroom);
    if (response) {
      try {
        conn && await conn.invoke("StartGame", { username, lobbyroom });
      } catch (e) {
        console.log(e)
      }
    }

  }

  const toggleTeam = async (username: string, lobbyroom: string) => {
    try {
      conn && await conn.invoke("ToggleTeam", { username, lobbyroom });
    } catch (e) {
      console.log(e)
    }
  }

  const shuffleTeams = async (username: string, lobbyroom: string) => {
    try {
      conn && await conn.invoke("ShuffleTeams", { username, lobbyroom });
    } catch (e) {
      console.log(e)
    }
  }

  const handleShuffle = async () => {
    shuffleTeams(userData.username, lobbyRoomName)
  }

  const handleToggleTeam = async () => {
    await toggleTeam(userData.username, lobbyRoomName);
  }


  const handleChangeRounds = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRounds(e.target.value)
    changeRounds(userData.username, lobbyRoomName, e.target.value)
  }

  const handleChangeTimeLimitMinutes = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMinutes(e.target.value)
    const time = parseInt(e.target.value) * 60 + parseInt(selectedSeconds);
    changeTimeLimit(userData.username, lobbyRoomName, time.toString())
  }

  const handleChangeTimeLimitSeconds = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSeconds(e.target.value)
    const time = parseInt(selectedMinutes) * 60 + parseInt(e.target.value);
    changeTimeLimit(userData.username, lobbyRoomName, time.toString())
  }

  const handleStartClick = () => {
    if (userData.username != host) {
      // console.log("This guy is not the host")
      setIsReady(!isReady)
      toggleReadiness(userData.username, lobbyRoomName);
    } else {
      if (isAllReady) {
        startGame(userData.username, lobbyRoomName);
      } else {
        console.log("Not all players are ready")
      }
      // console.log("This guy is our host!")
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {

      // Check if user input something if so send otherwise nothing
      if (message !== '') {
        sendMessage(message);
        setMessage('');
      } else {

      }
    }
  };

  useEffect(() => {
    joinRoom(userData.username, lobbyRoomName)
    setIsGameStarting(true);
    setIsTimeUp(false);
  }, [])

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

  // const [openModal, setOpenModal] = useState(false);

  const consoleNotReady = () => {
    console.log("Not ready yet")
  }

  const [friendOpen, setFriendOpen] = useState<boolean>(false)
  const [friendImg, setFriendImg] = useState<boolean>(false)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setFriendOpen(false);
        setFriendImg(true)
      } else {
        setFriendOpen(true);
        setFriendImg(false)
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // START OF RETURN CODE
  return (
    <div>
      {/* Friends Tab */}
      <div className={`absolute right-0 md:pt-24 pt-16 md:pb-0 pb-10 bg-[#52576F] ${friendOpen ? 'hidden' : 'block'}`}>
        <FriendsTab onClickLeaveLobby={disconnectFromHub} />
      </div>

      {/* Navbar */}
      <div className='relative'>
        <NavBar title={"Room ID: " + lobbyRoomName} />
        <div className={`absolute md:top-6 top-4 right-0 md:mr-10 flex z-50 ${friendImg ? 'hidden' : 'block'}`}>
          <Button onClick={() => { friendOpen ? setFriendOpen(false) : setFriendOpen(true) }} className={`bg-clear`}>
            <Image src={FriendsPic} alt="FriendsPicture" className={`w-35px h-30px friendsNav`} />
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className='flex flex-col items-center justify-evenly t-20 xl:pe-72 pe-0 h-[90vh] pt-3'>

        <div className='md:flex flex-row justify-between'>

          <OnlineTeamName teamName={Team1Info.teamName} host={Team1Info.host} members={Team1Info.members} />

          <div className='lg:block hidden flex-col items-center space-y-10 mx-10'>
            <Button onClick={handleToggleTeam} size="xl" className='w-[230px] h-[50px] bg-dblue mt-5 font-LuckiestGuy flex justify-center'>
              <p className=' text-white text-center tracking-wider flex items-center'>Toggle Team</p>
            </Button>
            <div className='flex justify-center'>
              <DiceBtn onClick={handleShuffle} />
            </div>
            <div className='flex justify-center' onClick={handleStartClick}>
              <StartBtn isReady={isReady} isHost={(host == userData.username)} />
            </div>
          </div>

          <OnlineTeamName teamName={Team2Info.teamName} host={Team2Info.host} members={Team2Info.members} />
        </div>

        <div className='lg:hidden flex justify-center gap-4'>
          <Button size="xl" className='w-[180px] h-[50px] bg-dblue lg:mt-5 mt-0 font-LuckiestGuy flex justify-center'>
            <p className=' text-white text-center tracking-wider flex items-center'>Toggle Team</p>
          </Button>
          <ShuffleBtn />
        </div>

        <div className=' flex flex-col items-center space-y-4 pt-5'>
          <div className='lg:flex flex-row justify-between whitespace-nowrap items-center lg:w-[400px] w-[100%]'>
            <div className=' font-LuckiestGuy text-dblue text-3xl lg:text-start text-center'>Number of Rounds:</div>
            <div className='flex lg:justify-end justify-center'>
              {
                (userData.username == host) ?
                  <select value={selectedRounds} onChange={(e) => handleChangeRounds(e)} className=' h-10' name='Rounds' id='Rounds'>
                    {renderOptions(1, maxRounds, false)}
                  </select>
                  :
                  <div className=' text-dblue font-LuckiestGuy text-3xl'>{selectedRounds} </div>
              }
            </div>
          </div>
          <div className='lg:flex flex-row justify-between whitespace-nowrap items-center lg:w-[400px] w-[300px]'>
            <div className=' font-LuckiestGuy text-dblue text-3xl lg:text-start text-center'>Time Limit:</div>
            <div className='lg:w-[30%] w-[100%] flex lg:justify-end justify-center space-x-1' >
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
          <div className='flex flex-row justify-between whitespace-nowrap items-center lg:w-[400px] w-[300px]'>
            {/* <div className=' font-LuckiestGuy text-dblue text-3xl mr-5'>ScoreKeeper</div>
            <select name="" id=""></select> */}
          </div>
        </div>

        <div className='lg:hidden flex justify-center py-8' onClick={handleStartClick}>
          <StartBtn isReady={isReady} isHost={(host == userData.username)} />
        </div>

        <div className='w-[88%] h-[224px] bg-lgray border-[#52576F] border-[20px] md:p-4 p-2 '>
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
          <input onChange={(e) => { setMessage(e.target.value) }} onKeyDown={handleKeyDown} value={message} type="text" placeholder='Type to Chat' className='w-[99%] h-[38]' />
        </div>
      </div>
    </div>
  )
}

export default LobbyPage