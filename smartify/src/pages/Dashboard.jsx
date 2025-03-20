import React from 'react';
import Logo from '../assets/logoW.png';
import img from '../assets/dimg.png';

const Dashboard = () => {
    return (
        <div className="bg-gradient-to-b from-[#1a0e64] to-[#1ab4cc] h-full w-screen">
            <nav className="flex justify-between items-center p-4">
                <div>
                    <img src={Logo} alt='logo' className='h-[2.5rem] w-[6.5rem] ml-[1.5rem] mt-[1rem]' />
                </div>
                <div className="flex gap-[3rem] mr-[2rem]">
                    <a href='http://localhost:5173/layout' className='hover:border-2 hover:bg-indigo-500 hover:rounded-[0.5rem] hover:text-white hover:px-[0.3rem] transition-all duration-200'><p className='hover:text-amber-50 text-indigo-700'>Home</p></a>
                    <a href='http://localhost:5173/games' className='hover:border-2 hover:bg-indigo-500 hover:rounded-[0.5rem] hover:text-white hover:px-[0.3rem] transition-all duration-200'><p className='hover:text-amber-50 text-indigo-700'>Games</p></a>
                    <a href='/' className='hover:border-2 hover:bg-indigo-500 hover:rounded-[0.5rem] hover:text-white hover:px-[0.3rem] transition-all duration-200'><p className='hover:text-amber-50 text-indigo-700'>Contact Us</p></a>
                </div>
            </nav>

            <div className='flex'>
                <div className='flex flex-col gap-2'>
                    <p className='text-white ml-[3rem] mt-[5rem] text-4xl font-bold font-mono'>Urban Planning and Analytics Dashboard</p>
                    <p className='text-amber-50 font-extralight ml-[3rem]'>Designed to empower smarter, data-driven city planning and management, enhancing urban efficiency, sustainability, and livability.</p>
                    <a href='http://localhost:5173/login' className='ml-[3rem] mt-4'><button className='text-indigo-700 bg-transparent border-1 rounded-full p-1 px-6 text-[1rem]  hover:bg-[#00FFFF] hover:text-black transition duration-300'>Login</button></a>
                </div>
                <div>
                    <img src={img}  />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
