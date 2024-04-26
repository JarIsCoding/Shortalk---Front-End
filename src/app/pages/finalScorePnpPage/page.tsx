'use client'

import NextTurnBtn from '@/app/components/NextTurnBtn'
import ResultsBtn from '@/app/components/ResultsBtn'
import ScoreTable from '@/app/components/ScoreTable'
import { useAppContext } from '@/context/Context'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

const FinalScorePage = () => {


    const { turnNumber, numberOfTurns, setSkipWords, SkipWords, setBuzzWords, BuzzWords, setOnePointWords, OnePointWords, setThreePointWords, ThreePointWords, Team1Score, setTeam1Score, Team2Score, setTeam2Score, team, Team1Name, Team2Name } = useAppContext();
    const router = useRouter();

    const clickHandleResultsBtn = () => {
        router.push('/pages/winPage')
    }

    const clickHandleNextTurn = () => {


        setSkipWords([]);
        setBuzzWords([]);
        setOnePointWords([]);
        setThreePointWords([]);
        router.push('/pages/intermissionPnpPage')
    }

    console.log("This is the turn number: " + turnNumber)
    console.log("This is the number of turns: " + numberOfTurns)

    useEffect(() => {
        switch (team) {
            case (Team1Name):
                setTeam1Score(Team1Score - BuzzWords.length + OnePointWords.length + (ThreePointWords.length * 3))
                break;
            case (Team2Name):
                setTeam2Score(Team2Score - BuzzWords.length + OnePointWords.length + (ThreePointWords.length * 3))
                break;
        }
    }, [])

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
                    ? <div className='flex justify-center pb-16'>
                        <ResultsBtn click={clickHandleResultsBtn} />
                    </div>
                    : <div className='flex justify-center pb-16'>
                        <NextTurnBtn click={clickHandleNextTurn}/>
                    </div>
            }

        </div>
    )
}

export default FinalScorePage
