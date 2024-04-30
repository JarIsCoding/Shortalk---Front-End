'use client'

import { ICard, IUserData, IUserInfo } from "@/Interfaces/Interfaces"
import { createContext, useContext, useState } from "react"
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
// Creating Context
// Wrapping our app
// export our Custom Hook

//First lets define our context

interface IContextValue {

    userData: IUserInfo
    setUserData: (userData: IUserInfo) => void
    
    roundTime: number
    setRoundTime: (roundTime: number) => void

    numberOfRounds: number
    setNumberOfRounds: (numberOfRounds: number) => void

    numberOfTurns: number
    setNumberOfTurns: (numberOfRounds: number) => void

    numberOfPeople: number
    setNumberOfPeople: (numberOfPeople: number) => void

    Team1Name: string
    setTeam1Name: (Team1Name: string) => void

    Team2Name: string
    setTeam2Name: (Team2Name: string) => void

    Team1NameList: string[]
    setTeam1NameList: (Team1NameList: string[]) => void

    Team2NameList: string[]
    setTeam2NameList: (Team2NameList: string[]) => void
    
    shuffle: boolean
    setShuffle: (shuffle: boolean) => void

    speaker: string
    setSpeaker: (speaker: string) => void

    team: string
    setTeam: (speaker: string) => void

    BuzzWords: ICard[]
    setBuzzWords: (BuzzWords: ICard[]) => void

    SkipWords: ICard[]
    setSkipWords: (BuzzWords: ICard[]) => void

    OnePointWords: ICard[]
    setOnePointWords: (OnePointWords: ICard[]) => void

    ThreePointWords: ICard[]
    setThreePointWords: (ThreePointWords: ICard[]) => void

    card: ICard
    setCard: (card: ICard) => void

    isTimeUp: boolean
    setIsTimeUp: (isTimeUp: boolean) => void 

    isGameOver: boolean
    setIsGameOver: (isGameOver: boolean) => void 

    turnNumber: number
    setTurnNumber: (turnNumber: number) => void

    Team1Score: number
    setTeam1Score: (Team1Score: number) => void

    Team2Score: number
    setTeam2Score: (Team2Score: number) => void

    conn: HubConnection | undefined
    setConnection: (conn: HubConnection) => void
}

// {} as IContextValue is just giving placeholder values
export const Context = createContext<IContextValue>({} as IContextValue);

// functional component to pass the provided context to our children
export const AppWrapper = ({ children, }: Readonly<{children: React.ReactNode;}>) => {

    const [userData, setUserData] = useState<IUserInfo>({ username: 'Joe', password: '123'});
    const [roundTime, setRoundTime] = useState<number>(90);
    const [numberOfRounds, setNumberOfRounds] = useState<number>(1);
    const [turnNumber, setTurnNumber] = useState<number>(1);
    const [numberOfTurns, setNumberOfTurns] = useState<number>(0);
    const [numberOfPeople, setNumberOfPeople] = useState<number>(0);
    const [Team1Name, setTeam1Name] = useState<string>('');
    const [Team2Name, setTeam2Name] = useState<string>('');
    const [Team1NameList, setTeam1NameList] = useState<string[]>([]);
    const [Team2NameList, setTeam2NameList] = useState<string[]>([]);
    const [shuffle, setShuffle] = useState<boolean>(false)
    const [speaker, setSpeaker] =useState<string>('Guest')
    const [team, setTeam] =useState<string>('No Name')

    const [BuzzWords, setBuzzWords] = useState<ICard []>([])
    const [SkipWords, setSkipWords] = useState<ICard []>([])
    const [OnePointWords, setOnePointWords] = useState<ICard []>([])
    const [ThreePointWords, setThreePointWords] = useState<ICard []>([])
    
    const [Team1Score, setTeam1Score] = useState<number>(0);
    const [Team2Score, setTeam2Score] = useState<number>(0);

    const [card, setCard] = useState<ICard>({} as ICard)
    
    const [isTimeUp, setIsTimeUp] = useState<boolean>(false)
    const [isGameOver, setIsGameOver] = useState<boolean>(false)

    const [conn, setConnection] = useState<HubConnection>();

    return(
        <Context.Provider value={{userData,setUserData,roundTime,setRoundTime,numberOfRounds,setNumberOfRounds,numberOfTurns,setNumberOfTurns,numberOfPeople,setNumberOfPeople,Team1Name,setTeam1Name,Team2Name,setTeam2Name,Team1NameList,setTeam1NameList, Team2NameList, setTeam2NameList, shuffle, setShuffle, speaker, setSpeaker, team, setTeam, BuzzWords, setBuzzWords, OnePointWords, setOnePointWords, ThreePointWords, setThreePointWords, card, setCard,isTimeUp, setIsTimeUp, isGameOver, setIsGameOver, turnNumber, setTurnNumber, Team1Score, setTeam1Score, Team2Score, setTeam2Score,SkipWords, setSkipWords, conn, setConnection}}>
            {children}
        </Context.Provider>
    )
}


export const useAppContext = () => { 
    return useContext(Context);
}
