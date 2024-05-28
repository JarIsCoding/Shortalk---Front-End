"use client"

import { createAccount } from '@/utils/Dataservices';
import { Button, Modal } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignUpPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [createdText, setCreatedText] = useState<string>('');
    const [openModal, setOpenModal] = useState(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [security, setSecurity] = useState<string>('');

    let router = useRouter();

    const handleSubmit = async () => {
        let userData = {
            username: username,
            password: password
        };

        const specialCharRegex = /[,;]/;

        if (specialCharRegex.test(username)) {
            setCreatedText("Some special characters are not allowed.");
            setSuccess(false);
            setOpenModal(true);
            return;
        }

        if (password !== '' && security !== '' && username !== '') {
            if (password.length >= 8) {
                const isCreated = await createAccount(userData);
                if (isCreated) {
                    setCreatedText("User created successfully!");
                    setSuccess(true);
                } else {
                    setCreatedText("Failed to create user. Please try again.");
                    setSuccess(false);
                }
            } else {
                setCreatedText("Password must have 8 characters minimum.");
                setSuccess(false);
            }
        } else {
            setCreatedText("Please fill out all fields!");
            setSuccess(false);
        }

        setOpenModal(true);
    };

    return (
        <div className='bg-lblue'>
            <div className='grid'>
                <div className='py-14 text-center'>
                    <p className='text-[48px] font-LuckiestGuy tracking-widest text-dblue cursor-default'>
                        CREATE YOUR USERNAME <br /> AND PASSWORD
                    </p>
                </div>
                <div className='flex justify-center pb-36'>
                    <div className='bigCardBg rounded-md flex justify-center pb-16'>
                        <form className="flex max-w-md flex-col ">
                            <p className='text-center text-[32px] pt-7 pb-2 font-LuckiestGuy tracking-widest text-textGray cursor-default'>
                                USERNAME
                            </p>
                            <input id="username" maxLength={20} type="text" placeholder='Username' className='inputSize rounded-md' onChange={(e) => setUsername(e.target.value)} required />

                            <p className='text-center text-[32px] pt-7 pb-2 font-LuckiestGuy tracking-widest text-textGray cursor-default'>
                                PASSWORD
                            </p>
                            <input id="password1" type="password" placeholder='Password' className='inputSize rounded-md' onChange={(e) => setPassword(e.target.value)} required />
                            <p className='text-center cursor-default'>More than one syllable reccomended</p>

                            {/* never got to creating the forgotpassword :/ */}
                            {/* <p className='text-center text-[32px] pt-7 pb-2 font-LuckiestGuy tracking-widest text-textGray cursor-default'>
                                Security Question
                            </p>

                            <select className='rounded-t-md'>
                                <option value="question1">What is your favorite Movie?</option>
                                <option value="question2">What city were you born in?</option>
                                <option value="question3">What is your favorite color?</option>
                            </select>

                            <input onChange={(e) => setSecurity(e.target.value)} type='text' placeholder="Enter your answer" className='rounded-b-md' /> */}

                            <p onClick={() => router.push('/')} className='text-center pt-5 cursor-pointer underline'>
                                Already have an account?
                            </p>

                            <div className='flex justify-center pt-8 p-0 m-0'>
                                <Button onClick={() => handleSubmit()} className='loginBtn p-0 m-0 bg-dblue'>
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
                                            <Button color="gray" className={`${success ? 'hidden' : 'block'}`} onClick={() => setOpenModal(false)}>
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
    );
};

export default SignUpPage;
