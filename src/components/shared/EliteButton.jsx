import React from 'react';
import { motion } from 'framer-motion';

const EliteButton = ({ 
  children, 
  isLoading = false, 
  loadingText = 'Processing...', 
  variant = 'cta', // 'cta', 'outline', 'primary'
  type = 'button',
  onClick,
  className = '',
  icon,
  disabled = false,
  as = 'button',
  href,
  ...props
}) => {
  const Component = as;
  
  const baseStyles = "relative flex items-center justify-center gap-3 rounded-xl font-display font-medium uppercase tracking-[0.18em] text-sm transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] disabled:cursor-not-allowed disabled:opacity-80 group";
  
  const variantStyles = {
    cta: `btn-cta bg-brand-electric-coral text-brand-pure-white py-4 px-6 md:px-10 shadow-ambient active:scale-95`,
    outline: `btn-outline-brand border-2 border-brand-electric-purple text-brand-pure-white py-4 px-6 md:px-8 active:scale-95`,
    primary: `bg-brand-electric-purple text-brand-pure-white py-4 px-6 md:px-10 shadow-ambient hover:bg-brand-lavender active:scale-95`
  };

  const currentStyles = `${baseStyles} ${variantStyles[variant] || variantStyles.cta} ${className}`;

  return (
    <motion.div
      className={as === 'a' ? 'inline-block' : 'block'}
      whileTap={{ scale: 0.96 }}
    >
      <Component
        type={as === 'button' ? type : undefined}
        href={href}
        onClick={onClick}
        disabled={disabled || isLoading}
        className={currentStyles}
        {...props}
      >
      {/* Shimmer Effect for CTA */}
      {variant === 'cta' && (
        <span className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          <span className="absolute inset-0 translate-x-[-200%] group-hover:animate-[shimmer_1.5s_infinite] transition-transform duration-1000"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
              width: '50%',
            }}
          />
        </span>
      )}

        {isLoading ? (
          <div className="flex items-center gap-3">
            <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="opacity-80">{loadingText}</span>
          </div>
        ) : (
          <>
            {children}
            {icon && <span className="transition-all duration-300">{icon}</span>}
          </>
        )}
      </Component>
    </motion.div>
  );
};

export default EliteButton;
