import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import EliteButton from './shared/EliteButton';

const Portfolio = () => {
  const { lang } = useLanguage();
  const t = translations[lang].portfolio;
  
  const projects = t.items.map((item, index) => ({
    ...item,
    image: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80", 
      "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80"
    ][index],
    tech: [
      ["React", "D3.js", "Node.js"],
      ["Next.js", "Tailwind", "Stripe"],
      ["Vue", "Python", "TensorFlow"]
    ][index]
  }));
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Ultra-smooth spring physics for the cursor tracking
  const springConfig = { stiffness: 80, damping: 25, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    // Offset to center the preview image around the cursor
    mouseX.set(e.clientX - 160); // 160 is half of w-80 (320px)
    mouseY.set(e.clientY - 200); // 200 is half of h-[400px]
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section 
      id="portfolio" 
      className="bg-brand-deep-navy py-32 px-6 relative"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Area */}
        <div className="mb-24 text-left rtl:text-right">
          <div className="mb-4 flex items-center space-x-2 rtl:space-x-reverse">
            <span className="font-body font-medium text-sm text-brand-pure-white flex items-center">
              <span className="text-brand-electric-purple mr-1 rtl:ml-1 rtl:mr-0">[</span> 
              {t.tag} 
              <span className="text-brand-electric-purple ml-1 rtl:mr-1 rtl:ml-0">]</span>
            </span>
          </div>
          <h2 className="font-display font-extrabold text-5xl lg:text-7xl text-brand-pure-white leading-tight uppercase">
            {t.title}
          </h2>
          <p className="font-body font-medium text-xl text-brand-soft-lavender max-w-2xl mt-6">
            {t.desc}
          </p>
        </div>

        {/* Project List */}
        <div className="flex flex-col border-t border-[#2D2D3A]">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="border-b border-[#2D2D3A] py-12 relative group cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => setSelectedProject(project)}
            >
              <div className="flex items-center justify-between rtl:flex-row-reverse">
                <motion.h3 
                  layoutId={`title-${project.id}`}
                  className="font-display font-black text-6xl md:text-8xl transition-all duration-300 pointer-events-none"
                  initial={false}
                  animate={{ 
                    opacity: hoveredProject?.id === project.id ? 1 : 0.4,
                    x: hoveredProject?.id === project.id ? (lang === 'ar' ? -20 : 20) : 0,
                    color: hoveredProject?.id === project.id ? ['#ffffff', '#6B20E8'] : '#ffffff',
                  }}
                  transition={{
                    color: { duration: 0.4, times: [0, 1] },
                    opacity: { duration: 0.3 },
                    x: { duration: 0.3 }
                  }}
                  style={{
                    WebkitTextStroke: '0px transparent',
                    paintOrder: 'stroke fill'
                  }}
                >
                  {project.title}
                </motion.h3>
                <div className="hidden md:block pointer-events-none rtl:text-right">
                  <span className="font-body text-brand-soft-lavender/40 text-lg uppercase tracking-widest">
                    {project.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cursor-Bound Media Reveal */}
      <AnimatePresence>
        {hoveredProject && !selectedProject && (
          <motion.div
            key="cursor-media"
            layoutId={`image-${hoveredProject.id}`}
            style={{ 
              position: 'fixed',
              left: smoothX,
              top: smoothY,
              zIndex: 50,
              pointerEvents: 'none',
              width: 320,
              height: 400
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2, ease: "easeOut" } }}
            transition={{ type: 'spring', ...springConfig }}
            className="rounded-2xl overflow-hidden shadow-ambient border border-brand-pure-white/20"
          >
            <img 
              src={hoveredProject.image} 
              alt={hoveredProject.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deep-navy/60 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Case Study Modal (SPA Expansion) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-brand-deep-navy/95 backdrop-blur-xl"
            />
            
            {/* Full Screen Overlay Content */}
            <motion.div 
              layoutId={`image-${selectedProject.id}`}
              className="relative w-full max-w-7xl h-full md:h-auto md:aspect-video bg-[#1A1A24] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-ambient border border-brand-pure-white/10"
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 h-64 md:h-full relative">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1A1A24]/40" />
              </div>

              {/* Info Side */}
              <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center relative bg-brand-deep-navy/40 backdrop-blur-md text-left rtl:text-right">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-brand-electric-purple font-display font-black text-sm uppercase tracking-[0.3em] mb-4 block">
                    {selectedProject.category}
                  </span>
                  <motion.h2 
                    layoutId={`title-${selectedProject.id}`}
                    className="font-display font-black text-5xl md:text-7xl text-brand-pure-white mb-8 uppercase tracking-tighter"
                  >
                    {selectedProject.title}
                  </motion.h2>
                  
                  <div className="mb-12">
                    <h4 className="text-brand-pure-white/50 font-display font-bold text-xs uppercase tracking-widest mb-4">
                      {t.challenge}
                    </h4>
                    <p className="text-brand-soft-lavender text-xl leading-relaxed max-w-xl">
                      {selectedProject.problem}
                    </p>
                  </div>

                  <div className="mb-12">
                    <h4 className="text-brand-pure-white/50 font-display font-bold text-xs uppercase tracking-widest mb-4">
                      {t.stack}
                    </h4>
                    <div className="flex flex-wrap gap-3 rtl:justify-end">
                      {selectedProject.tech.map(t => (
                        <span key={t} className="px-4 py-2 border border-brand-electric-purple/30 text-brand-pure-white text-sm font-body uppercase tracking-widest rounded-full bg-brand-electric-purple/5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <EliteButton 
                    onClick={() => setSelectedProject(null)}
                    variant="outline"
                    className="mt-8 !px-6 !py-3 w-fit"
                    icon={
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                      </svg>
                    }
                  >
                    {t.goBack}
                  </EliteButton>
                </motion.div>

                {/* Close Button */}
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-8 right-8 rtl:left-8 rtl:right-auto text-brand-pure-white/30 hover:text-brand-pure-white transition-colors p-2"
                >
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
