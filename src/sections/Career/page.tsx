'use client'
import { motion } from "framer-motion";
import { fadeIn } from '@/app/variants';
import { useEffect, useState } from "react";

const allMilestones = [
    {
        company: "Vivasoft Limited",
        title: "Software Engineer L-1",
        description: "I specialize in developing high-performance WordPress websites with optimization, handling DevOps tasks for streamlined deployment, and building dynamic frontend interfaces using React UI library for seamless user experiences.",
        stating: "2024",
        ending: "present",
    }
]

interface props {
    company: string,
    title: string,
    description: string,
    stating: string,
    ending: string,
    
}


const Career = () => {
    const [milestones, setmilestones] = useState<props[]>([]);

    useEffect(() => {
        setmilestones(allMilestones);
    }, [])

    return (
        <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
            className="py-10 lg:py-20"
            id="career"
        >
            <h1 className="text-3xl lg:text-4xl font-semibold text-center">Career Highlights</h1>
            <div className="flex py-10 lg:py-20 gap-10">
                {
                    milestones.map((milestone, index) => (
                        <div key={index} className="border-b-2 border-[#6f74ff] rounded-lg px-7 py-4 flex flex-col lg:flex-row items-start lg:items-center gap-5">
                            <div className="lg:w-[25%] flex flex-col">
                                <span className="font-semibold">{milestone.company}</span>
                                <span className="text-2xl font-semibold">{milestone.title}</span>
                            </div>
                            <p className="lg:w-[60%] text-base font-normal lg:px-10">{milestone.description}</p>
                            <p className="lg:w-[15%] capitalize font-semibold text-lg text-end">{milestone.stating}-{milestone.ending}</p>
                        </div>
                    ))
                }
            </div>
        </motion.div>
    )
}

export default Career
