import React, { useState, useEffect } from 'react';
import Weather from "../components/Weather";
import Pollution from "../components/Pollution";
import News from "../components/News";
import Places from "../components/Places";
import CityName from "../components/CityName";
import { Sun, Moon } from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';

const parentCardStyle =
  "flex justify-start text-black bg-gradient-to-b from-[#1a0e64] to-[#1ab4cc] dark:text-white bg-white p-7 rounded-xl border border-sky-400 shadow-[0_0_9px_theme('colors.sky.400')] space-x-4 w-fit ml-4 hover:scale-102 hover:border-2 transition-transform duration-300 ease-in-out mt-15";

const childCardStyle =
  "text-black dark:text-white bg-gray-100 dark:bg-gray-900 p-4 rounded-xl border border-sky-400 hover:shadow-[0_0_7px_theme('colors.sky.400')] hover:scale-102 hover:border-2 transition-transform duration-300 ease-in-out"; 

function Layout() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Navbar */}
      <nav className="bg-sky-300 pl-10 py-3 dark:bg-gray-900 dark:text-white flex justify-between items-center m-0 p-0">
        <div>
          <a href="#home" className="mx-4">Home</a>
          <a href="#weather" className="mx-4">Weather</a>
          <a href="#pollution" className="mx-4">Pollution</a>
          <a href="#news" className="mx-4">News</a>
          <a href="#places" className="mx-4">Places</a>
        </div>

        {/* Toggle Theme Button */}
        <p 
          onClick={toggleDarkMode} 
          className="mx-4 p-2 transition-colors duration-300 flex items-center justify-center cursor-pointer"
        >
          <AnimatePresence mode="wait" initial={false}>
            {darkMode ? (
              <motion.div
                key="sun"
                initial={{ rotate: -180, scale: 0.8, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 180, scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Sun className="w-6 h-6 text-yellow-600" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 180, scale: 0.8, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: -180, scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Moon className="w-6 h-6 text-black" />
              </motion.div>
            )}
          </AnimatePresence>
        </p>
      </nav>

      <div>
        {/* Home Section */}
        <section id="home" className="flex justify-center items-center">
          <CityName/>
        </section>

        <div className='flex'>
          {/* Weather Section */}
          <section id="weather" className="flex w-[35%] mt-5">
            <Weather parentstyles={parentCardStyle} childstyles={childCardStyle} />
          </section>

          {/* Pollution Section */}
          <section id="pollution" className="flex w-[65%] justify-center items-center">
            <Pollution parentstyles={parentCardStyle} childstyles={childCardStyle} />
          </section>
        </div>
      

        {/* News Section */}
        <section id="news" className="flex justify-center items-center">
          <News parentstyles={parentCardStyle} childstyles={childCardStyle} />
        </section>
        
        {/* Places Section */}
        <section id="places" className=" flex justify-center">
             <Places parentstyles={parentCardStyle} childstyles={childCardStyle} />
          </section>

      </div>
    </div>
  );
}

export default Layout;
