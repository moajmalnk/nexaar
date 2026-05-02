import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { BRAND_CONFIG } from '../utils/constants';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../utils/translations';
import { lockPageScroll } from '../utils/scrollLock';
import NexaarLogo from './shared/NexaarLogo';
import Button from './shared/Button';
import { trackEvent, ANALYTICS_EVENTS } from '../utils/analytics';
import ConsultationModal from './ConsultationModal';

/* ── translation icon component ── */
const TranslationIcon = ({ className }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m5 8 6 6" />
    <path d="m4 14 6-6 2-3" />
    <path d="M2 5h12" />
    <path d="M7 2h1" />
    <path d="m22 22-5-10-5 10" />
    <path d="M14 18h6" />
  </svg>
);

/* ── premium language switcher button ── */
const LanguageToggle = ({ lang, toggleLanguage }) => {
  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-brand-electric-coral/10 hover:border-brand-electric-coral/40 transition-all duration-300 group focus:outline-none"
      aria-label="Toggle Language"
    >
      <div className="relative">
        <TranslationIcon className="w-4 h-4 text-brand-electric-coral transition-transform duration-500 group-hover:rotate-[20deg]" />
        <div className="absolute inset-0 bg-brand-electric-coral/20 blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <span className={`font-display font-black text-[0.75rem] tracking-widest text-brand-pure-white uppercase ${lang === 'en' ? 'font-arabic' : ''}`}>
        {lang === 'en' ? 'العربية' : 'English'}
      </span>
    </button>
  );
};

