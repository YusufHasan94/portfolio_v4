import React from 'react'

const Header = () => {
  return (
    <div className='px-5 py-10 sticky top-0 bg-white/90 z-50'>
      <div className='max-w-[1240px] mx-auto flex justify-between items-center'>
        <span className='font-semibold text-xl'>Yusuf Hasan</span>
        <ul className='flex items-center gap-10'>
          <li className='font-normal text-[17px] hover:font-medium'><a href="#skills">Skills</a></li>
          <li className='font-normal text-[17px] hover:font-medium'><a href="#services">Services</a></li>
          <li className='font-normal text-[17px] hover:font-medium'><a href="#projects">Projects</a></li>
          <li className='font-normal text-[17px] hover:font-medium'><a href="#career">Career</a></li>
          <li className='font-normal text-[17px] hover:font-medium'><a href="#contact">Contact</a></li>
        </ul>
        <button className='font-normal text-[17px] px-6 py-2 border rounded-lg border-[#4f53ff]'>
          <a href="#contact">Hire Me</a>
        </button>
      </div>
    </div>
  )
}
export default Header