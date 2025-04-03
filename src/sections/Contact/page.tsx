'use client'
import { motion } from "framer-motion";
import { fadeIn } from '@/app/variants';

const Contact = () => {
  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true }}
      className='py-20 flex items-center justify-between'
      id="contact"
    >
      <div className='flex flex-col gap-10 w-1/2'>
        <p className='font-semibold text-[40px]'>Looking to Work Together?</p>
        <p className='font-normal text-xl'>Welcome! I&apos;m always excited to connect, discuss new projects, or share insights on technology and innovation..</p>
        <p className='uppercase font-semibold'>Available for work</p>
      </div>
      <div className="flex justify-center items-center">
        <form className="flex flex-col gap-4">
            <div className='flex gap-4'>
                <div className='flex flex-col gap-2 w-1/2'>
                    <label htmlFor="" className="uppercase text-black">name</label>
                    <input type="text" name="" id="" className='border border-[#4F53FF] p-2 rounded-lg' placeholder="Your Name"/>
                </div>
                <div className='flex flex-col gap-2 w-1/2'>
                    <label htmlFor="" className="uppercase text-black">email</label>
                    <input type="email" name="" id="" className='border border-[#4F53FF] p-2 rounded-lg' placeholder="name@gmail.com"/>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="" className="uppercase text-black">message</label>
                <textarea name="" id="" className='border border-[#4F53FF] p-2 rounded-lg min-h-28'  placeholder="Message"></textarea>
            </div>
            <input type="submit" value="Send" className="bg-[#4F53FF] py-2 text-white text-lg uppercase rounded-xl" />
        </form>
      </div>
    </motion.div>
  )
}

export default Contact
