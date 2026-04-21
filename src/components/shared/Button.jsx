import React from 'react';

const Button = ({ 
  children, 
  isLoading = false, 
  loadingText = 'Processing...', 
  variant = 'primary', // 'primary', 'secondary', 'accent', 'ghost'
  size = 'medium',    // 'small', 'medium', 'large'
  type = 'button',
  onClick,
  className = '',
  icon,
  iconPosition = 'right', // 'left', 'right'
  disabled = false,
  as = 'button',
  href,
  caps = false,
  ...props
}) => {
  const Component = as;
  
  const baseStyles = "inline-flex items-center justify-center gap-2 font-display font-semibold transition-all duration-200 select-none whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brand-electric-purple text-brand-pure-white hover:brightness-110 active:shadow-[0_0_15px_rgba(107,32,232,0.4)]",
    secondary: "bg-transparent border-[1.5px] border-brand-electric-purple text-brand-pure-white hover:bg-brand-electric-purple hover:text-brand-pure-white",
    accent: "bg-brand-electric-coral text-brand-pure-white hover:shadow-lg hover:shadow-brand-electric-coral/40 active:translate-y-0 hover:-translate-y-0.5",
    ghost: "bg-transparent text-current hover:bg-white/5"
  };

  const sizes = {
    small: "h-10 px-4 text-[0.875rem] rounded-xl",
    medium: "h-12 px-6 text-[0.9375rem] rounded-xl",
    large: "h-14 px-8 text-[1rem] md:text-[1.125rem] rounded-2xl"
  };

  const currentStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${caps ? 'uppercase tracking-wider' : 'normal-case'} ${className}`;

  const content = (
    <>
      {isLoading ? (
        <div className="flex items-center gap-3">
          <svg className="animate-spin h-4 w-4 text-current opacity-80" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="font-bold tracking-tight opacity-90">{loadingText}</span>
        </div>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </>
  );

  if (as === 'a' && href) {
    return (
      <a 
        href={href} 
        className={currentStyles} 
        onClick={onClick}
        {...(props.target === '_blank' ? { rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={currentStyles}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
