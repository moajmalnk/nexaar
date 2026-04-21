import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../utils/translations';
import Button from '../components/shared/Button';

const NotFound = () => {
  const { lang } = useLanguage();
  const t = translations[lang].notFound;

  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-brand-deep-navy pt-32 pb-32">
      <div className="relative z-10 max-w-[1240px] w-[92%] mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Big Glowing 404 */}
          <motion.h1 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              delay: 0.2,
              duration: 0.8 
            }}
            className="font-display font-black text-[6.5rem] sm:text-[10rem] md:text-[15rem] leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-brand-pure-white via-brand-pure-white/80 to-brand-electric-purple/40 mb-4"
          >
            404
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="font-display font-bold text-2xl md:text-4xl text-brand-pure-white uppercase tracking-tight">
              {t.title}
            </h2>
            <p className="font-body text-brand-soft-lavender/80 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
              {t.desc}
            </p>

            <div className="pt-8">
              <Button
                as={Link}
                to="/"
                variant="primary"
                size="large"
                caps={true}
                className="min-w-[15rem] shadow-neon-glow"
              >
                {t.cta}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] pointer-events-none" />
    </div>
  );
};

export default NotFound;
