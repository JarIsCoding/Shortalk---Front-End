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
import Player from '@/app/components/Player';
import MainMenuMusic from '@/app/components/AudioPlayer';
import VolumeSlider from '@/app/components/VolumeSlider';
import PlayAgainBtn from '@/app/components/PlayAgainBtn';

const HomePage = () => {

  const router = useRouter()

  const { userData, setUserData, isTokenCorrect } = useAppContext();

  const [isFriendsOn, setIsFriendsOn] = useState<boolean>(false);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!isTokenCorrect) {
      router.push('/');
    }
  }, [isTokenCorrect])

  const handleClick = () => {
    setIsFriendsOn(!isFriendsOn);
  }

  const handlePassAndPlayClick = () => {
    router.push('/pages/passAndPlayLobby')
  }

  return (

    <div className='bg-lblue w-full Bg relative'>

      <div className={`absolute bg-[#52576F] h-screen md:pb-24 pb-16 right-0 top-[75px] md:top-[90px] ${isFriendsOn ? 'block slideLeft' : 'hidden'}`}>
        <FriendsTab />
      </div>

      {/* Check if user is guest or signed in */}
      {/* Title */}
      <div className='relative'>
        <NavBar title={'Welcome ' + userData.username + '!'} />
        <div className="absolute md:top-6 top-4 right-0 md:mr-10 flex z-50">
          {/*NavBar Icons/Buttons*/}
          <Button onClick={() => router.push('rulesPage')} className="bg-clear wiggle hidden md:block">
            <Image src={RulesPic} alt="RulesPicture" className="w-35px h-30px rulesNav" />
          </Button>
          <Button onClick={() => { isFriendsOn ? setIsFriendsOn(false) : setIsFriendsOn(true) }} className={`bg-clear`}>
            <Image src={FriendsPic} alt="FriendsPicture" className={`w-35px h-30px friendsNav`} />
          </Button>
          <Button onClick={() => setOpenModal(true)} className={`bg-clear p-0`}>
            <Image src={LogoutBtn} alt="Power Button" className="w-25px h-40px friendsNav" />
          </Button>
        </div>
      </div>

      {/* <Player/> */}

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

      {/* <p className='md:text-[35px] text-[20px] text-center font-LuckiestGuy text-dblue py-10 cursor-default px-5'>
        Online is now functional! Give it a try with your friends, <br /> bugs may be encountered beware!!
      </p> */}

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