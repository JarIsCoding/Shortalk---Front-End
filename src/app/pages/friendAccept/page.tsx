'use client'

import { Button } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const FriendAccept = () => {
    const [resultText, setResultText] = useState('')
    const [textColor, setTextColor] = useState<Boolean>(false)

    const router = useRouter()

    const t = () => {
        router.push('/pages/homePage')
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
            <div className='flex justify-center py-16'>
                <p className='text-dblue font-LuckiestGuy text-[48px] tracking-widest text-center'>WOULD YOU LIKE THIS USER TO <br /> BECOME YOUR FRIEND?</p>
            </div>

            <div className='flex justify-center'>
                <div className='cardBorder bg-white w-[500px] h-[300px] rounded-lg'>
                    <p className='flex justify-center font-LuckiestGuy text-[32px] text-center tracking-widest text-dgray pt-8'>
                        Become Friends With <br /> namehere?
                    </p>

                    <p className={`text-center pb-8 ${textColor? 'text-green-500' : 'text-red-500'}`}>
                        {resultText}
                    </p>

                    <div className='p-0 m-0 flex justify-center gap-4'>

                        {/* On click find and join room */}
                        <Button onClick={handleYes} className={'font-LuckiestGuy text-white bg-[#32D84E] w-[200px] h-[50px] p-0 m-0'}>
                            <p className='text-[36px] tracking-widest'>
                                Accept
                            </p>
                        </Button>
                        <Button onClick={handleNo} className='font-LuckiestGuy text-white bg-[#FF0000] w-[200px] h-[50px] p-0 m-0'>
                            <p className='text-[36px] tracking-widest'>
                                Decline
                            </p>
                        </Button>

                    </div>
                </div>
            </div>
            <Button className='absolute right-5 bottom-5 px-16 py-2 bg-dblue cursor-pointer' onClick={() => { router.push('/pages/homePage') }}>
                <p className='text-[36px]'>Back to Home</p>
            </Button>
        </div>
    )
}

export default FriendAccept
