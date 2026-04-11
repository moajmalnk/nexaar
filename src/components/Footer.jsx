import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const Footer = () => {
  const { lang } = useLanguage();
  const t = translations[lang].footer;
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: lang === 'ar' ? "تطوير الويب" : "Web Development", href: "#services" },
      { name: lang === 'ar' ? "تطبيقات الجوال" : "Mobile Apps", href: "#services" },
      { name: lang === 'ar' ? "تصميم واجهة ومستخدم" : "UI/UX Design", href: "#services" },
      { name: lang === 'ar' ? "الهوية التجارية" : "Branding", href: "#services" },
    ],
    company: [
      { name: lang === 'ar' ? "من نحن" : "About Us", href: "#who-it-is-for" },
      { name: lang === 'ar' ? "أعمالنا" : "Portfolio", href: "#portfolio" },
      { name: lang === 'ar' ? "الوظائف" : "Careers", href: "#faq" },
      { name: lang === 'ar' ? "اتصل بنا" : "Contact", href: "#home" },
    ],
    socials: [
      { name: "LinkedIn", href: "#" },
      { name: "Twitter / X", href: "#" },
      { name: "Instagram", href: "#" },
    ]
  };

  return (
    <footer className="bg-brand-deep-navy pt-20 pb-10 px-6 border-t border-[#2D2D3A] overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        {/* Link Grid: Using codo-grid */}
        <div className="codo-grid mb-20">
          
          {/* Column 1 - Brand: Spans 6 on md, 3 on lg */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3 space-y-6 text-left rtl:text-right">
            <h3 className="font-display font-black text-2xl text-brand-pure-white tracking-tighter">
              NEXAAR<span className="text-brand-electric-purple text-base ml-1 rtl:mr-1 rtl:ml-0">®</span>
            </h3>
            <p className="font-body text-brand-soft-lavender max-w-xs leading-relaxed opacity-80">
              {t.desc}
            </p>
            <div className="pt-2">
              <a href={`mailto:${t.mail}`} className="font-body font-bold text-brand-pure-white hover:text-brand-electric-purple transition-colors">
                {t.mail}
              </a>
            </div>
          </div>

          {/* Column 2 - Services: Spans 3 on lg */}
          <div className="col-span-6 md:col-span-3 lg:col-span-3 space-y-6 text-left rtl:text-right">
            <h4 className="font-display font-bold text-sm text-brand-pure-white/40 uppercase tracking-[0.2em]">
              {t.links.services}
            </h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="font-body text-brand-soft-lavender hover:text-brand-electric-purple transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Company: Spans 3 on lg */}
          <div className="col-span-6 md:col-span-3 lg:col-span-3 space-y-6 text-left rtl:text-right">
            <h4 className="font-display font-bold text-sm text-brand-pure-white/40 uppercase tracking-[0.2em]">
              {t.links.explore}
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="font-body text-brand-soft-lavender hover:text-brand-electric-purple transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Socials: Spans 3 on lg */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3 space-y-6 text-left rtl:text-right">
            <h4 className="font-display font-bold text-sm text-brand-pure-white/40 uppercase tracking-[0.2em]">
              {t.links.connect}
            </h4>
            <ul className="space-y-4">
              {footerLinks.socials.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="font-body text-brand-soft-lavender hover:text-brand-electric-purple transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#2D2D3A] pt-10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm rtl:flex-row-reverse">
          <p className="font-body text-brand-white/30">
            © {currentYear} {t.rights}
          </p>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <span className="font-body text-brand-white/30 uppercase tracking-widest text-xs">
              {t.location}
            </span>
            <div className="h-4 w-[1px] bg-[#2D2D3A]" />
            <a href="#" className="font-body text-brand-white/30 hover:text-brand-pure-white transition-colors">
              {t.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
