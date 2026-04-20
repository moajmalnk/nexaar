import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BRAND_CONFIG } from '../utils/constants';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../utils/translations';
import { lockPageScroll } from '../utils/scrollLock';
import NexaarLogo from './shared/NexaarLogo';
import Button from './shared/Button';

const getNavLinks = (lang) => [
  { name: translations[lang].nav.home,      href: '/#home' },
  { name: translations[lang].nav.who,       href: '/#who-it-is-for' },
  { name: translations[lang].nav.services,  href: '/#services' },
  { name: translations[lang].nav.why,       href: '/#why-us' },
  { name: translations[lang].nav.process,   href: '/#process' },
  { name: translations[lang].nav.portfolio, href: '/#portfolio' },
  { name: translations[lang].nav.tech,      href: '/#tech-stack' },
];

const SECTION_IDS = [
  'home',
  'who-it-is-for',
  'services',
  'why-us',
  'process',
  'portfolio',
  'tech-stack',
];

/* ── shared link items ── */
const LinkItem = ({ link, isActive, isHovered, onHover, onClick, variant }) => {
  return (
    <a
      href={link.href}
      className="relative flex items-center justify-center py-2 px-1.5 xl:px-3 group focus:outline-none"
      onMouseEnter={() => onHover(link.name)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    >
      <span 
        className={`relative z-10 transition-colors duration-300 font-display font-medium text-[0.75rem] xl:text-[0.8125rem] tracking-widest uppercase ${
          isActive || isHovered ? 'text-brand-pure-white' : 'text-brand-pure-white/60'
        }`}
      >
        {link.name}
      </span>
      
      {/* Orange Line Hover Effect */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ 
          scaleX: isHovered || isActive ? 1 : 0,
          opacity: isHovered || isActive ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-electric-coral origin-center"
        style={{
          boxShadow: '0 0 10px rgba(255,92,53,0.4)',
          width: '70%',
          margin: '0 auto'
        }}
      />
    </a>
  );
};

/* ── Desktop Navigation ── */
function DesktopNav({
  activeLink, hovered, onHover, onClick, onMobileOpen,
  variant, menuButtonRef, isMobileOpen,
  lang, toggleLanguage, t, NAV_LINKS,
}) {
  const isPill = variant === 'pill';

  return (
    <motion.div
      key={variant}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`absolute inset-x-0 mx-auto flex items-center justify-between transition-all duration-500 ${
        isPill
          ? 'top-0 left-0 right-0 w-full rounded-none px-6 py-4 xl:top-5 xl:left-4 xl:right-4 xl:max-w-[1440px] xl:w-[94%] xl:rounded-full xl:px-10 xl:py-3.5'
          : 'top-0 px-6 lg:px-10 xl:px-16 h-[72px]'
      }`}
      style={{
        background: isPill ? 'rgba(13,13,26,0.92)' : 'rgba(13,13,26,0.98)',
        border: isPill ? '1px solid rgba(107,32,232,0.15)' : 'none',
        borderBottom: isPill ? 'none' : '1px solid rgba(107,32,232,0.22)',
        backdropFilter: isPill ? 'blur(16px)' : 'blur(20px)',
        WebkitBackdropFilter: isPill ? 'blur(16px)' : 'blur(20px)',
        boxShadow: isPill
          ? '0 0 0 1px rgba(107,32,232,0.05), 0 12px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)'
          : '0 1px 0 rgba(107,32,232,0.15), 0 10px 40px rgba(0,0,0,0.55)',
        whiteSpace: 'nowrap',
      }}
    >
      <div className="flex items-center gap-4 xl:gap-5">
        <Link
          to="/"
          className="transition-opacity duration-300 hover:opacity-80 border-none outline-none focus:ring-2 focus:ring-brand-electric-purple/50 rounded-lg p-1.5 -ml-1.5"
        >
          <NexaarLogo size="md" color={isPill ? 'white' : 'purple'} />
        </Link>
        <span className="h-[18px] w-px bg-brand-electric-purple/30 shrink-0" />
      </div>

      <nav className={`hidden xl:flex items-center gap-0.5 xl:gap-1 mx-2 xl:mx-6`}>
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

      <div className="hidden xl:flex items-center gap-3 xl:gap-5">
        {!isPill && (
          <span className="hidden 2xl:flex items-center gap-2">
            <motion.span
              animate={{ scale: [1, 0.7, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="block w-1.5 h-1.5 rounded-full bg-brand-electric-purple"
              style={{ boxShadow: '0 0 8px rgba(107,32,232,0.8)' }}
            />
            <span className="text-[0.625rem] uppercase tracking-widest text-brand-electric-purple font-bold">
              Available for new projects
            </span>
          </span>
        )}
        <span className="h-[18px] w-px bg-brand-electric-purple/30 shrink-0" />
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-brand-electric-purple/10 hover:border-brand-electric-purple/40 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-brand-electric-purple/50"
          aria-label="Toggle Language"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-electric-purple transition-transform duration-500 group-hover:rotate-[30deg]">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          <span className="font-display font-medium text-[0.75rem] tracking-wider text-brand-pure-white">
            {lang === 'en' ? 'AR' : 'EN'}
          </span>
        </button>
        <Button
          as="a"
          href={`https://wa.me/${BRAND_CONFIG.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          size="small"
          caps={true}
          className="rounded-full border border-white/10 bg-white/5 hover:bg-brand-electric-purple/10 hover:border-brand-electric-purple/40 px-5"
        >
          {t.getStarted}
        </Button>
      </div>

      {/* Mobile Right Controls */}
      <div className="flex lg:hidden items-center gap-2">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-white/10 bg-white/5 active:bg-white/10 transition-all focus:outline-none"
          aria-label="Toggle Language"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-electric-purple">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          <span className="font-display font-medium text-[0.6875rem] text-brand-pure-white uppercase">
            {lang === 'en' ? 'AR' : 'EN'}
          </span>
        </button>
        <span className="h-[14px] w-px bg-brand-electric-purple/30 shrink-0" />
        <button
          ref={menuButtonRef}
          className="text-brand-pure-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          onClick={onMobileOpen}
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-drawer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Navbar
───────────────────────────────────────────── */
export default function Navbar() {
  const { lang, toggleLanguage } = useLanguage();
  const t = translations[lang].nav;
  const NAV_LINKS = getNavLinks(lang);

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [activeLink, setActiveLink] = useState(() => translations[lang].nav.home);
  const [hovered, setHovered]       = useState(null);

  const drawerRef     = useRef(null);
  const menuButtonRef = useRef(null);

  // Visibility logic (Hide on scroll down, show on scroll up)
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10 || isMobileOpen) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const langRef = useRef(lang);
  useEffect(() => { langRef.current = lang; }, [lang]);

  // Focus Trap & Restore
  useEffect(() => {
    if (isMobileOpen) {
      const unlockScroll = lockPageScroll();
      const focusable = drawerRef.current?.querySelectorAll(
        'button, a, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable?.length) focusable[0].focus();

      const handleKey = (e) => {
        if (e.key === 'Escape') setIsMobileOpen(false);
        if (e.key === 'Tab') {
          const first = focusable[0];
          const last  = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            last.focus(); e.preventDefault();
          } else if (!e.shiftKey && document.activeElement === last) {
            first.focus(); e.preventDefault();
          }
        }
      };
      
      const currentMenuButton = menuButtonRef.current;
      window.addEventListener('keydown', handleKey);
      return () => {
        window.removeEventListener('keydown', handleKey);
        unlockScroll();
        currentMenuButton?.focus({ preventScroll: true });
      };
    }
  }, [isMobileOpen]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          const linkIndex = SECTION_IDS.indexOf(id);
          if (linkIndex !== -1) {
            setActiveLink(getNavLinks(langRef.current)[linkIndex].name);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    SECTION_IDS.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []); 

  useEffect(() => {
    const enLinks = getNavLinks('en');
    const arLinks = getNavLinks('ar');
    const combinedLinks = [...enLinks, ...arLinks];
    const matchedIndex = combinedLinks.findIndex(l => l.name === activeLink);
    
    if (matchedIndex !== -1) {
      const normalizedIndex = matchedIndex % enLinks.length;
      const newLabel = getNavLinks(lang)[normalizedIndex]?.name ?? translations[lang].nav.home;
      if (newLabel !== activeLink) {
        requestAnimationFrame(() => setActiveLink(newLabel));
      }
    }
  }, [lang, activeLink]);

  const handleLinkClick = (name) => {
    setActiveLink(name);
    setIsMobileOpen(false);
  };

  const drawerVariants = {
    closed: {
      opacity: 0, y: -20, scale: 0.95,
      transition: { type: 'spring', stiffness: 300, damping: 30, staggerChildren: 0.05, staggerDirection: -1 },
    },
    open: {
      opacity: 1, y: 0, scale: 1,
      transition: { type: 'spring', stiffness: 280, damping: 25, staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  return (
    <motion.header
      initial={false}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 w-full z-[999] pointer-events-none"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className={`relative h-24 pointer-events-auto nav-main-wrapper transition-all duration-500`}>
        <DesktopNav
          variant="pill"
          activeLink={activeLink}
          hovered={hovered}
          onHover={setHovered}
          onClick={handleLinkClick}
          onMobileOpen={() => setIsMobileOpen(true)}
          menuButtonRef={menuButtonRef}
          isMobileOpen={isMobileOpen}
          lang={lang}
          toggleLanguage={toggleLanguage}
          t={t}
          NAV_LINKS={NAV_LINKS}
        />
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
              className="fixed top-24 left-4 right-4 z-[70] p-5 flex flex-col pointer-events-auto rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] no-scrollbar"
              style={{
                background: 'rgba(13,13,26,0.72)',
                border: '1px solid rgba(107,32,232,0.45)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                maxHeight: 'calc(100dvh - 120px)',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <div
                className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none opacity-50 dark:opacity-30"
                style={{ background: 'radial-gradient(circle, rgba(107,32,232,0.3) 0%, transparent 70%)' }}
              />

              <div className="flex justify-between items-center mb-4 px-2">
                <NexaarLogo size="sm" color="white" />
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="text-brand-pure-white/60 p-2 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col gap-1.5 px-1">
                {NAV_LINKS.map((link) => {
                  const isActive = activeLink === link.name;
                  return (
                    <motion.div
                      key={link.name}
                      variants={{ closed: { opacity: 0, x: -10 }, open: { opacity: 1, x: 0 } }}
                    >
                      <a
                        href={link.href}
                        onClick={() => handleLinkClick(link.name)}
                        className="relative group flex items-center py-2.5 px-4 rounded-2xl transition-all duration-300"
                      >
                        <span
                          className="relative z-10 font-display font-medium text-[1.0625rem] tracking-wide transition-colors duration-300"
                          style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.6)' }}
                        >
                          {link.name}
                        </span>
                        {isActive && (
                          <motion.span
                            layoutId="mobile-dot"
                            className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-coral"
                            style={{ boxShadow: '0 0 10px rgba(255,92,53,0.5)' }}
                          />
                        )}
                      </a>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-auto pt-5 border-t border-brand-electric-purple/20 flex flex-col gap-4">
                <Button
                  as="a"
                  href={`https://wa.me/${BRAND_CONFIG.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  className="w-full !py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-brand-electric-purple/10 hover:border-brand-electric-purple/40"
                  caps={true}
                >
                  {t.getStarted}
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
