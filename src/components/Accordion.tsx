'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMinus, FaPlus } from "react-icons/fa";
import Link from "next/link";

interface AccordionProps {
    milestone: {
        company: string,
        company_url: string,
        title: string,
        description: string,
        starting: string,
        ending: string,
      },
}

const Accordion = ({ milestone }: AccordionProps) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border-b border-[#ABB2BF]">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 font-semibold text-left cursor-pointer"
      >
        <div className="w-full flex justify-between items-center pr-5">
            <div className="flex flex-col">
                <Link href={milestone.company_url} className="text-lg" target="_blank">{milestone.company}</Link>
                <span className="text-2xl">{milestone.title}</span>
            </div>
            <p className="capitalize">{milestone.starting} - {milestone.ending}</p>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen?<FaMinus />:<FaPlus />}
        </motion.span>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: "auto", opacity: 1 },
              collapsed: { height: 0, opacity: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden px-4"
          >
            <div className="py-2">{milestone.description}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
