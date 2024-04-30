'use client'

import { useAppContext } from '@/context/Context'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { Button } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const JoinRoom = () => {

    const {userData, conn, setConnection} = useAppContext();

    const [messages, setMessages] = useState<{ username: string, msg: string }[]>([]);

    const [roomName, setRoomName] = useState('')
    const [warnText, setWarnText] = useState('')

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

    const handleCreate = () => {
        if (roomName === '') {
            setWarnText('Please enter a room name.')
        } else {
            joinRoom(userData.username, roomName);
        }
    }

    useEffect(()=>{
        console.log(conn)
        if(conn){
            router.push('/pages/lobbyRoom')
            
        }
    },[conn])

    return (
        <div>
            <div className='flex justify-center py-20'>
                <p className='text-dblue font-LuckiestGuy text-[48px] tracking-widest'>JOIN A ROOM</p>
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

                        {/* On click find and join room */}
                        <Button onClick={handleCreate} className='font-LuckiestGuy text-white bg-dblue w-[200px] h-[50px] p-0 m-0'>
                            <p className='text-[36px] tracking-widest'>
                                Join
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

export default JoinRoom
