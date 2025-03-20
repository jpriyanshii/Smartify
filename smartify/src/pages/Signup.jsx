import React from "react";
import logo from '../assets/logoB.png'
import Input from '../components/Input'
import img from '../assets/signup.jpg'

const Signup=()=>{
    return(
        <>
        <div className="flex">
            {/* img */}
            <div className='hidden sm:flex'>
                <img src={img} className='w-[60%] h-full object-cover absolute left-0 top-0 bottom-0'></img>
            </div>

            {/* signup */}
            <div className='flex justify-center items-center w-full absolute sm:top-0 sm:right-0 md:w-1/2 lg:w-1/3'>
                <img src={logo} className='h-[2rem] w-[5rem] absolute top-0 right-[45%] sm:right-4 m-[1.5rem] mt-[1rem]'></img>
                <div className='absolute left-[40%] right-[55%] top-[6rem] size-[20rem] sm:left-10'>
                   <div className='flex flex-col text-[1.9rem] text-blue-950 sm:left-10'>
                      <p>Welcome to Smartify</p>
                      <p>Let's get you started!</p>
                    </div>
                    <form className='flex flex-col gap-[1rem] mt-[2.25rem]'> 
                       <Input type='text' placeholder="Full name"/>
                       <Input type='text' placeholder="Phone no."/>
                       <Input type='text' placeholder="E-mail"/>
                       <Input type='password' placeholder="Password"/>
                       <a href="http://localhost:5173/"><p className='w-[9rem] h-[2.75rem] bg-blue-600 cursor-pointer rounded-[0.63rem] text-white font-semibold text-[1.25rem] flex items-center justify-center'>Sign up</p></a>
                     </form>
                     <div className='flex gap-1 mt-[0.75rem]'>
                          <p>Existing user?</p> 
                          <a href='http://localhost:5173/login' className='cursor-pointer'>Login</a>
                     </div>
                 </div>
            </div>

        </div>
        </>
    )
}
export default Signup;