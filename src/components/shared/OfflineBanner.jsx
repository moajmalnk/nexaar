import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { useLanguage } from '../../hooks/useLanguage';
import { translations } from '../../utils/translations';

const OfflineBanner = () => {
  const isOnline = useOnlineStatus();
  const { lang } = useLanguage();
  const t = translations[lang].offline;

  return (
    <AnimatePresence>
      {!isOnline && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-deep-navy/60 backdrop-blur-md pointer-events-none"
            style={{ WebkitBackdropFilter: 'blur(12px)' }}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative z-10 w-full max-w-sm"
          >
          <div 
            className="bg-brand-electric-coral/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-[0_20px_50px_rgba(255,77,77,0.4)] flex flex-col items-center text-center gap-4"
            style={{ WebkitBackdropFilter: 'blur(40px)' }}
          >
            {/* Warning Icon - Pulsing */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex-shrink-0 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </motion.div>

            {/* Text Content */}
            <div className="space-y-1">
              <h4 className="font-display font-black text-white text-sm tracking-[0.2em] uppercase">
                {t.title}
              </h4>
              <p className="font-body text-white/90 text-sm leading-relaxed max-w-[240px]">
                {t.desc}
              </p>
            </div>

            {/* Subtle Pulse Indicator at bottom */}
            <div className="flex items-center gap-2 px-3 py-1 bg-black/20 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-[10px] font-bold text-white uppercase tracking-widest opacity-80">
                Retrying...
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
  );
};

export default OfflineBanner;
