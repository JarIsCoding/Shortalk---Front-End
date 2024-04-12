'use client'

import { IUserData, IUserInfo } from "@/Interfaces/Interfaces"
import { createContext, useContext, useState } from "react"

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
}

// {} as IContextValue is just giving placeholder values
export const Context = createContext<IContextValue>({} as IContextValue);

// functional component to pass the provided context to our children
export const AppWrapper = ({ children, }: Readonly<{children: React.ReactNode;}>) => {

    const [userData, setUserData] = useState<IUserInfo>({} as IUserInfo);
    const [roundTime, setRoundTime] = useState<number>(90);
    const [numberOfRounds, setNumberOfRounds] = useState<number>(1);
    const [numberOfPeople, setNumberOfPeople] = useState<number>(0);
    const [Team1Name, setTeam1Name] = useState<string>('');
    const [Team2Name, setTeam2Name] = useState<string>('');
    const [Team1NameList, setTeam1NameList] = useState<string[]>([]);
    const [Team2NameList, setTeam2NameList] = useState<string[]>([]);
    const [shuffle, setShuffle] = useState<boolean>(false)
    const [speaker, setSpeaker] =useState<string>('Joe')
    const [team, setTeam] =useState<string>('Pizza')

    return(
        <Context.Provider value={{userData,setUserData,roundTime,setRoundTime,numberOfRounds,setNumberOfRounds,numberOfPeople,setNumberOfPeople,Team1Name,setTeam1Name,Team2Name,setTeam2Name,Team1NameList,setTeam1NameList, Team2NameList, setTeam2NameList, shuffle, setShuffle, speaker, setSpeaker, team, setTeam}}>
            {children}
        </Context.Provider>
    )
}


export const useAppContext = () => {
    return useContext(Context);
}