const getNavLinks = (lang) => [
  { id: 'home',          name: translations[lang].nav.home,      href: '/#home' },
  { id: 'who-it-is-for', name: translations[lang].nav.who,       href: '/#who-it-is-for' },
  { id: 'services',      name: translations[lang].nav.services,  href: '/#services' },
  { id: 'why-us',        name: translations[lang].nav.why,       href: '/#why-us' },
  { id: 'process',       name: translations[lang].nav.process,   href: '/#process' },
  { id: 'portfolio',     name: translations[lang].nav.portfolio, href: '/#portfolio' },
  { id: 'tech-stack',    name: translations[lang].nav.tech,      href: '/#tech-stack' },
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
const LinkItem = ({ link, isActive, isHovered, onHover, onClick, isLegalPage }) => {
  // Suppress visual active/hover states on legal pages
  const showEffect = !isLegalPage && (isActive || isHovered);

  return (
    <a
      href={link.href}
      className="relative flex items-center justify-center py-2 px-2 xl:px-3 group focus:outline-none"
      onMouseEnter={() => onHover(link.id)}
      onMouseLeave={() => onHover(null)}
      onClick={(e) => onClick(e, link.id, link.href)}
    >
      <span 
        className={`relative z-10 transition-colors duration-300 font-body text-sm font-medium ${
          showEffect ? 'text-brand-electric-purple' : 'text-brand-pure-white/60'
        }`}
      >
        {link.name}
      </span>
      
      {/* Orange Line Hover Effect */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ 
          scaleX: showEffect ? 1 : 0,
          opacity: showEffect ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-electric-purple origin-center"
        style={{
          boxShadow: '0 0 10px rgba(107,32,232,0.4)',
          width: '70%',
          margin: '0 auto'
        }}
      />
    </a>
  );
};

/* ── Desktop Navigation ── */
function DesktopNav({
  activeId, hovered, onHover, onClick, onMobileOpen,
  variant, menuButtonRef, isMobileOpen,
  lang, toggleLanguage, t, NAV_LINKS, isLegalPage, pathname,
  onOpenConsultation,
}) {
  const isPill = variant === 'pill';

  return (
    <motion.div
      key={variant}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`absolute inset-x-0 mx-auto flex items-center justify-between ${
        isPill
          ? 'w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] max-w-7xl top-4 sm:top-5 rounded-full px-6 sm:px-8 lg:px-10 py-3 sm:py-4'
          : 'w-full top-0 px-4 sm:px-8 lg:px-12 xl:px-16 h-[80px]'
      }`}
      style={{
        background: isPill ? 'rgba(13,13,26,0.92)' : 'rgba(13,13,26,0.98)',
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
      <div className="flex items-center gap-2 xl:gap-5">
        <Link
          to="/"
          onClick={(e) => {
            if (pathname === '/') {
              e.preventDefault();
              if (window.lenis) {
                window.lenis.scrollTo(0, { duration: 1.5 });
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }
          }}
          className="transition-opacity duration-300 hover:opacity-80 border-none outline-none rounded-lg p-1"
        >
          <NexaarLogo size="md" color={isPill ? 'white' : 'purple'} />
        </Link>
      </div>

      <nav className="hidden lg:flex items-center gap-1 lg:gap-3 xl:gap-6 mx-auto">
        {NAV_LINKS.filter(link => link.id !== 'home').map(link => (
          <LinkItem
            key={link.id}
            link={link}
            isActive={activeId === link.id}
            isHovered={hovered === link.id}
            onHover={onHover}
            onClick={onClick}
            variant={variant}
            isLegalPage={isLegalPage}
          />
        ))}
      </nav>

      <div className="hidden lg:flex items-center gap-3 xl:gap-5">
        {!isPill && (
          <span className="hidden xl:flex items-center gap-2">
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
        <LanguageToggle lang={lang} toggleLanguage={toggleLanguage} />
        <Button
          onClick={() => {
            trackEvent(ANALYTICS_EVENTS.CONVERSION_GET_STARTED);
            if (onOpenConsultation) onOpenConsultation();
          }}
          variant="accent"
          size="small"
          caps={true}
          className="rounded-full px-5 xl:px-6 shadow-coral-glow/20"
        >
          {t.getStarted}
        </Button>
      </div>

      <div className="flex lg:hidden items-center gap-3">
        <LanguageToggle lang={lang} toggleLanguage={toggleLanguage} />
        <span className="h-[14px] w-px bg-brand-electric-purple/30 shrink-0" />
        <button
          ref={menuButtonRef}
          className="flex items-center justify-center h-11 w-11 text-brand-pure-white rounded-lg hover:bg-white/5 transition-colors focus:outline-none"
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
  const { pathname } = useLocation();
  const isLegalPage = pathname === '/privacy' || pathname === '/terms';

  const t = translations[lang].nav;
  const NAV_LINKS = getNavLinks(lang);

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const isMobileOpenRef = useRef(isMobileOpen);
  
  // Sync ref for access inside listeners
  useEffect(() => {
    isMobileOpenRef.current = isMobileOpen;
  }, [isMobileOpen]);

  // Track active state by ID (e.g., 'home', 'why-us') instead of translated name
  const [activeId, setActiveId] = useState('home');
  const [hovered, setHovered]   = useState(null);

  const drawerRef     = useRef(null);
  const menuButtonRef = useRef(null);

  // Visibility logic (Hide on scroll down, show on scroll up)
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();

  // Force Home active state when at top of page
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Crucial fix: The scrollLock utility changes body position to fixed,
    // which makes window.scrollY jump to 0. We must ignore scroll events
    // while the mobile menu is open so it doesn't instantly snap to "Home".
    if (isMobileOpenRef.current) return;

    if (latest < 100 && activeId !== 'home') {
      setActiveId('home');
    }

    // Existing visibility logic...
    const diff = latest - lastScrollY;
    if (Math.abs(diff) < 20 && latest > 50) return;

    if (latest < 50) {
      setIsVisible(true);
    } else if (diff > 0) {
      setIsVisible(false);
    } else if (diff < -15) {
      setIsVisible(true);
    }
    setLastScrollY(latest);
  });

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
      // Target the center-upper part of the viewport (20% height band)
      // This is much more robust for sections with varying heights.
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      // Also prevent the observer from overriding the state while the menu is open,
      // as the layout shifts caused by scroll lock might trigger false intersections.
      if (isMobileOpenRef.current) return;

      // Find the first section that is intersecting our narrow center band
      const activeEntry = entries.find(entry => entry.isIntersecting);
      
      if (activeEntry) {
        const winnerId = activeEntry.target.getAttribute('id');
        if (SECTION_IDS.includes(winnerId)) {
          setActiveId(winnerId);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    SECTION_IDS.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []); 

  const handleLinkClick = (e, id, href) => {
    // Smooth scroll for hash links ONLY if we are already on the home page
    if (window.lenis && href && href.startsWith('/#') && pathname === '/') {
      e.preventDefault();
      const targetId = href.replace('/', ''); // e.g., '#services'
      window.lenis.scrollTo(targetId, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }

    setActiveId(id);
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
    <>
      <motion.header
      initial={false}
      animate={{ y: isVisible ? '0%' : '-100%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 w-full z-[999] pointer-events-none"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className={`relative h-24 pointer-events-auto nav-main-wrapper transition-all duration-500`}>
        <DesktopNav
          variant="pill"
          activeId={activeId}
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
          isLegalPage={isLegalPage}
          pathname={pathname}
          onOpenConsultation={() => setIsConsultationOpen(true)}
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
                  const isActive = activeId === link.id;
                  return (
                    <motion.div
                      key={link.id}
                      variants={{ closed: { opacity: 0, x: -10 }, open: { opacity: 1, x: 0 } }}
                    >
                      <motion.a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.id, link.href)}
                        whileTap={{ scale: 0.97, backgroundColor: 'rgba(255,255,255,0.05)' }}
                        className={`relative group flex items-center py-2.5 px-4 rounded-2xl transition-all duration-200 ${
                          isActive ? 'bg-white/5' : 'hover:bg-white/5'
                        }`}
                      >
                        <span
                          className="relative z-10 font-body text-[1.0625rem] tracking-wide transition-colors duration-300"
                          style={{ color: (isActive && !isLegalPage) ? 'var(--color-brand-electric-purple, #6B20E8)' : 'rgba(255,255,255,0.6)' }}
                        >
                          {link.name}
                        </span>
                        {(isActive && !isLegalPage) && (
                          <motion.span
                            layoutId="mobile-dot"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-electric-purple"
                            style={{ boxShadow: '0 0 10px rgba(107,32,232,0.5)' }}
                          />
                        )}
                      </motion.a>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-auto pt-5 border-t border-brand-electric-purple/20 flex flex-col gap-4">
                <Button
                  onClick={() => {
                    trackEvent(ANALYTICS_EVENTS.CONVERSION_WHATSAPP);
                    setIsMobileOpen(false);
                    setIsConsultationOpen(true);
                  }}
                  variant="accent"
                  className="w-full !py-4 rounded-2xl shadow-coral-glow/20"
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

    <ConsultationModal 
      isOpen={isConsultationOpen} 
      onClose={() => setIsConsultationOpen(false)} 
    />
  </>
);
}
