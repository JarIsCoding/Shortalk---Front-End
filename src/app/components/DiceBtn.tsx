import React from 'react'
import dice from '@/app/assets/Dice.png'
import Image from 'next/image';

const DiceBtn = () => {
    return (
        <div>
            <Image src={dice} alt='red and green dice' width={40} height={40} />
        </div>
    )
}

export default DiceBtn