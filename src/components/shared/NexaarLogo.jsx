import React from 'react';
import { motion } from 'framer-motion';

const NexaarLogo = ({ className = '', size = 'md', color = 'white' }) => {
  const sizes = {
    sm: { scale: 0.8, text: 'text-[0.75rem]' },
    md: { scale: 1, text: 'text-[0.9375rem]' },
    lg: { scale: 1.4, text: 'text-[1.25rem]' }
  };

  const currentSize = sizes[size] || sizes.md;
  
  const textColor = {
    white: 'text-brand-pure-white',
    purple: 'text-brand-electric-purple',
    navy: 'text-brand-deep-navy'
  };

  return (
    <div className={`flex items-center select-none group ${className}`} style={{ transform: `scale(${currentSize.scale})`, transformOrigin: 'left center' }}>
      <motion.span
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`font-display font-black italic tracking-[0.22em] uppercase ${textColor[color] || textColor.white} ${currentSize.text}`}
      >
        Nexaar Tech
      </motion.span>
    </div>
  );
};

export default NexaarLogo;
