import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND_CONFIG } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const getNavLinks = (lang) => [
  { name: translations[lang].nav.home,         href: '#home' },
  { name: translations[lang].nav.who,          href: '#who-it-is-for' },
  { name: translations[lang].nav.services,     href: '#services' },
  { name: translations[lang].nav.why,          href: '#why-us' },
  { name: translations[lang].nav.process,      href: '#process' },
  { name: translations[lang].nav.portfolio,    href: '#portfolio' },
  { name: translations[lang].nav.tech,         href: '#tech-stack' },
];

/* ── shared link items ── */
const LinkItem = ({ link, isActive, isHovered, onHover, onClick, variant = 'pill' }) => {
  return (
    <a
      href={link.href}
      onMouseEnter={() => onHover(link.name)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(link.name)}
      className="relative font-body font-medium text-[13px] tracking-wide transition-colors duration-200 select-none"
      style={{ color: isActive || isHovered ? '#ffffff' : 'rgba(255,255,255,0.65)' }}
    >
      <AnimatePresence>
        {(isActive || isHovered) && (
          <motion.span
            layoutId={`${variant}-highlight`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="absolute inset-0 rounded-lg"
            style={{
              background: 'rgba(255,92,53,0.12)',
              boxShadow: 'inset 0 0 0 1px rgba(255,92,53,0.25)',
            }}
          />
        )}
      </AnimatePresence>
      <span className="relative z-10 px-3 py-1.5 block">
        {link.name}
      </span>
    </a>
  );
};

/* ── CTA button ── */
const CtaButton = () => (
  <motion.a
    href={`https://wa.me/${BRAND_CONFIG.whatsapp}`}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.96 }}
    className="btn-cta !text-[10px] !px-4 !py-1.5 focus:ring-coral"
  >
    Get Started
  </motion.a>
);

