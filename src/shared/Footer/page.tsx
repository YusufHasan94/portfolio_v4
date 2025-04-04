import React from 'react'
import { CgMail } from 'react-icons/cg'
import { FaArrowRight, FaGithub, FaLinkedin, FaRegCopyright } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='bg-[#4F53FF] pt-20 pb-5'>
      <div className='max-w-[1280px] mx-auto text-white'>
        <div className='flex justify-between gap-10'>
          <div className='w-72 flex flex-col justify-between'>
            <div>
              <span className='font-semibold text-2xl'>Yusuf Hasan</span>
              <p>Building reliable solutions with innovation and precision.</p>
            </div>
            <p className='flex items-center gap-2'><FaRegCopyright /> 2025 Yusuf Hasan</p>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='font-semibold text-2xl'>Navigation</span>
            <ul className='flex flex-col gap-2'>
              <li className='font-normal text-[17px] flex gap-2 items-center'><FaArrowRight /><a href="#skills">Skills</a></li>
              <li className='font-normal text-[17px] flex gap-2 items-center'><FaArrowRight /><a href="#services">Services</a></li>
              <li className='font-normal text-[17px] flex gap-2 items-center'><FaArrowRight /><a href="#projects">Projects</a></li>
              <li className='font-normal text-[17px] flex gap-2 items-center'><FaArrowRight /><a href="#career">Career</a></li>
              <li className='font-normal text-[17px] flex gap-2 items-center'><FaArrowRight /><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='font-semibold text-2xl'>Follow Me</span>
            <ul className='flex gap-4 flex-wrap'>
              <li className='flex gap-2 items-center px-4 py-2 border border-white rounded-lg text-lg'><FaGithub /> Github</li>
              <li className='flex gap-2 items-center px-4 py-2 border border-white rounded-lg text-lg'><FaLinkedin /> LinkedIn</li>
              <li className='flex gap-2 items-center px-4 py-2 border border-white rounded-lg text-lg'><CgMail /> Gmail</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
