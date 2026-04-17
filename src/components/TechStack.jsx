import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SiReact, SiNextdotjs, SiTailwindcss, SiFigma, SiFlutter, SiSwift,
  SiNodedotjs, SiPython, SiPostgresql, SiGooglecloud, SiDocker, SiVercel
} from 'react-icons/si';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const TechNode = ({ name, category, Icon, color }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 mx-2 md:mx-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={{
          borderColor: hovered ? 'rgba(107, 32, 232, 0.5)' : 'rgba(45, 45, 58, 0.3)',
          boxShadow: hovered ? '0 0 24px rgba(107, 32, 232, 0.25)' : '0 0 0px transparent',
          scale: hovered ? 1.08 : 1,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="w-32 h-20 md:w-40 md:h-24 rounded-xl border bg-[#1A1A24]/30 flex flex-col items-center justify-center gap-2 cursor-pointer"
        style={{
          filter: hovered ? 'grayscale(0%) opacity(1)' : 'grayscale(100%) opacity(0.5)',
          transition: 'filter 0.2s ease-out',
        }}
      >
        <Icon size={24} className="md:w-[30px] md:h-[30px]" color={hovered ? color : 'currentColor'} />
        <span className="font-display font-bold text-xs text-brand-pure-white tracking-wide">
          {name}
        </span>
      </motion.div>
    </div>
  );
};

const TechStack = () => {
  const { lang } = useLanguage();
  const t = translations[lang].techStack;
  const isRTL = lang === 'ar';

  const laneOne = [
    { name: "React",        category: isRTL ? "إطار واجهة أمامية" : "Frontend Framework",  Icon: SiReact,            color: "#61DAFB" },
    { name: "Next.js",      category: isRTL ? "مجموعة تطوير كاملة" : "Fullstack React",     Icon: SiNextdotjs,        color: "#FFFFFF" },
    { name: "Tailwind CSS", category: isRTL ? "تنسيق وتصميم" : "Styling",             Icon: SiTailwindcss,      color: "#06B6D4" },
    { name: "Figma",        category: isRTL ? "تصميم واجهة ومستخدم" : "UI/UX Design",        Icon: SiFigma,            color: "#F24E1E" },
    { name: "Flutter",      category: isRTL ? "تطبيقات الجوال" : "Mobile Apps",         Icon: SiFlutter,          color: "#02569B" },
    { name: "Swift",        category: isRTL ? "تطبيقات آيفون" : "iOS Native",          Icon: SiSwift,            color: "#FA7343" },
  ];

  const laneTwo = [
    { name: "Node.js",      category: isRTL ? "بيئة عمل خلفية" : "Backend Runtime",     Icon: SiNodedotjs,        color: "#339933" },
    { name: "Python",       category: isRTL ? "ذكاء اصطناعي" : "AI & Backend",        Icon: SiPython,           color: "#3776AB" },
    { name: "PostgreSQL",   category: isRTL ? "قواعد بيانات" : "Relational DB",       Icon: SiPostgresql,       color: "#4169E1" },
    { name: "Google Cloud", category: isRTL ? "بنية تحتية سحابية" : "Cloud Infrastructure", Icon: SiGooglecloud,    color: "#4285F4" },
    { name: "Docker",       category: isRTL ? "حاويات برمجية" : "Containerization",    Icon: SiDocker,           color: "#2496ED" },
    { name: "Vercel",       category: isRTL ? "نشر وتطوير" : "Edge Deployment",     Icon: SiVercel,           color: "#FFFFFF" },
  ];

  // Duplicate items to ensure seamless infinite loop
  const doubled = (arr) => [...arr, ...arr];

  return (
    <section id="tech-stack" className="bg-brand-deep-navy py-32 overflow-hidden">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-10 md:mb-12">
        <div className="mb-4 flex items-center justify-center space-x-2 rtl:space-x-reverse">
          <span className="font-body font-medium text-sm text-brand-pure-white flex items-center">
            <span className="text-brand-electric-purple mr-1 rtl:ml-1 rtl:mr-0">[</span>
            {t.tag}
            <span className="text-brand-electric-purple ml-1 rtl:mr-1 rtl:ml-0">]</span>
          </span>
        </div>
        <h2 className="font-display font-extrabold text-4xl md:text-6xl text-brand-pure-white uppercase tracking-tight mb-6 text-center">
          {t.title}
        </h2>
        <p className="font-body font-medium text-xl text-brand-soft-lavender leading-relaxed text-center">
          {t.desc}
        </p>
      </div>

      {/* Marquee Lanes */}
      <div
        className="marquee-container flex flex-col"
        dir="ltr"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        {/* Lane 1 — Left to Right */}
        <div className="relative flex overflow-visible py-6">
          <div className="flex animate-marquee-left">
            {doubled(laneOne).map((tech, i) => (
              <TechNode key={`l1-${i}`} {...tech} />
            ))}
          </div>
        </div>

        {/* Lane 2 — Right to Left */}
        <div className="relative flex overflow-visible py-6">
          <div className="flex animate-marquee-right">
            {doubled(laneTwo).map((tech, i) => (
              <TechNode key={`l2-${i}`} {...tech} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
