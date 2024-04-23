"use client"

import BuzzBtn from '@/app/components/BuzzBtn'
import Card from '@/app/components/Card'
import NavBar from '@/app/components/NavBar'
import SkipBtn from '@/app/components/SkipBtn'
import StatusBar from '@/app/components/StatusBar'
import { Button, Modal } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const GamePage = () => {

    //Change these bools to see inputs/buttons
    const [guesser, setGuesser] = useState<boolean>(false)
    const [speaker, setSpeaker] = useState<boolean>(false)
    const [defense, setDefense] = useState<boolean>(false)

    const [role, setRole] = useState<string>('')

    const [buzzed, setBuzzed] = useState<boolean>(false)

    const router = useRouter()

    const [openModal, setOpenModal] = useState(false);

    // if(guesser){
    //     setRole('Guesser')
    // } else if(speaker){
    //     setRole('Speaker')
    // } else if(defense){
    //     setRole('Defense')
    // }


    return (
        <div className=' h-screen'>

            <div className='relative'>
                <NavBar title='ShorTalk' />
                <div className="absolute top-6 right-0 mr-10 flex">
                    <Button onClick={() => setOpenModal(true)} className="bg-clear">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.6661 38.3333C16.6661 38.7754 16.4905 39.1993 16.178 39.5118C15.8654 39.8244 15.4415 40 14.9995 40H3.33322C2.4492 40 1.60138 39.6488 0.976279 39.0237C0.351178 38.3986 0 37.5507 0 36.6667V3.33333C0 2.44928 0.351178 1.60143 0.976279 0.976311C1.60138 0.351189 2.4492 0 3.33322 0H14.9995C15.4415 0 15.8654 0.175595 16.178 0.488156C16.4905 0.800716 16.6661 1.22464 16.6661 1.66667C16.6661 2.10869 16.4905 2.53262 16.178 2.84518C15.8654 3.15774 15.4415 3.33333 14.9995 3.33333H3.33322V36.6667H14.9995C15.4415 36.6667 15.8654 36.8423 16.178 37.1548C16.4905 37.4674 16.6661 37.8913 16.6661 38.3333ZM39.5112 18.8208L31.1781 10.4875C30.8654 10.1748 30.4413 9.99907 29.999 9.99907C29.5568 9.99907 29.1326 10.1748 28.8199 10.4875C28.5072 10.8002 28.3315 11.2244 28.3315 11.6667C28.3315 12.1089 28.5072 12.5331 28.8199 12.8458L34.3093 18.3333H14.9995C14.5575 18.3333 14.1336 18.5089 13.821 18.8215C13.5085 19.134 13.3329 19.558 13.3329 20C13.3329 20.442 13.5085 20.866 13.821 21.1785C14.1336 21.4911 14.5575 21.6667 14.9995 21.6667H34.3093L28.8199 27.1542C28.5072 27.4669 28.3315 27.8911 28.3315 28.3333C28.3315 28.7756 28.5072 29.1998 28.8199 29.5125C29.1326 29.8252 29.5568 30.0009 29.999 30.0009C30.4413 30.0009 30.8654 29.8252 31.1781 29.5125L39.5112 21.1792C39.6662 21.0244 39.7891 20.8406 39.873 20.6382C39.9568 20.4359 40 20.219 40 20C40 19.781 39.9568 19.5641 39.873 19.3618C39.7891 19.1594 39.6662 18.9756 39.5112 18.8208Z" fill="white" />
                        </svg>
                    </Button>

                </div>
            </div>

            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-black">
                            Are you sure you want to leave?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => { setOpenModal(false); router.push('/pages/homePage') }}>
                                {"Yes, I'm sure"}
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <div className=''>
                <div className='p-5 pt-10'>
                    <StatusBar time={0} teamName='Team' roundNumber={0} roundTotal={0} role='Guesser' OnePointWord='Word' ThreePointWord='Word' Speaker={null} />
                </div>
                <div className='grid grid-cols-3 gap-5 px-5 pb-5'>

                    {/* This is the Guesser box */}
                    <div className='bg-white rounded-lg relative'>

                        {/* Text from the guessers goes here */}
                        <div className='pt-4 pb-2 ps-4 text-[20px]'>
                            <p>Chat Box: text here</p>
                        </div>

                        <div className={`absolute bottom-1 left-1 w-[100%] ${guesser ? 'block' : 'hidden'}`}>
                            <input type="text" placeholder='Type Your Guesses Here...' className='rounded-md w-[98%] text-[20px]' />
                        </div>
                    </div>

                    {/* This is the Card box */}
                    <div>
                        <div className='flex justify-center'>
                            <Card top='Code' bottom='CodeStack' />
                        </div>
                        <div className={`flex justify-center py-5 ${speaker ? 'block' : 'hidden'}`}>
                            <SkipBtn />
                        </div>
                        <div onClick={() => setBuzzed(true)} className={`flex justify-center py-5 ${defense ? 'block' : 'hidden'}`}>
                            <BuzzBtn />
                        </div>
                    </div>

                    {/* This is the speaker box */}
                    <div className='bg-white rounded-lg'>
                        <div className='pt-4 pb-2 ps-4 text-[20px]'>
                            Speaker Box
                        </div>
                        <hr className='bg-black mx-3' />

                        {/* Text from the Speaker goes here */}
                        <div className='text-[20px]'>

                        </div>

                        <input type="text" placeholder='Start Typing Description Here...' className={`border-0 w-[100%] px-5 text-[20px] ${speaker ? 'block' : 'hidden'}`} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default GamePage
