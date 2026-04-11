import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BRAND_CONFIG } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

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
    <section className="bg-brand-deep-navy py-32 px-6 relative overflow-hidden text-center">
      {/* Visual Anchor Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-electric-purple/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Tag */}
        <div className="mb-8 flex items-center justify-center space-x-2 rtl:space-x-reverse">
          <span className="font-body font-medium text-sm text-brand-pure-white flex items-center">
            <span className="text-brand-electric-purple mr-1 rtl:ml-1 rtl:mr-0">[</span> 
            {t.tag} 
            <span className="text-brand-electric-purple ml-1 rtl:mr-1 rtl:ml-0">]</span>
          </span>
        </div>

        <h2 className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl text-brand-pure-white leading-none uppercase tracking-tighter mb-10 text-center">
          {t.title}
        </h2>

        <p className="font-body font-normal text-brand-soft-lavender text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed text-center">
          {t.desc}
        </p>

        {/* Magnetic Button */}
        <div 
          className="flex justify-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.a
            ref={buttonRef}
            href={`https://wa.me/${BRAND_CONFIG.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-cta group flex items-center space-x-4 rtl:space-x-reverse !px-10 !py-5 rounded-2xl text-lg md:text-xl focus:ring-coral"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.515-2.961-2.629-.086-.114-.705-.935-.705-1.783 0-.848.446-1.265.603-1.446.159-.181.346-.225.462-.225.114 0 .23 0 .329.005.106.005.251-.041.393.305.144.354.489 1.196.531 1.281.043.085.07.184.013.298-.056.114-.085.184-.171.284-.086.1-.183.223-.261.299-.086.086-.176.179-.076.353.1.174.446.734.956 1.19.658.587 1.212.77 1.386.856.174.086.274.07.376-.046.104-.114.446-.519.566-.697.12-.178.241-.148.405-.088.164.06.1.489.1.489l.867 1.28c.112.164.112.338.01.538z"/>
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.981-3.584c-.614-1.062-.936-2.275-.935-3.522.003-3.849 3.136-6.981 6.981-6.981 1.864 0 3.615.726 4.93 2.043s2.041 3.068 2.04 4.934c-.003 3.85-3.135 6.99-6.902 6.99z"/>
            </svg>
            <span className="tracking-tight">{t.whatsapp}</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
