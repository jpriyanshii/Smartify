import React from "react";
import img from "../assets/forgot.jpg";
import logo from '../assets/logoB.png'
import Input from '../components/Input'

const Forgot=()=>{
    return(
        <>
        <div className="flex">
            {/* img */}
            <div className='hidden sm:flex'>
                <img src={img} className=' h-full object-cover absolute left-0 top-0 bottom-0'></img>
            </div>

            {/* reset */}
            <div className='flex justify-center items-center w-[60%] absolute sm:top-0 sm:right-0 md:w-1/2 lg:w-1/3'>
                <img src={logo} className='h-[2rem] w-[5rem] absolute top-0 right-[45%] sm:right-4 m-[1.5rem] mt-[1rem]'></img>
                <div className=" w-[22rem] h-44 absolute top-[10rem] right-[15rem]">
                    <p className="text-5xl font-bold">Forgot</p>
                    <p className="text-5xl font-bold mb-4">Your Password?</p>
                    <Input type='text' placeholder="E-mail"/>
                    <p className='w-[12rem] h-[2.75rem] mt-4 bg-blue-600 rounded-[0.63rem] text-white font-semibold text-[1.25rem] flex items-center justify-center'>Reset Password</p>
                    <a href='http://localhost:5173/login' className='cursor-pointer'><p className="mt-[1rem]">Back to login</p></a>
                </div>
            </div>

        </div>
        </>
    )
}
export default Forgot;