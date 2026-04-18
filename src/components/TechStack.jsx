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
    <div className="relative group p-0.5">
      <div className="w-16 h-16 md:w-32 md:h-20 lg:w-40 lg:h-24 rounded-xl border border-white/10 bg-[#1A1A24]/30 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:border-brand-electric-purple/50 hover:bg-[#1A1A24]/50 group">
        <Icon size={24} className="md:w-[30px] md:h-[30px] grayscale group-hover:grayscale-0 transition-all duration-300" color={color} />
        <span className="hidden md:block font-display font-bold text-xs text-brand-pure-white tracking-wide opacity-50 group-hover:opacity-100">
          {name}
        </span>
      </div>
    </div>
  );
};

const EliteMobileCard = ({ name, Icon, color }) => (
  <div className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm mx-2">
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
    <div className="flex overflow-hidden py-4 mask-fade-edges">
      <motion.div
        animate={{ x: scrollX }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex whitespace-nowrap will-change-transform"
      >
        {/* Duplicate items for infinite loop */}
        {[...items, ...items].map((tech, i) => (
          <EliteMobileCard key={`${tech.name}-${i}`} {...tech} />
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
    <section id="tech-stack" className="bg-brand-deep-navy py-12 md:py-28 overflow-hidden">
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
          className="font-body font-medium text-xl text-brand-soft-lavender leading-relaxed text-center"
        >
          {t.desc}
        </motion.p>
      </div>

      {/* ─── DESKTOP VIEW: CLEAN STATIC GRID ─── */}
      <div className="hidden md:block max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-4 lg:grid-cols-6 gap-6">
          {allTech.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex justify-center"
            >
              <TechNode {...tech} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── MOBILE VIEW: ELITE BENTO MARQUEE ─── */}
      <div className="block md:hidden">
        <MarqueeRow items={row1} direction={isRTL ? 'right' : 'left'} />
        <MarqueeRow items={row2} direction={isRTL ? 'left' : 'right'} />

        {/* Static Background Accents */}
        <div className="absolute top-1/2 left-0 w-32 h-32 bg-brand-electric-purple/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-lavender/10 blur-3xl rounded-full pointer-events-none" />
      </div>
    </section>
  );
};

export default TechStack;
