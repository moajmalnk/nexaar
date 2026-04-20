import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../utils/translations';

const Counter = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const spring = useSpring(0, {
    stiffness: 40,
    damping: 15,
  }, { duration: 0.6, ease: "easeOut" }); // Use duration from shared motion logic

  const displayValue = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
    </span>
  );
};

const NumbersThatMatter = () => {
  const { lang } = useLanguage();
  const t = translations[lang].stats;
  
  const checklistItems = t.checklist;

  return (
    <section id="numbers" className="bg-brand-deep-navy section-padding relative overflow-hidden">
      <div className="max-w-[1240px] w-[92%] mx-auto container-padding grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
        
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: lang === 'ar' ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-left rtl:text-right"
        >
          {/* Tag */}
          <div className="mb-6 flex items-center space-x-2 rtl:space-x-reverse">
            <span className="font-body font-medium text-sm text-brand-pure-white flex items-center">
              <span className="text-brand-electric-purple mr-1 rtl:ml-1 rtl:mr-0">[</span> 
              {t.tag} 
              <span className="text-brand-electric-purple ml-1 rtl:mr-1 rtl:ml-0">]</span>
            </span>
          </div>

          <h2 className="text-brand-pure-white mb-6 md:mb-8">
            {t.title}
          </h2>

          <p className="text-brand-soft-lavender max-w-md mb-8 md:mb-12">
            {t.desc}
          </p>

          <div className="space-y-6">
            {checklistItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-brand-electric-purple">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="font-body font-semibold text-brand-pure-white text-lg">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column - Bento Grid */}
        <div className="grid grid-cols-2 gap-3 lg:gap-x-3 lg:gap-y-0 relative items-center">
          
          {/* Card 1 - Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative h-44 sm:h-64 lg:h-80 rounded-2xl overflow-hidden shadow-ambient transition-transform duration-500 hover:scale-[1.03]"
          >
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
              alt="Saudi business professional" 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-brand-deep-navy/20" />
          </motion.div>

          {/* Card 2 - Stat Card (Top Right) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
            className="lg:translate-y-1 bg-brand-lavender/20 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl h-40 sm:h-48 lg:h-52 flex flex-col justify-center items-center text-center p-3 sm:p-6 shadow-2xl transition-all duration-500 hover:scale-[1.03]"
          >
            <h3 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-8xl text-brand-pure-white/40 mb-1 leading-[1.1]">
              <Counter value={50} />+
            </h3>
            <p className="font-body font-bold text-brand-pure-white text-xs lg:text-sm uppercase tracking-tight">
              {t.delivered}
            </p>
          </motion.div>

          {/* Card 3 - Stat Card (Bottom Left) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
            className="bg-brand-electric-purple rounded-2xl md:rounded-3xl h-40 sm:h-48 lg:h-52 flex flex-col justify-center items-center text-center p-3 sm:p-6 shadow-2xl transition-all duration-500 hover:scale-[1.03] relative lg:-mt-8"
          >
            <h3 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-8xl text-brand-pure-white/40 mb-1 leading-[1.1]">
              <Counter value={100} />+
            </h3>
            <p className="font-body font-bold text-brand-pure-white text-xs lg:text-sm uppercase tracking-tight">
              {t.supported}
            </p>
          </motion.div>

          {/* Card 4 - Image (Bottom Right) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.24, ease: "easeOut" }}
            className="lg:translate-y-1 group relative h-44 sm:h-64 lg:h-80 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.03] lg:-mt-8"
          >
            <img 
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" 
              alt="Technology abstract eye" 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-brand-deep-navy/10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default NumbersThatMatter;
