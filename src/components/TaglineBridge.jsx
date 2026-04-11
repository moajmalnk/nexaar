import React from 'react';
import { motion } from 'framer-motion';

const TaglineBridge = () => {
  // HIDDEN FOR NOW as requested
  return null;

  const line1 = "/ FUTURE NOW / COGNITIVE SHIFT / THINK FORWARD /";
  const line2 = "EMPOWERING INNOVATION / SMARTER TOMORROW / NEXT INTELLIGENCE";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="tagline-bridge" className="bg-brand-deep-navy py-20 md:py-24 px-6 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center space-y-4 md:space-y-6"
      >
        {/* Line 1 */}
        <motion.h2
          variants={itemVariants}
          className="font-display font-black text-brand-pure-white text-2xl sm:text-4xl lg:text-5xl uppercase tracking-[4px] md:tracking-[6px] leading-tight"
        >
          {line1}
        </motion.h2>

        {/* Line 2 */}
        <motion.h2
          variants={itemVariants}
          className="font-display font-black text-brand-electric-purple text-2xl sm:text-4xl lg:text-5xl uppercase tracking-[4px] md:tracking-[6px] leading-tight"
        >
          {line2}
        </motion.h2>

        {/* Subtle Ambient Glow behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-32 bg-brand-electric-purple/5 blur-[100px] pointer-events-none" />
      </motion.div>
    </section>
  );
};

export default TaglineBridge;
