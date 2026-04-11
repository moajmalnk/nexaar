import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
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
      className="bg-brand-deep-navy py-24 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Area */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
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
            className="font-display font-extrabold text-4xl md:text-5xl text-brand-pure-white uppercase text-center"
          >
            {t.title}
          </motion.h2>
        </motion.div>

        {/* Grid: Using the 12-column utility */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="codo-grid"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative col-span-12 md:col-span-6 lg:col-span-4 rounded-2xl overflow-hidden aspect-[4/5] bg-brand-charcoal cursor-pointer shadow-ambient transition-all duration-300 hover:-translate-y-2"
            >
              {/* Background Image */}
              <motion.img 
                src={service.image} 
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep-navy via-brand-deep-navy/80 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Text Content */}
              <div className="absolute bottom-0 w-full p-8 translate-y-2 transition-transform duration-300 group-hover:translate-y-0 text-left rtl:text-right">
                <h3 className="font-display font-bold text-2xl text-brand-pure-white mb-3 tracking-tight">
                  {service.title}
                </h3>
                <p className="font-body text-brand-soft-lavender text-base leading-relaxed opacity-90">
                  {service.description}
                </p>
                {/* Visual Accent */}
                <div className="mt-6 w-0 h-[2px] bg-brand-electric-purple transition-all duration-300 group-hover:w-16 shadow-elite-glow" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
