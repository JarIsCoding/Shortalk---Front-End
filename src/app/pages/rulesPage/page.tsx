'use client'

import SmallCard from '@/app/components/SmallCard'
import NavBar from '@/app/components/NavBar'
import React from 'react'
import { Button } from 'flowbite-react'
import { useRouter } from 'next/navigation'

const rulesPage = () => {

    const router = useRouter()

    return (
        <div className='bg-lblue h-[1030px]'>
            <NavBar title='Rules' />
            <p className='text-center text-[48px] tracking-widest text-dblue font-LuckiestGuy'>
                ShorTalk Rules
            </p>

            <ul className='px-20 list-disc text-[24px]'>
                <li>
                    At Least 4 Players are needed to Play (2 players minimum split between 2 Teams)
                </li>
                <li>
                    On each turn, One Team will be on Offense and the other team on Defense
                </li>
                <li>
                    The Team on Offense will have one person as the Speaker and the rest of the team as Guessers
                </li>
                <li>
                    The Speaker will see a card like the one shown below, and begin describing either the top or bottom words on the card using only 1-syllable words and no words contained on the card.
                </li>
            </ul>

            <div className='flex justify-center py-2'>
                <SmallCard />
            </div>

            <ul className='px-20 list-disc text-[24px] relative'>
                <li>
                    If the speaker violates the rules in any way, the defensive team can hit the “Buzz” button and force the offensive team to lose a point and move on to the next card
                </li>
                <li>
                    As the Speaker describes the words on his card, the Guesser(s) on his team can guess what words are on the card. If the Guessers correctly guess the top word, the Speaker can claim 1 point and move on to the next card. If the Guessers guess the bottom word(s), the Speaker gets to claim 3 points and move to the next card.
                </li>
                <li>
                    When the time is up, the turn is over and the points will be shown and tallied. A scorekeeper may be assigned before to correct any illegal buzzes that may occur. When everyone is ready the next turn can begin and the defense team will go to offense and the offense team will go to defense.
                </li>
                <li>
                    The game ends when everyone has had the chance to be speaker for the <br /> number of rounds designated in the game lobby room.
                </li>
                <div className=''>
                    <Button className='absolute bottom-0 right-3 px-16 py-2 bg-dblue'  onClick={()=>{router.push('/pages/homePage')}}>
                        <p className='text-[36px]'>Back to Home</p>
                    </Button>
                </div>
            </ul>

        </div>
    )
}

export default rulesPage
