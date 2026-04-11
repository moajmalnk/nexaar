import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const Counter = ({ value, duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const spring = useSpring(0, {
    stiffness: 40,
    damping: 15,
  });

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
    <section className="bg-brand-deep-navy py-24 px-6 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: lang === 'ar' ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
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

          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-7xl text-brand-pure-white leading-tight uppercase mb-8">
            {t.title}
          </h2>

          <p className="font-body font-medium text-xl text-brand-soft-lavender max-w-md mb-12">
            {t.desc}
          </p>

          <div className="space-y-6">
            {checklistItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-brand-electric-purple rtl:scale-x-[-1]">
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
        <div className="grid grid-cols-2 gap-4 lg:gap-6 relative">
          
          {/* Card 1 - Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative h-64 lg:h-80 rounded-2xl overflow-hidden shadow-ambient transition-transform duration-500 hover:scale-[1.03]"
          >
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
              alt="Saudi business professional" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-brand-deep-navy/20" />
          </motion.div>

          {/* Card 2 - Stat Card (Staggered Column Root) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:-translate-y-12 bg-[#1A1A24] border border-brand-electric-purple/20 rounded-2xl h-48 lg:h-56 flex flex-col justify-center items-center text-center p-6 shadow-ambient transition-all duration-500 hover:scale-[1.03] hover:border-brand-electric-purple"
          >
            <h3 className="font-display font-black text-5xl lg:text-7xl text-brand-pure-white mb-2 drop-shadow-[0_0_15px_rgba(107,32,232,0.3)]">
              <Counter value={50} />+
            </h3>
            <p className="font-body font-medium text-brand-soft-lavender text-sm lg:text-base uppercase tracking-widest">
              {t.delivered}
            </p>
          </motion.div>

          {/* Card 3 - Stat Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#1A1A24] border border-brand-electric-coral/20 rounded-2xl h-48 lg:h-56 flex flex-col justify-center items-center text-center p-6 shadow-ambient transition-all duration-500 hover:scale-[1.03] hover:border-brand-electric-coral hover:shadow-coral-glow relative"
          >
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-brand-electric-coral text-brand-pure-white text-[8px] font-display font-black uppercase tracking-[0.2em] px-2 py-1 rounded-full whitespace-nowrap">
              {t.impactTag}
            </div>
            <h3 className="font-display font-black text-5xl lg:text-7xl text-brand-electric-coral mb-2 drop-shadow-[0_0_15px_rgba(255,92,53,0.3)]">
              <Counter value={100} />+
            </h3>
            <p className="font-body font-medium text-brand-soft-lavender text-sm lg:text-base uppercase tracking-widest">
              {t.supported}
            </p>
          </motion.div>

          {/* Card 4 - Image (Staggered Column Root) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:-translate-y-12 group relative h-64 lg:h-80 rounded-2xl overflow-hidden shadow-ambient transition-transform duration-500 hover:scale-[1.03]"
          >
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" 
              alt="Technology abstract" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-brand-deep-navy/20" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default NumbersThatMatter;
