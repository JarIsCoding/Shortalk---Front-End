import { ICard, ICardData, IToken, IUserData, IUserInfo } from "@/Interfaces/Interfaces"
import { Context } from "@/context/Context"
import * as wordData from '../words.json';

const url = "https://shortalkapi.azurewebsites.net"

let userData: IUserData

export const createAccount = async (createdUser: IUserInfo) => {
    const res = await fetch(url + '/User/AddUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(createdUser)
    })

    if (!res.ok) {
        const message = "An error has occured " + res.status;
        throw new Error(message);
    }

    const data = await res.json();
    console.log(data)
    return data

}

export const login = async (loginUser: IUserInfo) => {
    const res = await fetch(url + '/User/Login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginUser)
    })

    if (!res.ok) {
        const message = "Username or Password is incorrect"
        return message
    }

    const data: IToken = await res.json();
    return data

}

export const getLoggedInUserData = async (username: string) => {
    const res = await fetch(url + 'User/GetUserByUsername/' + username)
    const data = await res.json()
    userData = data;
}

export const loggedInData = () => {
    return userData
}

export const checkToken = () => {
    let result = false

    let lsData = localStorage.getItem('Token')

    if (lsData != null) {
        result = true
    }

    console.log(result)
    return result
}

// export const getCardData = async () => {
//     const promise = await fetch('../words.json');
//     const data: Promise<ICardData[]> = promise.json();

//     return data
// }

export const getCard = () => {
    let data:ICardData[] = wordData;

    let randNum: number = Math.floor(Math.random() * data.length);
    let topWord = data[randNum].Top
    let botWords = data[randNum].Bottom;
    let botWord = botWords[Math.floor(Math.random() * botWords.length)]

    let coinflip = Math.round(Math.random());

    let card: ICard = {} as ICard
    switch (coinflip) {
        case 0:
            card = {
                top: topWord,
                bottom: `${topWord} ${botWord}`
            }
            break;
        case 1:
            card = {
                top: botWord,
                bottom: `${topWord} ${botWord}`
            }
            break;
        default:
            break;
    }

    return card
}