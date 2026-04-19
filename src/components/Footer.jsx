import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../utils/translations';
import { BRAND_CONFIG } from '../utils/constants';

/**
 * ── Sub-Component: Link Column ────────────────────────────────────────
 * Reusable vertical list for navigation links.
 */
const FooterColumn = ({ title, links }) => (
  <div className="space-y-6">
    <h4 className="font-display font-bold text-xs text-white/40 uppercase tracking-[0.2em]">
      {title}
    </h4>
    <nav>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.name}>
            {link.href ? (
              <a
                href={link.href}
                className="group flex items-center text-brand-soft-lavender/60 hover:text-white font-body text-[14px] transition-all duration-300"
              >
                <span className="relative">
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-electric-coral group-hover:w-full transition-all duration-300" />
                </span>
              </a>
            ) : (
              <span className="text-brand-soft-lavender/60 font-body text-[14px]">
                {link.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

/**
 * ── Sub-Component: Social Link ────────────────────────────────────────
 * Icon-based social media links with premium hover effects.
 */
const SocialLink = ({ href, icon: Icon, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -4, scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-brand-electric-purple/20 hover:border-brand-electric-purple/30 transition-all duration-300 shadow-xl"
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

/* ──────────────────────────────────────────────────────────────────────
   Main Component: Footer
────────────────────────────────────────────────────────────────────── */
const Footer = () => {
  const { lang } = useLanguage();
  const t = translations[lang].footer;
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: lang === 'ar' ? "تطوير الويب" : "Web Development" },
      { name: lang === 'ar' ? "تطبيقات الجوال" : "Mobile Apps" },
      { name: lang === 'ar' ? "تصميم واجهة ومستخدم" : "UI/UX Design" },
      { name: lang === 'ar' ? "الهوية التجارية" : "Branding" },
    ],
    company: [
      { name: lang === 'ar' ? "من نحن" : "About Us", href: "#who-it-is-for" },
      { name: lang === 'ar' ? "أعمالنا" : "Portfolio", href: "#portfolio" },
      { name: lang === 'ar' ? "العمل معنا" : "Work With Us", href: "#faq" },
      { name: lang === 'ar' ? "اتصل بنا" : "Contact", href: "#home" },
    ]
  };

  return (
    <footer className="bg-brand-deep-navy border-t border-white/[0.05] relative overflow-hidden rtl:text-right text-left">
      <div className="max-w-7xl mx-auto px-5 lg:px-12 pt-12 lg:pt-32 pb-10 lg:pb-16">
        <div className="codo-grid gap-y-10 lg:gap-y-0">
          
          {/* Section: Brand & Info */}
          <div className="col-span-12 lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <h3 className="font-display font-black text-3xl text-white tracking-tighter">
                {BRAND_CONFIG.name}<span className="text-brand-electric-purple text-lg ml-1 rtl:mr-1 rtl:ml-0">®</span>
              </h3>
              <p className="font-body text-brand-soft-lavender/60 max-w-sm leading-relaxed text-[15px]">
                {t.desc}
              </p>
              
              <div className="flex items-center gap-4 pt-4">
                <SocialLink href="#" icon={LinkedInIcon} label="LinkedIn" />
                <SocialLink href="#" icon={TwitterIcon} label="X (Twitter)" />
                <SocialLink href="#" icon={InstagramIcon} label="Instagram" />
              </div>
            </div>
          </div>

          {/* Section: Links Grid */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
              <FooterColumn title={t.links.services} links={footerLinks.services} />
              <FooterColumn title={t.links.explore} links={footerLinks.company} />
              
              <div className="col-span-2 md:col-span-1 space-y-6">
                <h4 className="font-display font-bold text-xs text-white/40 uppercase tracking-[0.2em]">
                  {t.links.connect}
                </h4>
                <div className="space-y-4">
                  <a href={`mailto:${t.mail}`} className="block font-body text-brand-soft-lavender/60 hover:text-white text-[14px] transition-colors break-words">
                    {t.mail}
                  </a>
                  <p className="font-display font-bold text-[10px] text-brand-electric-purple uppercase tracking-widest border border-brand-electric-purple/20 px-3 py-1.5 rounded-full inline-block">
                    {t.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Legal Bar */}
        <div className="mt-10 lg:mt-32 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="font-body text-white/20">
            © {currentYear} {t.rights}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-[12px] font-body text-white/30 tracking-wide">
            <Link to="/privacy" className="hover:text-white transition-colors duration-300">
              {t.privacy}
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors duration-300">
              {t.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
