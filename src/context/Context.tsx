'use client'

import { ICard, IUserData, IUserInfo } from "@/Interfaces/Interfaces"
import { createContext, useContext, useEffect, useState } from "react"
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

    lobbyRoomName: string
    setLobbyRoomName: (lobbyRoomName: string) => void

    messages: {
        username: string;
        msg: string;
    }[]
    setMessages: (messages: { username: string; msg: string;}[]) => void
}


export const Context = createContext<IContextValue>({} as IContextValue);

export const AppWrapper = ({ children, }: Readonly<{children: React.ReactNode;}>) => {

    const [userData, setUserData] = useState<IUserInfo>(() => {
        const userDataStr = sessionStorage.getItem('userData');
        return userDataStr ? JSON.parse(userDataStr) : { username: 'Joe', password: '123' };
    });
    const [roundTime, setRoundTime] = useState<number>(() => {
        const roundTimeStr = sessionStorage.getItem('roundTime');
        return roundTimeStr ? parseInt(roundTimeStr, 10) : 90;
    });
    const [numberOfRounds, setNumberOfRounds] = useState<number>(() => {
        const numberOfRoundsStr = sessionStorage.getItem('numberOfRounds');
        return numberOfRoundsStr ? parseInt(numberOfRoundsStr, 10) : 1;
    });

    const [turnNumber, setTurnNumber] = useState<number>(() => {
        const turnNumberStr = sessionStorage.getItem('turnNumber');
        return turnNumberStr ? parseInt(turnNumberStr, 10) : 1;
    });

    const [numberOfTurns, setNumberOfTurns] = useState<number>(() => {
        const numberOfTurnsStr = sessionStorage.getItem('numberOfTurns');
        return numberOfTurnsStr ? parseInt(numberOfTurnsStr, 10) : 0;
    });
    const [numberOfPeople, setNumberOfPeople] = useState<number>(() => {
        const numberOfPeopleStr = sessionStorage.getItem('numberOfPeople');
        return numberOfPeopleStr ? parseInt(numberOfPeopleStr, 10) : 0;
    });
    const [Team1Name, setTeam1Name] = useState<string>(() => {
        const Team1NameStr = sessionStorage.getItem('Team1Name');
        return Team1NameStr ? Team1NameStr : '';
    });
    const [Team2Name, setTeam2Name] = useState<string>(() => {
        const Team2NameStr = sessionStorage.getItem('Team2Name');
        return Team2NameStr ? Team2NameStr : '';
    });
    const [Team1NameList, setTeam1NameList] = useState<string[]>(() => {
        const Team1NameListStr = sessionStorage.getItem('Team1NameList');
        return Team1NameListStr ? JSON.parse(Team1NameListStr) : [];
    });
    const [Team2NameList, setTeam2NameList] = useState<string[]>(() => {
        const Team2NameListStr = sessionStorage.getItem('Team2NameList');
        return Team2NameListStr ? JSON.parse(Team2NameListStr) : [];
    });

    const [shuffle, setShuffle] = useState<boolean>(() => {
        const shuffleStr = sessionStorage.getItem('shuffle');
        return shuffleStr ? JSON.parse(shuffleStr) : false;
    });

    const [speaker, setSpeaker] =useState<string>(() => {
        const speakerStr = sessionStorage.getItem('speaker');
        return speakerStr ? speakerStr : 'Guest';
    });
    const [team, setTeam] =useState<string>(() => {
        const teamStr = sessionStorage.getItem('team');
        return teamStr ? teamStr : 'No Name';
    });

    const [BuzzWords, setBuzzWords] = useState<ICard []>(() => {
        const BuzzWordsStr = sessionStorage.getItem('BuzzWords');
        return BuzzWordsStr ? JSON.parse(BuzzWordsStr) : [];
    });
    const [SkipWords, setSkipWords] = useState<ICard []>(() => {
        const SkipWordsStr = sessionStorage.getItem('SkipWords');
        return SkipWordsStr ? JSON.parse(SkipWordsStr) : [];
    });
    const [OnePointWords, setOnePointWords] = useState<ICard []>(() => {
        const OnePointWordsStr = sessionStorage.getItem('OnePointWords');
        return OnePointWordsStr ? JSON.parse(OnePointWordsStr) : [];
    });
    const [ThreePointWords, setThreePointWords] = useState<ICard []>(() => {
        const ThreePointWordsStr = sessionStorage.getItem('ThreePointWords');
        return ThreePointWordsStr ? JSON.parse(ThreePointWordsStr) : [];
    });

    const [Team1Score, setTeam1Score] = useState<number>(() => {
        const Team1ScoreStr = sessionStorage.getItem('Team1Score');
        return Team1ScoreStr ? parseInt(Team1ScoreStr, 10) : 0;
    });
    const [Team2Score, setTeam2Score] = useState<number>(() => {
        const Team2ScoreStr = sessionStorage.getItem('Team2Score');
        return Team2ScoreStr ? parseInt(Team2ScoreStr, 10) : 0;
    });
    const [card, setCard] = useState<ICard>(() => {
        const cardStr = sessionStorage.getItem('card');
        return cardStr ? JSON.parse(cardStr) : {} as ICard;
    });
    
    const [isTimeUp, setIsTimeUp] = useState<boolean>(() => {
        const isTimeUpStr = sessionStorage.getItem('isTimeUp');
        return isTimeUpStr ? JSON.parse(isTimeUpStr) : false;
    });

    const [isGameOver, setIsGameOver] = useState<boolean>(() => {
        const isGameOverStr = sessionStorage.getItem('isGameOver');
        return isGameOverStr ? JSON.parse(isGameOverStr) : false;
    });

    const [conn, setConnection] = useState<HubConnection>(() => {
        const connStr = sessionStorage.getItem('conn');
        return connStr ? JSON.parse(connStr) : {} as HubConnection;
    });

    const [lobbyRoomName, setLobbyRoomName] = useState<string>(() => {
        const lobbyRoomNameStr = sessionStorage.getItem('lobbyRoomName');
        return lobbyRoomNameStr ? lobbyRoomNameStr : 'Pizza';
    });

    const [messages, setMessages] = useState<{ username: string; msg: string;}[]>(() => {
        const messagesStr = sessionStorage.getItem('messages');
        return messagesStr ? JSON.parse(messagesStr) : [];
    });

    // Updating Storage with UseEffects

    useEffect(() => {
        sessionStorage.setItem('userData', JSON.stringify(userData));
    }, [userData]);

    useEffect(() => {
        sessionStorage.setItem('roundTime', roundTime.toString());
    }, [roundTime]);

    useEffect(() => {
        sessionStorage.setItem('numberOfRounds', numberOfRounds.toString());
    }, [numberOfRounds]);

    useEffect(() => {
        sessionStorage.setItem('turnNumber', turnNumber.toString());
    }, [turnNumber]);

    useEffect(() => {
        sessionStorage.setItem('numberOfTurns', numberOfTurns.toString());
    }, [numberOfTurns]);

    useEffect(() => {
        sessionStorage.setItem('numberOfPeople', numberOfPeople.toString());
    }, [numberOfPeople]);

    useEffect(() => {
        sessionStorage.setItem('Team1Name', Team1Name.toString());
    }, [Team1Name]);

    useEffect(() => {
        sessionStorage.setItem('Team2Name', Team2Name.toString());
    }, [Team2Name]);

    useEffect(() => {
        sessionStorage.setItem('Team1NameList', Team1NameList.toString());
    }, [Team1NameList]);

    useEffect(() => {
        sessionStorage.setItem('Team2NameList', Team2NameList.toString());
    }, [Team2NameList]);

    useEffect(() => {
        sessionStorage.setItem('shuffle', shuffle.toString());
    }, [shuffle]);

    useEffect(() => {
        sessionStorage.setItem('speaker', speaker.toString());
    }, [speaker]);

    useEffect(() => {
        sessionStorage.setItem('team', team.toString());
    }, [team]);

    useEffect(() => {
        sessionStorage.setItem('BuzzWords', BuzzWords.toString());
    }, [BuzzWords]);

    useEffect(() => {
        sessionStorage.setItem('SkipWords', SkipWords.toString());
    }, [SkipWords]);

    useEffect(() => {
        sessionStorage.setItem('OnePointWords', OnePointWords.toString());
    }, [OnePointWords]);

    useEffect(() => {
        sessionStorage.setItem('ThreePointWords', ThreePointWords.toString());
    }, [ThreePointWords]);

    useEffect(() => {
        sessionStorage.setItem('Team1Score', Team1Score.toString());
    }, [Team1Score]);
    useEffect(() => {
        sessionStorage.setItem('Team2Score', Team2Score.toString());
    }, [Team2Score]);
    useEffect(() => {
        sessionStorage.setItem('card', JSON.stringify(card));
    }, [card]);
    useEffect(() => {
        sessionStorage.setItem('isTimeUp', isTimeUp.toString());
    }, [isTimeUp]);
    useEffect(() => {
        sessionStorage.setItem('isGameOver', isGameOver.toString());
    }, [isGameOver]);
    useEffect(() => {
        sessionStorage.setItem('conn', JSON.stringify(conn));
    }, [conn]);
    useEffect(() => {
        sessionStorage.setItem('lobbyRoomName', lobbyRoomName.toString());
    }, [lobbyRoomName]);
    useEffect(() => {
        sessionStorage.setItem('messages', messages.toString());
    }, [messages]);

    return(
        <Context.Provider value={{userData,setUserData,roundTime,setRoundTime,numberOfRounds,setNumberOfRounds,numberOfTurns,setNumberOfTurns,numberOfPeople,setNumberOfPeople,Team1Name,setTeam1Name,Team2Name,setTeam2Name,Team1NameList,setTeam1NameList, Team2NameList, setTeam2NameList, shuffle, setShuffle, speaker, setSpeaker, team, setTeam, BuzzWords, setBuzzWords, OnePointWords, setOnePointWords, ThreePointWords, setThreePointWords, card, setCard,isTimeUp, setIsTimeUp, isGameOver, setIsGameOver, turnNumber, setTurnNumber, Team1Score, setTeam1Score, Team2Score, setTeam2Score,SkipWords, setSkipWords, conn, setConnection,lobbyRoomName, setLobbyRoomName, messages, setMessages}}>
            {children}
        </Context.Provider>
    )
}


export const useAppContext = () => { 
    return useContext(Context);
}
