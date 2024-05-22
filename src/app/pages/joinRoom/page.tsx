'use client'

import { useAppContext } from '@/context/Context'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import GoHomeBtn from '@/app/components/GoHomeBtn'
import { Button } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { joinLobbyRoom } from '@/utils/Dataservices'

const JoinRoom = () => {

    const isFirstRender = useRef(true);

    const { userData, conn, setConnection, lobbyRoomName, setLobbyRoomName, isTokenCorrect } = useAppContext();

    const [roomName, setRoomName] = useState('')
    const [warnText, setWarnText] = useState('')
    const [successColor, setSuccessColor] = useState<boolean>(false)

    const router = useRouter()

    useEffect(() => {
        if (!isTokenCorrect) {
          router.push('/');
        }
      }, [isTokenCorrect])

    //Function telling user it is being joined if it takes longer than usual
    const successfunc = () => {
        setWarnText('Success! Please wait, Joining...')
        setSuccessColor(true)
    }

    const handleJoin = async () => {
        if (roomName === '') {
            setWarnText('Please enter a room name.')
            setSuccessColor(false)
        } else if (await joinLobbyRoom(roomName)) {
            setLobbyRoomName(roomName)
        }else{
            setWarnText('Room name either does not exist or is full.')
            setSuccessColor(false)  
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleJoin();
        }
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            router.push('/pages/lobbyRoom')
            setTimeout(successfunc, 500)
        }
    }, [lobbyRoomName])

    return (
        <div className=' h-[100vh] flex flex-col justify-between'>
            <div className='flex justify-center md:py-20 py-12 cursor-default'>
                <p className='text-dblue font-LuckiestGuy text-[48px] tracking-widest text-center'>JOIN A ROOM</p>
            </div>

            <div className='flex justify-center'>
                <div className='cardBorder bg-white w-[500px] h-[380px] rounded-lg'>
                    <p className='flex justify-center font-LuckiestGuy text-[32px] text-center tracking-widest text-dgray py-8 cursor-default'>
                        Room Name
                    </p>
                    <div className='flex justify-center'>
                        <input onChange={(e) => setRoomName(e.target.value)}
                            onKeyDown={handleKeyDown} type="text"
                            placeholder='Enter Room Name'
                            className='w-[75%]'
                        />
                    </div>
                    <div className='text-center p-0'>
                        <p className={`cursor-default ${successColor ? 'text-green' : 'text-red-500'}`}>
                            {warnText}
                        </p>
                    </div>
                    <div className='p-0 m-0 flex justify-center pt-14'>

                        {/* On click create room */}
                        <Button onClick={handleJoin} className='font-LuckiestGuy text-white bg-dblue w-[50%] h-[50px] p-0 m-0'>
                            <p className='sm:text-[36px] text-[28px] tracking-widest'>
                                JOIN
                            </p>
                        </Button>

                    </div>
                </div>
            </div>
            <div className=' w-full flex justify-end mt-20'>
                <GoHomeBtn />
            </div>

        </div>
    )
}

export default JoinRoom
