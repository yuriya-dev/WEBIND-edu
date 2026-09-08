"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const words = ["WEBIND", "EDU"];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: 60,
      opacity: 0,
      filter: "blur(8px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 14,
      },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.8,
              ease: [0.77, 0, 0.175, 1],
            },
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#111111] text-white overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-4 font-bold text-4xl sm:text-6xl md:text-7xl tracking-tight select-none"
          >
            <motion.span variants={wordVariants} className="text-white">
              WEBIND
            </motion.span>
            <motion.span variants={wordVariants} className="text-[#b7ff00]">
              EDU
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
