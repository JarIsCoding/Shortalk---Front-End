'use client'

import { useAppContext } from '@/context/Context'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import GoHomeBtn from '@/app/components/GoHomeBtn'
import { Button } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { getGameInfo, getLobbyInfo, joinLobbyRoom } from '@/utils/Dataservices'
import { ILobbyRoomBackEnd, iLobbyRoomBackEnd } from '@/Interfaces/Interfaces'
import { ConvertLobbyI2i } from '@/utils/utils'

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
        let res = await joinLobbyRoom(roomName)
        console.log(res);
        if (roomName === '') {
            setWarnText('Please enter a room name.')
            setSuccessColor(false)
        } else if (res) {
            let lobby:iLobbyRoomBackEnd = await getLobbyInfo(roomName);
            // let lobby = ConvertLobbyI2i(Lobby)
            // console.log(Lobby)
            console.log(lobby)
            if(lobby.teamMemberA1 == "" || 
            lobby.teamMemberA2 == "" || 
            lobby.teamMemberA3 == "" || 
            lobby.teamMemberA4 == "" || 
            lobby.teamMemberA5 == "" || 
            lobby.teamMemberB1 == "" || 
            lobby.teamMemberB2 == "" || 
            lobby.teamMemberB3 == "" || 
            lobby.teamMemberB4 == "" || 
            lobby.teamMemberB5 == "" 
            ){
                setLobbyRoomName(roomName) 
            }else{
                setWarnText('Seems like this lobby is full /:')
            }

        }else{
            setWarnText('Room name does not exist')
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
        } else if (lobbyRoomName != "") {
            router.push('/pages/lobbyRoom')
            setTimeout(successfunc, 500)
        }
    }, [lobbyRoomName])

    useEffect(()=> {
        setLobbyRoomName("")
    },[])

    return (
        <div className=' h-[100vh] flex flex-col justify-between mx-4 md:mx-16'>
            <div className='flex justify-center md:py-20 py-12 cursor-default'>
                <p className='text-dblue font-LuckiestGuy text-[48px] tracking-widest text-center'>JOIN A ROOM</p>
            </div>

            <div className='flex justify-center'>
                <div className='cardBorder bg-white w-[500px] pb-4 md:h-[380px] rounded-lg'>
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
