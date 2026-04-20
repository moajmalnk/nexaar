import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { BRAND_CONFIG } from '../utils/constants';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../utils/translations';
import Button from './shared/Button';

const CTA = () => {
  const { lang } = useLanguage();
  const t = translations[lang].cta;
  const buttonRef = useRef(null);

  // Mouse position motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth "magnetic" feel
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance and magnetism range
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Magnet effect strength (higher = more movement)
    const magnetism = 0.35;
    
    // Move towards cursor within range
    x.set(distanceX * magnetism);
    y.set(distanceY * magnetism);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="bg-brand-deep-navy section-padding-lg relative overflow-hidden text-center">
      {/* Visual Anchor Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[37.5rem] h-[37.5rem] bg-brand-electric-purple/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1240px] w-[92%] mx-auto container-padding relative z-10">
        {/* Tag */}
        <div className="mb-8 flex items-center justify-center space-x-2 rtl:space-x-reverse">
          <span className="font-body font-medium text-sm text-brand-pure-white flex items-center">
            <span className="text-brand-electric-purple mr-1 rtl:ml-1 rtl:mr-0">[</span> 
            {t.tag} 
            <span className="text-brand-electric-purple ml-1 rtl:mr-1 rtl:ml-0">]</span>
          </span>
        </div>

        <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-brand-pure-white leading-tight md:leading-none uppercase tracking-tight mb-8 md:mb-10 text-center">
          {t.title}
        </h2>

        <p className="font-body font-normal text-brand-soft-lavender text-lg md:text-xl max-w-2xl mx-auto mb-10 md:mb-16 leading-relaxed text-center">
          {t.desc}
        </p>

        {/* Magnetic Button */}
        <div 
          className="flex justify-center px-1"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <Button
            as="a"
            href={`https://wa.me/${BRAND_CONFIG.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="accent"
            size="large"
            className="w-full sm:w-auto min-w-[15rem]"
          >
            {t.whatsapp}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
