import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import WAVES from 'vanta/dist/vanta.waves.min';
import { BRAND_CONFIG } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

/* ─── Masked Vertical Slide wrapper ─────────────────────────────────── */
import ConsultationModal from './ConsultationModal';
import EliteButton from './shared/EliteButton';

const MaskSlide = ({ children, delay = 0, duration = 0.8 }) => (
  <div className="overflow-hidden">
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: '0%' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // custom expo-out curve
      }}
    >
      {children}
    </motion.div>
  </div>
);

/* ─── Fade-up for non-text elements ─────────────────────────────────── */
const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    {children}
  </motion.div>
);

const Hero = () => {
  const { lang } = useLanguage();
  const t = translations[lang].hero;
  
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      try {
        const initVanta = WAVES.default || WAVES;
        vantaEffect.current = initVanta({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x6B20E8,
          shininess: 35,
          waveHeight: 15,
          waveSpeed: 0.55,
          zoom: 0.95,
        });
      } catch (err) {
        console.error('Vanta initialization failed:', err);
      }
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  // Resize handler for responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (vantaEffect.current) {
        vantaEffect.current.resize();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0D0D1A]"
    >
      {/* Vanta Background Container — absolutely positioned behind content */}
      <div
        ref={vantaRef}
        className="absolute inset-0 z-0"
      />

      {/* Content layer — always above the canvas */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-20">
        <div className="codo-grid">

          {/* Headline: spans most of the grid */}
          <div className="col-span-12 lg:col-start-2 lg:col-span-10 text-center">
            <MaskSlide delay={0.3} duration={0.9}>
              <h1 className="text-5xl md:text-[80px] font-display font-extrabold text-brand-pure-white uppercase leading-[0.95] tracking-tighter drop-shadow-[0_0_15px_rgba(107,32,232,0.4)]">
                {t.title1}
              </h1>
            </MaskSlide>

            <MaskSlide delay={0.45} duration={0.9}>
              <h1 className="text-5xl md:text-[80px] font-display font-extrabold text-brand-pure-white uppercase leading-[0.95] mb-6 tracking-tighter drop-shadow-[0_0_15px_rgba(107,32,232,0.4)]">
                {t.title2}
              </h1>
            </MaskSlide>
          </div>

          {/* Subtext: centered within grid */}
          <div className="col-span-12 lg:col-start-3 lg:col-span-8 text-center">
            <MaskSlide delay={0.65} duration={0.8}>
              <p className="text-brand-soft-lavender text-lg md:text-xl font-body max-w-3xl mx-auto mb-8 leading-relaxed opacity-90">
                {t.subtitle}
              </p>
            </MaskSlide>
          </div>

          {/* CTA buttons: premium design */}
          <div className="col-span-12 flex flex-col sm:flex-row items-center justify-center gap-5">
            <FadeUp delay={0.9}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">

                {/* ── Primary CTA: WhatsApp Elite Link ── */}
                <EliteButton
                  as="a"
                  href={`https://wa.me/${BRAND_CONFIG.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="cta"
                  className="w-full sm:w-auto"
                  icon={
                    <svg className="w-5 h-5 opacity-0 -translate-x-2 rtl:translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  }
                >
                  {t.ctaPrimary}
                </EliteButton>
 
                {/* ── Secondary CTA: Consultation Elite Button ── */}
                <EliteButton
                  onClick={() => setIsModalOpen(true)}
                  variant="outline"
                  className="w-full sm:sm:w-auto"
                  icon={
                    <svg className="w-4 h-4 opacity-0 -translate-x-2 rtl:translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  }
                >
                  {t.ctaSecondary}
                </EliteButton>

              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      <ConsultationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default Hero;
