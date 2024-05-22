'use client'

import NextTurnBtn from '@/app/components/NextTurnBtn'
import ResultsBtn from '@/app/components/ResultsBtn'
import ScoreTable from '@/app/components/ScoreTable'
import { useAppContext } from '@/context/Context'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

const FinalScorePage = () => {

    const { turnNumber,setTurnNumber, numberOfTurns, setSkipWords, SkipWords, setBuzzWords, BuzzWords, setOnePointWords, OnePointWords, setThreePointWords, ThreePointWords, Team1Score, setTeam1Score, Team2Score, setTeam2Score, team, Team1Name, Team2Name, setTime, roundTime, Team1NameList, Team2NameList, isTokenCorrect } = useAppContext();
    const router = useRouter();

    useEffect(() => {
        if (!isTokenCorrect) {
          router.push('/');
        }
      }, [isTokenCorrect])

    const clickHandleResultsBtn = () => {
        setSkipWords([]);
        setBuzzWords([]);
        setOnePointWords([]);
        setThreePointWords([]);
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
        setTime(roundTime);
        setTurnNumber(turnNumber + 1);
    }, [])

    return (
        <div>
            <div className='text-center text-dblue text-[50px] font-LuckiestGuy tracking-widest pt-20'>
                <p>Times Up!!!</p>
                <p className='pt-5'>Turn results</p>
            </div>
            <ScoreTable
                skipWords={SkipWords}
                buzzWords={BuzzWords}
                onePointWords={OnePointWords}
                threePointWords={ThreePointWords}
            />
            {
                ((turnNumber-1)%(2*Math.max(Team1NameList.length, Team2NameList.length)) == 0)
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
