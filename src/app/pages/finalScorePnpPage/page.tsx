'use client'

import ResultsBtn from '@/app/components/ResultsBtn'
import ScoreTable from '@/app/components/ScoreTable'
import { useAppContext } from '@/context/Context'
import { useRouter } from 'next/navigation'
import React from 'react'

const FinalScorePage = () => {

    const { turnNumber, numberOfRounds } = useAppContext();
    const router = useRouter();

    return (
        <div>
            <div className='text-center text-dblue text-[50px] font-LuckiestGuy tracking-widest pt-20'>
                <p>Times Up!!!</p>
                <p className='pt-5'>Round results</p>
            </div>
            <ScoreTable />
            {
                (turnNumber == numberOfRounds)
                    ? <div onClick={() => router.push('/pages/passAndPlayLobby')} className='flex justify-center pb-16'>
                        <ResultsBtn />
                    </div>
                    : <div onClick={() => router.push('/pages/passAndPlayLobby')} className='flex justify-center pb-16'>
                        <ResultsBtn />
                    </div>
            }

        </div>
    )
}

export default FinalScorePage
