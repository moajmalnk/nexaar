import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import EliteButton from './shared/EliteButton';

const EliteDropdown = ({ label, options, value, onChange, placeholder, lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-2 relative" ref={dropdownRef}>
      <label className="font-display text-[10px] uppercase tracking-widest text-brand-pure-white/40 ml-1 rtl:mr-1">
        {label}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-brand-charcoal/50 border border-brand-electric-purple/10 text-brand-pure-white px-5 py-4 rounded-xl outline-none focus:border-brand-electric-purple/50 transition-all font-body text-left rtl:text-right flex items-center justify-between group"
      >
        <span className={value ? 'text-brand-pure-white' : 'text-brand-pure-white/30'}>
          {value || placeholder}
        </span>
        <motion.svg 
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="w-4 h-4 text-brand-electric-purple opacity-50 group-hover:opacity-100 transition-opacity" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-2 z-50 bg-[#1A1A24] border border-brand-electric-purple/20 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl"
          >
            <div className="max-h-60 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left rtl:text-right px-5 py-3 text-sm font-body transition-colors hover:bg-brand-electric-purple/10 ${
                    value === option ? 'text-brand-electric-purple bg-brand-electric-purple/5' : 'text-brand-pure-white/70'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ConsultationModal = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const t = translations[lang].modal;

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    sector: '',
    projectType: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-deep-navy/80 backdrop-blur-xl"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl max-h-[90dvh] bg-brand-deep-navy border border-brand-electric-purple/20 rounded-2xl shadow-elite-glow flex flex-col overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-6 right-6 rtl:left-6 rtl:right-auto text-brand-soft-lavender/50 hover:text-brand-pure-white transition-colors z-20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex-1 overflow-y-auto p-8 md:p-12">
              {!isSubmitted ? (
                <>
                  <div className="mb-10 text-center md:text-left rtl:md:text-right text-left rtl:text-right">
                    <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-pure-white mb-4 uppercase tracking-tight">
                      {t.title} <span className="text-brand-electric-purple">{t.titleAccent}</span>
                    </h2>
                    <p className="font-body text-brand-soft-lavender opacity-70 leading-relaxed">
                      {t.desc}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-display text-[10px] uppercase tracking-widest text-brand-pure-white/40 ml-1 rtl:mr-1">{t.fullName}</label>
                        <input 
                          required type="text" placeholder="John Doe"
                          className="w-full bg-brand-charcoal/50 border border-brand-electric-purple/10 text-brand-pure-white px-5 py-4 rounded-xl outline-none focus:border-brand-electric-purple/50 transition-all font-body text-left rtl:text-right"
                          value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-display text-[10px] uppercase tracking-widest text-brand-pure-white/40 ml-1 rtl:mr-1">{t.company}</label>
                        <input 
                          type="text" placeholder="Acme Corp"
                          className="w-full bg-brand-charcoal/50 border border-brand-electric-purple/10 text-brand-pure-white px-5 py-4 rounded-xl outline-none focus:border-brand-electric-purple/50 transition-all font-body text-left rtl:text-right"
                          value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <EliteDropdown 
                        label={t.businessSector}
                        options={t.businessSectorOptions}
                        value={formData.sector}
                        onChange={(val) => setFormData({...formData, sector: val})}
                        placeholder={lang === 'ar' ? 'اختر القطاع' : 'Select Sector'}
                        lang={lang}
                      />
                      <EliteDropdown 
                        label={t.projectType}
                        options={t.projectTypeOptions}
                        value={formData.projectType}
                        onChange={(val) => setFormData({...formData, projectType: val})}
                        placeholder={lang === 'ar' ? 'اختر النوع' : 'Select Type'}
                        lang={lang}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-display text-[10px] uppercase tracking-widest text-brand-pure-white/40 ml-1 rtl:mr-1">{t.vision}</label>
                      <textarea 
                        required rows="3" placeholder={t.visionPlaceholder}
                        className="w-full bg-brand-charcoal/50 border border-brand-electric-purple/10 text-brand-pure-white px-5 py-4 rounded-xl outline-none focus:border-brand-electric-purple/50 transition-all font-body resize-none text-left rtl:text-right"
                        value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>

                    <EliteButton type="submit" variant="cta" isLoading={isSubmitting} loadingText="..." className="w-full uppercase tracking-widest font-bold">
                      {t.submit}
                    </EliteButton>
                  </form>
                </>
              ) : (
                <div className="py-12 text-center text-left rtl:text-right">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-brand-electric-purple/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-brand-electric-purple/50">
                    <svg className="w-10 h-10 text-brand-electric-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-pure-white mb-4 uppercase tracking-tight">
                    {t.successTitle} <span className="text-brand-electric-purple">{t.successAccent}</span>
                  </h2>
                  <p className="font-body text-brand-soft-lavender opacity-70 mb-10 max-w-sm mx-auto">
                    {t.successDesc.replace('{name}', formData.name.split(' ')[0])}
                  </p>
                  <EliteButton onClick={onClose} variant="outline" className="w-full">
                    {t.return}
                  </EliteButton>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConsultationModal;
