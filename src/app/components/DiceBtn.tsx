import React from 'react'
import dice from '@/app/assets/Dice.png'
import Image from 'next/image';
import { useAppContext } from '@/context/Context';

interface IDice {
    onClick: () => void
}

const DiceBtn = ({onClick = () => {}} : IDice) => {

    const {setShuffle} = useAppContext();
    
    return (
        <div onClick={() => {onClick(); setShuffle(true)}} className=' cursor-pointer'>
            <Image src={dice} alt='red and green dice' width={58} height={40} />
        </div>
    )
}

export default DiceBtn