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
    time: number
    teamName: string | null
    roundNumber: number | null
    roundTotal: number | null
    role: string | null
    OnePointWord: string | null
    ThreePointWord: string | null
    Speaker: string | null
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

export interface ILobbyRoomBackEnd {
    ID: number
    LobbyName: string
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
}