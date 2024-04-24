'use client'

import NextTurnBtn from '@/app/components/NextTurnBtn'
import ResultsBtn from '@/app/components/ResultsBtn'
import ScoreTable from '@/app/components/ScoreTable'
import { useAppContext } from '@/context/Context'
import { useRouter } from 'next/navigation'
import React from 'react'

const FinalScorePage = () => {

    const { turnNumber, numberOfTurns, setSkipWords, SkipWords,setBuzzWords, BuzzWords, setOnePointWords, OnePointWords, setThreePointWords, ThreePointWords } = useAppContext();
    const router = useRouter();

    const clickHandleNextTurn = () => {
        setSkipWords([]);
        setBuzzWords([]);
        setOnePointWords([]);
        setThreePointWords([]);
        router.push('/pages/intermissionPnpPage')
    }

    console.log("This is the turn number: " + turnNumber)
    console.log("This is the number of turns: " + numberOfTurns)

    return (
        <div>
            <div className='text-center text-dblue text-[50px] font-LuckiestGuy tracking-widest pt-20'>
                <p>Times Up!!!</p>
                <p className='pt-5'>Round results</p>
            </div>
            <ScoreTable 
            skipWords={SkipWords}
            buzzWords={BuzzWords}
            onePointWords={OnePointWords}
            threePointWords={ThreePointWords}
            />
            {
                (turnNumber > numberOfTurns)
                    ? <div onClick={() => router.push('/pages/winPage')} className='flex justify-center pb-16'>
                        <ResultsBtn />
                    </div>
                    : <div onClick={clickHandleNextTurn} className='flex justify-center pb-16'>
                        <NextTurnBtn />
                    </div>
            }

        </div>
    )
}

export default FinalScorePage
