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

    time: number
    setTime: React.Dispatch<React.SetStateAction<number>>

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

    host: string
    setHost: (host:string) => void

    isGameStarting: boolean
    setIsGameStarting: (isGameStarting:boolean) => void
}


export const Context = createContext<IContextValue>({} as IContextValue);

export const AppWrapper = ({ children, }: Readonly<{children: React.ReactNode;}>) => {

    const [userData, setUserData] = useState<IUserInfo>(() => {
        if (typeof window !== "undefined") {
            const userDataStr = sessionStorage.getItem('userData');
            return userDataStr ? JSON.parse(userDataStr) : { username: '', password: '' };
        }
        return { username: '', password: '' };
    });
    
    const [roundTime, setRoundTime] = useState<number>(() => {
        if (typeof window !== "undefined") {
            const roundTimeStr = sessionStorage.getItem('roundTime');
            return roundTimeStr ? parseInt(roundTimeStr, 10) : 90;
        }
        return 90;
    });
    
    const [numberOfRounds, setNumberOfRounds] = useState<number>(() => {
        if (typeof window !== "undefined") {
            const numberOfRoundsStr = sessionStorage.getItem('numberOfRounds');
            return numberOfRoundsStr ? parseInt(numberOfRoundsStr, 10) : 1;
        }
        return 1;
    });
    
    const [turnNumber, setTurnNumber] = useState<number>(() => {
        if (typeof window !== "undefined") {
            const turnNumberStr = sessionStorage.getItem('turnNumber');
            return turnNumberStr ? parseInt(turnNumberStr, 10) : 1;
        }
        return 1;
    });
    
    const [numberOfTurns, setNumberOfTurns] = useState<number>(() => {
        if (typeof window !== "undefined") {
            const numberOfTurnsStr = sessionStorage.getItem('numberOfTurns');
            return numberOfTurnsStr ? parseInt(numberOfTurnsStr, 10) : 0;
        }
        return 0;
    });
    
    const [numberOfPeople, setNumberOfPeople] = useState<number>(() => {
        if (typeof window !== "undefined") {
            const numberOfPeopleStr = sessionStorage.getItem('numberOfPeople');
            return numberOfPeopleStr ? parseInt(numberOfPeopleStr, 10) : 0;
        }
        return 0;
    });

    const [time, setTime] = useState<number>(() => {
        if (typeof window !== "undefined") {
            const timeStr = sessionStorage.getItem('time');
            return timeStr ? parseInt(timeStr, 10) : 10;
        }
        return 10;
    });
    
    const [Team1Name, setTeam1Name] = useState<string>(() => {
        if (typeof window !== "undefined") {
            const Team1NameStr = sessionStorage.getItem('Team1Name');
            return Team1NameStr ? Team1NameStr : 'Team 1';
        }
        return 'Team 1';
    });
    
    const [Team2Name, setTeam2Name] = useState<string>(() => {
        if (typeof window !== "undefined") {
            const Team2NameStr = sessionStorage.getItem('Team2Name');
            return Team2NameStr ? Team2NameStr : 'Team 2';
        }
        return 'Team 2';
    });
    
    const [Team1NameList, setTeam1NameList] = useState<string[]>(() => {
        if (typeof window !== "undefined") {
            const Team1NameListStr = sessionStorage.getItem('Team1NameList');
            return Team1NameListStr ? JSON.parse(Team1NameListStr) : [];
        }
        return [];
    });
    
    const [Team2NameList, setTeam2NameList] = useState<string[]>(() => {
        if (typeof window !== "undefined") {
            const Team2NameListStr = sessionStorage.getItem('Team2NameList');
            return Team2NameListStr ? JSON.parse(Team2NameListStr) : [];
        }
        return [];
    });
    
    const [shuffle, setShuffle] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            const shuffleStr = sessionStorage.getItem('shuffle');
            return shuffleStr ? JSON.parse(shuffleStr) : false;
        }
        return false;
    });
    
    const [speaker, setSpeaker] = useState<string>(() => {
        if (typeof window !== "undefined") {
            const speakerStr = sessionStorage.getItem('speaker');
            return speakerStr ? speakerStr : 'Guest';
        }
        return 'Guest';
    });
    
    const [team, setTeam] = useState<string>(() => {
        if (typeof window !== "undefined") {
            const teamStr = sessionStorage.getItem('team');
            return teamStr ? teamStr : 'No Name';
        }
        return 'No Name';
    });
    
    const [BuzzWords, setBuzzWords] = useState<ICard []>(() => {
        if (typeof window !== "undefined") {
            const BuzzWordsStr = sessionStorage.getItem('BuzzWords');
            return BuzzWordsStr ? JSON.parse(BuzzWordsStr) : [];
        }
        return [];
    });
    
    const [SkipWords, setSkipWords] = useState<ICard []>(() => {
        if (typeof window !== "undefined") {
            const SkipWordsStr = sessionStorage.getItem('SkipWords');
            return SkipWordsStr ? JSON.parse(SkipWordsStr) : [];
        }
        return [];
    });
    
    const [OnePointWords, setOnePointWords] = useState<ICard []>(() => {
        if (typeof window !== "undefined") {
            const OnePointWordsStr = sessionStorage.getItem('OnePointWords');
            return OnePointWordsStr ? JSON.parse(OnePointWordsStr) : [];
        }
        return [];
    });
    
    const [ThreePointWords, setThreePointWords] = useState<ICard []>(() => {
        if (typeof window !== "undefined") {
            const ThreePointWordsStr = sessionStorage.getItem('ThreePointWords');
            return ThreePointWordsStr ? JSON.parse(ThreePointWordsStr) : [];
        }
        return [];
    });
    
    const [Team1Score, setTeam1Score] = useState<number>(() => {
        if (typeof window !== "undefined") {
            const Team1ScoreStr = sessionStorage.getItem('Team1Score');
            return Team1ScoreStr ? parseInt(Team1ScoreStr, 10) : 0;
        }
        return 0;
    });
    
    const [Team2Score, setTeam2Score] = useState<number>(() => {
        if (typeof window !== "undefined") {
            const Team2ScoreStr = sessionStorage.getItem('Team2Score');
            return Team2ScoreStr ? parseInt(Team2ScoreStr, 10) : 0;
        }
        return 0;
    });
    
    const [card, setCard] = useState<ICard>(() => {
        if (typeof window !== "undefined") {
            const cardStr = sessionStorage.getItem('card');
            return cardStr ? JSON.parse(cardStr) : {} as ICard;
        }
        return {} as ICard;
    });
    
    const [isTimeUp, setIsTimeUp] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            const isTimeUpStr = sessionStorage.getItem('isTimeUp');
            return isTimeUpStr ? JSON.parse(isTimeUpStr) : false;
        }
        return false;
    });
    
    const [isGameOver, setIsGameOver] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            const isGameOverStr = sessionStorage.getItem('isGameOver');
            return isGameOverStr ? JSON.parse(isGameOverStr) : false;
        }
        return false;
    });

    const [isGameStarting, setIsGameStarting] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            const isGameStartingStr = sessionStorage.getItem('isGameStarting');
            return isGameStartingStr ? JSON.parse(isGameStartingStr) : true;
        }
        return false;
    });
    
    const [conn, setConnection] = useState<HubConnection>(() => {
        if (typeof window !== "undefined") {
            const connStr = sessionStorage.getItem('conn');
            return connStr ? JSON.parse(connStr) : {} as HubConnection;
        }
        return {} as HubConnection;
    });
    
    const [lobbyRoomName, setLobbyRoomName] = useState<string>(() => {
        if (typeof window !== "undefined") {
            const lobbyRoomNameStr = sessionStorage.getItem('lobbyRoomName');
            return lobbyRoomNameStr ? lobbyRoomNameStr : 'Pizza';
        }
        return 'Pizza';
    });
    
    const [messages, setMessages] = useState<{ username: string; msg: string;}[]>(() => {
        if (typeof window !== "undefined") {
            const messagesStr = sessionStorage.getItem('messages');
            return messagesStr ? JSON.parse(messagesStr) : [];
        }
        return [];
    });

    const [host, setHost] = useState<string>(() => {
        if (typeof window !== "undefined") {
            const hostStr = sessionStorage.getItem('host');
            return hostStr ? hostStr : "";
        }
        return "";
    });

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
        sessionStorage.setItem('time', time.toString());
    }, [time]);

    useEffect(() => {
        sessionStorage.setItem('Team1Name', Team1Name.toString());
    }, [Team1Name]);

    useEffect(() => {
        sessionStorage.setItem('Team2Name', Team2Name.toString());
    }, [Team2Name]);

    useEffect(() => {
        sessionStorage.setItem('Team1NameList', JSON.stringify(Team1NameList));
    }, [Team1NameList]);

    useEffect(() => {
        sessionStorage.setItem('Team2NameList',  JSON.stringify(Team2NameList));
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
        sessionStorage.setItem('BuzzWords', JSON.stringify(BuzzWords));
    }, [BuzzWords]);

    useEffect(() => {
        sessionStorage.setItem('SkipWords', JSON.stringify(SkipWords));
    }, [SkipWords]);

    useEffect(() => {
        sessionStorage.setItem('OnePointWords', JSON.stringify(OnePointWords));
    }, [OnePointWords]);

    useEffect(() => {
        sessionStorage.setItem('ThreePointWords', JSON.stringify(ThreePointWords));
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
        sessionStorage.setItem('isGameStarting', isGameStarting.toString());
    }, [isGameStarting]);
    useEffect(() => {
        sessionStorage.setItem('conn', JSON.stringify(conn));
    }, [conn]);
    useEffect(() => {
        sessionStorage.setItem('lobbyRoomName', lobbyRoomName.toString());
    }, [lobbyRoomName]);
    useEffect(() => {
        sessionStorage.setItem('messages', messages.toString());
    }, [messages]);
    useEffect(() => {
        sessionStorage.setItem('host', host.toString());
    }, [host]);

    return(
        <Context.Provider value={{userData,setUserData,roundTime,setRoundTime,numberOfRounds,setNumberOfRounds,numberOfTurns,setNumberOfTurns,numberOfPeople,setNumberOfPeople,Team1Name,setTeam1Name,Team2Name,setTeam2Name,Team1NameList,setTeam1NameList, Team2NameList, setTeam2NameList, shuffle, setShuffle, speaker, setSpeaker, team, setTeam, BuzzWords, setBuzzWords, OnePointWords, setOnePointWords, ThreePointWords, setThreePointWords, card, setCard,isTimeUp, setIsTimeUp, isGameOver, setIsGameOver, turnNumber, setTurnNumber, Team1Score, setTeam1Score, Team2Score, setTeam2Score,SkipWords, setSkipWords, conn, setConnection,lobbyRoomName, setLobbyRoomName, messages, setMessages, host, setHost, time, setTime, isGameStarting, setIsGameStarting}}>
            {children}
        </Context.Provider>
    )
}


export const useAppContext = () => { 
    return useContext(Context);
}
