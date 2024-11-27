"use client"

import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getLoggedInUserData, login } from '../utils/Dataservices';
import { IToken } from '@/Interfaces/Interfaces';
import { useAppContext } from '@/context/Context';

export default function Home() {

  const { userData, setUserData, isTokenCorrect, setIsTokenCorrect } = useAppContext();

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [wrongText, setWrongText] = useState<string>('')
  const [guestNum, setGuestNum] = useState<string>('')

  const router = useRouter()

  useEffect(() => {
    router.push('https://shortalkv2.vercel.app/');
    // setIsTokenCorrect(false)
  }, [])

  const handleSubmit = async () => {
    // console.log('enter')
    if (username !== '' || password !== '') {
      // console.log(userData)
      let token: IToken | string = await login(userData)

      if (typeof token !== "string") {
        if (token.token !== null) {
          console.log(token)
          setIsTokenCorrect(true)
          localStorage.setItem("Token", token.token)
          // getLoggedInUserData(username)
          router.push('/pages/homePage')
        }
      } else {
        setIsTokenCorrect(false)
        setWrongText(token)
      }
    } else {
      setWrongText("Please fill out all fields.")
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    setUserData({
      username: username,
      password: password
    })

  }, [password, username])

  useEffect(() => {
    setGuestNum(`Guest${Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000}`)
  }, [])

  return (
    <div className='bg-lblue vh'>
      <div className='pb-20'>

        <div className='py-24 text-center'>
          <p className='text-[50px] font-LuckiestGuy tracking-widest text-dblue cursor-default'>
            SHORTALK
          </p>
        </div>

        <div className='flex justify-center'>
          <div className='bg-white border-[#00529E] border-t-[20px] w-[500px] h-[500px] rounded-md flex justify-center'>
            <form className="flex max-w-md flex-col gap-4">

              {/* Top Text */}
              <div className='text-center py-7 text-[32px] font-LuckiestGuy tracking-widest text-textGray cursor-default'>
                Login
              </div>

              {/* Username and password Input Field */}
              <div className='sm:w-[350px] w-[300px]'>
                <input id="username" type="text" placeholder='Username' className='w-full h-[50px] rounded-none'
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={handleKeyDown}
                  required />
              </div>

              <div className='sm:w-[350px] w-[300px]'>
                <input id="password1" type="password" placeholder='Password' className='w-full h-[50px] rounded-none'
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  required />
              </div>

              <p className='text-end text-red-600 cursor-default'>
                {wrongText}
              </p>

              <div className='py-3'>

                <p onClick={() => router.push('/pages/signUpPage')} className='text-center pb-2 cursor-default'>
                  New to ShorTalk? <span className='underline cursor-pointer'>Create a profile!</span>
                </p>

                <p onClick={() => { router.push('/pages/homePage'); setUsername(guestNum); setIsTokenCorrect(true)}} className='text-center cursor-default'>
                  or <span className='underline cursor-pointer'>Sign in as guest</span>
                </p>
              </div>

              <div className='flex justify-center'>
                <Button onClick={handleSubmit} className='loginBtn bg-dblue '>
                  <p className='text-[36px] text-center font-LuckiestGuy tracking-widest'>
                    Login
                  </p>
                </Button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
