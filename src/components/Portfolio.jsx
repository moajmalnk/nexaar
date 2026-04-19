import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../utils/translations';

import { BRAND_CONFIG } from '../utils/constants';

import ProjectDetailsModal from './ProjectDetailsModal';

/* ─── Data ─────────────────────────────────────────────────────── */
const IMAGES = [
  [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&q=80'
  ],
  [
    'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80'
  ],
  [
    'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80'
  ],
];
const STACKS = [
  ['React', 'TypeScript', 'D3.js', 'Node.js'],
  ['Next.js', 'TailwindCSS', 'Stripe API'],
  ['Vue.js', 'Python', 'TensorFlow', 'AWS'],
];

/* ─── ProjectCard ───────────────────────────────────────────────── */
const ProjectCard = ({ project, index, onClick }) => {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(project)}
      className="group relative flex flex-col bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-brand-electric-purple/30 transition-colors duration-500 cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[4/3] xl:aspect-[16/9] overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-[115%] -top-[7.5%]"
          style={!reduceMotion ? { y: imageY } : {}}
        >
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
          />
        </motion.div>

        {/* Subtle depth gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D1A] via-[#0D0D1A]/10 to-transparent pointer-events-none" />

        {/* Category badge */}
        <span className="absolute top-4 right-4 rtl:right-auto rtl:left-4 px-3 py-1 rounded-full bg-brand-electric-purple/20 backdrop-blur-md border border-brand-electric-purple/30 text-brand-pure-white text-[10px] font-bold tracking-widest uppercase">
          {project.category}
        </span>

        {/* Hover inner frame */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-3 border border-white/15 rounded-xl pointer-events-none"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Title row */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display font-black text-xl sm:text-2xl text-brand-pure-white uppercase tracking-[-0.03em] leading-tight sm:leading-none">
            {project.title}
          </h3>
          <motion.span
            animate={{ x: hovered ? 0 : -4, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="mt-0.5 shrink-0 w-7 h-7 rounded-full border border-brand-electric-purple/40 flex items-center justify-center text-brand-electric-purple"
            aria-hidden="true"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.span>
        </div>

        {/* Divider */}
        <div className="w-10 h-[1.5px] bg-brand-electric-purple/60" />

        {/* Challenge */}
        <p className="font-body text-brand-soft-lavender/80 text-sm leading-relaxed line-clamp-2">
          {project.problem}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-white/[0.06]">
          {project.tech.map((item, i) => (
            <span
              key={i}
              className="px-2.5 py-1 border border-white/10 rounded-full text-brand-pure-white/70 text-[10px] font-body uppercase tracking-widest bg-white/[0.04]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

/* ─── Portfolio Section ─────────────────────────────────────────── */
const Portfolio = () => {
  const { lang } = useLanguage();
  const t = translations[lang].portfolio;

  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const projects = t.items.map((item, i) => ({
    ...item,
    image: IMAGES[i][0],
    gallery: IMAGES[i],
    tech: STACKS[i],
  }));

  return (
    <section id="portfolio" className="bg-brand-deep-navy py-12 md:py-28 relative overflow-hidden">

      {/* Subtle ambient blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[30vh] bg-brand-electric-purple/[0.04] blur-[100px] pointer-events-none" />

      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto px-6 mb-10 md:mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-brand-electric-purple font-display font-black text-xs tracking-[0.25em] uppercase">[</span>
              <span className="font-body text-brand-pure-white/60 text-xs tracking-widest uppercase">{t.tag}</span>
              <span className="text-brand-electric-purple font-display font-black text-xs tracking-[0.25em] uppercase">]</span>
            </div>
            <h2 className="font-display font-black text-brand-pure-white uppercase tracking-tight leading-tight md:leading-none" style={{fontSize: 'clamp(1.85rem, 8vw, 3.75rem)'}}>
              {t.title}
            </h2>
          </div>
          <p className="font-body text-base text-brand-soft-lavender/70 max-w-sm leading-relaxed md:text-right rtl:md:text-left">
            {t.desc}
          </p>
        </motion.div>

        {/* Decorative horizontal rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
          className="mt-8 h-px bg-gradient-to-r from-brand-electric-purple/50 via-brand-electric-purple/10 to-transparent"
        />
      </div>

      {/* ── Cards Grid ── */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={handleProjectClick}
              t={t}
              lang={lang}
            />
          ))}
        </div>

        {/* Bottom CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex items-center justify-center"
        >
          <a
            href={`https://wa.me/${BRAND_CONFIG.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full justify-center sm:w-auto items-center gap-3 px-6 py-3 rounded-xl border border-brand-electric-purple/30 text-brand-pure-white/80 font-display text-sm uppercase tracking-widest hover:border-brand-electric-purple/70 hover:text-brand-pure-white transition-all duration-300"
          >
            <span>{lang === 'ar' ? 'ابدأ مشروعك' : 'Start Your Project'}</span>
          </a>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <ProjectDetailsModal 
        isOpen={isModalOpen}
        project={selectedProject}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Portfolio;
