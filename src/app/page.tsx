import Hero from "@/sections/Hero/page";
import Header from "@/shared/Header/page";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-[1240px] px-5 mx-auto">
      <Hero/>
    </div>
  );
}
