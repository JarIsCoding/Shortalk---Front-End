'use client'

import NavBar from '@/app/components/NavBar'
import { useAppContext } from '@/context/Context'
import { getCard } from '@/utils/Dataservices'
import { Button, Modal } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const IntermissionPnpPage = () => {

  const router = useRouter()

  const {setCard, speaker, team} = useAppContext();

  const [openModal, setOpenModal] = useState(false)

  const handleClick = async () => {
    let card = await getCard()
    setCard(card);
    router.push('/pages/passAndPlay')
  }

  return (
    <div>
      <div className='relative'>
        <NavBar title='ShorTalk' />
        <div className="absolute top-6 right-0 mr-10 flex z-50">
          <Button onClick={() => setOpenModal(true)} className="bg-clear">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.6661 38.3333C16.6661 38.7754 16.4905 39.1993 16.178 39.5118C15.8654 39.8244 15.4415 40 14.9995 40H3.33322C2.4492 40 1.60138 39.6488 0.976279 39.0237C0.351178 38.3986 0 37.5507 0 36.6667V3.33333C0 2.44928 0.351178 1.60143 0.976279 0.976311C1.60138 0.351189 2.4492 0 3.33322 0H14.9995C15.4415 0 15.8654 0.175595 16.178 0.488156C16.4905 0.800716 16.6661 1.22464 16.6661 1.66667C16.6661 2.10869 16.4905 2.53262 16.178 2.84518C15.8654 3.15774 15.4415 3.33333 14.9995 3.33333H3.33322V36.6667H14.9995C15.4415 36.6667 15.8654 36.8423 16.178 37.1548C16.4905 37.4674 16.6661 37.8913 16.6661 38.3333ZM39.5112 18.8208L31.1781 10.4875C30.8654 10.1748 30.4413 9.99907 29.999 9.99907C29.5568 9.99907 29.1326 10.1748 28.8199 10.4875C28.5072 10.8002 28.3315 11.2244 28.3315 11.6667C28.3315 12.1089 28.5072 12.5331 28.8199 12.8458L34.3093 18.3333H14.9995C14.5575 18.3333 14.1336 18.5089 13.821 18.8215C13.5085 19.134 13.3329 19.558 13.3329 20C13.3329 20.442 13.5085 20.866 13.821 21.1785C14.1336 21.4911 14.5575 21.6667 14.9995 21.6667H34.3093L28.8199 27.1542C28.5072 27.4669 28.3315 27.8911 28.3315 28.3333C28.3315 28.7756 28.5072 29.1998 28.8199 29.5125C29.1326 29.8252 29.5568 30.0009 29.999 30.0009C30.4413 30.0009 30.8654 29.8252 31.1781 29.5125L39.5112 21.1792C39.6662 21.0244 39.7891 20.8406 39.873 20.6382C39.9568 20.4359 40 20.219 40 20C40 19.781 39.9568 19.5641 39.873 19.3618C39.7891 19.1594 39.6662 18.9756 39.5112 18.8208Z" fill="white" />
            </svg>
          </Button>

        </div>
      </div>

      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-black cursor-default">
              Are you sure you want to leave?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => { setOpenModal(false); router.push('/pages/homePage') }}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className='lg:pb-80 lg:pt-64 py-36 w-screen cursor-pointer' onClick={handleClick}>
        <p className='lg:flex hidden justify-center font-LuckiestGuy text-dblue text-[48px] tracking-widest text-center'>
          {"Team\u00A0"}{team}{"'s Turn"}
        </p>
        <p className='lg:flex hidden justify-center font-LuckiestGuy text-dblue text-[48px] tracking-widest lg:pt-0 pt-10'>
          {"Speaker:\u00A0"}<span>{speaker}</span>
        </p>

        {/* For smaller screens */}
        <p className='lg:hidden block font-LuckiestGuy text-dblue text-[48px] tracking-widest text-center'>
          {"Team\u00A0"} <br /> {team}{"'s Turn"}
        </p>
        <p className='lg:hidden block text-center font-LuckiestGuy text-dblue text-[48px] tracking-widest lg:pt-0 pt-10'>
          {"Speaker:\u00A0"} <br /> {speaker}
        </p>

        <p className='flex justify-center text-center font-LuckiestGuy text-dblue text-[40px] tracking-widest pt-14'>
          Click anywhere to start
        </p>
      </div>

    </div>
  )
}

export default IntermissionPnpPage
