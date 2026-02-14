'use client'
import { motion } from "framer-motion";
import { fadeIn } from '@/app/variants';
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from 'react';
import { Skill } from '@/types/portfolio';


const Expertise = () => {
  const [techSkills1, setTechSkills1] = useState<Skill[]>([]);
  const [techSkills2, setTechSkills2] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/portfolio/skills');
        const data = await response.json();

        // Check if response is successful and data is an array
        if (!response.ok || !Array.isArray(data)) {
          console.error('Error fetching skills:', data);
          return;
        }

        setTechSkills1(data.filter(skill => skill.category === 1));
        setTechSkills2(data.filter(skill => skill.category === 2));
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);

  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true }}
      className="mt-10 lg:mt-[112px] pb-10 lg:pb-0 scroll-mt-20"
      id="skills"
    >
      <div className="flex gap-4 items-center">
        <h1 className="text-[24px] lg:text-[32px] font-semibold text-start">Professional Skills & Technical Proficiency</h1>
        <div className="w-[50px] lg:w-[152px] h-[2px] bg-[#C778DD]"></div>
      </div>
      <div className="flex justify-center pt-10 lg:pt-12 lg:pb-[106px] flex-wrap gap-10">
        <Marquee pauseOnClick={true}>
          {techSkills1.map((skill, index) => (
            <div
              key={index}
              className="flex items-center justify-around gap-4 border border-[#C778DD] px-2.5 py-1 lg:px-2.5 lg:py-2.5 rounded-xl cursor-pointer bg-[#FFF]/5 min-w[160px] lg:min-w-[180px] mx-5">
              <Image src={skill?.image} alt={skill.name} width={48} height={48} className="w-8 lg:w-12" />
              <span className="text-base font-medium text-[#fff] capitalize">
                {skill.name}
              </span>
            </div>
          ))}
        </Marquee>

        <Marquee direction="right" pauseOnClick={true}>
          {techSkills2.map((skill, index) => (
            <div
              key={index}
              className="flex items-center justify-around gap-4 border border-[#C778DD] px-2.5 py-1 lg:px-2.5 lg:py-2.5 rounded-xl cursor-pointer bg-[#FFF]/5 min-w[160px] lg:min-w-[180px] mx-5">
              <Image src={skill?.image} alt={skill.name} width={48} height={48} className="w-8 lg:w-12" />
              <span className="text-base font-medium text-[#fff] capitalize">
                {skill.name}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </motion.div>
  )
}

export default Expertise
