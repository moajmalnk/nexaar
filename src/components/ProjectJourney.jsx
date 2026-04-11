import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const ProjectJourney = () => {
  const { lang } = useLanguage();
  const t = translations[lang].journey;
  const containerRef = useRef(null);
  const isRTL = lang === 'ar';
  
  const steps = t.steps.map((step, i) => ({
    id: `0${i + 1}`,
    ...step
  }));

  // ─── SVG Snake Path Calculations ───────────────────────────────────────
  const cardAreaWidth = 900;        
  const rowHeight = 220;            
  const totalRows = steps.length;
  const svgHeight = rowHeight * totalRows;
  const svgWidth = cardAreaWidth;

  const leftX = 100;               
  const rightX = svgWidth - 100;   
  const curveRadius = 60;          
  const nodeY = (i) => rowHeight * i + rowHeight / 2; 

  // Memoize path and length
  const { pathD, totalPathLen } = useMemo(() => {
    let d = '';
    const horizontalLen = rightX - leftX;
    const curveLen = Math.PI * curveRadius + rowHeight;
    
    for (let i = 0; i < totalRows; i++) {
      const y = nodeY(i);
      const rowStartsRight = isRTL ? (i % 2 === 0) : (i % 2 !== 0);
      const startX = rowStartsRight ? rightX : leftX;
      const endX = rowStartsRight ? leftX : rightX;

      if (i === 0) d += `M ${startX} ${y}`;
      d += ` L ${endX} ${y}`;

      if (i < totalRows - 1) {
        const nextY = nodeY(i + 1);
        if (rowStartsRight) {
          d += ` C ${endX - curveRadius} ${y}, ${endX - curveRadius} ${nextY}, ${leftX} ${nextY}`;
        } else {
          d += ` C ${endX + curveRadius} ${y}, ${endX + curveRadius} ${nextY}, ${rightX} ${nextY}`;
        }
      }
    }
    return { pathD: d, totalPathLen: totalRows * horizontalLen + (totalRows - 1) * curveLen };
  }, [totalRows, isRTL, rightX, leftX, curveRadius, rowHeight]);

  const nodePositions = steps.map((_, i) => {
    const goingRight = i % 2 === 0;
    return { x: (leftX + rightX) / 2, y: nodeY(i), alignRight: !goingRight };
  });

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
      className="bg-brand-deep-navy py-32 px-6 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="codo-grid mb-24">
          <div className="col-span-12 text-center">
            <div className="mb-4 flex items-center justify-center space-x-2 rtl:space-x-reverse">
              <span className="font-body font-medium text-sm text-brand-pure-white flex items-center">
                <span className="text-brand-electric-purple mr-1 rtl:ml-1 rtl:mr-0">[</span> 
                {t.tag} 
                <span className="text-brand-electric-purple ml-1 rtl:mr-1 rtl:ml-0">]</span>
              </span>
            </div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-brand-pure-white uppercase leading-[1.1] text-center">
              {t.title}
            </h2>
          </div>
        </div>

        <div className="relative" style={{ minHeight: svgHeight }}>
          <svg
            className="absolute inset-0 w-full h-full hidden md:block"
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={pathD} stroke="#2D2D3A" strokeWidth="2" fill="none" strokeLinecap="round" />
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

            {nodePositions.map((pos, i) => (
              <g key={i}>
                <circle cx={pos.x} cy={pos.y} r="14" fill="#0D0D1A" stroke="#2D2D3A" strokeWidth="2" />
                <motion.circle
                  cx={pos.x} cy={pos.y} r="7" fill="#6B20E8"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-30%" }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                />
                <motion.circle
                  cx={pos.x} cy={pos.y} r="7" fill="none" stroke="#6B20E8" strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 2.5, opacity: [0, 0.6, 0] }}
                  viewport={{ once: true, margin: "-30%" }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </g>
            ))}
          </svg>

          <div className="relative z-10">
            {steps.map((step, index) => {
              const shouldBeOnLeft = isRTL ? (index % 2 !== 0) : (index % 2 === 0);
              const topOffset = nodePositions[index].y - 50; 
              
              // Localized reactive highlight logic: stay active once reached
              const isActive = useTransform(springProgress, 
                [(index - 0.4) / steps.length, index / steps.length], 
                [0.15, 1]
              );
              
              const pulseScale = useTransform(springProgress, 
                [(index - 0.2) / steps.length, index / steps.length], 
                [1, 1.04]
              );

              return (
                <div 
                  key={step.id} 
                  className="md:absolute md:w-[42%]"
                  style={{ 
                    top: topOffset,
                    left: shouldBeOnLeft ? '0%' : undefined,
                    right: !shouldBeOnLeft ? '0%' : undefined,
                  }}
                >
                  <motion.div
                    style={{ opacity: isActive, scale: pulseScale }}
                    initial={{ opacity: 0, y: 40, x: shouldBeOnLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="relative bg-[#0D0D1A]/60 backdrop-blur-md border border-brand-electric-purple/20 p-7 md:p-8 rounded-2xl shadow-ambient overflow-hidden group mb-8 md:mb-0 text-left rtl:text-right"
                  >
                    <span className={`absolute top-3 ${shouldBeOnLeft ? 'right-4' : 'left-4'} font-display font-bold text-6xl text-[#2D2D3A] opacity-30 select-none group-hover:text-brand-electric-purple/20 transition-colors duration-500`}>
                      {step.id}
                    </span>

                    <div className="flex items-center gap-3 mb-4 rtl:flex-row-reverse">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-electric-purple/30 bg-brand-electric-purple/10 font-display text-xs font-bold text-brand-electric-purple">
                        {step.id}
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-brand-electric-purple/40 to-transparent rtl:bg-gradient-to-l" />
                    </div>

                    <div className="relative z-10">
                      <h3 className="font-display font-bold text-xl md:text-2xl text-brand-pure-white mb-3 uppercase tracking-tight">
                        {step.title}
                      </h3>
                      <p className="font-body text-brand-soft-lavender text-base leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        {step.desc}
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-brand-electric-purple to-brand-lavender group-hover:w-full transition-all duration-400 ease-out shadow-[0_0_12px_rgba(107,32,232,0.5)]" />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-brand-electric-purple/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-brand-lavender/5 blur-[100px] rounded-full pointer-events-none" />
    </section>
  );
};

export default ProjectJourney;
