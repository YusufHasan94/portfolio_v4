import React from 'react'
import { CgMail } from 'react-icons/cg'
import { FaArrowRight, FaGithub, FaLinkedin, FaRegCopyright } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='bg-[#282c33] border-t border-[#ABB2BF]'>
      <div className='max-w-[1240px] mx-auto text-white px-5 bg-[#2c3036] pt-10 lg:pt-20 pb-5'>
        <div className='flex flex-col lg:flex-row justify-between gap-10'>
          <div className='lg:w-72 flex flex-col justify-between'>
            <div>
              <span className='font-semibold text-2xl'>Yusuf Hasan</span>
              <p>Building reliable solutions with innovation and precision.</p>
            </div>
            <p className='flex items-center gap-2 mt-5'><FaRegCopyright /> 2025 Yusuf Hasan</p>
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
              <li className='flex gap-2 items-center px-4 py-2 border border-white rounded-lg text-lg'><FaGithub /> <a href="https://github.com/YusufHasan94">Github</a></li>
              <li className='flex gap-2 items-center px-4 py-2 border border-white rounded-lg text-lg'><FaLinkedin /><a href="https://www.linkedin.com/in/md-yusuf-hasan/">LinkedIn</a></li>
              <li className='flex gap-2 items-center px-4 py-2 border border-white rounded-lg text-lg'><CgMail /> <a href="mailto:yhpolok@gmail.com">Gmail</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
