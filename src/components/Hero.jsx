import React from 'react';
import { motion } from 'framer-motion';
import { BRAND_CONFIG } from '../utils/constants';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../utils/translations';

/* ─── Masked Vertical Slide wrapper ─────────────────────────────────── */
import ConsultationModal from './ConsultationModal';
import Button from './shared/Button';

const MaskSlide = ({ children, delay = 0, duration = 0.8 }) => (
  <motion.div
    initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.96 }}
    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
    transition={{
      duration,
      delay,
      ease: "easeOut",
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
      duration: 0.6,
      delay,
      ease: "easeOut",
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
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-brand-deep-navy"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
      >
        <source src="/videos/background.hevc" type="video/mp4; codecs=hvc1" />
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>

      {/* Brand Accents - Dominant Identity Role */}
      <div className="absolute inset-x-0 top-0 h-full z-0 bg-[radial-gradient(circle_at_20%_30%,rgba(107,32,232,0.30),transparent_60%)]" />
      <div className="absolute inset-x-0 bottom-0 h-full z-0 bg-[radial-gradient(circle_at_80%_70%,rgba(107,32,232,0.25),transparent_70%)]" />
      
      {/* Subtle brand tint to keep it tech-focused */}
      <div className="absolute inset-0 z-0 bg-brand-electric-purple/5 mix-blend-color" />

      {/* Background Overlay Glow & Darkness */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(107,32,232,0.20),transparent_80%)] mix-blend-screen" />
      <div className="absolute inset-0 z-0 bg-brand-deep-navy/30" />

      {/* Bottom Fade Transition */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-deep-navy via-brand-deep-navy/80 to-transparent z-0" />


      {/* Content layer — always above the canvas */}
      <div className="relative z-10 max-w-[1240px] w-[92%] mx-auto px-4 sm:px-6 pt-20 md:pt-24 pb-10 md:pb-14">
        <div className="codo-grid gap-y-0">

          {/* Headline Container with Mobile Anchor */}
          <div className="col-span-12 lg:col-start-2 lg:col-span-10 text-center relative">
            
            {/* Mobile-Only Ambient Glow for depth */}
            <div className="absolute inset-x-0 -top-10 -bottom-10 bg-brand-electric-purple/10 blur-[80px] rounded-full block md:hidden pointer-events-none" />

            <div className="relative z-10">
              <MaskSlide delay={0.22} duration={0.6}>
                <h1 className="font-display font-extrabold text-brand-pure-white mb-2 tracking-tight drop-shadow-[0_0_15px_rgba(107,32,232,0.4)]">
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

              <MaskSlide delay={0.3} duration={0.6}>
                <h1 className="font-display font-extrabold text-brand-pure-white mb-3 md:mb-4 tracking-tight drop-shadow-[0_0_15px_rgba(107,32,232,0.4)]">
                  {t.title2}
                </h1>
              </MaskSlide>
            </div>
          </div>

          {/* Subtext: centered within grid */}
          <div className="col-span-12 lg:col-start-3 lg:col-span-8 text-center relative z-10">
            <MaskSlide delay={0.38} duration={0.6}>
              <p className="text-brand-soft-lavender text-body font-body font-normal max-w-3xl mx-auto mb-5 md:mb-6 leading-[1.6] opacity-90 px-4 md:px-0 tagline">
                {t.subtitle}
              </p>
            </MaskSlide>
          </div>

          {/* CTA buttons: premium design */}
          <div className="col-span-12 flex flex-col sm:flex-row items-center justify-center gap-[1.5rem] relative z-20 mt-8 md:mt-12">
            <FadeUp delay={0.46}>
              <div className="flex w-full flex-col sm:flex-row items-center justify-center gap-[1.5rem]">

                {/* ── Primary CTA: WhatsApp Elite Link ── */}
                <Button
                  as="a"
                  href={`https://wa.me/${BRAND_CONFIG.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="accent"
                  size="large"
                  caps={true}
                  className="w-full sm:w-auto min-w-[12.5rem] shadow-coral-glow/30"
                >
                  {t.ctaPrimary}
                </Button>
 
                {/* ── Secondary CTA: Consultation Elite Button ── */}
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="secondary"
                  size="large"
                  caps={true}
                  className="w-full sm:w-auto min-w-[12.5rem]"
                >
                  {t.ctaSecondary}
                </Button>

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
