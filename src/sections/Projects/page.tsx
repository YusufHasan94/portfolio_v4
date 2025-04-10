'use client'
import { AnimatePresence, motion } from "framer-motion";
import { fadeIn } from '@/app/variants';
import { useEffect, useState } from "react";

const allProjects = [
    {
        id: 1,
        name: "Portfolio Website",
        image: "https://example.com/portfolio-image.jpg",
        description: "A personal portfolio website showcasing my projects and skills.",
        tech_stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
        preview_url: "https://myportfolio.com",
        type: "frontend"
    },
    {
        id: 2,
        name: "WordPress Plugin - View Counter",
        image: "https://example.com/view-counter-image.jpg",
        description: "A WordPress plugin that counts and displays page and post views, with geolocation tracking.",
        tech_stack: ["PHP", "WordPress", "JavaScript", "GeoAPI"],
        preview_url: "https://wordpress.org/plugins/view-counter",
        type: "wordpress"
    },
    {
        id: 3,
        name: "Routine Management System",
        image: "https://example.com/routine-management.jpg",
        description: "A system to manage class schedules with dynamic routine management.",
        tech_stack: ["React", "Node.js", "PostgreSQL"],
        preview_url: "https://routineapp.com",
        type: "fullstack"
    },
    {
        id: 4,
        name: "Laravel University Management",
        image: "https://example.com/university-management.jpg",
        description: "A university management system with roles for teachers, students, and admins.",
        tech_stack: ["Laravel", "PostgreSQL", "React"],
        preview_url: "https://universityapp.com",
        type: "fullstack"
    },
    {
        id: 5,
        name: "Game Wiki Website",
        image: "https://example.com/game-wiki.jpg",
        description: "A MediaWiki-based website for a game database and community-driven content.",
        tech_stack: ["MediaWiki", "PHP", "MySQL"],
        preview_url: "https://gamewiki.com",
        type: "backend"
    },
    {
        id: 6,
        name: "E-commerce Store",
        image: "https://example.com/ecommerce-store.jpg",
        description: "An online store with product listings, cart, and checkout functionalities.",
        tech_stack: ["React", "Node.js", "MongoDB"],
        preview_url: "https://ecommerce.com",
        type: "fullstack"
    },
    {
        id: 7,
        name: "Ant Design Sidebar",
        image: "https://example.com/ant-sidebar.jpg",
        description: "A dynamic sidebar navigation system using Ant Design and React Router.",
        tech_stack: ["React", "Ant Design", "React Router"],
        preview_url: "https://sidebarui.com",
        type: "frontend"
    },
    {
        id: 8,
        name: "WordPress Mega Menu Plugin",
        image: "https://example.com/mega-menu.jpg",
        description: "A WordPress plugin to create custom mega menus with Elementor.",
        tech_stack: ["PHP", "WordPress", "Elementor"],
        preview_url: "https://wordpress.org/plugins/mega-menu",
        type: "wordpress"
    },
    {
        id: 9,
        name: "Next.js Swiper Carousel",
        image: "https://example.com/swiper-carousel.jpg",
        description: "A Next.js component implementing Swiper.js with optimized image loading.",
        tech_stack: ["Next.js", "Swiper.js", "TypeScript"],
        preview_url: "https://swipercomponent.com",
        type: "frontend"
    },
    {
        id: 10,
        name: "AWS Nginx Multi-Service Setup",
        image: "https://example.com/aws-nginx.jpg",
        description: "Configuring Nginx to handle multiple services with domain-based routing on AWS EC2.",
        tech_stack: ["Nginx", "AWS EC2", "Docker"],
        preview_url: "https://awsnginxsetup.com",
        type: "backend"
    },
    {
        id: 11,
        name: "FlashCard Web App",
        image: "https://example.com/flashcard.jpg",
        description: "A web-based flashcard app for learning with spaced repetition.",
        tech_stack: ["React", "PostgreSQL", "Node.js"],
        preview_url: "https://flashcardapp.com",
        type: "fullstack"
    },
    {
        id: 12,
        name: "AWS Mail Service Integration",
        image: "https://example.com/aws-mail.jpg",
        description: "Integrating AWS Mail Service into a Laravel application for transactional emails.",
        tech_stack: ["Laravel", "AWS SES", "PHP"],
        preview_url: "https://awsmailsetup.com",
        type: "backend"
    },
    {
        id: 13,
        name: "Dockerized WordPress Theme Development",
        image: "https://example.com/docker-wordpress.jpg",
        description: "A custom WordPress theme development setup using Docker for local development.",
        tech_stack: ["Docker", "WordPress", "PHP"],
        preview_url: "https://wpdockerdev.com",
        type: "wordpress"
    },
    {
        id: 14,
        name: "Plesk Hosted Website",
        image: "https://example.com/plesk-hosting.jpg",
        description: "A personal website hosted on Plesk with Route 53 domain management.",
        tech_stack: ["Plesk", "AWS Route 53", "PHP"],
        preview_url: "https://pleskwebsite.com",
        type: "backend"
    },
    {
        id: 15,
        name: "Interactive Dashboard",
        image: "https://example.com/interactive-dashboard.jpg",
        description: "A real-time, interactive dashboard displaying analytics data with charts and graphs.",
        tech_stack: ["React", "D3.js", "Node.js", "WebSocket"],
        preview_url: "https://interactive-dashboard.com",
        type: "frontend"
    },
];

