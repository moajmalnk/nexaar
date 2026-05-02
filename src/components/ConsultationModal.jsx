import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../utils/translations';
import { BRAND_CONFIG } from '../utils/constants';
import Button from './shared/Button';
import { lockPageScroll } from '../utils/scrollLock';
import { saveLead } from '../utils/leadsStorage';


const EliteDropdown = ({ label, options, value, onChange, placeholder }) => {
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
      <label className="font-display text-[0.625rem] uppercase tracking-widest text-brand-pure-white/40 ml-1 rtl:mr-1">
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
  const [isMobile, setIsMobile] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    sector: '',
    projectType: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Responsive Detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    return lockPageScroll();
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format phone for perfect WhatsApp compatibility (Detects Saudi Arabia +966 vs India +91)
    let cleanedPhone = formData.phone.replace(/\D/g, ''); // strip out all non-digits
    let finalPhone = formData.phone;

    if (cleanedPhone.startsWith('0091')) {
      finalPhone = `+91 ${cleanedPhone.substring(4)}`;
    } else if (cleanedPhone.startsWith('91') && cleanedPhone.length === 12) {
      finalPhone = `+91 ${cleanedPhone.substring(2)}`;
    } else if (cleanedPhone.startsWith('0') && cleanedPhone.length === 11) {
      finalPhone = `+91 ${cleanedPhone.substring(1)}`;
    } else if (cleanedPhone.length === 10 && /^[6789]/.test(cleanedPhone)) {
      finalPhone = `+91 ${cleanedPhone}`;
    } else {
      // Treat as Saudi Arabia by default or process existing country code
      if (cleanedPhone.startsWith('00966')) {
        cleanedPhone = cleanedPhone.substring(5);
      } else if (cleanedPhone.startsWith('966')) {
        cleanedPhone = cleanedPhone.substring(3);
      } else if (cleanedPhone.startsWith('0')) {
        cleanedPhone = cleanedPhone.substring(1);
      }
      finalPhone = `+966 ${cleanedPhone}`;
    }

    const updatedFormData = { ...formData, phone: finalPhone };

    try {
      // Save lead to local storage
      await saveLead(updatedFormData);
    } catch (err) {
      console.error('Error saving lead:', err);
    }

    const text = `*New Consultation Request from Nexaar Website*
    
*Name:* ${updatedFormData.name}
*Company:* ${updatedFormData.company || 'N/A'}
*Phone:* ${updatedFormData.phone}
*Sector:* ${updatedFormData.sector || 'N/A'}
*Project:* ${updatedFormData.projectType || 'N/A'}

*Vision:*
${updatedFormData.message}`;

    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  // ── Animation Variants ──
  const desktopVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 20 },
    visible: { scale: 1, opacity: 1, y: 0 },
    exit: { scale: 0.9, opacity: 0, y: 20 }
  };

  const mobileVariants = {
    hidden: { y: "100%", opacity: 1 },
    visible: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-deep-navy/40 backdrop-blur-3xl z-0"
          />

          {/* Modal Container */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={isMobile ? mobileVariants : desktopVariants}
            transition={{ type: 'spring', damping: 28, stiffness: 250 }}
            className={`
              relative z-10 w-full bg-brand-deep-navy/95 border-brand-electric-purple/20 flex flex-col overflow-hidden
              ${isMobile 
                ? 'fixed bottom-0 left-0 right-0 rounded-t-[2.5rem] border-t max-h-[92dvh] shadow-[0_-20px_40px_rgba(0,0,0,0.4)]' 
                : 'max-w-xl rounded-2xl border shadow-elite-glow max-h-[85dvh]'
              }
            `}
          >
            {/* Mobile Handle */}
            {isMobile && (
              <div className="flex-shrink-0 pt-4 flex justify-center pb-2">
                <div className="w-12 h-1.5 bg-brand-pure-white/10 rounded-full" />
              </div>
            )}

            {/* Close Button */}
            <button 
              onClick={onClose} 
              className={`
                absolute transition-colors z-20 text-brand-soft-lavender/50 hover:text-brand-pure-white
                ${isMobile ? 'top-6 right-8 rtl:left-8 rtl:right-auto' : 'top-6 right-6 rtl:left-6 rtl:right-auto'}
              `}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            
            <div 
              data-lenis-prevent
              className={`
                flex-1 overflow-y-auto custom-scrollbar
                ${isMobile ? 'p-8 pb-12' : 'p-10 md:p-12'}
              `}
            >
              {!isSubmitted ? (
                <>
                  <div className="mb-10 text-center md:text-left rtl:md:text-right">
                    <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-pure-white mb-4 uppercase tracking-tight">
                      {t.title} <span className="text-brand-electric-purple">{t.titleAccent}</span>
                    </h2>
                    <p className="font-body text-brand-soft-lavender opacity-70 leading-relaxed max-w-md">
                      {t.desc}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-display text-[0.625rem] uppercase tracking-widest text-brand-pure-white/40 ml-1 rtl:mr-1">{t.fullName}</label>
                        <input 
                          required type="text" placeholder="John Doe"
                          className="w-full bg-brand-charcoal/50 border border-brand-electric-purple/10 text-brand-pure-white px-5 py-4 rounded-xl outline-none focus:border-brand-electric-purple/50 transition-all font-body text-left rtl:text-right"
                          value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-display text-[0.625rem] uppercase tracking-widest text-brand-pure-white/40 ml-1 rtl:mr-1">{t.company}</label>
                        <input 
                          type="text" placeholder="Acme Corp"
                          className="w-full bg-brand-charcoal/50 border border-brand-electric-purple/10 text-brand-pure-white px-5 py-4 rounded-xl outline-none focus:border-brand-electric-purple/50 transition-all font-body text-left rtl:text-right"
                          value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-display text-[0.625rem] uppercase tracking-widest text-brand-pure-white/40 ml-1 rtl:mr-1">{t.phone}</label>
                      <input 
                        required type="tel" placeholder="+966 5X XXX XXXX"
                        className="w-full bg-brand-charcoal/50 border border-brand-electric-purple/10 text-brand-pure-white px-5 py-4 rounded-xl outline-none focus:border-brand-electric-purple/50 transition-all font-body text-left rtl:text-right"
                        value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
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
                      <label className="font-display text-[0.625rem] uppercase tracking-widest text-brand-pure-white/40 ml-1 rtl:mr-1">{t.vision}</label>
                      <textarea 
                        required rows="3" placeholder={t.visionPlaceholder}
                        className="w-full bg-brand-charcoal/50 border border-brand-electric-purple/10 text-brand-pure-white px-5 py-4 rounded-xl outline-none focus:border-brand-electric-purple/50 transition-all font-body resize-none text-left rtl:text-right"
                        value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      variant="primary" 
                      isLoading={isSubmitting} 
                      loadingText={t.sending} 
                      className="w-full" 
                      caps={true}
                    >
                      {t.submit}
                    </Button>
                    <p className="text-center text-[0.625rem] text-brand-pure-white/30 uppercase tracking-widest font-display mt-4">
                      {t.secure}
                    </p>
                  </form>
                </>
              ) : (
                <div className="py-12 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-brand-electric-purple/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-brand-electric-purple/50">
                    <svg className="w-10 h-10 text-brand-electric-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-pure-white mb-4 uppercase tracking-tight">
                    {t.successTitle} <span className="text-brand-electric-purple">{t.successAccent}</span>
                  </h2>
                  <p className="font-body text-brand-soft-lavender opacity-85 mb-10 max-w-sm mx-auto">
                    {t.successDesc.replace('{name}', formData.name.split(' ')[0])}
                  </p>
                  <Button onClick={onClose} variant="primary" className="w-full">
                    {t.return}
                  </Button>
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
