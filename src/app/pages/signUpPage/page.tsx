'use client'

import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const signUpPage = () => {

    let router = useRouter();

    return (
        <div className='bg-lblue vh'>
            <div className='grid grid-flow-row justify-center'>

                <div className='py-14 text-center'>
                    <p className='text-[48px]'>
                        CREATE YOUR USERNAME <br /> AND PASSWORD
                    </p>
                </div>

                <div className='flex justify-center'>
                    <div className='bigCardBg rounded-md flex justify-center'>
                        <form className="flex max-w-md flex-col ">

                            {/* Username and password Input Field */}
                            <p className='text-center text-[32px] pt-7 pb-2'>
                                USERNAME
                            </p>
                            <input id="username" type="text" placeholder='Username' className='inputSize rounded-none' required />
                            
                            <p className='text-center  text-[32px] pt-7 pb-2'>
                                PASSWORD
                            </p>
                            <input id="password1" type="password" placeholder='Password' className='inputSize rounded-none' required />
                            <p className='text-center'>More than one syllable reccomended</p>

                            <p onClick={() => router.push('/')} className='text-center pt-5'>
                                Already have an account?
                            </p>

                            <div className='flex justify-center pt-8 p-0 m-0'>
                                <Button className='loginBtn p-0 m-0'>
                                    <p className='text-[22px] text-center'>
                                        Create Account
                                    </p>
                                </Button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default signUpPage
