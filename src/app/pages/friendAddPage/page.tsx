"use client"

import React from 'react'

const FriendAddPage = () => {
    return (
        <div className='flex justify-center pt-56'>
            <div className='cardBorder bg-white w-[500px] h-[400px] rounded-lg'>
                <p className='flex justify-center font-LuckiestGuy text-[32px] text-center tracking-widest text-dgray py-8'>
                    Find Your <br /> Friend
                </p>
                <div className='flex justify-center w-[100%]'>
                    <input type="text" placeholder='Friend Username' className='w-[100%]' />
                </div>
            </div>
        </div>
    )
}

export default FriendAddPage
