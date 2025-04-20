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
      className='pb-10 lg:pb-[106px] flex flex-col lg:flex-row gap-10 lg:gap-0 items-center justify-between scroll-mt-20'
      id="contact"
    >
      <div className='flex flex-col gap-10 lg:w-1/2'>
        <p className='font-semibold text-3xl lg:text-[40px]'>Looking to Work Together?</p>
        <p className='font-normal text-lg lg:w-96'>Welcome! I&apos;m always excited to connect, discuss new projects, or share insights on technology and innovation..</p>
        <p className='uppercase font-semibold'>Available for work</p>
      </div>
      <div className="flex justify-center items-center w-full lg:w-1/2">
        <form className="flex flex-col gap-4 w-full">
            <div className='flex flex-col lg:flex-row gap-4'>
                <div className='flex flex-col gap-2 lg:w-1/2'>
                    <label htmlFor="" className="uppercase ">name</label>
                    <input type="text" name="" id="" className='border border-[#ABB2BF] p-2 rounded-lg' placeholder="Your Name" required/>
                </div>
                <div className='flex flex-col gap-2 lg:w-1/2'>
                    <label htmlFor="" className="uppercase ">email</label>
                    <input type="email" name="" id="" className='border border-[#ABB2BF] p-2 rounded-lg' placeholder="name@gmail.com" required/>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="" className="uppercase ">message</label>
                <textarea name="" id="" className='border border-[#ABB2BF] p-2 rounded-lg min-h-28'  placeholder="Message" required></textarea>
            </div>
            <input type="submit" value="Send" className="border border-[#C778DD] py-2 text-white text-lg uppercase font-medium rounded-lg cursor-pointer" />
        </form>
      </div>
    </motion.div>
  )
}

export default Contact
