import React from 'react'

const FriendsTab = () => {

  const { userData, setUserData } = useAppContext();

  return (
    <div className='Friends w-[300px] min-h-screen absolute flex absolute top-0 right-0'>
      <p className='pt-28'>This is My Friends Tab!!!!!</p>
    </div>

  )
}

export default FriendsTab