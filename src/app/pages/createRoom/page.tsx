'use client'

import { Button } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CreateRoom = () => {
    const [roomName, setRoomName] = useState('')
    const [warnText, setWarnText] = useState('')

    const router = useRouter()

    const handleCreate = () => {
        if(roomName === ''){
            setWarnText('Please enter a room name.')
        } else {
            console.log(roomName)
            router.push('/pages/passAndPlayLobby')
        }
    }

    return (
        <div>
            <div className='flex justify-center py-20'>
                <p className='text-dblue font-LuckiestGuy text-[48px] tracking-widest'>CREATE YOUR ROOM</p>
            </div>

            <div className='flex justify-center'>
                <div className='cardBorder bg-white w-[500px] h-[380px] rounded-lg'>
                    <p className='flex justify-center font-LuckiestGuy text-[32px] text-center tracking-widest text-dgray py-8'>
                        Room Name
                    </p>
                    <div className='w-[85%] ps-20'>
                        <input onChange={(e) => setRoomName(e.target.value)} type="text" placeholder='Enter Room Name' className='w-[100%] flex justify-center' />
                    </div>
                    <div className='text-center p-0'>
                        <p className='text-red-500'>
                            {warnText}
                        </p>
                    </div>
                    <div className='p-0 m-0 flex justify-center pt-14'>

                        {/* On click create room */}
                        <Button onClick={handleCreate} className='font-LuckiestGuy text-white bg-dblue w-[200px] h-[50px] p-0 m-0'>
                            <p className='text-[36px] tracking-widest'>
                                CREATE
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

export default CreateRoom
