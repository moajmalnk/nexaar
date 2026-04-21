import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../utils/translations';
import Skeleton from './shared/Skeleton';

const ServiceCardSkeleton = () => (
  <div className="col-span-12 md:col-span-4 rounded-2xl overflow-hidden aspect-auto sm:aspect-square md:aspect-[4/4.5] bg-brand-charcoal/40 border border-white/5 p-8 md:p-10 flex flex-col justify-end gap-4 overflow-hidden relative">
    <div className="absolute inset-0 animate-shimmer">
      <div className="absolute inset-0 bg-gradient-to-t from-brand-deep-navy via-brand-deep-navy/40 to-transparent" />
    </div>
    <Skeleton width="60%" height="1.75rem" borderRadius="0.5rem" />
    <Skeleton width="90%" height="1rem" borderRadius="0.375rem" />
    <Skeleton width="40%" height="1rem" borderRadius="0.375rem" />
  </div>
);

const Services = () => {
  const { lang } = useLanguage();
  const t = translations[lang].services;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const services = t.items.map((item, index) => ({
    ...item,
    description: item.desc, 
    image: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=70&w=800",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=70&w=800",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=70&w=800"
    ][index]
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section 
      id="services" 
      className="bg-[#0D0D1A] section-padding relative overflow-hidden"
    >
      <div className="max-w-[1240px] w-[92%] mx-auto container-padding relative z-10">
        <div className="codo-grid">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-12 text-center mb-12 md:mb-20"
          >
            <div className="mb-4 flex items-center justify-center space-x-2 rtl:space-x-reverse">
              <span className="font-body font-medium text-sm text-brand-pure-white flex items-center text-center">
                <span className="text-brand-electric-purple mr-1 rtl:ml-1 rtl:mr-0">[</span> 
                {t.tag} 
                <span className="text-brand-electric-purple ml-1 rtl:mr-1 rtl:ml-0">]</span>
              </span>
            </div>
            <h2 
              className="font-display font-black text-brand-pure-white tracking-tight text-center"
              style={{fontSize: 'clamp(1.85rem, 8vw, 3.1rem)'}}
            >
              {t.title}
            </h2>
          </motion.div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="skeleton-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-12 codo-grid"
              >
                {[1, 2, 3].map((i) => (
                  <ServiceCardSkeleton key={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="main-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="col-span-12 codo-grid"
              >
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="col-span-12 md:col-span-4 group relative rounded-2xl overflow-hidden min-h-[17.5rem] sm:min-h-0 aspect-auto sm:aspect-square md:aspect-[4/4.5] bg-brand-charcoal cursor-pointer border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-elite-glow hover:border-white/20 h-full"
                  >
                    {/* Layer 1: Scale-In Image Zoom */}
                    <div className="absolute inset-0 overflow-hidden">
                      <motion.img 
                        src={service.image} 
                        alt={service.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Layer 2: Depth Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-deep-navy via-brand-deep-navy/40 to-transparent" />
                    </div>

                    {/* Layer 3: Focused Text Content */}
                    <div className="relative h-full flex flex-col justify-end p-8 md:p-10 text-left rtl:text-right">
                      <h3 className="font-display font-bold text-xl md:text-2xl text-brand-pure-white mb-2 tracking-tight transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="font-body text-brand-soft-lavender/85 text-sm md:text-base leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Services;
