'use client'

import React from 'react'

const ScoreTable = () => {
    return (
        <div className='flex justify-center py-10'>

            <div className='grid grid-cols-1 bg-white'>
                <div className='border-[2px] border-black px-14 py-2'>
                    <p className='text-gray-600 font-LuckiestGuy text-[40px] tracking-widest text-center'>
                        SKIPPED
                    </p>
                </div>
                <div className='border-[2px] border-t-[1px] border-b-[1px] border-black p-2 text-[20px] h-[430px]'>
                    <div className='grid grid-cols-2'>
                        {/* Fill this with data */}
                        <div>
                            <p>
                                word
                            </p>
                        </div>
                        <div className='text-end'>
                            <p>
                                bigword
                            </p>
                        </div>
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
                <div className='border-[2px] border-t-[1px] border-b-[1px] border-black p-2 text-[20px] h-[350px]'>
                    <div className='grid grid-cols-2'>
                        {/* Fill this with data */}
                        <div>
                            <p>
                                word
                            </p>
                        </div>
                        <div className='text-end'>
                            <p>
                                bigword
                            </p>
                        </div>
                    </div>
                </div>
                <div className='border-[2px] border-black px-14 py-2'>
                    <p className='text-red-600 font-LuckiestGuy text-[40px] tracking-widest text-center'>
                        -1
                    </p>
                </div>
            </div>

            <div className='grid grid-cols-1 bg-white'>
                <div className='border-[2px] border-black px-14 py-2'>
                    <p className='text-green-600 font-LuckiestGuy text-[40px] tracking-widest text-center'>
                        +1 POINT
                    </p>
                </div>
                <div className='border-[2px] border-t-[1px] border-b-[1px] border-black p-2 text-[20px] h-[350px]'>
                    <div className='grid grid-cols-2'>
                        {/* Fill this with data */}
                        <div>
                            <p>
                                word
                            </p>
                        </div>
                        <div className='text-end'>
                            <p>
                                bigword
                            </p>
                        </div>
                    </div>
                </div>
                <div className='border-[2px] border-black px-14 py-2'>
                    <p className='text-green-600 font-LuckiestGuy text-[40px] tracking-widest text-center'>
                        +1
                    </p>
                </div>
            </div>

            <div className='grid grid-cols-1 bg-white'>
                <div className='border-[2px] border-black px-14 py-2'>
                    <p className='text-purple-600 font-LuckiestGuy text-[40px] tracking-widest text-center'>
                        +3 POINT
                    </p>
                </div>
                <div className='border-[2px] border-t-[1px] border-b-[1px] border-black p-2 text-[20px] h-[350px]'>
                    <div className='grid grid-cols-2'>
                        {/* Fill this with data */}
                        <div>
                            <p>
                                word
                            </p>
                        </div>
                        <div className='text-end'>
                            <p>
                                bigword
                            </p>
                        </div>
                    </div>
                </div>
                <div className='border-[2px] border-black px-14 py-2'>
                    <p className='text-purple-600 font-LuckiestGuy text-[40px] tracking-widest text-center'>
                        +3
                    </p>
                </div>
            </div>

        </div>
    )
}

export default ScoreTable
