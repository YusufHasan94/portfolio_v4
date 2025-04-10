'use client';
import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import { motion } from "framer-motion";


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
            <li className='font-normal text-xl relative inline-block pb-1 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-[#4f53ff] before:transition-all before:duration-300 hover:before:w-full'><a href="#skills">Skills</a></li>
            <li className='font-normal text-xl relative inline-block pb-1 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-[#4f53ff] before:transition-all before:duration-300 hover:before:w-full'><a href="#services">Services</a></li>
            <li className='font-normal text-xl relative inline-block pb-1 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-[#4f53ff] before:transition-all before:duration-300 hover:before:w-full'><a href="#projects">Projects</a></li>
            <li className='font-normal text-xl relative inline-block pb-1 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-[#4f53ff] before:transition-all before:duration-300 hover:before:w-full'><a href="#career">Career</a></li>
            <li className='font-normal text-xl relative inline-block pb-1 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-[#4f53ff] before:transition-all before:duration-300 hover:before:w-full'><a href="#contact">Contact</a></li>
          </ul>
          <a href="#contact" className='font-normal px-6 py-3 border rounded-lg border-[#4f53ff] text-xl'>Hire Me</a>
        </div>
        <div id="mobile-nav" className='lg:hidden flex flex-col justify-between'>
          <div className='flex items-center justify-between'>
            <span className='font-semibold text-xl text-center'>Yusuf Hasan</span>
            {handleActive ?
              <button onClick={() => handleToggle(false)} id="al" aria-label="mobileMenuOpen"><AiOutlineCloseCircle style={{ fontSize: "30px" }} /></button>
              :
              <button onClick={() => handleToggle(true)} id="al" aria-label="mobileMenuClose"><GiHamburgerMenu style={{ fontSize: "30px" }} /></button>
            }
          </div>
          {handleActive &&
            (<motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className='mt-10'>
              <ul className='flex flex-col items-start gap-7'>
                <li className='font-normal text-xl relative inline-block pb-1 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-[#4f53ff] before:transition-all before:duration-300 hover:before:w-full'><a href="#skills">Skills</a></li>
                <li className='font-normal text-xl relative inline-block pb-1 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-[#4f53ff] before:transition-all before:duration-300 hover:before:w-full'><a href="#services">Services</a></li>
                <li className='font-normal text-xl relative inline-block pb-1 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-[#4f53ff] before:transition-all before:duration-300 hover:before:w-full'><a href="#projects">Projects</a></li>
                <li className='font-normal text-xl relative inline-block pb-1 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-[#4f53ff] before:transition-all before:duration-300 hover:before:w-full'><a href="#career">Career</a></li>
                <li className='font-normal text-xl relative inline-block pb-1 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-[#4f53ff] before:transition-all before:duration-300 hover:before:w-full'><a href="#contact">Contact</a></li>
              </ul>
              <button className='mt-10 font-normal text-xl px-6 py-2 border rounded-lg border-[#4f53ff] w-full'>
                <a href="#contact">Hire Me</a>
              </button>
            </motion.div>)}
        </div>
      </div>
    </div>
  )
}
export default Header