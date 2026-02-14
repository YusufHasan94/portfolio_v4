"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { Project } from '@/types/portfolio';

gsap.registerPlugin(ScrollTrigger);

const RecentProjects = () => {
  const [allProjects, setAllProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/portfolio/projects');
        const data = await response.json();

        // Check if response is successful and data is an array
        if (!response.ok || !Array.isArray(data)) {
          console.error('Error fetching projects:', data);
          setAllProjects([]);
          return;
        }

        setAllProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setAllProjects([]);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (allProjects.length === 0) return;

    const cardsWrappers = gsap.utils.toArray(".card-wrapper") as HTMLElement[];
    const cards = gsap.utils.toArray(".card") as HTMLElement[];

    cardsWrappers.forEach((wrapper, i) => {
      const card = cards[i];
      let scale = 1;
      let rotation = 0;
      if (i !== cards.length - 1) {
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
  }, [allProjects]);


  return (
    <div>
      <div className="wrapper mt-[106px]">
        <div className="cards flex flex-col gap-10">
          {allProjects.map((project, index) => (
            <div key={index} className="card-wrapper flex flex-col items-center">
              <div className="card w-full lg:w-3/4 lg:h-[350px] flex flex-col-reverse lg:flex-row gap-2 items-center border rounded-xl shadow-xl bg-[#2C3036] overflow-hidden">
                <div className="w-full lg:w-1/2 h-full p-4 flex gap-3 flex-col justify-around">
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
                <div className="w-full lg:w-1/2 h-fit flex justify-center lg:pr-4">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={400}
                    height={300}
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
