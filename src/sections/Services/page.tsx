'use client'
import { motion } from "framer-motion";
import { fadeIn } from '@/app/variants';
import Image, { StaticImageData } from "next/image";
import frontend from "@/assets/services/frontend.webp"
import fullstack from "@/assets/services/fullstack.webp"
import wordpress from "@/assets/services/wordpress.webp"

const allServices = [
    {
        title: "Frontend Development",
        description: "Building responsive, high-performance, and visually appealing web interfaces",
        image: frontend,
    },
    {
        title: "Full Stack Development",
        description: "Creating scalable web applications with modern frontend and backend technologies",
        image: fullstack,
    },
    {
        title: "WordPress Development",
        description: "Developing custom WordPress themes, plugins, and optimized websites",
        image: wordpress,
    }
]

interface props {
    title: string,
    description: string,
    image: StaticImageData
}


const Services = () => {

    return (
        <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
            className="pb-10 lg:pb-[106px] scroll-mt-20"
            id="services"
        >
            <div className="flex gap-4 items-center">
                <h1 className="text-[32px] lg:text-[32px] font-semibold text-start">Crafting Digital Solutions</h1>
                <div className="w-[152px] h-[2px] bg-[#C778DD]"></div>
            </div>
            <div className="flex flex-col lg:flex-row pt-10 lg:pt-12 gap-10">
                {
                    allServices.map((service, index) => (
                        <div key={index} className="lg:w-1/3  border border-[#ABB2BF] rounded-lg px-7 py-4 flex flex-col gap-3">
                            <Image src={service?.image} alt="" className="w-40 rounded-lg" />
                            <span className="text-2xl font-semibold">{service.title}</span>
                            <p className="text-base font-normal">{service.description}</p>
                        </div>
                    ))
                }
            </div>
        </motion.div>
    )
}

export default Services
