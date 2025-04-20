'use client'
import { motion } from "framer-motion";
import { fadeIn } from '@/app/variants';
import RecentProjects from "@/components/RecentProjects";



const Projects = () => {

    return (
        <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
            className="pb-10 lg:pb-[106px] scroll-mt-20"
            id="projects"
        >
            <div className="flex gap-4 items-center">
                <h1 className="text-[24px] lg:text-[32px] font-semibold text-start">Showcasing Reliable & Innovative Work</h1>
                <div className="w-[50px] lg:w-[152px] h-[2px] bg-[#C778DD]"></div>
            </div>
            <RecentProjects/>

        </motion.div>
    )
}

export default Projects
