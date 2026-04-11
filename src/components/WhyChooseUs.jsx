import React, { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

/* ─── Single card ──────────────────────────────────────────────────── */
const PillarCard = ({ card, index, reduceMotion, pillarLabel }) => {
  const cardRef = useRef(null);
  const { scrollYProgress: rawProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const cardProgress = useSpring(rawProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const isEven = index % 2 === 0;

  /* per-card parallax layers */
  const ghostY = useTransform(cardProgress, [0, 1], [60, -60]);
  const stripX = useTransform(cardProgress, [0, 1], isEven ? [-20, 20] : [20, -20]);
  const contentY = useTransform(cardProgress, [0, 1], [24, -24]);
  const glowY = useTransform(cardProgress, [0, 1], [80, -80]);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
      className="relative overflow-hidden"
    >
      {/* outer border frame */}
      <div
        className={`relative border border-brand-pure-white/[0.07] bg-brand-pure-white/[0.03] backdrop-blur-md shadow-ambient
          ${isEven ? 'rounded-[1.5rem_3rem_1.5rem_1.5rem]' : 'rounded-[3rem_1.5rem_1.5rem_1.5rem]'}`}
      >


        {/* ── Inner layout ── */}
        <div className={`relative flex flex-col gap-0 lg:flex-row ${isEven ? '' : 'lg:flex-row-reverse'}`}>

          {/* ── Index column ── */}
          <div className={`relative flex shrink-0 items-center justify-center overflow-hidden
            border-brand-pure-white/[0.06] p-8 lg:w-[28%] lg:border-b-0
            ${isEven ? 'lg:border-r' : 'lg:border-l'} border-b`}
          >
            {/* giant ghost number */}
            <motion.span
              aria-hidden="true"
              style={reduceMotion ? undefined : { y: ghostY }}
              className="pointer-events-none absolute select-none font-display text-[9rem] font-black
                leading-none text-brand-pure-white/[0.04] lg:text-[11rem]"
            >
              {card.id}
            </motion.span>

            {/* visible number badge */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <span
                className="font-display text-[3.5rem] font-black leading-none tracking-tighter
                  text-brand-electric-purple lg:text-[4.5rem]"
                style={{ textShadow: '0 0 40px rgba(157,0,255,0.55)' }}
              >
                {card.id}
              </span>
              <span className="font-body text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-brand-pure-white/35">
                {pillarLabel}
              </span>
            </div>
          </div>

          {/* ── Content column ── */}
          <motion.div
            style={reduceMotion ? undefined : { y: contentY }}
            className="relative z-10 flex flex-1 flex-col justify-center gap-4 p-8 md:p-10 lg:p-12 text-left rtl:text-right"
          >
            <motion.h3 
              initial={{ opacity: 0, x: isEven ? -10 : 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              className="font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight
              text-brand-pure-white md:text-4xl lg:text-[2.6rem]">
              {card.title}
            </motion.h3>

            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.78, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              className="max-w-md font-body text-base leading-7 text-brand-soft-lavender/78 md:text-lg">
              {card.desc}
            </motion.p>

            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 + 0.4 }}
              className="flex items-center gap-4 pt-2 origin-left rtl:origin-right"
            >
              <div className="h-px w-8 bg-brand-electric-purple/40" />
              <div className="h-px w-3 bg-brand-electric-purple/20" />
              <div className="h-px w-1.5 bg-brand-electric-purple/10" />
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* ── Inter-card connector ── */}
      {index < 4 && (
        <div className="relative mx-auto my-0 h-12 w-px">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-electric-purple/30 to-brand-electric-purple/5" />
          <motion.div
            className="absolute inset-0 origin-top bg-brand-electric-purple/60"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          />
        </div>
      )}
    </motion.article>
  );
};


/* ─── Section ──────────────────────────────────────────────────────── */
const WhyChooseUs = () => {
  const { lang } = useLanguage();
  const t = translations[lang].whyChoose;

  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const cards = t.pillars.map((p, i) => ({
    id: `0${i + 1}`,
    ...p
  }));

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  /* deep background parallax */
  const bgGlowAY = useTransform(scrollYProgress, [0, 1], [-160, 160]);
  const bgGlowBY = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const bgGlowCX = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const orbitRot = useTransform(scrollYProgress, [0, 1], [0, 120]);



  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="relative overflow-hidden bg-brand-deep-navy py-24 md:py-36"
    >
      {/* ══ BG atmosphere ══ */}
      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { y: bgGlowAY }}
        className="pointer-events-none absolute -left-48 top-[-8rem] h-[50rem] w-[50rem]
          rounded-full bg-brand-electric-purple/[0.07] blur-[180px]"
      />
      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { x: bgGlowCX }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem]
          -translate-x-1/2 -translate-y-1/2 rounded-full
          bg-brand-electric-purple/[0.04] blur-[140px]"
      />

      {/* ══ Grid texture ══ */}
      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { y: gridY }}
        className="pointer-events-none absolute inset-0
          bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]
          bg-[size:64px_64px] opacity-[0.22]"
      />

      {/* ══ Diagonal hairlines ══ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(157,0,255,0.4) 0px, rgba(157,0,255,0.4) 1px, transparent 1px, transparent 80px)',
        }}
      />



      {/* ══ CONTENT ══ */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        
        <div className="codo-grid">
          {/* ── Section Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="col-span-12 text-center mb-24"
          >
            <div className="mb-4 flex items-center justify-center space-x-2 rtl:space-x-reverse">
              <span className="font-body font-medium text-sm text-brand-pure-white flex items-center text-center">
                <span className="text-brand-electric-purple mr-1 rtl:ml-1 rtl:mr-0">[</span> 
                {t.tag} 
                <span className="text-brand-electric-purple ml-1 rtl:mr-1 rtl:ml-0">]</span>
              </span>
            </div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-brand-pure-white uppercase mb-8 leading-[1.1] text-center">
              {t.title} <span className="text-brand-electric-purple">{t.titleAccent}</span>
            </h2>
            <p className="font-body text-brand-soft-lavender text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-90 text-center">
              {t.desc}
            </p>
          </motion.div>

          {/* ── Cards stack: Spans 10 columns on desktop for better focus ── */}
          <div className="col-span-12 lg:col-start-2 lg:col-span-10 flex flex-col">
          {cards.map((card, index) => (
            <PillarCard
              key={card.id}
              card={card}
              index={index}
              reduceMotion={reduceMotion}
              pillarLabel={t.pillarLabel}
            />
          ))}
          </div>

        </div>

      </div>

      {/* ══ Vignette ══ */}
      <div aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32
          bg-gradient-to-b from-brand-deep-navy to-transparent" />
      <div aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32
          bg-gradient-to-t from-brand-deep-navy to-transparent" />
    </section>
  );
};

export default WhyChooseUs;