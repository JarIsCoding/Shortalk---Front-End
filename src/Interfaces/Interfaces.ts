import internal from "stream"

//User Token
export interface IToken {
    token: string
}

//for login and create account fetch
export interface IUserInfo {
    username: string
    password: string
}

//This is for users info such as id and username
export interface IUserData {
    id: number
    username: string
}

//Below is used for component props
export interface INavBar {
    title: string
}

export interface IStatusBar {
    time: number | undefined
    teamName: string | null
    roundNumber: number | null
    roundTotal: number | null
    role: string | null
    OnePointWord: string | null
    ThreePointWord: string | null
    Speaker: string | null
    user: string | null
}

export interface ICard {
    top: string
    bottom: string
}

export interface ITeamListPNP {
    teamNumber: number
}

export interface IName {
    id: number
    name: string
    teamNumber: number
}

export interface IStartButton {
    isReady: boolean
    isHost: boolean
}

export interface ICardData {
    Top: string
    Bottom: string[]
}

export interface IScoreTableProps {
    skipWords: ICard[]
    buzzWords: ICard[]
    onePointWords: ICard[]
    threePointWords: ICard[]
}

export interface IButton {
    click: () => void
}


export interface ILobbyRoom {
    LobbyName: string
    Team1Names: string[]
    Team2Names: string[]
}

export interface ICreateLobbyRoomDTO {
    LobbyName: string
    Host: string
}

export interface ILobbyRoomBackEnd {
    LobbyName: string
    Host: string
    NumberOfRounds: number
    TimeLimit: number
    TeamMemberA1: string
    TeamMemberA2: string
    TeamMemberA3: string
    TeamMemberA4: string
    TeamMemberA5: string
    TeamMemberB1: string
    TeamMemberB2: string
    TeamMemberB3: string
    TeamMemberB4: string
    TeamMemberB5: string
    ReadyStatusA1: boolean
    ReadyStatusA2: boolean
    ReadyStatusA3: boolean
    ReadyStatusA4: boolean
    ReadyStatusA5: boolean
    ReadyStatusB1: boolean
    ReadyStatusB2: boolean
    ReadyStatusB3: boolean
    ReadyStatusB4: boolean
    ReadyStatusB5: boolean
}

export interface IGameInfo {
    lobbyName: string
    host: string
    numberOfRounds: number
    timeLimit: number
    teamMemberA1: string
    teamMemberA2: string
    teamMemberA3: string
    teamMemberA4: string
    teamMemberA5: string
    teamMemberB1: string
    teamMemberB2: string
    teamMemberB3: string
    teamMemberB4: string
    teamMemberB5: string
    turn: number
    speaker: string 
    onePointWord: string 
    threePointWord: string 
    team1Score: number
    team2Score: number
}

export interface ITeamInfo {
    teamName: string;
    host: string;
    members: {
      name: string
      readyStatus: boolean
    }[];
}