'use client'
import Image from 'next/image'
import developer from "@/assets/developer.webp"
import { motion } from "framer-motion";
import { fadeIn } from '@/app/variants';
import dots from "@/assets/dots.png";
import pattern from "@/assets/pattern.png";

const Hero = () => {
  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true }}
      className='pt-20 lg:pt-[123px] flex flex-col lg:flex-row items-center justify-between gap-20 lg:gap-0 '
    >
      <div className='flex flex-col gap-10 lg:w-1/2'>
        <h1 className='font-semibold text-4xl lg:text-[32px]'>Software Engineer<br/>with DevOps Expertise</h1>
        <p className='font-normal text-lg'>Focused on delivering impactful and scalable digital solutions.</p>
        <div className='flex gap-5 space-y-4'>
          <a href="#contact" className='font-normal px-6 py-3 border rounded-lg border-[#C778DD] text-xl'>Contact Me</a>
        </div>
      </div>
      <div className="flex justify-end items-center lg:w-1/2 relative">
        <div className="flex flex-col">
          <Image src={developer} alt='hero image' className="w-full h-full z-30"/>
          <div className='flex items-center gap-2.5 border border-[#ABB2BF] p-2'>
            <div className='size-4 bg-[#C778DD]'></div>
            <p className='text-lg'>Currently working on Portfolio</p>
          </div>
          <Image src={dots} alt='dots' className='absolute bottom-[56px] right-0 z-20'/>
          <Image src={pattern} alt='pattern' className='absolute top-20 left-10'/>
        </div>
      </div>
    </motion.div>
  )
}

export default Hero
