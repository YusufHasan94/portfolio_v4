'use client';
import Image from 'next/image'
import React from 'react'
import hero from "@/assets/hero.webp"
import {motion} from "framer-motion";
import { fadeIn } from '@/app/variants';

const Hero = () => {
  return (
    <motion.div
    variants={fadeIn("up", 0.2)}
    initial="hidden"
    whileInView={"show"}
    viewport={{once:true}}
    className='py-[100px] flex items-center'
    >
    <div className='flex flex-col gap-10'>
        <span className='font-semibold text-xl'>Hi, I'm Yusuf Hasan </span>
        <p className='font-semibold text-[80px]'>Professional Software Engineer</p>
        <p className='font-normal text-xl'>Focused on delivering impactful and scalable digital solutions.</p>
    </div>
    <div className=''>
        <Image src={hero} alt='hero image'/>
    </div>
    </motion.div>
  )
}

export default Hero
