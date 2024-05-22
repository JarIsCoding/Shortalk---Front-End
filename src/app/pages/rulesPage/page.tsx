"use client"

import SmallCard from '@/app/components/SmallCard'
import NavBar from '@/app/components/NavBar'
import React, { useEffect } from 'react'
import { Button } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import GoHomeBtn from '@/app/components/GoHomeBtn'
import { useAppContext } from '@/context/Context'

const RulesPage = () => {

    const router = useRouter()
    const {isTokenCorrect} = useAppContext()

    useEffect(() => {
        if (!isTokenCorrect) {
            router.push('/');
        }
    }, [isTokenCorrect])

    return (
        <div className='cursor-default'>
            <NavBar title='ShorTalk Rules' />

            <div className='grid lg:grid-cols-3 pt-5'>
                <div className='lg:col-span-2'>
                    <ul className='md:px-20 px-8 list-disc text-[24px]'>
                        <li className='py-1 font-bold'>
                            At Least 4 Players are needed to Play (2 players minimum split between 2 Teams)
                        </li>
                        <li className='py-1'>
                            On each turn, One Team will be on <span className='font-bold text-dred'>Offense</span> and the other team on <span className='font-bold text-dblue'>Defense</span>
                        </li>
                        <li className='py-1'>
                            The Team on <span className='font-bold text-dred'>Offense</span> will have one person as the <span className='font-bold text-dgreen'>Speaker</span> and the rest of the team as <span className='font-bold text-dgray'>Guessers</span>
                        </li>
                        <li className='py-1'>
                            The <span className='font-bold text-dgreen'>Speaker</span> will see a card like the one shown, and begin describing either the top or bottom words on the card using only 1-syllable words and no words contained on the card.
                        </li>
                    </ul>
                </div>

                <div className='flex justify-center py-2 col-span-1'>
                    <SmallCard />
                </div>
            </div>

            <ul className='md:px-20 px-8 list-disc text-[24px] lg:pb-10 pb-2 relative'>
                <li className='py-1'>
                    If the <span className='font-bold text-dgreen'>Speaker</span> violates the rules in any way, the <span className='font-bold text-dblue'>Defensive</span> team can hit the “Buzz” button and force the <span className='font-bold text-dred'>Offensive</span> team to lose a point and move on to the next card
                </li>
                <li className='py-1'>
                    As the <span className='font-bold text-dgreen'>Speaker</span> describes the words on his card, the <span className='font-bold text-dgray'>Guesser(s)</span> on his team can guess what words are on the card. If the <span className='font-bold text-dgray'>Guessers</span> correctly guess the top word, the <span className='font-bold text-dgreen'>Speaker</span> can claim 1 point and move on to the next card. If the <span className='font-bold text-dgray'>Guessers</span> guess the bottom word(s), the <span className='font-bold text-dgreen'>Speaker</span> gets to claim 3 points and move to the next card.
                </li>
                <li>
                    When the time is up, the turn is over and the points will be shown and tallied. A <span className='font-bold text-yellow-200'>Scorekeeper</span> may be assigned before to correct any illegal buzzes that may occur. When everyone is ready the next turn can begin and the <span className='font-bold text-dblue'>Defense</span> team will go to <span className='font-bold text-dred'>Offense</span> and the <span className='font-bold text-dred'>Offense</span> team will go to <span className='font-bold text-dblue'>Defense</span>.
                </li>
                <li className='py-1'>
                    The game ends when everyone has had the chance to be <span className='font-bold text-dgreen'>Speaker</span> for the <br /> number of rounds designated in the game lobby room.
                </li>
                <GoHomeBtn />
            </ul>

        </div>
    )
}

export default RulesPage
