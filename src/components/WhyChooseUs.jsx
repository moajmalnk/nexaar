import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../utils/translations';

/* ─── Desktop: Sticky Stacking Card ──────────────────────────── */
const PillarCard = ({ card, index, progress, totalCards, t }) => {
  const reduceMotion = useReducedMotion();

  const rangeStart = (index + 1) / totalCards;
  const rangeEnd = Math.min(rangeStart + (1 / totalCards), 1);

  const targetScale = 1 - ((totalCards - 1 - index) * 0.04);
  const rawScale = useTransform(progress, [rangeStart, rangeEnd], [1, targetScale]);
  const scale = (index === totalCards - 1 || reduceMotion) ? 1 : rawScale;

  const stickyTop = `calc(10vh + ${index * 28}px)`;

  return (
    <div
      className="h-screen w-full sticky top-0"
      style={{ zIndex: index + 1 }}
    >
      <div className="h-full w-full flex items-start justify-center px-4 md:px-8">
        <motion.div
          style={{ scale, top: stickyTop }}
          className="relative w-full max-w-5xl rounded-3xl border border-white/10 shadow-[0_-20px_60px_rgba(0,0,0,0.7)] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-8 md:gap-16 origin-top group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#12122A] to-[#0D0D1A] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30 pointer-events-none" />
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-electric-purple/10 blur-[120px] pointer-events-none rounded-full" />

          <div className="relative shrink-0 flex items-center justify-center h-28 w-28 md:h-44 md:w-44 bg-brand-deep-navy border border-brand-electric-purple/20 rounded-[2.5rem] shadow-ambient group-hover:border-brand-electric-purple/50 group-hover:shadow-elite-glow transition-all duration-500">
            <span className="font-display font-black text-5xl md:text-7xl text-brand-electric-purple/90 drop-shadow-[0_0_20px_rgba(157,0,255,0.4)]">
              {card.id}
            </span>
          </div>

          <div className="relative flex-1 text-center lg:text-left rtl:lg:text-right">
            <span className="inline-block px-4 py-2 mb-4 md:mb-6 rounded-full bg-brand-electric-purple/10 text-brand-electric-purple text-xs font-bold tracking-widest uppercase border border-brand-electric-purple/20 transition-colors duration-300 group-hover:bg-brand-electric-purple/20">
              {t.pillarLabel}
            </span>
            <h3 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-brand-pure-white mb-4 md:mb-6 tracking-tight">
              {card.title}
            </h3>
            <p className="font-body text-brand-soft-lavender/90 text-base md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
              {card.desc}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* ─── Mobile: Staggered Reveal Card ──────────────────────────── */
const MobileCard = ({ card, index, t }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br from-[#12122A] to-[#0D0D1A] shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
    >
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand-electric-purple to-transparent" />

      <div className="relative p-5 flex items-start gap-4 rtl:flex-row-reverse">
        <div className="shrink-0 flex items-center justify-center h-12 w-12 rounded-xl bg-brand-deep-navy border border-brand-electric-purple/20">
          <span className="font-display font-black text-xl text-brand-electric-purple">
            {card.id}
          </span>
        </div>

        <div className="flex-1 min-w-0 text-left rtl:text-right">
          <span className="inline-block mb-2 px-3 py-1 rounded-full bg-brand-electric-purple/10 border border-brand-electric-purple/20 text-brand-electric-purple text-[10px] font-bold uppercase tracking-widest">
            {t.pillarLabel}
          </span>
          <h3 className="font-display font-black text-lg leading-tight text-brand-pure-white mb-2 tracking-tight">
            {card.title}
          </h3>
          <p className="font-body text-brand-soft-lavender/80 text-sm leading-relaxed">
            {card.desc}
          </p>
        </div>
      </div>
    </motion.article>
  );
};

/* ─── Main Component ─────────────────────────────────────────── */
const WhyChooseUs = () => {
  const { lang } = useLanguage();
  const t = translations[lang].whyChoose;
  const sectionRef = useRef(null);

  const cards = t.pillars.map((p, i) => ({
    id: `0${i + 1}`,
    ...p
  }));

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="relative bg-brand-deep-navy overflow-x-hidden"
    >
      <div className="relative pt-12 md:pt-32 pb-8 md:pb-12 px-5 max-w-7xl mx-auto text-center">
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

      {/* Mobile layout */}
      <div className="md:hidden px-4 pb-16 space-y-4">
        {cards.map((card, i) => (
          <MobileCard key={`m-${card.id}`} card={card} index={i} t={t} />
        ))}
      </div>

      {/* Desktop sticky-stack layout */}
      <div
        className="hidden md:block"
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

      <div className="hidden md:block h-[20vh]" />
    </section>
  );
};

export default WhyChooseUs;
