"use client"

import { Button } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const FriendAddPage = () => {
    const [resultText, setResultText] = useState('')
    const [friendName, setFriendName] = useState('')
    const [success, setSuccess] = useState<boolean>(false)

    const router = useRouter()

    const handleAddFriend = () => {
        if(friendName === ''){
            setResultText("Please enter a name!")
            setSuccess(false)
        } else if(friendName === null){
            //make this a function that checks if name is in the database, if not tell user, user not found
            setSuccess(false)
        } else {
            console.log(friendName)
            setSuccess(true)
            setResultText("Friend request sent!")
        }
    }

    return (
        <div>
            <div className='flex justify-center pt-56'>
                <div className='cardBorder bg-white w-[500px] h-[400px] rounded-lg'>
                    <p className='flex justify-center font-LuckiestGuy text-[32px] text-center tracking-widest text-dgray py-8'>
                        Find Your <br /> Friend
                    </p>
                    <div className='w-[85%] ps-20'>
                        <input onChange={(e) => setFriendName(e.target.value)} type="text" placeholder='Friend Username' className='w-[100%] flex justify-center' />
                    </div>
                    <div className='text-center p-0'>
                        <p className={success? 'text-green-600' : 'text-red-500'}>
                            {resultText}
                        </p>
                    </div>
                    <div className='p-0 m-0 flex justify-center pt-14'>

                        {/* Onclick check if user exists, if so send friend request */}
                        <Button onClick={handleAddFriend} className='font-LuckiestGuy text-white bg-dblue w-[200px] h-[50px] p-0 m-0'>
                            <p className='text-[36px] tracking-widest'>
                                ADD
                            </p>
                        </Button>

                    </div>
                </div>
            </div>
            <Button className='absolute right-5 bottom-5 px-16 py-2 me-7 bg-dblue cursor-pointer' onClick={() => { router.push('/pages/homePage') }}>
                <p className='text-[36px]'>Back to Home</p>
            </Button>
        </div>
    )
}

export default FriendAddPage