/* ── Desktop Navigation (Pill & Bar variants) ── */
const DesktopNav = ({ activeLink, hovered, onHover, onClick, onMobileOpen, variant, menuButtonRef }) => {
  const { lang, toggleLanguage } = useLanguage();
  const t = translations[lang].nav;
  const isPill = variant === 'pill';
  const NAV_LINKS = getNavLinks(lang);
  
  return (
    <motion.div
      key={variant}
      initial={isPill ? { opacity: 0, y: -20, scale: 0.97 } : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={isPill ? { opacity: 0, y: -12, scale: 0.97 } : { opacity: 0, y: -8 }}
      transition={{ type: 'spring', stiffness: isPill ? 260 : 280, damping: isPill ? 22 : 26 }}
      className={`absolute inset-x-0 mx-auto flex items-center ${
        isPill 
          ? 'w-max top-5 gap-5 md:gap-7 rounded-full px-5 py-2.5 md:px-6 md:py-3.5' 
          : 'top-0 justify-between px-10 md:px-16 h-[72px]'
      }`}
      style={{
        background: isPill ? 'rgba(13,13,26,0.55)' : 'rgba(13,13,26,0.82)',
        border: isPill ? '1px solid rgba(107,32,232,0.42)' : 'none',
        borderBottom: isPill ? 'none' : '1px solid rgba(107,32,232,0.22)',
        backdropFilter: isPill ? 'blur(16px)' : 'blur(20px)',
        WebkitBackdropFilter: isPill ? 'blur(16px)' : 'blur(20px)',
        boxShadow: isPill 
          ? '0 0 0 1px rgba(107,32,232,0.1), 0 12px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)'
          : '0 1px 0 rgba(107,32,232,0.15), 0 10px 40px rgba(0,0,0,0.55)',
        whiteSpace: 'nowrap',
      }}
    >
      <div className="flex items-center gap-5">
        <a 
          href="/" 
          className={`font-display font-extrabold text-[15px] tracking-[0.22em] transition-colors duration-500 ${
            isPill ? 'text-brand-pure-white' : 'text-brand-electric-purple'
          }`}
          style={{ textShadow: isPill ? '0 0 18px rgba(255,255,255,0.3)' : '0 0 14px rgba(107,32,232,0.55)' }}>
          {BRAND_CONFIG.name}
        </a>
        <span className="h-[18px] w-px bg-brand-electric-purple/30 shrink-0" />
      </div>

      <nav className={`hidden md:flex items-center gap-1 ${!isPill ? 'mx-6' : ''}`}>
        {NAV_LINKS.map(link => (
          <LinkItem 
            key={link.name} 
            link={link} 
            isActive={activeLink === link.name}
            isHovered={hovered === link.name}
            onHover={onHover}
            onClick={onClick}
            variant={variant} 
          />
        ))}
      </nav>

      <div className="hidden md:flex items-center gap-5">
        {!isPill && (
          <span className="flex items-center gap-2">
            <motion.span
              animate={{ scale: [1, 0.7, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="block w-1.5 h-1.5 rounded-full bg-brand-electric-purple"
              style={{ boxShadow: '0 0 8px rgba(107,32,232,0.8)' }}
            />
            <span className="text-[10px] uppercase tracking-widest text-brand-electric-purple font-bold">
              Available for new projects
            </span>
          </span>
        )}
        <span className="h-[18px] w-px bg-brand-electric-purple/30 shrink-0" />
        <button
          onClick={toggleLanguage}
          className="font-display font-bold text-[11px] tracking-widest text-brand-pure-white/80 hover:text-white transition-colors uppercase px-2 focus:outline-none focus:ring-2 focus:ring-brand-electric-purple/50 rounded-md"
          aria-label="Toggle Language"
        >
          {lang === 'en' ? 'عربي' : 'EN'}
        </button>
        <motion.a
          href={`https://wa.me/${BRAND_CONFIG.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="btn-cta !text-[10px] !px-4 !py-1.5 focus:ring-coral"
        >
          {t.getStarted}
        </motion.a>
      </div>

      <button
        ref={menuButtonRef}
        className="md:hidden text-brand-pure-white p-1 rounded-lg hover:bg-white/5 transition-colors"
        onClick={onMobileOpen}
        aria-label="Open menu"
        aria-expanded="false"
        aria-controls="mobile-drawer"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </motion.div>
  );
};

export default function Navbar() {
  const { lang, toggleLanguage } = useLanguage();
  const t = translations[lang].nav;
  const NAV_LINKS = getNavLinks(lang);

  const [isScrolled, setIsScrolled]     = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeLink, setActiveLink]     = useState(translations.en.nav.home);
  const [hovered, setHovered]           = useState(null);

  const drawerRef = React.useRef(null);
  const menuButtonRef = React.useRef(null);

  // Focus Trap & Restore
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
      const focusable = drawerRef.current?.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])');
      if (focusable?.length) focusable[0].focus();

      const handleKey = (e) => {
        if (e.key === 'Escape') setIsMobileOpen(false);
        if (e.key === 'Tab') {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            last.focus();
            e.preventDefault();
          } else if (!e.shiftKey && document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      };
      window.addEventListener('keydown', handleKey);
      return () => {
        window.removeEventListener('keydown', handleKey);
        document.body.style.overflow = 'unset';
        menuButtonRef.current?.focus();
      };
    }
  }, [isMobileOpen]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          // Find the link whose href matches the current section ID
          const sections = ['home', 'who-it-is-for', 'services', 'why-us', 'process', 'portfolio', 'tech-stack'];
          const linkIndex = sections.indexOf(id);
          if (linkIndex !== -1) {
            setActiveLink(getNavLinks('en')[linkIndex].name);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    ['home', 'who-it-is-for', 'services', 'why-us', 'process', 'portfolio', 'tech-stack'].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const handleLinkClick = (name) => {
    setActiveLink(name);
    setIsMobileOpen(false);
  };

  const drawerVariants = {
    closed: { x: lang === 'ar' ? '-100%' : '100%', transition: { type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
    open:   { x: 0, transition: { type: 'tween', duration: 0.4,  ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      <div className="relative h-24 pointer-events-auto">
        <AnimatePresence mode="wait">
          <DesktopNav 
            key={isScrolled ? 'bar' : 'pill'}
            variant={isScrolled ? 'bar' : 'pill'}
            activeLink={activeLink} 
            hovered={hovered} 
            onHover={setHovered} 
            onClick={handleLinkClick} 
            onMobileOpen={() => setIsMobileOpen(true)}
            menuButtonRef={menuButtonRef}
          />
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] pointer-events-auto"
            />

            <motion.aside
              ref={drawerRef}
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
              variants={drawerVariants}
              initial="closed" animate="open" exit="closed"
              className={`fixed top-4 bottom-4 w-[calc(100%-32px)] md:w-[85%] max-w-xs z-[70] p-10 flex flex-col pointer-events-auto rounded-2xl overflow-hidden shadow-2xl ${
                lang === 'ar' ? 'left-4' : 'right-4'
              }`}
              style={{
                background: '#0D0D1A',
                border: '1px solid rgba(107,32,232,0.35)',
              }}
            >
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(107,32,232,0.18) 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />

              <div className="flex justify-between items-center mb-10">
                <span className="font-display font-extrabold text-[15px] tracking-[0.22em] text-brand-electric-purple"
                  style={{ textShadow: '0 0 14px rgba(107,32,232,0.6)' }}>
                  {BRAND_CONFIG.name}
                </span>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="text-brand-pure-white p-2 hover:bg-white/5 rounded-xl transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: lang === 'ar' ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i, type: 'spring', stiffness: 280, damping: 24 }}
                    onClick={() => handleLinkClick(link.name)}
                    className="font-display font-bold text-2xl tracking-wide py-2 px-3 rounded-xl transition-all duration-200 text-center md:text-left"
                    style={{
                      color: activeLink === link.name ? '#fff' : 'rgba(255,255,255,0.65)',
                      background: activeLink === link.name ? 'rgba(107,32,232,0.18)' : 'transparent',
                    }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto pt-8 border-t border-brand-electric-purple/20 flex flex-col gap-4">
                <button
                  onClick={toggleLanguage}
                  className="w-full text-center font-display font-bold text-[14px] tracking-widest text-brand-pure-white/80 hover:text-white transition-colors uppercase py-2 focus:outline-none focus:ring-2 focus:ring-brand-electric-purple/50 rounded-md"
                  aria-label="Toggle Language"
                >
                  {t.toggleLang}
                </button>
                <motion.a
                  href={`https://wa.me/${BRAND_CONFIG.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="btn-cta !text-[11px] !px-5 !py-3 focus:ring-coral text-center block"
                >
                  {t.getStarted}
                </motion.a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
