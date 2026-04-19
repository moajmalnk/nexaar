import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BRAND_CONFIG } from '../utils/constants';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../utils/translations';
import { lockPageScroll } from '../utils/scrollLock';

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

/* ── Desktop Navigation (Pill & Bar variants) ── */
const DesktopNav = ({ activeLink, hovered, onHover, onClick, onMobileOpen, variant, menuButtonRef }) => {
  const { lang, toggleLanguage } = useLanguage();
  const t = translations[lang].nav;
  const isPill = variant === 'pill';
  const NAV_LINKS = getNavLinks(lang);

  return (
    <motion.div
      key={variant}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`absolute inset-x-0 mx-auto flex items-center justify-between ${
        isPill
          ? 'left-4 right-4 md:left-0 md:right-0 md:w-max top-5 rounded-full px-5 py-2.5 md:px-6 md:py-3.5'
          : 'top-0 px-10 md:px-16 h-[72px]'
      }`}
      style={{
        pointerEvents: 'auto',
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
      <div className="flex items-center gap-5">
        <Link
          to="/"
          className={`font-display font-extrabold text-[15px] tracking-[0.22em] transition-colors duration-500 ${
            isPill ? 'text-brand-pure-white' : 'text-brand-electric-purple'
          }`}
          style={{ textShadow: isPill ? '0 0 18px rgba(255,255,255,0.3)' : '0 0 14px rgba(107,32,232,0.55)' }}
        >
          {BRAND_CONFIG.name}
        </Link>
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

      {/* Mobile Right Controls */}
      <div className="flex md:hidden items-center gap-2">
        <button
          onClick={toggleLanguage}
          className="font-display font-bold text-[11px] tracking-widest text-brand-pure-white/80 hover:text-white transition-colors uppercase px-2 focus:outline-none"
          aria-label="Toggle Language"
        >
          {lang === 'en' ? 'عربي' : 'EN'}
        </button>
        <span className="h-[14px] w-px bg-brand-electric-purple/30 shrink-0" />
        <button
          ref={menuButtonRef}
          className="text-brand-pure-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          onClick={onMobileOpen}
          aria-label="Open menu"
          aria-expanded={false}      // passed as prop below in the real usage — see Navbar
          aria-controls="mobile-drawer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Main Navbar
───────────────────────────────────────────── */
export default function Navbar() {
  const { lang, toggleLanguage } = useLanguage();
  const t = translations[lang].nav;
  const NAV_LINKS = getNavLinks(lang);

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // FIX #2 — initialise active label from current lang, not hardcoded 'en'
  const [activeLink, setActiveLink] = useState(() => translations[lang].nav.home);
  const [hovered, setHovered]       = useState(null);

  const drawerRef     = useRef(null);
  const menuButtonRef = useRef(null);

  // FIX #3 — keep a ref to current lang so the IntersectionObserver
  // callback always reads the live value without re-subscribing every
  // time the language changes.
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

  // FIX #3 — observer uses langRef so it always sets the correct label
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
            // Use langRef.current — always the live language value
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
  }, []); // observe once on mount

  // FIX #2 — when the user switches language, re-resolve the active label
  // so the highlight doesn't break on language toggle mid-scroll.
  useEffect(() => {
    // Simpler: find which section is currently "active" by matching
    // across both languages via index position
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
    // FIX #4 — honour iOS notch / dynamic island safe-area at the top
    <header
      className="fixed top-0 left-0 w-full z-[999] pointer-events-none"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="relative h-24 pointer-events-auto nav-main-wrapper transition-all duration-500">
        {/* FIX #7 — pass isMobileOpen so aria-expanded is live */}
        <DesktopNavWithExpanded
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
                // FIX #1 — prevent overflow on small screens (iPhone SE = 667px viewport)
                // dvh falls back to vh in older browsers gracefully
                maxHeight: 'calc(100dvh - 120px)',
                overflowY: 'auto',
                // smooth momentum scroll on iOS
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {/* Decorative glow — pointer-events-none so it never blocks taps */}
              <div
                className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none opacity-50 dark:opacity-30"
                style={{ background: 'radial-gradient(circle, rgba(107,32,232,0.3) 0%, transparent 70%)' }}
              />

              <div className="flex justify-between items-center mb-4 px-2">
                <span
                  className="font-display font-extrabold text-[14px] tracking-[0.22em] text-brand-pure-white"
                  style={{ textShadow: '0 0 12px rgba(255,255,255,0.3)' }}
                >
                  {BRAND_CONFIG.name}
                </span>
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
                        <AnimatePresence>
                          {isActive && (
                            <motion.span
                              layoutId="mobile-highlight"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 rounded-2xl"
                              style={{
                                background: 'rgba(255,92,53,0.12)',
                                boxShadow: 'inset 0 0 0 1px rgba(255,92,53,0.25)',
                              }}
                            />
                          )}
                        </AnimatePresence>
                        <span
                          className="relative z-10 font-display font-bold text-[17px] tracking-wide transition-colors duration-300"
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

              {/* mt-auto pushes footer to bottom only when there's room;
                  if the drawer scrolls it simply follows the content */}
              <div className="mt-auto pt-5 border-t border-brand-electric-purple/20 flex flex-col gap-4">
                <motion.a
                  href={`https://wa.me/${BRAND_CONFIG.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-cta !text-[12px] !py-4 flex items-center justify-center gap-2 group shadow-[0_10px_30px_rgba(255,92,53,0.3)]"
                >
                  <span>{t.getStarted}</span>
                  {/* FIX #5 — valid Tailwind class for arrow nudge on hover */}
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${lang === 'ar' ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d={lang === 'ar' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
                    />
                  </svg>
                </motion.a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─────────────────────────────────────────────
   Inlined DesktopNav with aria-expanded wired up
   (replaces the exported DesktopNav above — kept
   separate so the component tree stays clean)
───────────────────────────────────────────── */
function DesktopNavWithExpanded({
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
      className={`absolute inset-x-0 mx-auto flex items-center justify-between ${
        isPill
          ? 'left-4 right-4 md:left-0 md:right-0 md:w-max top-5 rounded-full px-5 py-2.5 md:px-6 md:py-3.5'
          : 'top-0 px-10 md:px-16 h-[72px]'
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
      <div className="flex items-center gap-5">
        <Link
          to="/"
          className={`font-display font-extrabold text-[15px] tracking-[0.22em] transition-colors duration-500 ${
            isPill ? 'text-brand-pure-white' : 'text-brand-electric-purple'
          }`}
          style={{ textShadow: isPill ? '0 0 18px rgba(255,255,255,0.3)' : '0 0 14px rgba(107,32,232,0.55)' }}
        >
          {BRAND_CONFIG.name}
        </Link>
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

      {/* Mobile Right Controls */}
      <div className="flex md:hidden items-center gap-2">
        <button
          onClick={toggleLanguage}
          className="font-display font-bold text-[11px] tracking-widest text-brand-pure-white/80 hover:text-white transition-colors uppercase px-2 focus:outline-none"
          aria-label="Toggle Language"
        >
          {lang === 'en' ? 'عربي' : 'EN'}
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
