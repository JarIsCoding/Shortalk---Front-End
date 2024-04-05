'use client';

import { Button, Label, TextInput } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createAccount, getLoggedInUserData, login } from '../utils/Dataservices';
import { IToken } from '@/Interfaces/Interfaces';

export default function Home() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

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
      // getLoggedInUserData(username)
      router.push('/pages/homePage')
    } else {
      alert("Login Failed")
    }

  }

  return (
    <div className='bg-lblue vh'>
      <div className='grid grid-flow-row justify-center'>

        <div className='py-24 text-center'>
          <p className='text-[48px]'>
            SHORTALK
          </p>
        </div>

        <div className='bigCardBg rounded-md flex justify-center'>
          <form className="flex max-w-md flex-col gap-4">

            {/* Top Text */}
            <div className='text-center py-7 text-[32px]'>
              Login
            </div>

            {/* Username and password Input Field */}
            <input id="username" type="text" placeholder='Username' className='inputSize rounded-none' onChange={(e) => setUsername(e.target.value)} required />
            <input id="password1" type="password" placeholder='Password' className='inputSize rounded-none' onChange={(e) => setPassword(e.target.value)} required />

            <div className='py-3'>
              <p onClick={() => router.push('/pages/signUpPage')} className='text-center pb-2'>
                New to WWC? <span className='underline'>Create an profile!</span>
              </p>

              <p onClick={() => { router.push('/pages/homePage'); setUsername('Guest') }} className='text-center'>
                or <span className='underline'>Sign in as guest</span>
              </p>
            </div>

            <div className='flex justify-center'>
              <Button onClick={handleSubmit} className='loginBtn'>
                <p className='text-[36px] text-center'>
                  Login
                </p>
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
