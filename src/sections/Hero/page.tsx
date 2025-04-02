'use client'
import Image from 'next/image'
import developer from "@/assets/developer.webp"
import { motion } from "framer-motion";
import { fadeIn } from '@/app/variants';

const Hero = () => {
  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true }}
      className='py-40 flex items-center justify-between'
    >
      <div className='flex flex-col gap-10 w-7/12'>
        <p className='font-semibold text-[80px]'>Professional Software Engineer</p>
        <p className='font-normal text-xl'>Focused on delivering impactful and scalable digital solutions.</p>
        <div className='flex gap-5'>
          <button className='font-normal text-[17px] px-3 py-2 border rounded-lg border-[#4f53ff]'>
            <a href="#">Contact Us</a>
          </button>
          <button className='font-normal text-[17px] px-3 py-2 border rounded-lg bg-[#4f53ff] border-transparent text-white'>
            <a href="#">Download CV</a>
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="relative w-80 h-80">
          <motion.div
            className="absolute inset-0 w-full h-full rounded-full border-4 border-transparent"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
            style={{
              background:
                "conic-gradient(transparent 0deg, #4f53ff 90deg, transparent 180deg, #ffffff 270deg, transparent 360deg)",
              maskImage: "radial-gradient(circle, transparent 65%, black 75%)",
            }}
          />
          <Image src={developer} alt='hero image' className="w-full h-full rounded-full border border-[#4f53ff] object-cover" />
        </div>
      </div>
    </motion.div>
  )
}

export default Hero
