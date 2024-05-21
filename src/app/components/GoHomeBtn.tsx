'use client'

import { Button } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const GoHomeBtn = () => {

    const router = useRouter()

    return (
        <div className='cursor-pointer pb-10 font-LuckiestGuy tracking-widest'>
            <Button className='md:px-16 py-2 md:me-7 bg-dblue' onClick={() => { router.push('/pages/homePage') }}>
                <p className='text-[36px]'>Back to Home</p>
            </Button>
        </div>
    )
}

export default GoHomeBtn