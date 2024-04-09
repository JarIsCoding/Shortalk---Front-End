import { IToken, IUserData, IUserInfo } from "@/Interfaces/Interfaces"


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
    const res = await fetch(url + 'User/GetUserByUsername' + username)
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