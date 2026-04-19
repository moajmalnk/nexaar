import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../utils/translations';
import Orb from './Orb';

const WhoThisIsFor = () => {
  const { lang } = useLanguage();
  const t = translations[lang].whoThisIsFor;
  const checklistItems = t.points;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section 
      id="who-it-is-for" 
      className="relative z-20 bg-brand-deep-navy py-16 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 codo-grid items-center">
        {/* Left Column: Spans 6 on desktop */}
        <motion.div
          className="col-span-12 lg:col-span-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Tag */}
          <motion.div variants={itemVariants} className="mb-6 flex items-center space-x-2 rtl:space-x-reverse">
            <span className="font-body font-medium text-sm text-brand-pure-white flex items-center">
              <span className="text-brand-electric-purple mr-1 rtl:ml-1 rtl:mr-0">[</span> 
              {t.tag} 
              <span className="text-brand-electric-purple ml-1 rtl:mr-1 rtl:ml-0">]</span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2 
            variants={itemVariants}
            className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-brand-pure-white leading-[1.05] mb-8 text-left rtl:text-right"
          >
            {t.title} <br className="hidden lg:block" />
            {t.titleAccent}
          </motion.h2>

          {/* Body Text */}
          <motion.p 
            variants={itemVariants}
            className="font-body text-brand-soft-lavender text-lg md:text-xl max-w-xl mb-12 leading-relaxed opacity-90 text-left rtl:text-right"
          >
            {t.description}
          </motion.p>

          {/* Checklist */}
          <div className="space-y-6">
            {checklistItems.map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="flex items-start space-x-4 rtl:space-x-reverse group"
              >
                <div className="mt-1 flex-shrink-0">
                  <div className="w-6 h-6 rounded-lg bg-brand-electric-purple/10 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-electric-purple/20">
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-brand-electric-purple transition-transform duration-300 group-hover:scale-110"
                    >
                      <path 
                        d="M20 6L9 17L4 12" 
                        stroke="currentColor" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <span className="font-body font-medium text-brand-pure-white text-lg">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Spans 6 on desktop */}
        <div className="col-span-12 lg:col-span-6 relative flex min-h-[260px] w-full items-center justify-center md:min-h-[500px]">
          <div className="absolute inset-0 bg-brand-electric-purple/10 blur-[100px] rounded-full scale-90" />
          
          <div className="relative z-10 w-full h-[280px] sm:h-[350px] md:h-[500px] flex items-center justify-center">
            <Orb
              hoverIntensity={2}
              rotateOnHover
              hue={0}
              forceHoverState={false}
              backgroundColor="#0D0D1A"
            />
          </div>
        </div>
      </div>
      {/* Bottom Fade Transition */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-brand-deep-navy via-brand-deep-navy/40 to-transparent z-20 pointer-events-none" />
    </motion.section>
  );
};

export default WhoThisIsFor;
