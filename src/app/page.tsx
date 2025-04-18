import Career from "@/sections/Career/page";
import Contact from "@/sections/Contact/page";
import Expertise from "@/sections/Expertise/page";
import Hero from "@/sections/Hero/page";
import Projects from "@/sections/Projects/page";
import Services from "@/sections/Services/page";

export default function Home() {
  return (
    <div className="max-w-[1240px] mx-auto bg-[#2c3036] px-2">
      <Hero/>
      <Expertise/>
      <Services/>
      <Projects/>
      <Career/>
      <Contact/>
    </div>
  );
}
