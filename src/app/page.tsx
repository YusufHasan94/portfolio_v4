import Career from "@/sections/Career/page";
import Contact from "@/sections/Contact/page";
import Expertise from "@/sections/Expertise/page";
import Hero from "@/sections/Hero/page";
import Projects from "@/sections/Projects/page";
import Services from "@/sections/Services/page";
import Image from "next/image";
import dots from "@/assets/dots.png"


export default function Home() {
  return (
    <div className="overflow-hidden">
      <div className="max-w-[1240px] mx-auto bg-[#2c3036] px-4 lg:px-2 relative">
        <Hero />
        <Expertise />
        <Services />
        <Projects />
        <Career />
        <Contact />
      </div>
      <div className="hidden xl:block">
        <Image src={dots} alt="dots" className="absolute top-[400px] -left-[35px]" />
        <div className="size-[155px] border border-[#ABB2BF] absolute top-[2115px] -left-20" />
        <Image src={dots} alt="dots" className="absolute top-[2705px] -left-[35px]" />
        <Image src={dots} alt="dots" className="absolute top-[2294px] right-0" />
        <div className="size-[91px] border border-[#ABB2BF] absolute top-[672px] right-0" />
        <div className="size-[155px] border border-[#ABB2BF] absolute top-[1160px] right-0 -z-50" />
      </div>
    </div>
  );
}
