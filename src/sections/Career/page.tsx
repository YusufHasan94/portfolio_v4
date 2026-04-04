'use client'
import { motion } from "framer-motion";
import { fadeIn } from '@/app/variants';
import Accordion from "@/components/Accordion";
import dots from "@/assets/dots.png";
import pattern from "@/assets/pattern.png";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { CareerMilestone } from '@/types/portfolio';

const Career = () => {
    const [allMilestones, setAllMilestones] = useState<CareerMilestone[]>([]);

    useEffect(() => {
        const fetchCareer = async () => {
            try {
                const response = await fetch('/api/portfolio/career');
                const data = await response.json();

                // Check if response is successful and data is an array
                if (!response.ok || !Array.isArray(data)) {
                    console.error('Error fetching career data:', data);
                    setAllMilestones([]);
                    return;
                }

                setAllMilestones(data);
            } catch (error) {
                console.error('Error fetching career data:', error);
                setAllMilestones([]);
            }
        };

        fetchCareer();
    }, []);

    return (
        <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
            className="pb-10 lg:pb-[106px] scroll-mt-20"
            id="career"
        >
            <div className="flex gap-4 items-center">
                <h1 className="text-[24px] lg:text-[32px] font-semibold text-start">Career Highlights</h1>
                <div className="w-[50px] lg:w-[152px] h-[2px] bg-[#C778DD]"></div>
            </div>
            <div className="flex flex-col lg:flex-row-reverse justify-between pt-10 lg:pt-12">
                <div className="w-full lg:w-1/2 flex flex-col items-end justify-start">
                    {
                        allMilestones.map((milestone, index) => (
                            <Accordion
                                key={index}
                                milestone={milestone}
                            />
                        ))
                    }
                </div>
                <div className="w-full lg:w-1/2 min-h-[282px] relative mt-12 lg:mt-0">
                    <Image src={pattern} alt="pattern" className="absolute bottom-0 left-5" />
                    <Image src={dots} alt="dots" className="absolute top-0 left-20" />
                    <Image src={dots} alt="dots" className="absolute bottom-10 right-[250px]" />
                    <div className="size-[86px] border border-[#ABB2BF] absolute top-0 right-[150px]"></div>
                    <div className="size-[52px] border border-[#ABB2BF] absolute bottom-0 right-[95px]"></div>

                </div>
            </div>
        </motion.div>
    )
}

export default Career
