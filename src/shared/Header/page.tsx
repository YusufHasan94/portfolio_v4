import React from 'react'

const Header = () => {
  return (
    <div className='max-w-[1240px] mx-auto flex justify-between items-center px-5 py-10 sticky top-0'>
      <span className='font-semibold text-xl'>Yusuf Hasan</span>
      <ul className='flex items-center gap-10'>
        <li className='font-normal text-[17px] hover:font-medium'><a href="">Service</a></li>
        <li className='font-normal text-[17px] hover:font-medium'><a href="">Projects</a></li>
        <li className='font-normal text-[17px] hover:font-medium'><a href="">About</a></li>
        <li className='font-normal text-[17px] hover:font-medium'><a href="">Contact</a></li>
      </ul>
      <button className='font-normal text-[17px] px-3 py-2 border rounded-lg border-[#0a0a0a]'>
        <a href="#">Download CV</a>
      </button>
    </div>
  )
}
export default Header