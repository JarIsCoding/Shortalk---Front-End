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
    time: string | null
    teamName: string | null
    roundNumber: number | null
    roundTotal: number | null
    role: string | null
    OnePointWord: string | null
    ThreePointWord: string | null
}

export interface ICard {
    top: string
    bottom: string
}