'use client'

import GoHomeBtn from '@/app/components/GoHomeBtn'
import { Button } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const FriendAccept = () => {
    const [resultText, setResultText] = useState('')
    const [textColor, setTextColor] = useState<Boolean>(false)

    const router = useRouter()

    const t = () => {
        router.back()
    }

    const handleYes = () => {
        setResultText('Friend request accepted!')
        setTextColor(true)
        setTimeout(t, 1300)
    }

    const handleNo = () => {
        setResultText('Declined!')
        setTextColor(false)
        setTimeout(t, 1300)
    }

    return (
        <div>
            <div className='flex justify-center lg:py-16 py-8'>
                <p className='text-dblue font-LuckiestGuy sm:text-[48px] text-[38px] tracking-widest text-center'>WOULD YOU LIKE THIS USER TO <br /> BECOME YOUR FRIEND?</p>
            </div>

            <div className='flex justify-center'>
                <div className='cardBorder bg-white lg:w-[38%] md:w-[60%] w-[90%] lg:h-[300px] sm:h-[350px] h-[380px] rounded-lg'>
                    <p className='flex justify-center font-LuckiestGuy text-[32px] text-center tracking-widest text-dgray pt-8'>
                        Become Friends With <br className='lg:hidden block' /> namehere?
                    </p>

                    <p className={`text-center pb-8 ${textColor ? 'text-green-500' : 'text-red-500'}`}>
                        {resultText}
                    </p>

                    <div className='p-0 m-0 gap-4 grid lg:grid-cols-2'>

                        <div className='w-[100%] flex lg:justify-end justify-center'>
                            {/* On click find and join room */}
                            <Button onClick={handleYes} className='font-LuckiestGuy text-white bg-[#32D84E] w-[85%] h-[50px] p-0 m-0'>
                                <p className='text-[36px] tracking-widest'>
                                    Accept
                                </p>
                            </Button>
                        </div>
                        <div className='w-[100%] flex lg:justify-start justify-center'>
                            <Button onClick={handleNo} className='font-LuckiestGuy text-white bg-[#FF0000] w-[85%] h-[50px] p-0 m-0'>
                                <p className='text-[36px] tracking-widest'>
                                    Decline
                                </p>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Button className='absolute right-5 bottom-5 px-16 py-2 me-7 bg-dblue cursor-pointer' onClick={() => { router.back() }}>
                <p className='text-[36px]'>Go Back</p>
            </Button>
        </div>
    )
}

export default FriendAccept
