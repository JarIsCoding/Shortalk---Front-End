'use client'

import BuzzBtn from '@/app/components/BuzzBtn'
import Card from '@/app/components/Card'
import NavBar from '@/app/components/NavBar'
import SkipBtn from '@/app/components/SkipBtn'
import StatusBar from '@/app/components/StatusBar'
import React, { useState } from 'react'

const gamePage = () => {

    const [guesser, setGuesser] = useState<boolean>(false)
    const [speaker, setSpeaker] = useState<boolean>(false)
    const [defense, setDefense] = useState<boolean>(false)

    const [role, setRole] = useState<string>('')

    // if(guesser){
    //     setRole('Guesser')
    // } else if(speaker){
    //     setRole('Speaker')
    // } else if(defense){
    //     setRole('Defense')
    // }

    return (
        <div className='bg-lblue h-screen'>
            <NavBar title='ShorTalk' />
            <div className='p-5 pt-10'>
                <StatusBar time='0:00' teamName='Team' roundNumber={0} roundTotal={0} role='Guesser' OnePointWord='Word' ThreePointWord='Word' />
            </div>
            <div className='grid grid-cols-3 gap-5 px-5'>

                {/* This is the Guesser box */}
                <div className='bg-white rounded-lg relative'>

                    {/* Text from the guessers goes here */}
                    <div className=''>
                        Chat Box
                    </div>

                    <div className={`absolute bottom-1 left-1 w-[100%] ${guesser ? 'block' : 'hidden'}`}>
                        <input type="text" placeholder='Type Your Guesses Here...' className='rounded-md w-[98%]' />
                    </div>
                </div>

                {/* This is the Card box */}
                <div>
                    <div className='flex justify-center'>
                        <Card top='Code' bottom='CodeStack' />
                    </div>
                    <div className={`flex justify-center pt-5 ${speaker? 'block' : 'hidden'}`}>
                        <SkipBtn />
                    </div>
                    <div className={`flex justify-center pt-5 ${defense? 'block' : 'hidden'}`}>
                        <BuzzBtn />
                    </div>
                </div>

                {/* This is the speaker box */}
                <div className='bg-white rounded-lg'>
                    <div className='pt-4 pb-2 ps-4'>
                        Speaker Box
                    </div>
                    <hr className='bg-black mx-3'/>

                    {/* Text from the Speaker goes here */}
                    <div>

                    </div>

                    <input type="text" placeholder='Start Typing Description Here...' className={`border-0 w-[100%] px-5 ${speaker? 'block' : 'hidden'}`}/>
                </div>

            </div>
        </div>
    )
}

export default gamePage
