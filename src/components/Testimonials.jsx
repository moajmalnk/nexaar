import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const Testimonials = () => {
  const { lang } = useLanguage();
  const t = translations[lang].testimonials;
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const testimonials = t.items;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-brand-deep-navy py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Area */}
        <div className="text-center mb-20">
          <div className="mb-4 flex items-center justify-center space-x-2 rtl:space-x-reverse">
            <span className="font-body font-medium text-sm text-brand-pure-white flex items-center">
              <span className="text-brand-electric-purple mr-1 rtl:ml-1 rtl:mr-0">[</span> 
              {t.tag} 
              <span className="text-brand-electric-purple ml-1 rtl:mr-1 rtl:ml-0">]</span>
            </span>
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl text-brand-pure-white mb-6 uppercase tracking-tight text-center">
            {t.title}
          </h2>
          <p className="font-body font-medium text-xl text-brand-soft-lavender max-w-2xl mx-auto leading-relaxed text-center">
            {t.desc}
          </p>
        </div>

        {/* Spotlight Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          onMouseLeave={() => setHoveredIndex(null)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => {
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;
            
            return (
              <motion.div
                key={testimonial.id}
                variants={cardVariants}
                onMouseEnter={() => setHoveredIndex(index)}
                animate={{
                  scale: isHovered ? 1.05 : isAnyHovered ? 0.98 : 1,
                  opacity: isHovered ? 1 : isAnyHovered ? 0.3 : 1,
                  filter: isHovered ? "blur(0px)" : isAnyHovered ? "blur(2px)" : "blur(0px)",
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`bg-[#1A1A24]/60 backdrop-blur-sm border p-8 rounded-2xl relative transition-colors duration-300 ${
                  isHovered ? 'border-brand-electric-purple shadow-ambient-glow' : 'border-[#2D2D3A]'
                } text-left rtl:text-right`}
              >
                {/* Background Quote Icon */}
                <div className="absolute top-6 right-8 rtl:left-8 rtl:right-auto pointer-events-none">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-[#2D2D3A] opacity-50 rtl:scale-x-[-1]">
                    <path d="M11.6667 18.3333C11.6667 14.3333 13.6667 11.6667 16.6667 10L15 6.66667C10 8.33333 6.66667 13.3333 6.66667 18.3333V31.6667H18.3333V18.3333H11.6667ZM28.3333 18.3333C28.3333 14.3333 30.3333 11.6667 33.3333 10L31.6667 6.66667C26.6667 8.33333 23.3333 13.3333 23.3333 18.3333V31.6667H35V18.3333H28.3333Z" fill="currentColor"/>
                  </svg>
                </div>

                <p className="font-body text-brand-pure-white text-lg leading-relaxed mb-10 relative z-10">
                  {testimonial.quote}
                </p>

                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  {/* Avatar Placeholder */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-electric-purple to-brand-lavender flex items-center justify-center text-brand-pure-white font-display font-bold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-left rtl:text-right">
                    <h4 className="font-display font-bold text-brand-pure-white">
                      {testimonial.name}
                    </h4>
                    <p className="font-body text-brand-electric-purple text-sm font-medium">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
