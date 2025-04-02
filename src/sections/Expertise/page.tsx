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
      className="mt-20"
    >
      <h1 className="text-4xl font-semibold text-center">Areas of Expertise</h1>
      <div className="flex justify-center py-20 flex-wrap gap-10">
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
