import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND_CONFIG } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';

const ProjectDetailsModal = ({ project, isOpen, onClose }) => {
  const { lang } = useLanguage();
  const [activeImage, setActiveImage] = useState(0);
  const scrollContainerRef = useRef(null);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveImage(0); // reset on open
      if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!project) return null;

  const gallery = project.gallery || [project.image];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-deep-navy/90 backdrop-blur-2xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-7xl h-[100dvh] md:h-[90dvh] bg-[#0A0A14] md:border border-white/10 md:rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden"
          >
            {/* Close Button (Floating on mobile, absolute on desktop) */}
            <button 
              onClick={onClose}
              className="absolute top-4 md:top-6 right-4 md:right-6 rtl:right-auto rtl:left-4 md:rtl:left-6 w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-brand-electric-purple transition-all duration-300 z-50 group hover:scale-105 active:scale-95 shadow-ambient"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* ==== LEFT COLUMN (Details) ==== */}
            <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col flex-1 overflow-y-auto custom-scrollbar md:border-r border-white/5 order-2 md:order-1 relative z-20 bg-[#0A0A14] md:bg-transparent shadow-[0_-20px_30px_rgba(10,10,20,1)] md:shadow-none pb-6 md:pb-0">
              <div className="p-6 sm:p-8 md:p-10 lg:p-14 flex-1">
                
                {/* Header Title Layer */}
                <div className="mb-8 md:mb-12 pt-2 md:pt-0">
                  <span className="w-fit px-3 py-1 rounded-full bg-brand-electric-purple/10 border border-brand-electric-purple/20 text-brand-electric-purple text-[10px] font-bold tracking-widest uppercase mb-4 inline-block">
                    {project.category}
                  </span>
                  <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-brand-pure-white uppercase tracking-tighter leading-[0.95] md:leading-[0.9]">
                    {project.title}
                  </h2>
                </div>

                <hr className="border-white/5 mb-10" />

                {/* Content Details */}
                <div className="space-y-12">
                  {/* The Problem */}
                  <div className="space-y-4">
                    <h4 className="text-brand-electric-purple font-display font-bold text-[11px] uppercase tracking-[0.25em] flex items-center gap-2">
                      <span className="w-4 h-px bg-brand-electric-purple"></span>
                      {lang === 'ar' ? 'التحدي' : 'The Challenge'}
                    </h4>
                    <p className="font-body text-brand-soft-lavender text-base lg:text-lg leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  {/* The Solution */}
                  <div className="space-y-4">
                    <h4 className="text-brand-electric-purple font-display font-bold text-[11px] uppercase tracking-[0.25em] flex items-center gap-2">
                      <span className="w-4 h-px bg-brand-electric-purple"></span>
                      {lang === 'ar' ? 'الحل' : 'The Solution'}
                    </h4>
                    <p className="font-body text-brand-soft-lavender/80 text-base leading-relaxed">
                      {project.solution}
                    </p>
                  </div>

                  {/* The Result */}
                  <div className="space-y-4">
                    <h4 className="text-brand-electric-purple font-display font-bold text-[11px] uppercase tracking-[0.25em] flex items-center gap-2">
                      <span className="w-4 h-px bg-brand-electric-purple"></span>
                      {lang === 'ar' ? 'النتيجة' : 'The Result'}
                    </h4>
                    <p className="font-body text-brand-pure-white text-base leading-relaxed font-medium bg-brand-electric-purple/10 border-l-2 border-brand-electric-purple p-4 rounded-r-lg rtl:border-l-0 rtl:border-r-2 rtl:rounded-r-none rtl:rounded-l-lg">
                      {project.result}
                    </p>
                  </div>
                </div>

                <hr className="border-white/5 my-10" />

                {/* Tech Stack */}
                <div className="space-y-4 mb-10">
                  <h4 className="text-brand-pure-white/40 font-display font-bold text-[10px] uppercase tracking-[0.2em]">
                    {lang === 'ar' ? 'المجموعة التقنية' : 'Technology Stack'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((item, i) => (
                      <span 
                        key={i} 
                        className="px-2.5 py-1.5 sm:px-3 border border-white/10 rounded-lg text-brand-pure-white/80 text-[10px] font-body uppercase tracking-widest bg-[#151522]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Sticky Footer CTA */}
              <div className="sticky bottom-0 bg-[#0A0A14]/95 backdrop-blur-xl border-t border-white/5 p-6 md:p-8">
                <a
                  href={`https://wa.me/${BRAND_CONFIG.whatsapp}?text=${encodeURIComponent(
                    lang === 'ar' 
                      ? `مرحباً نكسار ، لقد كنت اطلع على مشروع ${project.title} وأريد الاستفسار عن خدمة مماثلة.` 
                      : `Hello Nexaar, I was looking at the ${project.title} project and want to inquire about a similar service.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-brand-pure-white text-brand-deep-navy hover:bg-brand-electric-purple hover:text-brand-pure-white font-display font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-ambient active:scale-[0.98]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  {lang === 'ar' ? 'ابدأ مشروعاً مماثلاً' : 'Start a Similar Project'}
                </a>
              </div>
            </div>

            {/* ==== RIGHT COLUMN (Gallery Slider / Scroll) ==== */}
            <div className="w-full md:w-[55%] lg:w-[60%] h-[40dvh] md:h-full bg-black relative order-1 md:order-2 overflow-hidden md:shadow-[inset_10px_0_30px_rgba(0,0,0,0.5)] rtl:md:shadow-[inset_-10px_0_30px_rgba(0,0,0,0.5)]">
              {/* Image Stack / Slider */}
              <div 
                ref={scrollContainerRef}
                className="w-full h-full overflow-x-auto overflow-y-hidden md:overflow-x-hidden md:overflow-y-auto snap-x snap-mandatory md:snap-y md:snap-mandatory custom-scrollbar md:scroll-smooth hide-scrollbar flex flex-row md:flex-col"
              >
                {gallery.map((img, i) => (
                  <div 
                    key={i} 
                    className="w-full h-full flex-[0_0_100%] md:flex-shrink-0 snap-center md:snap-center relative overflow-hidden group"
                  >
                    <img 
                      src={img} 
                      alt={`${project.title} preview ${i+1}`}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none md:hidden" />
                  </div>
                ))}
              </div>

              {/* Slider Controls Hint (Desktop) */}
              {gallery.length > 1 && (
                <div className="absolute bottom-8 right-8 hidden md:flex flex-col gap-3 z-20">
                  <div className="flex flex-col items-center gap-1.5 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/50 shadow-ambient">
                    {/* Up arrow */}
                    <button 
                      onClick={() => scrollContainerRef.current?.scrollBy({ top: -window.innerHeight, behavior: 'smooth' })}
                      className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 15l-6-6-6 6" />
                      </svg>
                    </button>
                    {/* Scroll indicator dot */}
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-electric-purple my-1 shadow-[0_0_8px_rgba(107,32,232,0.8)]" />
                    {/* Down arrow */}
                    <button 
                      onClick={() => scrollContainerRef.current?.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
                      className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;
