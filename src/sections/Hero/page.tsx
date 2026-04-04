'use client'
import Image from 'next/image'
import developer from "@/assets/developer.webp"
import { motion } from "framer-motion";
import { fadeIn } from '@/app/variants';
import dots from "@/assets/dots.png";
import pattern from "@/assets/pattern.png";
import { useEffect, useState } from 'react';
import { HeroData } from '@/types/portfolio';

const Hero = () => {
  const [heroData, setHeroData] = useState<HeroData>({
    title: 'Software Engineer',
    subtitle: 'with DevOps Expertise',
    description: 'Focused on delivering impactful and scalable digital solutions.',
    currentStatus: 'Currently working on Portfolio'
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch('/api/portfolio/hero');
        const data = await response.json();

        // Check if response is successful and data is an object with required fields
        if (!response.ok || !data || typeof data !== 'object' || data.error) {
          console.error('Error fetching hero data:', data);
          return;
        }

        setHeroData(data);
      } catch (error) {
        console.error('Error fetching hero data:', error);
      }
    };

    fetchHeroData();
  }, []);

  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true }}
      className='pt-20 lg:pt-[123px] flex flex-col lg:flex-row items-center justify-between gap-20 lg:gap-0 '
    >
      <div className='flex flex-col gap-10 lg:w-1/2'>
        <h1 className='font-semibold text-4xl lg:text-[32px]'>{heroData.title}<br />{heroData.subtitle}</h1>
        <p className='font-normal text-lg'>{heroData.description}</p>
        <div className='flex gap-5 space-y-4'>
          <a href="#contact" className='font-normal px-6 py-3 border rounded-lg border-[#C778DD] text-xl'>Contact Me</a>
        </div>
      </div>
      <div className="flex justify-end items-center lg:w-1/2 relative">
        <div className="flex flex-col">
          <Image src={developer} alt='hero image' className="w-full h-full z-30" />
          <div className='flex items-center gap-2.5 border border-[#ABB2BF] p-2'>
            <div className='size-4 bg-[#C778DD]'></div>
            <p className='text-lg'>{heroData.currentStatus}</p>
          </div>
          <Image src={dots} alt='dots' className='absolute bottom-[56px] right-0 z-20' />
          <Image src={pattern} alt='pattern' className='absolute top-20 left-10' />
        </div>
      </div>
    </motion.div>
  )
}

export default Hero
