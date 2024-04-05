import NavBar from '@/app/components/NavBar'
import StatusBar from '@/app/components/StatusBar'
import React from 'react'

const page = () => {
  return (
    <div className=' bg-lblue h-screen'>
      <NavBar title='Pass And Play'/>
      <div className=' px-5'>
          <StatusBar 
              time='1:30'
              teamName='1'
              roundNumber={1}
              roundTotal={2}
              role={null}
              OnePointWord={null}
              ThreePointWord={null}
          />
      </div>
    </div>
  )
}

export default page