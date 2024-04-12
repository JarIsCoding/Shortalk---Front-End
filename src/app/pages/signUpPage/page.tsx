"use client"

import { createAccount } from '@/utils/Dataservices';
import { Button, Modal } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignUpPage = () => {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [createdText, setCreatedText] = useState<string>('')
    const [openModal, setOpenModal] = useState(false);
    const [success, setSuccess] = useState<boolean>(false);

    let router = useRouter();

    const handleSubmit = async () => {

        let userData = {
            username: username,
            password: password
        }

        const isCreated = await createAccount(userData);

        if (isCreated) {
            setCreatedText("User created successfully!");
            setSuccess(true)
        } else {
            setCreatedText("Failed to create user. Please try again.");
            setSuccess(false)
        }
    }

    return (
        <div className='bg-lblue vh'>
            <div className='grid grid-flow-row justify-center'>

                <div className='py-14 text-center'>
                    <p className='text-[48px] font-LuckiestGuy tracking-widest text-dblue cursor-default'>
                        CREATE YOUR USERNAME <br /> AND PASSWORD
                    </p>
                </div>

                <div className='flex justify-center'>
                    <div className='bigCardBg rounded-md flex justify-center'>
                        <form className="flex max-w-md flex-col ">

                            {/* Username and password Input Field */}
                            <p className='text-center text-[32px] pt-7 pb-2 font-LuckiestGuy tracking-widest text-textGray cursor-default'>
                                USERNAME
                            </p>
                            <input id="username" type="text" placeholder='Username' className='inputSize rounded-none' onChange={(e) => setUsername(e.target.value)} required />

                            <p className='text-center  text-[32px] pt-7 pb-2 font-LuckiestGuy tracking-widest text-textGray cursor-default'>
                                PASSWORD
                            </p>
                            <input id="password1" type="password" placeholder='Password' className='inputSize rounded-none' onChange={(e) => setPassword(e.target.value)} required />
                            <p className='text-center cursor-default'>More than one syllable reccomended</p>

                            <p onClick={() => router.push('/')} className='text-center pt-5 cursor-pointer underline'>
                                Already have an account?
                            </p>

                            <div className='flex justify-center pt-8 p-0 m-0'>
                                <Button onClick={() => {handleSubmit(); setOpenModal(true)}} className='loginBtn p-0 m-0 bg-dblue'>
                                    <p className='text-[20px] text-center font-LuckiestGuy tracking-wider'>
                                        Create Account
                                    </p>
                                </Button>
                            </div>

                            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                                <Modal.Header />
                                <Modal.Body>
                                    <div className="text-center">
                                        <h3 className="mb-5 text-lg font-normal text-black">
                                            {createdText}
                                        </h3>
                                        <div className="flex justify-center gap-4">
                                            <Button className='bg-dblue' onClick={() => { setOpenModal(false); router.push('/') }}>
                                                Go to Login!
                                            </Button>
                                            <Button color="gray" className={`${ success ? 'hidden' : 'block'}`} onClick={() => setOpenModal(false)}>
                                                Try again?
                                            </Button>
                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage
