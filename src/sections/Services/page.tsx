'use client'
import { motion } from "framer-motion";
import { fadeIn } from '@/app/variants';

const Services = () => {
    return (
        <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
            className="mt-20"
        >
            <h1 className="text-4xl font-semibold text-center">Areas of Expertise</h1>
            <div className="flex justify-center py-10 flex-wrap gap-10">

            </div>
        </motion.div>
    )
}

export default Services