const projctsType = ["all", "frontend", "fullstack", "backend", "wordpress"];

interface props {
    id: number,
    name: string,
    image: string,
    description: string,
    tech_stack: string[],
    preview_url: string,
    type: string,
}


const Projects = () => {
    const [projects, setProjects] = useState<props[]>([]);
    const [filterProjects, setFilterProjects] = useState<props[]>([]);
    const [activeTab, setActiveTab] = useState(projctsType[0]);

    useEffect(() => {
        setProjects(allProjects);
        setFilterProjects(allProjects);
    }, []);

    const handleFilter = (type: string) => {
        if (type === "all") {
            setFilterProjects(projects);
        }
        else {
            const filter = projects.filter((project) => project.type === type);
            setFilterProjects(filter);
        }

        setActiveTab(type);
    };

    return (
        <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
            className="py-10 lg:py-20 scroll-mt-20"
            id="projects"
        >
            <h1 className="text-3xl lg:text-4xl font-semibold text-center">Showcasing Reliable & Innovative Work</h1>
            <div className="flex justify-center py-10 lg:py-20 flex-wrap gap-10">
                <div className="flex flex-wrap gap-10 justify-center lg:justify-normal">
                    {projctsType.map((type, index) => (
                        <button
                            key={index}
                            className={`capitalize font-semibold text-xl pb-2 border-b-2 
                                ${activeTab === type ? "border-[#4f53ff]" : "border-transparent"}`}
                            onClick={() => handleFilter(type)}>
                            {type}
                        </button>
                    ))}
                </div>
                <motion.div
                    className="flex flex-wrap gap-10 justify-between">
                    <AnimatePresence mode="popLayout">
                        {filterProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                className="border border-[#4f53ff] bg-[#FFF] rounded-lg px-6 pb-14 pt-4 lg:w-[30%] flex flex-col gap-2 relative"
                                transition={{ duration: 0.5}}
                            >
                                <span className="text-xl font-semibold">{project.name}</span>
                                <p>{project.description}</p>
                                {/* <a href={`${project.preview_url}`}>view website</a> */}
                                <div className="flex flex-wrap gap-3">
                                    {project.tech_stack.map((stack, index) => (
                                        <span key={index} className="px-2 py-1 bg-[#6f74ff] text-white rounded-lg">
                                            {stack}
                                        </span>
                                    ))}
                                </div>
                                <span className="absolute bottom-5">view website</span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Projects
