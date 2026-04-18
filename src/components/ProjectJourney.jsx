import React, { useRef, useMemo, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../utils/translations';

// ─── Sub-Component: Desktop Journey Step ──────────────────────────────
// This safely houses the useTransform hook at the top level of its own lifecycle.
const DesktopStep = ({ step, index, springProgress, isEven, shouldBeOnLeft, topOffset }) => {
  const stepProgressStart = (index - 0.2) / 5; // steps.length is 5
  const opacity = useTransform(springProgress, [stepProgressStart, stepProgressStart + 0.1], [0.4, 1]);

  return (
    <div 
      className={`absolute w-[42%] ${shouldBeOnLeft ? 'left-0' : 'right-0'}`}
      style={{ top: `${topOffset}px` }}
    >
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative bg-[#0D0D1A]/90 border border-brand-electric-purple/20 p-8 rounded-2xl shadow-ambient overflow-hidden text-left rtl:text-right">
          <div className={`absolute top-0 opacity-10 ${isEven ? 'right-0' : 'left-0'} w-24 h-24 bg-brand-electric-purple/30 blur-2xl rounded-full`} />
          <div className="flex items-center gap-3 mb-4 rtl:flex-row-reverse">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-electric-purple/30 bg-brand-electric-purple/10 font-display text-xs font-bold text-brand-electric-purple">
              {step.id}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-brand-electric-purple/40 to-transparent rtl:bg-gradient-to-l" />
          </div>
          <div className="relative z-10">
            <h3 className="font-display font-bold text-2xl text-brand-pure-white mb-2 uppercase tracking-tight">
              {step.title}
            </h3>
            <p className="font-body text-brand-soft-lavender text-base leading-relaxed opacity-80">
              {step.desc}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Sub-Component: Mobile Journey Step ───────────────────────────────
const MobileStep = ({ step, index, springProgress, isRTL, totalSteps }) => {
  const stepProgressStart = (index / totalSteps);
  const opacity = useTransform(springProgress, [stepProgressStart - 0.1, stepProgressStart], [0.4, 1]);
  const scale = useTransform(springProgress, [stepProgressStart - 0.05, stepProgressStart], [1, 1.4]);
  const dotOpacity = useTransform(springProgress, [stepProgressStart - 0.05, stepProgressStart], [0, 1]);

  return (
    <div className="relative pl-14 rtl:pl-0 rtl:pr-14">
      {/* Timeline Node */}
      <div className="absolute left-0 rtl:left-auto rtl:right-0 top-0 flex flex-col items-center">
        <motion.div 
          style={{ scale }}
          className="w-11 h-11 rounded-full bg-brand-deep-navy border border-white/10 flex items-center justify-center z-20 shadow-xl"
        >
          <span className="font-display font-black text-xs text-brand-electric-purple">
            {step.id}
          </span>
        </motion.div>
        <motion.div 
          style={{ opacity: dotOpacity }}
          className="absolute top-0 w-11 h-11 rounded-full border border-brand-electric-purple shadow-[0_0_10px_rgba(107,32,232,0.5)] z-10"
        />
      </div>

      {/* Card Content */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative bg-white/[0.02] border border-white/5 p-6 rounded-2xl shadow-lg"
      >
        <h3 className="font-display font-bold text-xl text-brand-pure-white mb-3 uppercase tracking-tight">
          {step.title}
        </h3>
        <p className="font-body text-brand-soft-lavender/70 text-base leading-relaxed">
          {step.desc}
        </p>
        <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-br from-transparent to-brand-electric-purple/5 pointer-events-none rounded-br-2xl" />
      </motion.div>
    </div>
  );
};

const ProjectJourney = () => {
  const { lang } = useLanguage();
  const t = translations[lang].journey;
  const containerRef = useRef(null);
  const isRTL = lang === 'ar';

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const steps = useMemo(() => t.steps.map((step, i) => ({
    id: `0${i + 1}`,
    ...step
  })), [t.steps]);

  // SVG snake path calculations
  const isMobile = windowWidth < 768;
  const cardAreaWidth = isMobile ? windowWidth - 48 : 900;
  const rowHeight = isMobile ? 320 : 220;
  const totalRows = steps.length;
  const svgHeight = rowHeight * totalRows;
  const svgWidth = cardAreaWidth;

  const leftX = isMobile ? 30 : 100;               
  const rightX = svgWidth - (isMobile ? 30 : 100);   
  const curveRadius = isMobile ? 40 : 60;          

  const { pathD, totalPathLen } = useMemo(() => {
    let d = '';
    const horizontalLen = rightX - leftX;
    const computeNodeY = (i) => rowHeight * i + rowHeight / 2;
    
    for (let i = 0; i < totalRows; i++) {
      const y = computeNodeY(i);
      const rowStartsRight = isRTL ? (i % 2 === 0) : (i % 2 !== 0);
      const startX = rowStartsRight ? rightX : leftX;
      const endX = rowStartsRight ? leftX : rightX;

      if (i === 0) d += `M ${startX} ${y}`;
      d += ` L ${endX} ${y}`;

      if (i < totalRows - 1) {
        const nextY = computeNodeY(i + 1);
        if (rowStartsRight) {
          d += ` C ${endX - curveRadius} ${y}, ${endX - curveRadius} ${nextY}, ${leftX} ${nextY}`;
        } else {
          d += ` C ${endX + curveRadius} ${y}, ${endX + curveRadius} ${nextY}, ${rightX} ${nextY}`;
        }
      }
    }
    return { pathD: d, totalPathLen: totalRows * horizontalLen + (totalRows - 1) * 300 }; 
  }, [totalRows, isRTL, rightX, leftX, curveRadius, rowHeight]);

  const nodePositions = useMemo(() => {
    const computeNodeY = (i) => rowHeight * i + rowHeight / 2;
    return steps.map((_, i) => ({
      x: (leftX + rightX) / 2,
      y: computeNodeY(i)
    }));
  }, [steps, leftX, rightX, rowHeight]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  const strokeDashoffset = useTransform(springProgress, [0, 1], [totalPathLen, 0]);

  return (
    <section 
      ref={containerRef}
      id="process" 
      className="bg-brand-deep-navy py-12 md:py-28 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="codo-grid mb-16 md:mb-24">
          <div className="col-span-12 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 flex items-center justify-center space-x-2 rtl:space-x-reverse"
            >
              <span className="font-body font-medium text-sm text-brand-pure-white flex items-center">
                <span className="text-brand-electric-purple mr-1 rtl:ml-1 rtl:mr-0">[</span> 
                {t.tag} 
                <span className="text-brand-electric-purple ml-1 rtl:mr-1 rtl:ml-0">]</span>
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display font-black text-4xl md:text-6xl text-brand-pure-white uppercase leading-[1.1] text-center"
            >
              {t.title}
            </motion.h2>
          </div>
        </div>

        {/* ─── DESKTOP VIEW ─── */}
        <div 
          className="hidden md:block relative" 
          style={{ height: `${svgHeight}px`, width: `${svgWidth}px`, margin: '0 auto' }}
        >
          <svg
            className="absolute inset-0 w-full h-full z-0 pointer-events-none"
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            fill="none"
          >
            <path d={pathD} stroke="#2D2D3A" strokeWidth="2" strokeOpacity="0.3" fill="none" strokeLinecap="round" />
            <motion.path
              d={pathD} stroke="url(#snakeGradient)" strokeWidth="3" fill="none" strokeLinecap="round"
              strokeDasharray={totalPathLen} style={{ strokeDashoffset }} filter="url(#snakeGlow)"
            />
            <defs>
              <linearGradient id="snakeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6B20E8" />
                <stop offset="50%" stopColor="#9B59D4" />
                <stop offset="100%" stopColor="#FF5C35" />
              </linearGradient>
              <filter id="snakeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {nodePositions.map((pos, i) => {
              const rowStartsRight = isRTL ? (i % 2 === 0) : (i % 2 !== 0);
              const cardX = rowStartsRight ? leftX : rightX;
              return (
                <g key={i}>
                  <circle cx={cardX} cy={pos.y} r="14" fill="#0D0D1A" stroke="#2D2D3A" strokeWidth="2" />
                  <motion.circle
                    cx={cardX} cy={pos.y} r="7" fill="#6B20E8"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                  />
                </g>
              );
            })}
          </svg>

          <div className="relative z-10 w-full h-full">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              const shouldBeOnLeft = isRTL ? !isEven : isEven;
              const topOffset = nodePositions[index].y - 100; 

              return (
                <DesktopStep 
                  key={step.id} 
                  step={step} 
                  index={index} 
                  springProgress={springProgress} 
                  isEven={isEven} 
                  shouldBeOnLeft={shouldBeOnLeft} 
                  topOffset={topOffset}
                  isRTL={isRTL}
                />
              );
            })}
          </div>
        </div>

        {/* ─── MOBILE VIEW ─── */}
        <div className="block md:hidden relative pt-4 pb-12">
          <div className="absolute top-0 bottom-0 left-[21px] rtl:left-auto rtl:right-[21px] w-0.5 bg-white/5 z-0">
            <motion.div 
              style={{ height: useTransform(springProgress, [0, 1], ["0%", "100%"]) }}
              className="w-full bg-gradient-to-b from-brand-electric-purple via-brand-lavender to-brand-electric-coral shadow-[0_0_15px_rgba(107,32,232,0.4)]"
            />
          </div>

          <div className="relative z-10 space-y-16">
            {steps.map((step, index) => (
              <MobileStep 
                key={`m-${step.id}`} 
                step={step} 
                index={index} 
                springProgress={springProgress} 
                isRTL={isRTL} 
                totalSteps={steps.length}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-brand-electric-purple/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-brand-lavender/5 blur-[100px] rounded-full pointer-events-none" />
    </section>
  );
};

export default ProjectJourney;
