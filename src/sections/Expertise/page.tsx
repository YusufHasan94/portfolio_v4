'use client'
import { motion } from "framer-motion";
import { fadeIn } from '@/app/variants';
import { useEffect, useState } from "react";
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
import Image, { StaticImageData } from "next/image";


const techSkills = [
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
    name: "Tailwind CSS",
    image: tailwindcss
  },
  {
    name: "React JS",
    image: reactjs
  },
  {
    name: "Next JS",
    image: nextjs
  },
  {
    name: "Node JS",
    image: nodejs
  },
  {
    name: "Express JS",
    image: expressjs
  },
  {
    name: "MongoDB",
    image: mongodb
  },
  {
    name: "Wordpress",
    image: wordpress
  },
  {
    name: "Elementor",
    image: elementor
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

interface props {
  name: string,
  image: StaticImageData
}


const Expertise = () => {
  const [skills, setSkills] = useState<props[]>([]);

  useEffect(() => {
    setSkills(techSkills);
  }, [])

  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true }}
      className="py-10 lg:py-20 scroll-mt-20"
      id="skills"
    >
      <h1 className="text-3xl lg:text-4xl font-semibold text-center">Professional Skills & Technical Proficiency</h1>
      <div className="flex justify-center py-10 lg:py-20 flex-wrap gap-10">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="w-40 flex flex-col items-center border border-[#4F53FF] px-4 pt-3 pb-1 rounded-xl 
             bg-gradient-to-tr from-[#4F53FF] via-[#6f74ff] to-white 
             shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
            <Image src={skill?.image} alt={skill.name} className="w-14" />
            <span className="text-sm px-4 py-2 text-[#fff] uppercase">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Expertise
