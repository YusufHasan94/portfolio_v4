'use client'
import { motion } from "framer-motion";
import { fadeIn } from '@/app/variants';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { Service } from '@/types/portfolio';

const Services = () => {
    const [allServices, setAllServices] = useState<Service[]>([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('/api/portfolio/services');
                const data = await response.json();

                // Check if response is successful and data is an array
                if (!response.ok || !Array.isArray(data)) {
                    console.error('Error fetching services:', data);
                    setAllServices([]);
                    return;
                }

                setAllServices(data);
            } catch (error) {
                console.error('Error fetching services:', error);
                setAllServices([]);
            }
        };

        fetchServices();
    }, []);

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
                <h1 className="text-[24px] lg:text-[32px] font-semibold text-start">Crafting Digital Solutions</h1>
                <div className="w-[50px] lg:w-[152px] h-[2px] bg-[#C778DD]"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-10 lg:pt-12 gap-10">
                {
                    allServices.map((service, index) => (
                        <div key={index} className="border border-[#ABB2BF] rounded-lg p-4 flex flex-col gap-3">
                            <Image src={service?.image} alt={service.title} width={160} height={120} className="w-40 rounded-lg min-h-32 max-h-32 min-w-45 max-w-45" />
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
