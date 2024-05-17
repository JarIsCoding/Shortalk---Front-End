"use client"

import { IGameInfo } from '@/Interfaces/Interfaces'
import BuzzBtn from '@/app/components/BuzzBtn'
import Card from '@/app/components/Card'
import NavBar from '@/app/components/NavBar'
import NextTurnBtn from '@/app/components/NextTurnBtn'
import OnePointBtn from '@/app/components/OnePointBtn'
import ResultsBtn from '@/app/components/ResultsBtn'
import ScoreTable from '@/app/components/ScoreTable'
import SkipBtn from '@/app/components/SkipBtn'
import StatusBar from '@/app/components/StatusBar'
import ThreePointBtn from '@/app/components/ThreePointBtn'
import { useAppContext } from '@/context/Context'
import { AppendBuzzWords, AppendOnePointWords, AppendSkipPointWords, AppendThreePointWords, ChangeScore, ClearWordLists, GoToNextTurn, UpdateSpeaker, getGameInfo } from '@/utils/Dataservices'
import { AddUpPoints, Converti2I, DetermineInitialTeam, DetermineTeam, String2ICardArray, determineRole, determineRound } from '@/utils/utils'
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { Button, Modal } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const GamePage = () => {

    const [conn, setConnection] = useState<HubConnection>()

    //Change these bools to see inputs/button
    const [isGuesser, setIsGuesser] = useState<boolean>(true)
    const [isSpeaker, setIsSpeaker] = useState<boolean>(true)
    const [isDefense, setIsDefense] = useState<boolean>(true)

    // const [time, setTime] = useState<number>();
    const [round, setRound] = useState<number>(0);
    const [roundTotal, setRoundTotal] = useState<number>(0);
    const [role, setRole] = useState<string>('');
    const [onePointWord, setOnePointWord] = useState<string>('');
    const [threePointWord, setThreePointWord] = useState<string>('');
    const [speaker, setSpeaker] = useState<string>('');

    const [onePointWordHasBeenSaid, setOnePointWordHasBeenSaid] = useState<boolean>();
    const [threePointWordHasBeenSaid, setThreePointWordHasBeenSaid] = useState<boolean>();

    const [buzzWords, setBuzzWords] = useState<string>('')
    const [onePointWords, setOnePointWords] = useState<string>('')
    const [threePointWords, setThreePointWords] = useState<string>('')
    const [skipWords, setSkipWords] = useState<string>('')

    const [guess, setGuess] = useState<string>('')
    const [guesses, setGuesses] = useState<{ username: string; msg: string; color: string }[]>([]);
    const [description, setDescription] = useState<string>('');

    const [buzzed, setBuzzed] = useState<boolean>(false)

    const router = useRouter()

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openBuzzModal, setOpenBuzzModal] = useState<boolean>(false)

    const [gameInfo, setGameInfo] = useState<IGameInfo>({} as IGameInfo);

    const { userData, lobbyRoomName, time, setTime } = useAppContext();

    const [isTimeUp, setIsTimeUp] = useState<boolean>(false)
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [Team1Score, setTeam1Score] = useState<number>(0);
    const [Team2Score, setTeam2Score] = useState<number>(0);

    const [Team1Name, setTeam1Name] = useState<string>('Team 1');
    const [Team2Name, setTeam2Name] = useState<string>('Team 2');

    const [turn, setTurn] = useState<number>(1)
    const [numberOfTurns, setNumberOfTurns] = useState<number>(2);
    const [teamUp, setTeamUp] = useState<string>('Team1');

    const [host, setHost] = useState<string>('');


    const connectToGame = async (username: string, lobbyroom: string) => {
        try {
            const conn = new HubConnectionBuilder()
                .withUrl("https://shortalkapi.azurewebsites.net/game")
                .configureLogging(LogLevel.Information)
                .build();

            // .withUrl("http://localhost:5151/game")
            // .configureLogging(LogLevel.Information)
            // .build();

            conn.on("JoinSpecificGame", (username: string, msg: string) => {
                console.log(username + ": " + msg)
            })

            conn.on("GetNextCard", (json: string) => {
                const game: IGameInfo = JSON.parse(json);
                setOnePointWord(game.OnePointWord);
                setThreePointWord(game.ThreePointWord);
                setOnePointWordHasBeenSaid(game.OnePointWordHasBeenSaid);
                setThreePointWordHasBeenSaid(game.ThreePointWordHasBeenSaid);
                setBuzzWords(game.BuzzWords);
                setOnePointWords(game.OnePointWords);
                setThreePointWords(game.ThreePointWords);
                setSkipWords(game.SkippedWords);
            })

            conn.on("ReceiveGuess", (username: string, msg: string, color: string, json: string) => {
                const game: IGameInfo = JSON.parse(json);
                setOnePointWordHasBeenSaid(game.OnePointWordHasBeenSaid);
                setThreePointWordHasBeenSaid(game.ThreePointWordHasBeenSaid);
                setGuesses(guesses => [...guesses, { username, msg, color }])
            })

            conn.on("RenderDescription", (description: string) => {
                setDescription(description);
            })

            conn.on("Buzz", () => {
                setOpenBuzzModal(true)
            })

            conn.on("GoToNextTurn", async ()=>{
                await initializeRoom();
            })

            await conn.start();
            await conn.invoke("JoinSpecificGame", { username, lobbyroom });
            setConnection(conn);
            console.log('success')

        } catch (e) {
            console.log(e);
        }
    }

    const getNewCard = async (username: string, lobbyroom: string) => {
        try {
            conn && await conn.invoke("GetNextCard", { username, lobbyroom });
        } catch (e) {
            console.log(e)
        }
    }

    const SubmitGuess = async (onePointWord: string, threePointWord: string, guess: string) => {
        try {
            conn && await conn.invoke("SubmitGuess", onePointWord, threePointWord, guess);
        } catch (e) {
            console.log(e)
        }
    }

    const Buzz = async () => {
        try {
            conn && await conn.invoke("Buzz");
        } catch (e) {
            console.log(e)
        }
    }

    const goToNextTurn = async () => {
        try {
            conn && await conn.invoke("GoToNextTurn");
        } catch (e) {
            console.log(e)
        }   
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if(guess !== ''){
            SubmitGuess(onePointWord, threePointWord, guess);
            setGuess('');
            } else {
                
            }
        }
    };

    const TypeDescription = async (description: string) => {
        try {
            conn && await conn.invoke("TypeDescription", description);
        } catch (e) {
            console.log(e)
        }
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (description != event.target.value) {
            TypeDescription(event.target.value)
        } else {
            TypeDescription(event.target.value)
        }
    }

    const handleSkip = async () => {
        await AppendSkipPointWords(lobbyRoomName, onePointWord, threePointWord)
        await getNewCard(userData.username, lobbyRoomName)
    }
    const handleBuzz = async () => {
        Buzz();
        await AppendBuzzWords(lobbyRoomName, onePointWord, threePointWord)
        await getNewCard(userData.username, lobbyRoomName)
    }
    const handleOnePoint = async () => {
        await AppendOnePointWords(lobbyRoomName, onePointWord, threePointWord)
        await getNewCard(userData.username, lobbyRoomName)
    }
    const handleThreePoint = async () => {
        await AppendThreePointWords(lobbyRoomName, onePointWord, threePointWord)
        await getNewCard(userData.username, lobbyRoomName)
    }

    const updateRoom = async () => {
        let points = AddUpPoints(buzzWords, onePointWords, threePointWords);
        await ChangeScore(lobbyRoomName, teamUp, points);
        setTeamUp(DetermineTeam(teamUp));
        // await GoToNextTurn(lobbyRoomName);
        await UpdateSpeaker(lobbyRoomName);
        await ClearWordLists(lobbyRoomName)
    }

    const handleResults = async () => {

    }

    const handleNextTurn = async () => {
        await updateRoom();
        await goToNextTurn();
    }

    const initializeRoom = async () => {
        let initGameInfo = await getGameInfo(lobbyRoomName);
        console.log(initGameInfo);
        let InitGameInfo = Converti2I(initGameInfo);
        setTime(InitGameInfo.TimeLimit);
        setRound(determineRound(InitGameInfo));
        setRoundTotal(InitGameInfo.NumberOfRounds);
        setRole(determineRole(userData.username, InitGameInfo));
        setOnePointWord(InitGameInfo.OnePointWord);
        setThreePointWord(InitGameInfo.ThreePointWord);
        setSpeaker(InitGameInfo.Speaker);
        setTurn(InitGameInfo.Turn);
        setTeamUp(DetermineInitialTeam(InitGameInfo));
        setTeam1Score(InitGameInfo.Team1Score);
        setTeam2Score(InitGameInfo.Team2Score);
        setHost(InitGameInfo.Host);
        setGameInfo({ ...InitGameInfo })
        setIsTimeUp(false);
    }

    useEffect(() => {

        connectToGame(userData.username, lobbyRoomName);
        initializeRoom();
    }, [])

    // useEffect(() => {
    //     setTime(gameInfo.timeLimit)
    //     console.log(gameInfo)
    //     console.log(gameInfo.timeLimit);
    //     console.log(gameInfo.LobbyName)
    // }, [gameInfo])

    // useEffect(()=> {
    //     console.log(time)
    // },[time])


    return (

        <div className='relative h-[100vh]'>

            <div className='relative h-[9.25%]'>
                <NavBar title='ShorTalk' />
                <div className="absolute top-6 right-0 mr-10 flex z-50">
                    <Button onClick={() => setOpenModal(true)} className="bg-clear">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.6661 38.3333C16.6661 38.7754 16.4905 39.1993 16.178 39.5118C15.8654 39.8244 15.4415 40 14.9995 40H3.33322C2.4492 40 1.60138 39.6488 0.976279 39.0237C0.351178 38.3986 0 37.5507 0 36.6667V3.33333C0 2.44928 0.351178 1.60143 0.976279 0.976311C1.60138 0.351189 2.4492 0 3.33322 0H14.9995C15.4415 0 15.8654 0.175595 16.178 0.488156C16.4905 0.800716 16.6661 1.22464 16.6661 1.66667C16.6661 2.10869 16.4905 2.53262 16.178 2.84518C15.8654 3.15774 15.4415 3.33333 14.9995 3.33333H3.33322V36.6667H14.9995C15.4415 36.6667 15.8654 36.8423 16.178 37.1548C16.4905 37.4674 16.6661 37.8913 16.6661 38.3333ZM39.5112 18.8208L31.1781 10.4875C30.8654 10.1748 30.4413 9.99907 29.999 9.99907C29.5568 9.99907 29.1326 10.1748 28.8199 10.4875C28.5072 10.8002 28.3315 11.2244 28.3315 11.6667C28.3315 12.1089 28.5072 12.5331 28.8199 12.8458L34.3093 18.3333H14.9995C14.5575 18.3333 14.1336 18.5089 13.821 18.8215C13.5085 19.134 13.3329 19.558 13.3329 20C13.3329 20.442 13.5085 20.866 13.821 21.1785C14.1336 21.4911 14.5575 21.6667 14.9995 21.6667H34.3093L28.8199 27.1542C28.5072 27.4669 28.3315 27.8911 28.3315 28.3333C28.3315 28.7756 28.5072 29.1998 28.8199 29.5125C29.1326 29.8252 29.5568 30.0009 29.999 30.0009C30.4413 30.0009 30.8654 29.8252 31.1781 29.5125L39.5112 21.1792C39.6662 21.0244 39.7891 20.8406 39.873 20.6382C39.9568 20.4359 40 20.219 40 20C40 19.781 39.9568 19.5641 39.873 19.3618C39.7891 19.1594 39.6662 18.9756 39.5112 18.8208Z" fill="white" />
                        </svg>
                    </Button>
                </div>
            </div>

            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-black cursor-default">
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

            <div className={`absolute rounded-lg bg-black inset-0 bg-opacity-25 flex items-center justify-center ${openBuzzModal ? 'block' : 'hidden'}`} onClick={() => setOpenBuzzModal(false)}>
                <div className="text-center text-red-600 text-[100px] font-LuckiestGuy leading-none tracking-widest -rotate-12 animateText">
                    BUZZED
                    <br />
                    -1
                </div>
            </div>

            {
                (time == 0) ?
                    isGameOver ?
                        <div className='font-LuckiestGuy tracking-widest'>
                            <div className='text-center pt-32 pb-16 text-[50px] text-dblue flex flex-col'>
                                {
                                    Team1Score > Team2Score
                                        ? <p>{Team1Name} WINS</p>
                                        : Team2Score > Team1Score
                                            ? <p>{Team2Name} WINS</p>
                                            : <p>{"IT'S A TIE!"}</p>
                                }
                                <p>Final Score</p>
                            </div>
                            <div className='grid grid-cols-1'>
                                <div className='flex justify-center bg-white mx-96 border-[1px] border-black text-[50px]'>
                                    <div className='grid grid-cols-2 py-10 w-[100%] px-24'>
                                        <div className=''>
                                            Team {Team1Name}:
                                        </div>
                                        <div className='text-end'>
                                            {Team1Score}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-center bg-white mx-96 border-[1px] border-black text-[50px]'>
                                    <div className='grid grid-cols-2 py-10 w-[100%] px-24'>
                                        <div className=''>
                                            Team {Team2Name}:
                                        </div>
                                        <div className='text-end'>
                                            {Team2Score}
                                        </div>
                                    </div>
                                </div>
                                {/* push to whatever page is next */}
                                {/* <div onClick={() => router.push('/pages/passAndPlayLobby')} className='flex justify-center py-16 cursor-pointer'>
                                    <PlayAgainBtn />
                                </div> */}
                            </div>
                        </div>
                        :
                        <div>
                            <ScoreTable skipWords={String2ICardArray(skipWords)} buzzWords={String2ICardArray(buzzWords)} onePointWords={String2ICardArray(onePointWords)} threePointWords={String2ICardArray(threePointWords)} />
                            {
                                (userData.username == host) ?

                                    (round > roundTotal)
                                        ? <div className='flex justify-center pb-16'>
                                            <ResultsBtn click={handleResults} />
                                        </div>
                                        : <div className='flex justify-center pb-16'>
                                            <NextTurnBtn click={handleNextTurn} />
                                        </div>
                                :
                                <div className=' font-LuckiestGuy text-4xl text-dblue w-full text-center'>Waiting on Host to Start Next Round</div>
                            }
                        </div>
                    :
                    <div className='h-[90.75%]'>
                        <div className='p-5 pt-10'>
                            {Object.keys(gameInfo).length > 0 && (
                                <StatusBar
                                    time={time}
                                    teamName=''
                                    user={userData.username}
                                    roundNumber={round}
                                    roundTotal={roundTotal}
                                    role={role}
                                    // OnePointWord={onePointWord}
                                    // ThreePointWord={threePointWord}
                                    OnePointWord={""}
                                    ThreePointWord={""}
                                    Speaker={speaker}
                                />
                            )}
                        </div>
                        <div className='grid md:grid-cols-3 gap-5 px-5 pb-5 '>

                            {/* This is the Guesser box */}
                            <div className='bg-white rounded-lg flex flex-col justify-between'>

                                {/* Text from the guessers goes here */}
                                <div className='pt-4 pb-2 ps-4 text-[20px] h-full'>
                                    <p>Guesser Box</p>
                                    <hr className='bg-black me-3' />
                                    <div className=' text-green font-bold'></div>
                                    <div className=' text-yellow font-bold'></div>
                                    <div className=' text-purple font-bold'></div>
                                    {
                                        guesses.map((guess, ix) => {
                                            return (
                                                <p key={ix} className={' font-Roboto' + guess.color}> <span className=' font-RobotoBold'>{guess.username}</span> {" - "} <span className={'text-' + guess.color}>{guess.msg}</span> </p>
                                            )
                                        })

                                    }
                                </div>

                                {
                                    role == 'Guesser' &&
                                    <div className={` h-[50px] w-full px-2 ${isGuesser ? 'block' : 'hidden'}`}>
                                        <input onChange={(e) => { setGuess(e.target.value) }} onKeyDown={handleKeyDown} value={guess} type="text" placeholder='Type Your Guesses Here...' className='rounded-md w-full text-[20px]' />
                                    </div>
                                }

                            </div>

                            {/* This is the Card box */}
                            <div>
                                <div className='flex justify-center'>
                                    <Card top={onePointWord} bottom={threePointWord} isGuessing={role == 'Guesser'} />
                                </div>
                                {
                                    role == 'Speaker' ?
                                        <div className={`flex justify-center py-5`}>
                                            {
                                                threePointWordHasBeenSaid ?
                                                    <ThreePointBtn onClick={handleThreePoint} />
                                                    :
                                                    onePointWordHasBeenSaid ?
                                                        <OnePointBtn onClick={handleOnePoint} />
                                                        :
                                                        <SkipBtn onClick={handleSkip} />
                                            }

                                        </div>
                                        : role == 'Defense' ?
                                            <div className={`flex justify-center py-5 ${isDefense ? 'block' : 'hidden'}`}>
                                                <BuzzBtn onClick={() => { setBuzzed(true); setOpenBuzzModal(true); handleBuzz() }} />
                                            </div>
                                            :
                                            <div className=' my-5 h-[75px]'>

                                            </div>
                                }


                            </div>

                            {/* This is the speaker box */}
                            <div className='bg-white rounded-lg flex flex-col justify-normal'>
                                <div className='pt-4 pb-2 ps-4 text-[20px]'>
                                    Speaker Box
                                </div>
                                <hr className='bg-black mx-3' />

                                {/* Text from the Speaker goes here */}
                                {

                                    <div className='text-[20px] h-full '>
                                        {
                                            role == 'Speaker' ?
                                                < textarea value={description} onChange={handleOnChange} style={{ resize: 'none' }} placeholder='Start Typing Description Here...' className={`border-0 w-[100%] h-full px-5 text-[20px] rounded-b-lg`} />
                                                :

                                                <div className={`border-0 w-[100%] h-full px-5 text-[20px] rounded-b-lg break-all whitespace-pre-line`}>{description}</div>
                                        }

                                    </div>
                                }
                            </div>

                        </div>
                    </div>
            }



        </div >
    )
}

export default GamePage
