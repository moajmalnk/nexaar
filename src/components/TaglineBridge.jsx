import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const MarqueeRibbon = ({ text, direction = 1, bgColor, speed = 30, entranceDelay = 0 }) => {
  const parts = text.split(' / ');
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      // Step 1: Entrance Animation (From Right to Center)
      // duration 1.5s for a clean cinematic arrival
      await controls.start({
        x: '0%',
        transition: { 
          duration: 1.8, 
          delay: entranceDelay, 
          ease: [0.16, 1, 0.3, 1] // Custom quintic-out for "snap" arrival
        }
      });

      // Step 2: Infinite Loop Animation
      controls.start({
        x: direction === 1 ? ['0%', '-50%'] : ['-50%', '0%'],
        transition: { 
          ease: 'linear', 
          duration: speed, 
          repeat: Infinity,
          // No delay here, seamless transition
        }
      });
    };
    sequence();
  }, [controls, direction, speed, entranceDelay]);

  const content = (
    <div className="flex items-center shrink-0">
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          <span className="shrink-0">{part}</span>
          <span className="opacity-30 font-light shrink-0 mx-3 md:mx-5">/</span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className={`${bgColor} py-3 md:py-5 overflow-hidden w-full`} dir="ltr">
      <motion.div
        initial={{ x: '100vw' }} // Start way off to the right
        animate={controls}
        className="flex items-center w-max font-body font-normal text-brand-pure-white text-base sm:text-xl md:text-3xl lg:text-5xl tracking-tight whitespace-nowrap"
      >
        {/* Repeat content for seamless loop */}
        {content}{content}{content}{content}{content}{content}
      </motion.div>
    </div>
  );
};

const TaglineBridge = () => {
  const { lang } = useLanguage();
  const t = translations[lang].marquee;

  return (
    <section
      id="tagline-bridge"
      className="relative bg-brand-deep-navy overflow-hidden z-30 pointer-events-none -my-4 md:-my-10"
    >
      {/* Wrapper with rotation */}
      <div className="relative -mx-[10%] py-12 md:py-20" style={{ transform: 'rotate(-2deg)' }}>
        
        {/* Ribbon 1 — Front (Top) */}
        {/* Staggered entrance: Top enters slightly after Bottom */}
        <MarqueeRibbon
          text={t.ribbon1}
          direction={-1}
          bgColor="bg-[#6B20E8] shadow-[0_4px_20px_rgba(107,32,232,0.4)]"
          speed={30}
          entranceDelay={0.5} 
        />

        {/* Ribbon 2 — Back (Bottom) */}
        {/* Bottom enters first as per request */}
        <div style={{ transform: 'rotate(3deg)', marginTop: '-2px' }}>
          <MarqueeRibbon
            text={t.ribbon2}
            direction={1}
            bgColor="bg-[#4C1BAF] shadow-[0_4px_20px_rgba(76,27,175,0.3)]"
            speed={35}
            entranceDelay={0.2}
          />
        </div>
      </div>
    </section>
  );
};

export default TaglineBridge;
