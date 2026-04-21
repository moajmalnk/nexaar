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
    <div 
      dir="ltr"
      className={`flex flex-col select-none group leading-none ${className}`} 
      style={{ 
        transform: `scale(${currentSize.scale})`, 
        transformOrigin: 'left center' 
      }}
    >
      {/* Primary Brand Name */}
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`font-display font-black italic tracking-tighter uppercase ${textColor[color] || textColor.white} text-[1.5rem]`}
      >
        Nexaar
      </motion.span>

      {/* Sub-label - Fixed position relative to brand name */}
      <motion.span
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className={`font-display font-semibold italic tracking-[0.35em] uppercase self-start pl-[4em] ${textColor[color] || textColor.white} text-[0.55rem] -mt-[2px] opacity-80`}
      >
        Tech
      </motion.span>
    </div>
  );
};

export default NexaarLogo;
