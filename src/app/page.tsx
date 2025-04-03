import Career from "@/sections/Career/page";
import Expertise from "@/sections/Expertise/page";
import Hero from "@/sections/Hero/page";
import Projects from "@/sections/Projects/page";
import Services from "@/sections/Services/page";

export default function Home() {
  return (
    <div className="max-w-[1240px] px-5 mx-auto">
      <Hero/>
      <Expertise/>
      <Services/>
      <Projects/>
      <Career/>
    </div>
  );
}
