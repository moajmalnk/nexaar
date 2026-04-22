import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../utils/translations';
import { BRAND_CONFIG } from '../utils/constants';


const LegalPage = ({ type }) => {
  const { lang } = useLanguage();
  const content = translations[lang].legal[type];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <div className="bg-brand-deep-navy min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl w-[92%] mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-12"
        >
          {/* Page Header */}
          <motion.div variants={itemVariants} className="text-center lg:text-left rtl:lg:text-right">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 uppercase tracking-tight">
              {content.title}
            </h1>
            <p className="text-brand-soft-lavender/60 font-body text-sm uppercase tracking-[0.2em]">
              Last Updated: {content.lastUpdated}
            </p>
          </motion.div>

          {/* Page Body */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-[2rem] p-8 md:p-12 backdrop-blur-3xl shadow-elite-glow">
            <motion.div variants={containerVariants} className="space-y-10">
              {content.sections.map((section, idx) => (
                <motion.section key={idx} variants={itemVariants} className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="text-brand-electric-purple text-lg opacity-50">{idx + 1}.</span>
                    {section.title}
                  </h2>
                  <div className="text-brand-soft-lavender/70 font-body text-[1rem] leading-[1.8] space-y-4">
                    {section.content.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                </motion.section>
              ))}
            </motion.div>
          </div>

          {/* Footer Note */}
          <motion.div variants={itemVariants} className="pt-8 text-center text-brand-soft-lavender/40 font-body text-sm italic">
            {translations[lang].legal.contactNote.replace('{title}', content.title).replace('{email}', BRAND_CONFIG.legalEmail)}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LegalPage;
