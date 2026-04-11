import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const LanguageLoader = () => {
  const { isChanging } = useLanguage();

  return (
    <AnimatePresence>
      {isChanging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] bg-brand-deep-navy flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Central Pulsing Text/Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.05, 1], opacity: 1 }}
            transition={{ duration: 0.8, times: [0, 0.6, 1], ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="font-display font-extrabold text-4xl md:text-6xl text-brand-pure-white tracking-[0.3em] uppercase mb-4 drop-shadow-[0_0_20px_rgba(107,32,232,0.6)]">
              NEXAAR
            </h1>
            <div className="flex items-center justify-center gap-2">
              <motion.div 
                className="h-1 bg-brand-electric-purple rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          {/* Background Ambient Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-electric-purple/10 blur-[120px] rounded-full pointer-events-none" />
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-12 font-display text-[10px] tracking-[0.4em] text-brand-pure-white/40 uppercase"
          >
            Optimizing Experience
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LanguageLoader;
