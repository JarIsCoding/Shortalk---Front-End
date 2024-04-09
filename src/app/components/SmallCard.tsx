import React from 'react'

const SmallCard = () => {
  return (
    <div className='h-[275px] w-[200px] flex flex-col justify-between rounded-xl border-2 border-black bg-dblue'>
        <div className='  w-full h-[24px]'></div>
        <div className=' w-full h-full font-Roboto text-[24px] border-b-2 border-black bg-white flex justify-center items-center'>Code</div>
        <div className=' w-full h-full font-Roboto text-[24px] bg-white flex justify-center items-center'>CodeStack</div>
        <div className='  w-full h-[24px]'></div>
    </div>
  )
}

export default SmallCard