'use client';
import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import { motion } from "framer-motion";
import { FaArrowRight } from 'react-icons/fa';

const Header = () => {
  const [handleActive, setHandleActive] = useState(false);

  const handleToggle = (value: boolean) => {
    setHandleActive(value);
    console.log(handleActive);
  }

  return (
    <div className='px-5 py-10 sticky top-0 bg-white/90 z-50'>
      <div className='max-w-[1240px] mx-auto'>
        <div id="desktop-nav" className='hidden lg:flex justify-between items-center'>
          <span className='font-semibold text-3xl'>Yusuf Hasan</span>
          <ul className='flex items-center gap-10'>
            <li className='font-normal text-2xl hover:font-medium'><a href="#skills">Skills</a></li>
            <li className='font-normal text-2xl hover:font-medium'><a href="#services">Services</a></li>
            <li className='font-normal text-2xl hover:font-medium'><a href="#projects">Projects</a></li>
            <li className='font-normal text-2xl hover:font-medium'><a href="#career">Career</a></li>
            <li className='font-normal text-2xl hover:font-medium'><a href="#contact">Contact</a></li>
          </ul>
          <button className='font-normal text-2xl px-6 py-1.5 border rounded-lg border-[#4f53ff]'>
            <a href="#contact">Hire Me</a>
          </button>
        </div>
        <div id="mobile-nav" className='lg:hidden flex flex-col justify-between'>
          <div className='flex items-center justify-between'>
            <span className='font-semibold text-xl text-center'>Yusuf Hasan</span>
            {handleActive ?
              <button onClick={() => handleToggle(false)} area-label="mobileMenuOpen"><AiOutlineCloseCircle style={{ fontSize: "30px" }} /></button>
              :
              <button onClick={() => handleToggle(true)} area-label="mobileMenuClose"><GiHamburgerMenu style={{ fontSize: "30px" }} /></button>
            }
          </div>
          {handleActive &&
            (<motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className='mt-10'>
              <ul className='flex flex-col items-start gap-10'>
                <li className='font-normal text-2xl hover:font-medium flex items-center gap-2'><a href="#skills">Skills</a><FaArrowRight /></li>
                <li className='font-normal text-2xl hover:font-medium flex items-center gap-2'><a href="#services">Services</a><FaArrowRight /></li>
                <li className='font-normal text-2xl hover:font-medium flex items-center gap-2'><a href="#projects">Projects</a><FaArrowRight /></li>
                <li className='font-normal text-2xl hover:font-medium flex items-center gap-2'><a href="#career">Career</a><FaArrowRight /></li>
                <li className='font-normal text-2xl hover:font-medium flex items-center gap-2'><a href="#contact">Contact</a><FaArrowRight /></li>
              </ul>
              <button className='mt-10 font-normal text-2xl px-6 py-2 border rounded-lg border-[#4f53ff] w-full'>
                <a href="#contact">Hire Me</a>
              </button>
            </motion.div>)}
        </div>
      </div>
    </div>
  )
}
export default Header