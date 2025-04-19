'use client'
import { motion } from "framer-motion";
import { fadeIn } from '@/app/variants';
import html from "@/assets/icons/html.svg"
import css from "@/assets/icons/css.svg"
import js from "@/assets/icons/javascript.svg"
import typescript from "@/assets/icons/typescript.svg"
import tailwindcss from "@/assets/icons/tailwind-css.svg"
import reactjs from "@/assets/icons/react.svg"
import nextjs from "@/assets/icons/nextjs.svg"
import nodejs from "@/assets/icons/node-js.svg"
import expressjs from "@/assets/icons/express-js.svg"
import mongodb from "@/assets/icons/mongodb.svg"
import wordpress from "@/assets/icons/wordpress.svg"
import elementor from "@/assets/icons/elementor.svg"
import docker from "@/assets/icons/docker.svg"
import aws from "@/assets/icons/aws.svg"
import Image from "next/image";
import Marquee from "react-fast-marquee";


const techSkills1 = [
  {
    name: "HTML",
    image: html
  },
  {
    name: "CSS",
    image: css
  },
  {
    name: "JavaScript",
    image: js
  },
  {
    name: "TypeScript",
    image: typescript
  },
  {
    name: "Tailwind",
    image: tailwindcss
  },
  {
    name: "Wordpress",
    image: wordpress
  },
  {
    name: "Elementor",
    image: elementor
  }
]

const techSkills2 = [

  {
    name: "React",
    image: reactjs
  },
  {
    name: "Next",
    image: nextjs
  },
  {
    name: "Node",
    image: nodejs
  },
  {
    name: "Express",
    image: expressjs
  },
  {
    name: "MongoDB",
    image: mongodb
  },
  {
    name: "Docker",
    image: docker
  },
  {
    name: "AWS",
    image: aws
  }
]


const Expertise = () => {


  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true }}
      className="mt-10 lg:mt-[112px] scroll-mt-20"
      id="skills"
    >
      <div className="flex gap-4 items-center">
        <h1 className="text-[32px] lg:text-4xl font-semibold text-start">Professional Skills & Technical Proficiency</h1>
        <div className="w-[152px] h-[2px] bg-[#C778DD]"></div>
      </div>
      <div className="flex justify-center pt-10 lg:pt-12 lg:pb-[106px] flex-wrap gap-10">
        <Marquee pauseOnClick={true}>
          {techSkills1.map((skill, index) => (
            <div
              key={index}
              className="flex items-center justify-around gap-4 border border-[#C778DD] px-2.5 py-1 lg:px-2.5 lg:py-2.5 rounded-xl cursor-pointer bg-[#FFF]/5 min-w-[180px] mx-5">
              <Image src={skill?.image} alt={skill.name} className="w-6 lg:w-12" />
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
              className="flex items-center justify-around gap-4 border border-[#C778DD] px-2.5 py-1 lg:px-2.5 lg:py-2.5 rounded-xl cursor-pointer bg-[#FFF]/5 min-w-[180px] mx-5">
              <Image src={skill?.image} alt={skill.name} className="w-6 lg:w-12" />
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
