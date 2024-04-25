'use client'

import GoHomeBtn from '@/app/components/GoHomeBtn'
import { Button } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const JoinRoom = () => {
    const [roomName, setRoomName] = useState('')
    const [warnText, setWarnText] = useState('')

    const router = useRouter()

     //Function telling user it is being joined if it takes longer than usual
     const successfunc = () => {
        setWarnText('Success! Please wait, Joining...')
    }

    const handleCreate = () => {
        if(roomName === ''){
            setWarnText('Please enter a room name.')
        } else {
            console.log(roomName)
            router.push('/pages/lobbyRoom')
            setTimeout(successfunc, 350)
        }
    }

    return (
        <div>
            <div className='flex justify-center md:py-20 py-12'>
                <p className='text-dblue font-LuckiestGuy text-[48px] tracking-widest text-center'>JOIN A ROOM</p>
            </div>

            <div className='flex justify-center'>
                <div className='cardBorder bg-white w-[500px] h-[380px] rounded-lg'>
                    <p className='flex justify-center font-LuckiestGuy text-[32px] text-center tracking-widest text-dgray py-8'>
                        Room Name
                    </p>
                    <div className='flex justify-center'>
                        <input onChange={(e) => setRoomName(e.target.value)} type="text" placeholder='Enter Room Name' className='w-[75%]' />
                    </div>
                    <div className='text-center p-0'>
                        <p className='text-red-500'>
                            {warnText}
                        </p>
                    </div>
                    <div className='p-0 m-0 flex justify-center pt-14'>

                        {/* On click create room */}
                        <Button onClick={handleCreate} className='font-LuckiestGuy text-white bg-dblue w-[50%] h-[50px] p-0 m-0'>
                            <p className='sm:text-[36px] text-[28px] tracking-widest'>
                                JOIN
                            </p>
                        </Button>

                    </div>
                </div>
            </div>
            <GoHomeBtn />
        </div>
    )
}

export default JoinRoom
