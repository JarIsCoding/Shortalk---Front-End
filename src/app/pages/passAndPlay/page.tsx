"use client"

import BuzzBtn from '@/app/components/BuzzBtn'
import Card from '@/app/components/Card'
import NavBar from '@/app/components/NavBar'
import OnePointBtn from '@/app/components/OnePointBtn'
import SkipBtn from '@/app/components/SkipBtn'
import StatusBar from '@/app/components/StatusBar'
import ThreePointBtn from '@/app/components/ThreePointBtn'
import React from 'react'

const page = () => {
  return (
    <div className=' bg-lblue h-screen'>
      <NavBar title='Pass And Play'/>
      <div className=' px-10 flex flex-col items-center space-y-5 mt-10'>
          <StatusBar 
              time='1:30'
              teamName='1'
              roundNumber={1}
              roundTotal={2}
              role={null}
              OnePointWord={null}
              ThreePointWord={null}
          />
          <Card top={'Code'} bottom={'Codestack'}/>
          <div className=' w-full px-40 flex justify-between'>
            <BuzzBtn/>
            <SkipBtn/>
            <OnePointBtn/>
            <ThreePointBtn/>
          </div>
      </div>
    </div>
  )
}

export default page