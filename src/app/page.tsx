'use client';

import { Button, Label, TextInput } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createAccount, getLoggedInUserData, login } from '../utils/Dataservices';
import { IToken } from '@/Interfaces/Interfaces';

export default function Home() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [switchBool, setSwitchBool] = useState<boolean>(true)

  const router = useRouter()

  const handleSubmit = async () => {

    let userData = {
      username: username,
      password: password
    }

    createAccount(userData)
    let token: IToken = await login(userData)

    console.log(token)

    //CORS issue with this cannot get url in fetch correctly need to figure out
    if (token.token !== null) {
      localStorage.setItem("Token", token.token)
      getLoggedInUserData(username)
      router.push('/pages/homePage')
    } else {
      alert("Login Failed")
    }

  }

  const handleCreateNamePass = () => {
    alert('ilive')
  }

  return (
    <div className='grid grid-flow-row justify-center pt-52'>
      <form className="flex max-w-md flex-col gap-4">

        {/* Top Text */}
        <div className='text-center'>
          {switchBool ? 'Login' : 'Email'}
        </div>

        {/* Username and password Input Field */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" />
          </div>
          <TextInput id="username" type="text" placeholder={switchBool ? 'Username' : 'Email'} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className={switchBool ? 'block' : 'hidden'}>
          <div className="mb-2 block">
            <Label htmlFor="password1" />
          </div>
          <TextInput id="password1" type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
        </div>

        {/* This onclick changes the switchbool based on if it is true/false*/}
        <p onClick={() => { switchBool === false ? setSwitchBool(true) : setSwitchBool(false) }}>
          {switchBool ? 'New to WWC? Create an profile!' : 'Already got an account?'}
        </p>

        <p onClick={() => { router.push('/homePage'); setUsername('Guest') }} className='text-center'>
          {switchBool ? `Or sign in as a guest` : ''}
        </p>

        {/* Check if switchbool true then use different functions for different pages */}
        <Button onClick={switchBool === true ? handleSubmit : handleCreateNamePass}>
          {switchBool ? 'Login' : 'Continue'}
        </Button>
      </form>
    </div>
  );
}
