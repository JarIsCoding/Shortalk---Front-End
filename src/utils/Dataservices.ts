import { ICard, ICardData, ICreateLobbyRoomDTO, IGameInfo, ILobbyRoom, ILobbyRoomBackEnd, IToken, IUserData, IUserInfo, iGameInfo } from "@/Interfaces/Interfaces"
import { Context } from "@/context/Context"
import * as wordData from '../words.json';

const url = "https://shortalkapi.azurewebsites.net"

// const url = "http://localhost:5151"

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
    const res = await fetch(url + '/User/GetUserByUsername/' + username)
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

export const createLobbyRoom = async (createdLobby: ICreateLobbyRoomDTO) => {
    const res = await fetch(url + '/Lobby/AddLobby', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(createdLobby)
    })

    if (!res.ok) {
        const message = "An error has occured " + res.status;
        throw new Error(message);
    }

    const data = await res.json();
    console.log(data)
    return data
}

export const joinLobbyRoom = async (lobbyRoomName: string) => {
    const res = await fetch(url + `/Lobby/JoinLobby/${lobbyRoomName}`)

    if (!res.ok) {
        const message = "An error has occured " + res.status;
        throw new Error(message);
    }

    const data = await res.json();
    console.log(data)
    return data
}

export const createGameRoom = async (lobbyRoomName: string) => {
    
    const promise = await fetch(url + `/Lobby/GetLobby/${lobbyRoomName}`);
    const lobbyData:ILobbyRoomBackEnd = await promise.json();

    // console.log(lobbyData);

    const res = await fetch(url + '/Game/AddGame', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(lobbyData)
    })

    if (!res.ok) {
        const message = "An error has occured " + res.status;
        throw new Error(message);
    }

    const data = await res.json();
    console.log(data)
    return data
}

export const getLobbyInfo = async (lobbyRoomName:string) => {
    const promise = await fetch(url + `/Lobby/GetLobby/${lobbyRoomName}`);
    const lobbyData:ILobbyRoomBackEnd = await promise.json();
    console.log(lobbyData)
    return lobbyData;
}

export const getGameInfo = async (lobbyRoomName:string) => {

    const promise = await fetch(url + `/Game/GetGameInfo/${lobbyRoomName}`);
    const gameData:iGameInfo = await promise.json();
    console.log(gameData)
    return gameData;
}

export const AppendBuzzWords = async (lobbyName:string, buzzWordTop:string, buzzWordBottom:string) => {
    const res = await fetch(url +`/Game/AppendBuzzWords/${lobbyName}/${buzzWordTop}/${buzzWordBottom}`, {
        method: 'PUT'
    })
    if (!res.ok) {
        const message = "An error has occured " + res.status;
        throw new Error(message);
    }
    const result = await res.text();
    return result.toLowerCase() === 'true';
}

export const AppendOnePointWords = async (lobbyName:string, onePointWordTop:string, onePointWordBottom:string) => {
    const res = await fetch(url +`/Game/AppendOnePointWords/${lobbyName}/${onePointWordTop}/${onePointWordBottom}`, {
        method: 'PUT'
    })
    if (!res.ok) {
        const message = "An error has occured " + res.status;
        throw new Error(message);
    }
    const result = await res.text();
    return result.toLowerCase() === 'true';
}

export const AppendThreePointWords = async (lobbyName:string, threePointWordTop:string, threePointWordBottom:string) => {
    const res = await fetch(url +`/Game/AppendThreePointWords/${lobbyName}/${threePointWordTop}/${threePointWordBottom}`, {
        method: 'PUT'
    })
    if (!res.ok) {
        const message = "An error has occured " + res.status;
        throw new Error(message);
    }
    const result = await res.text();
    return result.toLowerCase() === 'true';
}

export const AppendSkipPointWords = async (lobbyName:string, skipWordTop:string, skipWordBottom:string) => {
    const res = await fetch(url +`/Game/AppendSkipPointWords/${lobbyName}/${skipWordTop}/${skipWordBottom}`, {
        method: 'PUT'
    })
    if (!res.ok) {
        const message = "An error has occured " + res.status;
        throw new Error(message);
    }
    const result = await res.text();
    return result.toLowerCase() === 'true';
}

export const ChangeScore = async (lobbyName:string, Team:string, point:number) => {
    const res = await fetch(url +`/Game/ChangeScore/${lobbyName}/${Team}/${point}`, {
        method: 'PUT'
    })
    if (!res.ok) {
        const message = "An error has occured " + res.status;
        throw new Error(message);
    }
    const result = await res.text();
    return result.toLowerCase() === 'true';
}

export const GoToNextTurn = async (lobbyName:string) => {
    const res = await fetch(url +`/Game/GoToNextTurn/${lobbyName}`, {
        method: 'PUT'
    })
    if (!res.ok) {
        const message = "An error has occured " + res.status;
        throw new Error(message);
    }
    const result = await res.text();
    return result.toLowerCase() === 'true';
}

export const UpdateSpeaker = async (lobbyName:string) => {
    const res = await fetch(url +`/Game/UpdateSpeaker/${lobbyName}`, {
        method: 'PUT'
    })
    if (!res.ok) {
        const message = "An error has occured " + res.status;
        throw new Error(message);
    }
    const result = await res.text();
    return result.toLowerCase() === 'true'; 
}

export const ClearWordLists = async (lobbyName:string) => {
    const res = await fetch(url +`/Game/ClearWordLists/${lobbyName}`, {
        method: 'PUT'
    })
    if (!res.ok) {
        const message = "An error has occured " + res.status;
        throw new Error(message);
    }
    const result = await res.text();
    return result.toLowerCase() === 'true'; 
}

export const DeleteGame = async (lobbyName:string) => {
    const res = await fetch(url +`/Game/DeleteGame/${lobbyName}`, {
        method: 'DELETE'
    })
    if (!res.ok) {
        const message = "An error has occured " + res.status;
        throw new Error(message);
    }
    const result = await res.text();
    return result.toLowerCase() === 'true'; 
}

export const checkIfGameExists = async (lobbyName:string) => {
    const promise = await fetch(url +`/Game/DoesGameExist/${lobbyName}`)
    const res = await promise.json()

    return res
}