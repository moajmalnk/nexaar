import React from 'react';
import { motion } from 'framer-motion';
import { BRAND_CONFIG } from '../utils/constants';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../utils/translations';

/* ─── Masked Vertical Slide wrapper ─────────────────────────────────── */
import ConsultationModal from './ConsultationModal';
import EliteButton from './shared/EliteButton';

const MaskSlide = ({ children, delay = 0, duration = 0.8 }) => (
  <motion.div
    initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.96 }}
    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
    transition={{
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    {children}
  </motion.div>
);

/* ─── Fade-up for non-text elements ─────────────────────────────────── */
const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, filter: 'blur(4px)', scale: 0.98 }}
    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
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
  
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#0D0D1A]"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
      >
        <source src="/videos/background.hevc" type="video/mp4; codecs=hvc1" />
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>

      {/* Brand Tint Overlay */}
      <div className="absolute inset-0 z-0 bg-brand-electric-purple/30 mix-blend-hue" />
      <div className="absolute inset-0 z-0 bg-brand-electric-purple/10 mix-blend-multiply" />

      {/* Background Overlay Glow & Darkness */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(107,32,232,0.2),transparent_80%)] mix-blend-screen" />
      <div className="absolute inset-0 z-0 bg-brand-deep-navy/50" />

      {/* Bottom Fade Transition */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-deep-navy via-brand-deep-navy/80 to-transparent z-0" />


      {/* Content layer — always above the canvas */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 md:pt-28 pb-10 md:pb-20">
        <div className="codo-grid">

          {/* Headline Container with Mobile Anchor */}
          <div className="col-span-12 lg:col-start-2 lg:col-span-10 text-center relative">
            
            {/* Mobile-Only Ambient Glow for depth */}
            <div className="absolute inset-x-0 -top-10 -bottom-10 bg-brand-electric-purple/10 blur-[80px] rounded-full block md:hidden pointer-events-none" />

            <div className="relative z-10">
              <MaskSlide delay={0.3} duration={0.8}>
                <h1 className="text-5xl sm:text-6xl md:text-[80px] font-display font-black text-brand-pure-white uppercase leading-[1.1] md:leading-[0.95] tracking-tighter drop-shadow-[0_0_15px_rgba(107,32,232,0.4)]">
                  {lang === 'ar' ? (
                    <>
                      <span className="text-brand-electric-coral italic">{t.title1Accent}</span>
                      {t.title1}
                    </>
                  ) : (
                    <>
                      {t.title1}
                      <span className="text-brand-electric-coral italic">{t.title1Accent}</span>
                    </>
                  )}
                </h1>
              </MaskSlide>

              <MaskSlide delay={0.45} duration={0.8}>
                <h1 className="text-5xl sm:text-6xl md:text-[80px] font-display font-black text-brand-pure-white uppercase leading-[1.1] md:leading-[0.95] mb-6 tracking-tighter drop-shadow-[0_0_15px_rgba(107,32,232,0.4)]">
                  {t.title2}
                </h1>
              </MaskSlide>
            </div>
          </div>

          {/* Subtext: centered within grid */}
          <div className="col-span-12 lg:col-start-3 lg:col-span-8 text-center relative z-10">
            <MaskSlide delay={0.65} duration={0.8}>
              <p className="text-brand-soft-lavender text-base md:text-xl font-body font-normal max-w-3xl mx-auto mb-10 leading-relaxed opacity-90 px-4 md:px-0">
                {t.subtitle}
              </p>
            </MaskSlide>
          </div>

          {/* CTA buttons: premium design */}
          <div className="col-span-12 flex flex-col sm:flex-row items-center justify-center gap-5 relative z-10">
            {/* Background Glow for CTAs on Mobile */}
            <div className="absolute inset-0 bg-brand-electric-purple/15 blur-[60px] rounded-full block md:hidden pointer-events-none" />

            <FadeUp delay={0.9}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">

                {/* ── Primary CTA: WhatsApp Elite Link ── */}
                <EliteButton
                  as="a"
                  href={`https://wa.me/${BRAND_CONFIG.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="cta"
                  className="w-full sm:w-auto min-w-[200px]"
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
                  className="w-full sm:w-auto min-w-[200px]"
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
