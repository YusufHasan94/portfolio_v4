import Expertise from "@/sections/Expertise/page";
import Hero from "@/sections/Hero/page";

export default function Home() {
  return (
    <div className="max-w-[1240px] px-5 mx-auto">
      <Hero/>
      <Expertise/>
    </div>
  );
}
