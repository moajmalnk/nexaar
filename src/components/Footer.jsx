import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../utils/translations';
import { BRAND_CONFIG } from '../utils/constants';
import NexaarLogo from './shared/NexaarLogo';

/**
 * ── Sub-Component: Social Link ────────────────────────────────────────
 */
const SocialLink = ({ href, icon: Icon, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -4, scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-brand-electric-purple/20 hover:border-brand-electric-purple/30 transition-all duration-300"
    aria-label={label}
  >
    <Icon className="w-5 h-5" />
  </motion.a>
);

const LinkedInIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const Footer = () => {
  const { lang } = useLanguage();
  const t = translations[lang].footer;
  const currentYear = new Date().getFullYear();

  const servicesLinks = translations[lang].services.items.map(s => ({
    name: s.title,
    href: "/#services"
  }));

  const companyLinks = [
    { name: translations[lang].nav.about,     href: "/#who-it-is-for" },
    { name: translations[lang].nav.services,  href: "/#services" },
    { name: translations[lang].nav.portfolio, href: "/#portfolio" },
    { name: translations[lang].nav.why,       href: "/#why-us" },
    { name: lang === 'ar' ? 'لوحة التحكم' : 'Dashboard', href: "/admin" },
  ];

  return (
    <footer className="relative bg-brand-deep-navy overflow-hidden font-display pt-20">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-[50%] h-[1px] bg-gradient-to-r from-transparent via-brand-electric-purple/20 to-transparent" />
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        
        {/* 1. EDITORIAL LINK GRID */}
        <div className="grid grid-cols-12 gap-y-16 lg:gap-y-0">
          
          {/* Brand Column */}
          <div className="col-span-12 lg:col-span-4 py-10 lg:py-20 lg:pr-16 rtl:lg:pr-0 rtl:lg:pl-16 flex flex-col items-center lg:items-start gap-12 text-center lg:text-left rtl:lg:text-right">
            <div className="space-y-8 flex flex-col items-center lg:items-start">
              <NexaarLogo size="lg" className="hover:opacity-80 transition-opacity" />
              <p className="text-brand-soft-lavender/60 font-body text-[0.9375rem] leading-relaxed max-w-sm">
                {t.desc}
              </p>
              <div className="flex items-center gap-4">
                <SocialLink href={BRAND_CONFIG.socials.linkedin} icon={LinkedInIcon} label="LinkedIn" />
                <SocialLink href={BRAND_CONFIG.socials.x} icon={TwitterIcon} label="X (Twitter)" />
                <SocialLink href={BRAND_CONFIG.socials.instagram} icon={InstagramIcon} label="Instagram" />
                <SocialLink href={BRAND_CONFIG.socials.facebook} icon={FacebookIcon} label="Facebook" />
              </div>
            </div>
            <div>
               <span className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-brand-electric-purple border border-brand-electric-purple/20 px-4 py-2 rounded-full inline-block">
                {t.location}
              </span>
            </div>
          </div>

          {/* Nav Columns Layer */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-0 text-center lg:text-left rtl:lg:text-right">
            {/* Services */}
            <div className="lg:py-20 lg:px-12 space-y-10">
              <h4 className="text-[0.65rem] font-bold text-white/30 uppercase tracking-[0.3em]">
                {t.links.services}
              </h4>
              <ul className="space-y-5">
                {servicesLinks.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-brand-pure-white/70 hover:text-brand-electric-purple font-medium text-sm transition-colors duration-300 block">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div className="lg:py-20 lg:px-12 space-y-10">
              <h4 className="text-[0.65rem] font-bold text-white/30 uppercase tracking-[0.3em]">
                {t.links.explore}
              </h4>
              <ul className="space-y-5">
                {companyLinks.map(link => (
                  <li key={link.name}>
                    {link.href.includes('#') ? (
                      <a href={link.href} className="text-brand-pure-white/70 hover:text-brand-electric-purple font-medium text-sm transition-colors duration-300 block">
                        {link.name}
                      </a>
                    ) : (
                      <Link to={link.href} className="text-brand-pure-white/70 hover:text-brand-electric-purple font-medium text-sm transition-colors duration-300 block">
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:py-20 lg:px-12 space-y-10">
              <h4 className="text-[0.65rem] font-bold text-white/30 uppercase tracking-[0.3em]">
                {t.links.connect}
              </h4>
              <div className="space-y-8 flex flex-col items-center lg:items-start">
                <a 
                  href={`mailto:${BRAND_CONFIG.email}`} 
                  className="group block w-max"
                >
                  <span className="text-sm font-body text-brand-soft-lavender hover:text-white transition-colors">
                    {BRAND_CONFIG.email}
                  </span>
                  <div className="w-0 h-px bg-brand-electric-purple group-hover:w-full transition-all duration-500 mt-1" />
                </a>
                <p className="text-[0.65rem] font-bold text-brand-soft-lavender/40 leading-relaxed max-w-[120px] uppercase tracking-widest">
                  {lang === 'ar' ? t.slogan : 'Engineering results for the Kingdom'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. MINIMALIST LEGAL BAR */}
        <div className="mt-12 lg:mt-24 py-12 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[0.65rem] font-medium text-white/20 uppercase tracking-[0.2em] order-2 md:order-1">
            © {currentYear} {t.rights}
          </p>
          <div className="flex items-center gap-10 order-1 md:order-2">
            <Link to="/privacy" target="_self" className="text-[0.65rem] font-bold text-white/40 hover:text-brand-electric-purple uppercase tracking-[0.2em] transition-colors">
              {t.privacy}
            </Link>
            <Link to="/terms" target="_self" className="text-[0.65rem] font-bold text-white/40 hover:text-brand-electric-purple uppercase tracking-[0.2em] transition-colors">
              {t.terms}
            </Link>
            <Link to="/admin" target="_self" className="text-[0.65rem] font-bold text-white/40 hover:text-brand-electric-purple uppercase tracking-[0.2em] transition-colors">
              Admin
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
