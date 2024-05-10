'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import NextRoundBtn from '@/app/components/NextRoundBtn';
import { useAppContext } from '@/context/Context';
import PlayAgainBtn from '@/app/components/PlayAgainBtn';

const WinPage = () => {

    const router = useRouter();
    const {Team1Name, Team1Score, Team2Name, Team2Score, turnNumber, setTurnNumber, numberOfTurns} = useAppContext();

    if(turnNumber > numberOfTurns){
        return ( 
            <div className='font-LuckiestGuy tracking-widest'>
                <div className='text-center pt-32 pb-16 text-[50px] text-dblue flex flex-col'>
                    {
                        Team1Score > Team2Score 
                        ? <p>{Team1Name} WINS</p>
                        :  Team2Score > Team1Score 
                        ? <p>{Team2Name} WINS</p>
                        : <p>{"IT'S A TIE!"}</p>
                    }
                    <p>Final Score</p>
                </div>
                <div className='grid grid-cols-1'>
                    <div className='flex justify-center bg-white mx-96 border-[1px] border-black text-[50px]'>
                        <div className='grid grid-cols-2 py-10 w-[100%] px-24'>
                            <div className=''>
                                Team {Team1Name}:
                            </div>
                            <div className='text-end'>
                                {Team1Score}
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center bg-white mx-96 border-[1px] border-black text-[50px]'>
                        <div className='grid grid-cols-2 py-10 w-[100%] px-24'>
                            <div className=''>
                                Team {Team2Name}:
                            </div>
                            <div className='text-end'>
                                {Team2Score}
                            </div>
                        </div>
                    </div>
                    {/* push to whatever page is next */}
                    <div onClick={() => router.push('/pages/passAndPlayLobby')} className='flex justify-center py-16 cursor-pointer'>
                        <PlayAgainBtn/>
                    </div>
                </div>
            </div>
        )
    }else{
        return ( 
            <div className='font-LuckiestGuy tracking-widest'>
                <p className='text-center pt-32 pb-16 text-[50px] text-dblue'>
                    CURRENT SCORES
                </p>
                <div className='grid grid-cols-1'>
                    <div className='flex justify-center bg-white mx-96 border-[1px] border-black text-[50px]'>
                        <div className='grid grid-cols-2 py-10 w-[100%] px-24'>
                            <div className=''>
                                Team {Team1Name}:
                            </div>
                            <div className='text-end'>
                                {Team1Score}
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center bg-white mx-96 border-[1px] border-black text-[50px]'>
                        <div className='grid grid-cols-2 py-10 w-[100%] px-24'>
                            <div className=''>
                                Team {Team2Name}:
                            </div>
                            <div className='text-end'>
                                {Team2Score}
                            </div>
                        </div>
                    </div>
                    {/* push to whatever page is next */}
                    <div onClick={() => router.push('/pages/intermissionPnpPage')} className='flex justify-center py-16 cursor-pointer'>
                        <NextRoundBtn />
                    </div>
                </div>
            </div>
        )    
    }

}

export default WinPage