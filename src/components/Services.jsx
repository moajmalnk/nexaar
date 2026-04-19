import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../utils/translations';

const Services = () => {
  const { lang } = useLanguage();
  const t = translations[lang].services;

  const services = t.items.map((item, index) => ({
    ...item,
    description: item.desc, // mapping desc to description for easier drop-in
    image: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800"
    ][index]
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
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
      className="bg-[#0D0D1A] py-12 md:py-28 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Area */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-10 md:mb-16"
        >
          <motion.div variants={itemVariants} className="mb-4 flex items-center justify-center space-x-2 rtl:space-x-reverse">
            <span className="font-body font-medium text-sm text-brand-pure-white flex items-center text-center">
              <span className="text-brand-electric-purple mr-1 rtl:ml-1 rtl:mr-0">[</span> 
              {t.tag} 
              <span className="text-brand-electric-purple ml-1 rtl:mr-1 rtl:ml-0">]</span>
            </span>
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="font-display font-black text-brand-pure-white tracking-tight text-center"
            style={{fontSize: 'clamp(1.85rem, 8vw, 3.1rem)'}}
          >
            {t.title}
          </motion.h2>
        </motion.div>

        {/* Grid: 3 columns with standard gap, removed codo-grid 12-col for simpler flex/grid control */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative rounded-2xl overflow-hidden min-h-[280px] sm:min-h-0 aspect-auto sm:aspect-square md:aspect-[4/4.5] bg-brand-charcoal cursor-pointer border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-elite-glow hover:border-white/20"
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
              <div className="relative h-full flex flex-col justify-end p-6 md:p-8 text-left rtl:text-right">
                <h3 className="font-display font-bold text-xl md:text-2xl text-brand-pure-white mb-2 tracking-tight transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="font-body text-brand-soft-lavender/70 text-sm md:text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
