import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../utils/translations';

/* ─── Desktop: Sticky Stacking Card ──────────────────────────── */
const PillarCard = ({ card, index, progress, totalCards, t }) => {
  const reduceMotion = useReducedMotion();

  const rangeStart = index / totalCards;
  const rangeEnd = (index + 1) / totalCards;

  const targetScale = 1 - ((totalCards - 1 - index) * 0.05);
  const scale = useTransform(progress, [rangeStart, rangeEnd], [1, targetScale]);

  return (
    <div
      className="h-[85vh] md:h-screen w-full sticky top-0"
      style={{ zIndex: index + 1 }}
    >
      <div className="h-full w-full flex items-start justify-center px-4 md:px-8">
        <motion.div
          style={{ 
            scale: reduceMotion ? 1 : scale, 
          }}
          className={`motion-gpu-safe relative w-full max-w-5xl min-h-[400px] md:min-h-[440px] rounded-3xl border border-white/10 shadow-[0_-20px_60px_rgba(0,0,0,0.7)] p-8 md:p-12 lg:p-14 flex flex-col md:flex-row items-center md:items-start lg:items-center gap-8 md:gap-12 lg:gap-16 origin-top group overflow-hidden ${
             index === 0 ? 'top-[6.5rem]' :
             index === 1 ? 'top-[8rem] md:top-[9rem]' :
             index === 2 ? 'top-[9.5rem] md:top-[11.5rem]' :
             index === 3 ? 'top-[11rem] md:top-[14rem]' :
             index === 4 ? 'top-[12.5rem] md:top-[16.5rem]' :
             'top-[14rem] md:top-[19rem]'
          }`}
        >
          {/* Background and lighting effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#12122A] to-[#0D0D1A] pointer-events-none" />
          <div className="absolute inset-[0px] top-0 h-[2px] bg-gradient-to-r from-transparent via-brand-electric-purple to-transparent opacity-60 md:opacity-0" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:left-0 md:-translate-y-1/2 w-64 md:w-96 h-64 md:h-96 bg-brand-electric-purple/10 blur-[80px] md:blur-[120px] pointer-events-none rounded-full" />

          {/* Number Badge */}
          <div className="relative shrink-0 flex items-center justify-center h-20 w-20 md:h-32 md:w-32 lg:h-44 lg:w-44 bg-brand-deep-navy border border-brand-electric-purple/20 rounded-2xl lg:rounded-[2.5rem] shadow-ambient group-hover:border-brand-electric-purple/50 group-hover:shadow-elite-glow transition-all duration-500">
            <span className="font-display font-black text-3xl md:text-5xl lg:text-7xl text-brand-electric-purple/90 drop-shadow-[0_0_20px_rgba(157,0,255,0.4)]">
              {card.id}
            </span>
          </div>

          {/* Content */}
          <div className="relative flex-1 text-center md:text-left rtl:md:text-right">
            <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 mb-3 md:mb-6 rounded-full bg-brand-electric-purple/10 text-brand-electric-purple text-[0.625rem] md:text-xs font-bold tracking-widest uppercase border border-brand-electric-purple/20 transition-colors duration-300 group-hover:bg-brand-electric-purple/20">
              {t.pillarLabel}
            </span>
            <h3 className="font-display font-black text-2xl md:text-3xl lg:text-5xl text-brand-pure-white mb-3 md:mb-6 tracking-tight">
              {card.title}
            </h3>
            <p className="font-body text-brand-soft-lavender/90 text-sm md:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto md:mx-0">
              {card.desc}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* Removed MobileCard, using PillarCard for all sizes */

/* ─── Main Component ─────────────────────────────────────────── */
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
    <section
      id="why-us"
      className="relative bg-brand-deep-navy"
    >
      <div className="relative pt-20 md:pt-32 pb-16 md:pb-24 px-5 max-w-[1240px] w-[92%] mx-auto text-center">
        <div className="mb-4 flex items-center justify-center space-x-2 rtl:space-x-reverse">
          <span className="font-body font-medium text-sm text-brand-pure-white flex items-center text-center opacity-80">
            <span className="text-brand-electric-purple mr-1 rtl:ml-1 rtl:mr-0">[</span>
            {t.tag}
            <span className="text-brand-electric-purple ml-1 rtl:mr-1 rtl:ml-0">]</span>
          </span>
        </div>
        <h2
          className="font-display font-black text-brand-pure-white uppercase mb-5 md:mb-8 tracking-tighter"
          style={{ fontSize: 'clamp(1.85rem, 8vw, 4.5rem)' }}
        >
          {t.title} <span className="text-brand-electric-purple">{t.titleAccent}</span>
        </h2>
        <p className="font-body text-brand-soft-lavender text-sm md:text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
          {t.desc}
        </p>
      </div>

      {/* Sticky-stack layout for all screens */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${cards.length * 100}vh` }}
      >
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

      <div className="h-[20vh]" />
    </section>
  );
};

export default WhyChooseUs;
