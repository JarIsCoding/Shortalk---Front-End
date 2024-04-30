'use client'

import { useAppContext } from '@/context/Context'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import GoHomeBtn from '@/app/components/GoHomeBtn'
import { Button } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const JoinRoom = () => {

    const { userData, conn, setConnection } = useAppContext();

    const [messages, setMessages] = useState<{ username: string, msg: string }[]>([]);

    const [roomName, setRoomName] = useState('')
    const [warnText, setWarnText] = useState('')
    const [successColor, setSuccessColor] = useState<boolean>(false)

    const router = useRouter()

    const joinRoom = async (username: string, lobbyroom: string) => {
        try {
            const conn = new HubConnectionBuilder()
                .withUrl("https://shortalkapi.azurewebsites.net/lobby")
                .configureLogging(LogLevel.Information)
                .build();

            // .withUrl("http://localhost:5151/lobby")
            // .configureLogging(LogLevel.Information)
            // .build();

            // set up handler
            conn.on("JoinSpecificLobbyRoom", (username: string, msg: string) => { // Specify the types for parameters
                setMessages(messages => [...messages, { username, msg }])
                console.log("msg: ", msg);
            });

            conn.on("ReceiveSpecificMessage", (username: string, msg: string) => { // Specify the types for parameters
                setMessages(messages => [...messages, { username, msg }])
            })

            await conn.start();
            // await conn.invoke("JoinSpecificLobbyRoom", username, lobbyroom); // Use the correct method signature for invoke

            setConnection(conn);
            console.log('success')
        } catch (e) {
            console.log(e);
        }
    }

    //Function telling user it is being joined if it takes longer than usual
    const successfunc = () => {
        setWarnText('Success! Please wait, Joining...')
        setSuccessColor(true)
    }

    const handleCreate = () => {
        if (roomName === '') {
            setWarnText('Please enter a room name.')
            setSuccessColor(false)
        } else {
            joinRoom(userData.username, roomName);
        }
    }

    useEffect(() => {
        console.log(conn)
        if (conn) {
            router.push('/pages/lobbyRoom')

            console.log(roomName)
            router.push('/pages/lobbyRoom')
            setTimeout(successfunc, 500)
        }
    }, [conn])


    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleCreate();
        }
    };

    return (
        <div>
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
                        <p className={`cursor-default ${successColor ? 'text-green-500' : 'text-red-500'}`}>
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
