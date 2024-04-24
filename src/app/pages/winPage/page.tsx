'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import NextRoundBtn from '@/app/components/NextRoundBtn';

const WinPage = () => {

    const router = useRouter();

    return (
        <div className='font-LuckiestGuy tracking-widest'>
            <p className='text-center pt-32 pb-16 text-[50px] text-dblue'>
                CURRENT SCORES
            </p>
            <div className='grid grid-cols-1'>
                <div className='flex justify-center bg-white mx-96 border-[1px] border-black text-[50px]'>
                    <div className='grid grid-cols-2 py-10 w-[100%] px-24'>
                        <div className=''>
                            Team 1:
                        </div>
                        <div className='text-end'>
                            0
                        </div>
                    </div>
                </div>
                <div className='flex justify-center bg-white mx-96 border-[1px] border-black text-[50px]'>
                    <div className='grid grid-cols-2 py-10 w-[100%] px-24'>
                        <div className=''>
                            Team 2:
                        </div>
                        <div className='text-end'>
                            0
                        </div>
                    </div>
                </div>
                {/* push to whatever page is next */}
                <div onClick={() => router.push('')} className='flex justify-center py-16'>
                    <NextRoundBtn />
                </div>
            </div>
        </div>
    )
}

export default WinPage