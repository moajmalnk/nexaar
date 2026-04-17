import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const PillarCard = ({ card, index, progress, totalCards, t }) => {
  const reduceMotion = useReducedMotion();
  
  // Compute exactly when this card arrives at the top of the viewport
  // If no reduced motion, the math is exact because total height is N * 100vh
  const startProgress = index / (totalCards - 1);
  const endProgress = 1;

  // Each previous card gets 5% smaller and fades out appropriately
  const targetScale = 1 - ((totalCards - index - 1) * 0.05);
  // Transform rules
  const rawScale = useTransform(progress, [startProgress, endProgress], [1, targetScale]);
  // Keep cards mostly opaque to prevent them from looking "hollow" or transparent
  const rawOpacity = useTransform(progress, [startProgress, endProgress], [1, 0.9]);

  // Apply full values if reduced motion is on or it's the very last card
  const scale = (index === totalCards - 1 || reduceMotion) ? 1 : rawScale;
  const opacity = (index === totalCards - 1 || reduceMotion) ? 1 : rawOpacity;

  // Calculate dynamic top offset. We increase by 30px per card to create the visible "stacked tabs" look
  const topOffset = `calc(15vh + ${index * 30}px)`;

  return (
    <div className="flex h-screen w-full justify-center items-start sticky top-0 px-4 md:px-8">
      <motion.div 
        style={{ scale, opacity, top: topOffset }}
        className="w-full max-w-5xl relative rounded-3xl bg-brand-charcoal border border-white/10 shadow-[0_-15px_50px_rgba(0,0,0,0.6)] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-8 md:gap-16 origin-top group overflow-hidden"
      >
        {/* Layer 1: Atmospheric Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#12122A] to-[#0D0D1A] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30 pointer-events-none" />
        
        {/* Layer 2: Glow Accent */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-electric-purple/10 blur-[120px] pointer-events-none rounded-full" />

        {/* Layer 3: Main Number Badge */}
        <div className="relative shrink-0 flex items-center justify-center h-32 w-32 md:h-48 md:w-48 bg-brand-deep-navy border border-brand-electric-purple/20 rounded-[2.5rem] shadow-ambient group-hover:border-brand-electric-purple/50 group-hover:shadow-elite-glow transition-all duration-500">
           <span className="font-display font-black text-6xl md:text-8xl text-brand-electric-purple/90 drop-shadow-[0_0_20px_rgba(157,0,255,0.4)]">
             {card.id}
           </span>
        </div>

        {/* Layer 4: Text Content */}
        <div className="relative flex-1 text-center lg:text-left rtl:lg:text-right">
          <span className="inline-block px-4 py-2 mb-4 md:mb-6 rounded-full bg-brand-electric-purple/10 text-brand-electric-purple text-xs font-bold tracking-widest uppercase border border-brand-electric-purple/20 transition-colors duration-300 group-hover:bg-brand-electric-purple/20">
            {t.pillarLabel}
          </span>
          <h3 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-brand-pure-white mb-4 md:mb-6 tracking-tight">
            {card.title}
          </h3>
          <p className="font-body text-brand-soft-lavender/90 text-base md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
            {card.desc}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const WhyChooseUs = () => {
  const { lang } = useLanguage();
  const t = translations[lang].whyChoose;
  const containerRef = useRef(null);

  const cards = t.pillars.map((p, i) => ({
    id: `0${i + 1}`,
    ...p
  }));

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <section id="why-us" className="relative bg-brand-deep-navy">
      {/* Introduction Header - standard flow */}
      <div className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto text-center z-10">
        <div className="mb-4 flex items-center justify-center space-x-2 rtl:space-x-reverse">
          <span className="font-body font-medium text-sm text-brand-pure-white flex items-center text-center">
            <span className="text-brand-electric-purple mr-1 rtl:ml-1 rtl:mr-0">[</span> 
            {t.tag} 
            <span className="text-brand-electric-purple ml-1 rtl:mr-1 rtl:ml-0">]</span>
          </span>
        </div>
        <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-brand-pure-white uppercase mb-8 tracking-tight">
          {t.title} <span className="text-brand-electric-purple">{t.titleAccent}</span>
        </h2>
        <p className="font-body text-brand-soft-lavender text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
          {t.desc}
        </p>
      </div>

      {/* Stacked Cards Tracking Container */}
      <div ref={containerRef} className="relative w-full z-20">
        {cards.map((card, i) => (
          <PillarCard 
            key={card.id} 
            card={card} 
            index={i} 
            progress={scrollYProgress} 
            totalCards={cards.length}
            t={t} 
          />
        ))}
      </div>

      {/* Spacer to allow the final stack to rest for a moment before scrolling to next section */}
      <div className="h-[20vh] w-full bg-brand-deep-navy z-10" />
    </section>
  );
};

export default WhyChooseUs;