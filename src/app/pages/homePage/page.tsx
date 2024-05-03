"use client"
import NavBar from '@/app/components/NavBar'
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { Button, Modal } from "flowbite-react";
import FriendsPic from '@/app/assets/FriendsPic.png'
import RulesPic from '@/app/assets/RulesPic.png'
import LogoutBtn from '@/app/assets/LogoutBtn2.png'
import FriendsTab from '@/app/components/FriendsTab';
import { useAppContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import AudioPlayer from '@/app/components/AudioPlayer'
const HomePage = () => {

  const router = useRouter()

  const { userData, setUserData } = useAppContext();

  const [isFriendsOn, setIsFriendsOn] = useState<boolean>(false);

  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setIsFriendsOn(!isFriendsOn);
  }

  const handlePassAndPlayClick = () => {
    router.push('/pages/passAndPlayLobby')
  }

  function play() {
    try {
      const audio = new Audio();
      audio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }
  

  return (

    <div className='bg-lblue min-h-screen w-full Bg relative'>

      <div className={`absolute right-0 pt-24 ${isFriendsOn ? 'block' : 'hidden'}`}>
        <FriendsTab />
      </div>

      {/* Check if user is guest or signed in */}
      {/* Title */}
      <div className='relative'>
        <NavBar title={'Welcome ' + userData.username + ' !'} />
        <div className="absolute top-6 right-0 mr-10 flex z-50">
          {/*NavBar Icons/Buttons*/}
          <Button onClick={() => router.push('rulesPage')} className="bg-clear">
            <Image src={RulesPic} alt="RulesPicture" className="w-35px h-30px rulesNav" />
          </Button>
          <Button onClick={() => { isFriendsOn ? setIsFriendsOn(false) : setIsFriendsOn(true) }} className={`bg-clear`}>
            <Image src={FriendsPic} alt="FriendsPicture" className="w-35px h-30px friendsNav" />
          </Button>
          <Button onClick={() => setOpenModal(true)} className={`bg-clear p-0`}>
            <Image src={LogoutBtn} alt="Power Button" className="w-25px h-40px friendsNav" />
          </Button>
        </div>
      </div>

      <div className='mt-4'>
        {/* Tilted SHORTALK */}
        <div className='pulse lg:block hidden'>
          <h1 className='font-LuckiestGuy text-dblue px-10 pt-5 h-[100px] text-5xl lg:-rotate-12 lg:pl-96 w-[80%] cursor-default'>SHORTALK</h1>
        </div>
        <div className='pulse lg:hidden block'>
          <h1 className='font-LuckiestGuy text-dblue px-10 pt-7 h-[100px] text-5xl lg:-rotate-12 lg:pl-96 w-[100%] text-center cursor-default'>SHORTALK</h1>
        </div>
        {/* Buttons */}
        <Button onClick={() => router.push('/pages/createRoom')} size="" className='lg:w-[31%] md:w-[50%] w-[80%] h-[130px] mx-auto my-4 bg-dblue'>
          <p className='font-LuckiestGuy text-white px-10 h-[100px] text-4xl flex items-center'>Create A Room</p>
        </Button>

        <Button onClick={() => router.push('/pages/joinRoom')} size="xl" className='lg:w-[31%] md:w-[50%] w-[80%] h-[130px] justify-center mx-auto my-5 bg-dblue'>
          <p className='font-LuckiestGuy text-white px-10 h-[100px] text-4xl flex items-center'>Join A Room</p>
        </Button>

        <Button onClick={handlePassAndPlayClick} size="xl" className='lg:w-[31%] md:w-[50%] w-[80%] h-[130px] justify-items-center mx-auto my-4 bg-dblue'>
          <p className='font-LuckiestGuy text-white px-10 h-[100px] text-4xl flex items-center'>Pass N{"'"} Play</p>
        </Button>
      </div>

      <p className='text-[35px] text-center font-LuckiestGuy text-dblue pt-10 cursor-default'>
        Online Currently not working! Please play Pass and play for now. <br /> Sorry for the inconvinence!
      </p>

      <AudioPlayer/>

      

      {/* Modal for logging out */}
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-black cursor-default">
              Are you sure you want to log out?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => { setOpenModal(false); router.push('/') }}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default HomePage