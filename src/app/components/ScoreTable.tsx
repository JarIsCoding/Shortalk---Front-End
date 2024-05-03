'use client'

import { IScoreTableProps } from '@/Interfaces/Interfaces'
import { FooterDivider } from 'flowbite-react'
import React from 'react'

const ScoreTable = (props: IScoreTableProps) => {
    return (
        <div className='flex justify-center py-10 cursor-default'>

            <div className='grid grid-cols-1 bg-white'>
                <div className='border-[2px] border-black px-14 py-2'>
                    <p className='text-gray-600 font-LuckiestGuy text-[40px] tracking-widest text-center'>
                        SKIPPED
                    </p>
                </div>
                <div className='border-[2px] border-t-[1px] border-b-[1px] border-black p-2 text-[20px] h-[430px] overflow-y-auto removeScrollbar'>
                    <div className='flex flex-col'>
                        {/* Fill this with data */}
                        {
                            props.skipWords.map((card, id) => {
                                return (
                                    <div key={id} className='flex justify-between'>
                                        <p>
                                            {card.top}
                                        </p>
                                        <p>
                                            {card.bottom}
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {/* <div className='border-[2px] border-black px-10 py-2'>
                    <p className='text-gray-600 font-LuckiestGuy text-[48px] tracking-widest text-center'>
                        0
                    </p>
                </div> */}
            </div>

            <div className='grid grid-cols-1 bg-white'>
                <div className='border-[2px] border-black px-14 py-2'>
                    <p className='text-red-600 font-LuckiestGuy text-[40px] tracking-widest text-center'>
                        -1 POINT
                    </p>
                </div>
                <div className='border-[2px] border-t-[1px] border-b-[1px] border-black p-2 text-[20px] h-[350px] overflow-y-auto removeScrollbar'>
                    {
                        props.buzzWords.map((card, id) => {
                            return (
                                <div key={id} className='flex justify-between'>
                                    <p>
                                        {card.top}
                                    </p>
                                    <p>
                                        {card.bottom}
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='border-[2px] border-black px-14 py-2'>
                    <p className='text-red-600 font-LuckiestGuy text-[40px] tracking-widest text-center'>
                        -{props.buzzWords.length}
                    </p>
                </div>
            </div>

            <div className='grid grid-cols-1 bg-white'>
                <div className='border-[2px] border-black px-14 py-2'>
                    <p className='text-green-600 font-LuckiestGuy text-[40px] tracking-widest text-center'>
                        +1 POINT
                    </p>
                </div>
                <div className='border-[2px] border-t-[1px] border-b-[1px] border-black p-2 text-[20px] h-[350px] overflow-y-auto removeScrollbar'>
                    {
                        props.onePointWords.map((card, id) => {
                            return (
                                <div key={id} className='flex justify-between'>
                                    <p>
                                        {card.top}
                                    </p>
                                    <p>
                                        {card.bottom}
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='border-[2px] border-black px-14 py-2'>
                    <p className='text-green-600 font-LuckiestGuy text-[40px] tracking-widest text-center'>
                        +{props.onePointWords.length}
                    </p>
                </div>
            </div>

            <div className='grid grid-cols-1 bg-white'>
                <div className='border-[2px] border-black px-14 py-2'>
                    <p className='text-purple-600 font-LuckiestGuy text-[40px] tracking-widest text-center'>
                        +3 POINT
                    </p>
                </div>
                <div className='border-[2px] border-t-[1px] border-b-[1px] border-black p-2 text-[20px] h-[350px] overflow-y-auto removeScrollbar'>
                    {
                        props.threePointWords.map((card, id) => {
                            return (
                                <div key={id} className='flex justify-between'>
                                    <p>
                                        {card.top}
                                    </p>
                                    <p>
                                        {card.bottom}
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='border-[2px] border-black px-14 py-2'>
                    <p className='text-purple-600 font-LuckiestGuy text-[40px] tracking-widest text-center'>
                        +{props.threePointWords.length * 3}
                    </p>
                </div>
            </div>

        </div>
    )
}

export default ScoreTable
