"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

import management from "@/assets/projects/management.png";

gsap.registerPlugin(ScrollTrigger);

const allProjects = [
  {
    id: 1,
    name: "Portfolio Website",
    image: management,
    description: "A personal portfolio website showcasing my projects and skills.",
    tech_stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    preview_url: "https://myportfolio.com",
    type: "frontend"
  },
  {
    id: 2,
    name: "Portfolio Website v2",
    image: management,
    description: "A personal portfolio website showcasing my projects and skills.",
    tech_stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    preview_url: "https://myportfolio.com",
    type: "frontend"
  },
  {
    id: 3,
    name: "Portfolio Website v3",
    image: management,
    description: "A personal portfolio website showcasing my projects and skills.",
    tech_stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    preview_url: "https://myportfolio.com",
    type: "frontend"
  },
  {
    id: 4,
    name: "Portfolio Website v3",
    image: management,
    description: "A personal portfolio website showcasing my projects and skills.",
    tech_stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    preview_url: "https://myportfolio.com",
    type: "frontend"
  },
];

const RecentProjects = () => {



  useEffect(() => {
    const cardsWrappers = gsap.utils.toArray(".card-wrapper") as HTMLElement[];
    const cards = gsap.utils.toArray(".card") as HTMLElement[];

    cardsWrappers.forEach((wrapper, i) => {
      const card = cards[i];
      let scale = 1;
      let rotation = 0;
      if (i !== cards.length -1) {
        scale = 0.9 + 0.025 * i;
        rotation = -10;
      }

      gsap.to(card, {
        scale,
        rotationX: rotation,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top " + (60 + 10 * i),
          end: "bottom 550",
          endTrigger: ".wrapper",
          scrub: true,
          pin: wrapper,
          pinSpacing: false,
          id: (i + 1).toString(),
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);


  return (
    <div>
      <div className="wrapper mt-[106px]">
        <div className="cards flex flex-col gap-10">
          {allProjects.map((project, index) => (
            <div key={index} className="card-wrapper flex flex-col items-center">
              <div className="card w-3/4 h-[350px] flex gap-2 items-center border rounded-xl shadow-xl bg-[#2C3036] overflow-hidden">
                <div className="w-1/2 h-full p-4 flex flex-col justify-around">
                  <div className="flex gap-2 items-start">
                    <span className="text-2xl font-semibold">{project.name}</span>
                    <Link href={project.preview_url} target="_blank">
                      <FaArrowUpRightFromSquare className="mt-1" />
                    </Link>
                  </div>
                  <p className="">{project.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tech_stack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="p-1 bg-[#C778DD] rounded-sm px-2 py-0.5 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="w-1/2 h-fit flex justify-center pr-4">
                  <Image
                    src={project.image}
                    alt={project.name}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentProjects
