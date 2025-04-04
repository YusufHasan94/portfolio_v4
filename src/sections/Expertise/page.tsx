'use client'
import { motion } from "framer-motion";
import { fadeIn } from '@/app/variants';
import { useEffect, useState } from "react";

const techSkills = [
  "HTML", "CSS", "JavaScript", "TypeScript", "TailwindCSS", "React JS", "Next JS", "Node JS",
  "Express JS", "MongoDB", "Wordpress", "Elementor", "Docker", "AWS"
]


const Expertise = () => {
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    setSkills(techSkills);
  }, [])

  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true }}
      className="py-10 lg:py-20"
      id="skills"
    >
      <h1 className="text-3xl lg:text-4xl font-semibold text-start">Professional Skills & Technical Proficiency</h1>
      <div className="flex justify-center py-10 lg:py-20 flex-wrap gap-10">
        {skills.map((skill, index) => (
          <span key={index} className="text-base px-4 py-2 bg-[#4F53FF] rounded-lg text-white font-semibold cursor-default">
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default Expertise
