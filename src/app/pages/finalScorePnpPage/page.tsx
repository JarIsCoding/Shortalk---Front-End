import ScoreTable from '@/app/components/ScoreTable'
import React from 'react'

const FinalScorePage = () => {
    return (
        <div>
            <div className='text-center text-dblue text-[50px] font-LuckiestGuy tracking-widest pt-20'>
                <p>Times Up!!!</p>
                <p className='pt-5'>Round results</p>
            </div>
            <ScoreTable/>
        </div>
    )
}

export default FinalScorePage
