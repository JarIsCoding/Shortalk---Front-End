"use client"

import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getLoggedInUserData, login } from '../utils/Dataservices';
import { IToken } from '@/Interfaces/Interfaces';
import { useAppContext } from '@/context/Context';

export default function Home() {

  const { userData, setUserData} = useAppContext();

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [wrongText, setWrongText] = useState<string>('')

  const router = useRouter()

  const handleSubmit = async () => {

    setUserData({
      username: username,
      password: password
    })

    let token: IToken | string = await login(userData)

    if (typeof token !== "string") {
      if (token.token !== null) {
        localStorage.setItem("Token", token.token)
        getLoggedInUserData(username)
        router.push('/pages/homePage')
      }
    } else {
      setWrongText(token)
    }

  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      handleSubmit();
    }
  };

  return (
    <div className='bg-lblue vh'>
      <div className='grid grid-flow-row justify-center pb-20'>

        <div className='py-24 text-center'>
          <p className='text-[48px] font-LuckiestGuy tracking-widest text-dblue'>
            SHORTALK
          </p>
        </div>

        <div className='bigCardBg rounded-md flex justify-center'>
          <form className="flex max-w-md flex-col gap-4">

            {/* Top Text */}
            <div className='text-center py-7 text-[32px] font-LuckiestGuy tracking-widest text-textGray'>
              Login
            </div>

            {/* Username and password Input Field */}
            <input id="username" type="text" placeholder='Username' className='inputSize rounded-none' onChange={(e) => setUsername(e.target.value)} onKeyDown={handleKeyDown} required />
            <input id="password1" type="password" placeholder='Password' className='inputSize rounded-none' onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} required />
            <p className='text-end text-red-600'>
              {wrongText}
            </p>

            <div className='py-3'>

              <p onClick={() => router.push('/pages/signUpPage')} className='text-center pb-2 cursor-default'>
                New to WWC? <span className='underline cursor-pointer'>Create an profile!</span>
              </p>

              <p onClick={() => { router.push('/pages/homePage'); setUsername('Guest') }} className='text-center cursor-default'>
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
  );
}
