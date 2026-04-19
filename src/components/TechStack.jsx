import React from 'react';
import { motion } from 'framer-motion';
import {
  SiReact, SiNextdotjs, SiTailwindcss, SiFigma, SiFlutter, SiSwift,
  SiNodedotjs, SiPython, SiPostgresql, SiGooglecloud, SiDocker, SiVercel
} from 'react-icons/si';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../utils/translations';

const TechNode = ({ name, Icon, color }) => {
  return (
    <div className="relative group mx-3 md:mx-4 lg:mx-6 shrink-0">
      <div className="w-16 h-16 md:w-36 md:h-24 lg:w-44 lg:h-28 rounded-xl border border-white/10 bg-[#1A1A24]/30 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 hover:border-brand-electric-purple/50 hover:bg-[#1A1A24]/50 group">
        <Icon size={32} className="md:w-[36px] md:h-[36px] grayscale group-hover:grayscale-0 transition-all duration-300" color={color} />
        <span className="hidden md:block font-display font-bold text-sm lg:text-base text-brand-pure-white tracking-wide opacity-50 group-hover:opacity-100">
          {name}
        </span>
      </div>
    </div>
  );
};

const EliteMobileCard = ({ name, Icon, color }) => (
  <div className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm mx-1.5 sm:mx-2 shrink-0">
    <div 
      className="p-3 rounded-xl mb-1"
      style={{ backgroundColor: `${color}15` }}
    >
      <Icon size={24} color={color} />
    </div>
    <span className="font-display font-medium text-[10px] text-white/60 tracking-tight">
      {name}
    </span>
  </div>
);

const MarqueeRow = ({ items, direction = 'left' }) => {
  const scrollX = direction === 'left' ? ["0%", "-50%"] : ["-50%", "0%"];
  
  return (
    <div className="flex overflow-hidden py-4 md:py-6 mask-fade-edges w-full">
      <motion.div
        animate={{ x: scrollX }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex whitespace-nowrap will-change-transform w-max"
      >
        {/* Duplicate items for infinite loop */}
        {[...items, ...items].map((tech, i) => (
          <div key={`${tech.name}-${i}`} className="shrink-0 flex items-center">
            {/* Mobile Card */}
            <div className="block md:hidden">
              <EliteMobileCard {...tech} />
            </div>
            {/* Desktop Card */}
            <div className="hidden md:block">
              <TechNode {...tech} />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const TechStack = () => {
  const { lang } = useLanguage();
  const t = translations[lang].techStack;
  const isRTL = lang === 'ar';

  const allTech = [
    { name: "React",        Icon: SiReact,            color: "#61DAFB" },
    { name: "Next.js",      Icon: SiNextdotjs,        color: "#FFFFFF" },
    { name: "Tailwind",     Icon: SiTailwindcss,      color: "#06B6D4" },
    { name: "Figma",        Icon: SiFigma,            color: "#F24E1E" },
    { name: "Flutter",      Icon: SiFlutter,          color: "#02569B" },
    { name: "Swift",        Icon: SiSwift,            color: "#FA7343" },
    { name: "Node.js",      Icon: SiNodedotjs,        color: "#339933" },
    { name: "Python",       Icon: SiPython,           color: "#3776AB" },
    { name: "Postgres",     Icon: SiPostgresql,       color: "#4169E1" },
    { name: "GCP Cloud",    Icon: SiGooglecloud,    color: "#4285F4" },
    { name: "Docker",       Icon: SiDocker,           color: "#2496ED" },
    { name: "Vercel",       Icon: SiVercel,           color: "#FFFFFF" },
  ];

  const row1 = allTech.slice(0, 6);
  const row2 = allTech.slice(6, 12);

  return (
    <section id="tech-stack" className="relative bg-brand-deep-navy py-12 md:py-28 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-12 md:mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 flex items-center justify-center space-x-2 rtl:space-x-reverse"
        >
          <span className="font-body font-medium text-sm text-brand-pure-white flex items-center">
            <span className="text-brand-electric-purple mr-1 rtl:ml-1 rtl:mr-0">[</span>
            {t.tag}
            <span className="text-brand-electric-purple ml-1 rtl:mr-1 rtl:ml-0">]</span>
          </span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display font-black text-4xl md:text-6xl text-brand-pure-white uppercase tracking-tight mb-6 text-center"
        >
          {t.title}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-body font-medium text-lg md:text-xl text-brand-soft-lavender leading-relaxed text-center"
        >
          {t.desc}
        </motion.p>
      </div>

      {/* ─── UNIFIED MARQUEE VIEW ─── */}
      <div className="relative w-full max-w-[100vw]">
        <MarqueeRow items={row1} direction={isRTL ? 'right' : 'left'} />
        <MarqueeRow items={row2} direction={isRTL ? 'left' : 'right'} />

        {/* Static Background Accents */}
        <div className="absolute top-1/2 left-0 w-32 md:w-64 h-32 md:h-64 bg-brand-electric-purple/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-brand-lavender/10 blur-3xl rounded-full pointer-events-none" />
      </div>
    </section>
  );
};

export default TechStack;
