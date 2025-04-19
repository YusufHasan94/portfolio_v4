'use client';
import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import { motion } from "framer-motion";
import Image from 'next/image';
import union from "@/assets/union.svg"
import Link from 'next/link';


const menuItems = ["skills", "services", "projects", "career", "contact"]


const Header = () => {
  const [handleActive, setHandleActive] = useState(false);

  const handleToggle = (value: boolean) => {
    setHandleActive(value);
    console.log(handleActive);
  }

  return (
    <div className='sticky top-0  z-50'>
      <div className='max-w-[1240px] mx-auto'>
        <div id="desktop-nav" className='hidden lg:flex justify-between items-center bg-[#2c3036]/70 pt-8 pb-2 px-2 z-40'>
          <div className='flex gap-2 justify-center'>
            <Image src={union} alt="union" />
            <Link href="/" className='font-semibold text-xl'>
              Yusuf Hasan
            </Link>
          </div>
          <ul className='flex items-center gap-10'>
            {
              menuItems.map((item, index) => (
                <li key={index} className='font-normal text-xl relative inline-block pb-1 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-[#C778DD] before:transition-all before:duration-300 hover:before:w-full capitalize'><a href={`#${item}`}>{item}</a></li>
              ))
            }
          </ul>
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