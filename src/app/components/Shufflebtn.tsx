import React from 'react'
import { useAppContext } from '@/context/Context';
import { Button } from 'flowbite-react';

const ShuffleBtn = () => {

    const { setShuffle } = useAppContext();

    return (
        <Button onClick={() => setShuffle(true)} className='cursor-pointer rounded-xl bg-green text-center text-white p-1 font-LuckiestGuy tracking-widest'>
            Shuffle
        </Button>
    )
}

export default ShuffleBtn