import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../utils/translations';
import { BRAND_CONFIG } from '../utils/constants';
import Button from './shared/Button';
import { lockPageScroll } from '../utils/scrollLock';
import { saveLead } from '../utils/leadsStorage';


const EliteDropdown = ({ label, options = [], value, onChange, placeholder, name }) => {
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
      
      {/* Rule 17: Separate display logic from state management via hidden binding */}
      <input type="hidden" name={name} value={value || ''} />

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
              {options?.map((option) => (
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

const INITIAL_FORM_STATE = {
  name: '',
  company: '',
  phone: '',
  sector: '',
  projectType: '',
  message: ''
};

const validateFields = (data, lang) => {
  const errors = {};
  const isAr = lang === 'ar';

  if (!data.name || data.name.trim().length < 2) {
    errors.name = isAr ? 'يرجى إدخال الاسم الكامل (حرفين على الأقل)' : 'Please enter your full name (min 2 letters)';
  }

  const digitsOnly = (data.phone || '').replace(/\D/g, '');
  if (!data.phone || digitsOnly.length < 8) {
    errors.phone = isAr ? 'يرجى إدخال رقم هاتف صحيح (8 أرقام على الأقل)' : 'Please enter a valid phone number (min 8 digits)';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = isAr ? 'يرجى كتابة تفاصيل مشروعك (10 أحرف على الأقل)' : 'Please describe your vision (min 10 characters)';
  }

  return errors;
};

const ConsultationModal = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const t = translations[lang].modal;
  const [isMobile, setIsMobile] = useState(false);

  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const resetFormState = () => {
    setFormData(INITIAL_FORM_STATE);
    setIsSubmitting(false);
    setIsSubmitted(false);
    setErrors({});
    setTouched({});
  };

  // Hard State Reset on modal close and component unmount (Rule 1)
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        resetFormState();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      resetFormState();
    };
  }, []);

  // Real-time Inline Field Validation & Numeric Character Constraints (Rule 2 & Rule 5)
  const handleFieldChange = (field, value) => {
    let processedValue = value;

    if (field === 'phone') {
      // Enforce rigid numeric/international character clamping (max 15 characters)
      processedValue = value.replace(/[^\d+ -]/g, '').slice(0, 15);
    }

    const nextFormData = { ...formData, [field]: processedValue };
    setFormData(nextFormData);

    if (touched[field]) {
      const fieldErrors = validateFields(nextFormData, lang);
      setErrors(prev => ({ ...prev, [field]: fieldErrors[field] }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const fieldErrors = validateFields(formData, lang);
    setErrors(prev => ({ ...prev, [field]: fieldErrors[field] }));
  };

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

  // Rule 10: Dynamic Programmatic Locking
  const isFormValid = Object.keys(validateFields(formData, lang)).length === 0;

  // Persistent Input Protection (Rule 3)
  const isFormDirty = !isSubmitted && (
    formData.name.trim() !== '' ||
    formData.company.trim() !== '' ||
    formData.phone.trim() !== '' ||
    formData.sector !== '' ||
    formData.projectType !== '' ||
    formData.message.trim() !== ''
  );

  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const handleAttemptClose = () => {
    if (isFormDirty) {
      setShowExitConfirm(true);
    } else {
      onClose();
    }
  };

  const confirmExit = () => {
    resetFormState();
    onClose();
  };

  const cancelExit = () => {
    setShowExitConfirm(false);
  };

  // Warn on browser tab / window exit if mid-form (Rule 3)
  useEffect(() => {
    if (!isOpen || !isFormDirty) return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isOpen, isFormDirty]);

  // Handle Escape key attempt with Unsaved Changes check
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleAttemptClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFormDirty]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Rule 8: Anti-Double Click Lockout Guard (Instant disabled state on click #1)
    if (isSubmitting) return;
    setIsSubmitting(true);

    // Mark all fields as touched to trigger inline validation messages (Rule 2)
    setTouched({ name: true, phone: true, message: true });

    // Front-End Entry Lane Sanitization (Rule 6)
    const escapeHtml = (str) => {
      if (typeof str !== 'string') return '';
      return str.replace(/[&<>"'/]/g, (match) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;'
      })[match]);
    };

    const sanitizedFormData = {
      name: escapeHtml(formData.name),
      company: escapeHtml(formData.company),
      phone: escapeHtml(formData.phone), // Keep sanitized phone base
      sector: escapeHtml(formData.sector),
      projectType: escapeHtml(formData.projectType),
      message: escapeHtml(formData.message)
    };

    // Validate BEFORE any submission triggers execution
    const validationErrors = validateFields(sanitizedFormData, lang);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setIsSubmitting(false); // Rule 8: Release lockout if validation fails
      return; // Stop submission before triggers
    }

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

    const updatedFormData = { ...sanitizedFormData, phone: finalPhone };

    // Save lead in background
    saveLead(updatedFormData).catch(err => {
      console.error('Error saving lead in background:', err);
    });

    const text = `*New Consultation Request from Nexaar Website*
    
*Name:* ${updatedFormData.name}
*Company:* ${updatedFormData.company || 'N/A'}
*Phone:* ${updatedFormData.phone}
*Sector:* ${updatedFormData.sector || 'N/A'}
*Project:* ${updatedFormData.projectType || 'N/A'}

*Vision:*
${updatedFormData.message}`;

    // Faster 200ms delay to make the submission feel lightning fast
    await new Promise(resolve => setTimeout(resolve, 200));
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
            onClick={handleAttemptClose}
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
              onClick={handleAttemptClose} 
              className={`
                absolute transition-colors z-20 text-brand-soft-lavender/50 hover:text-brand-pure-white
                ${isMobile ? 'top-6 right-8 rtl:left-8 rtl:right-auto' : 'top-6 right-6 rtl:left-6 rtl:right-auto'}
              `}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            
            {/* Unsaved Changes Warning Overlay (Rule 3) */}
            <AnimatePresence>
              {showExitConfirm && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 z-50 bg-[#0D0D15]/95 backdrop-blur-xl flex items-center justify-center p-6 text-center"
                >
                  <div className="max-w-md w-full bg-brand-deep-navy border border-red-500/30 rounded-2xl p-8 shadow-2xl space-y-6">
                    <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto text-red-400">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display font-bold text-xl text-brand-pure-white uppercase tracking-tight">
                        {lang === 'ar' ? 'إلغاء التغييرات غير محفوظة؟' : 'Discard Unsaved Changes?'}
                      </h3>
                      <p className="font-body text-sm text-brand-soft-lavender opacity-80 leading-relaxed">
                        {lang === 'ar' 
                          ? 'لقد قمت بإدخال بيانات في النموذج. هل أنت تأكد من رغبتك في إغلاق النموذج وفقدان البيانات؟' 
                          : 'You have active unsaved information in this form. Are you sure you want to exit and discard your changes?'}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button 
                        type="button"
                        onClick={confirmExit}
                        className="flex-1 py-3 px-4 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 font-body text-sm font-semibold transition-all"
                      >
                        {lang === 'ar' ? 'إلغاء وتفريغ البيانات' : 'Discard & Exit'}
                      </button>
                      <button 
                        type="button"
                        onClick={cancelExit}
                        className="flex-1 py-3 px-4 rounded-xl bg-brand-electric-purple/20 hover:bg-brand-electric-purple/30 border border-brand-electric-purple/40 text-brand-pure-white font-body text-sm font-semibold transition-all"
                      >
                        {lang === 'ar' ? 'متابعة الكتابة' : 'Keep Editing'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
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

                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-display text-[0.625rem] uppercase tracking-widest text-brand-pure-white/40 ml-1 rtl:mr-1">{t.fullName}</label>
                        <input 
                          type="text" placeholder="John Doe"
                          maxLength={100}
                          dir="auto"
                          className={`w-full bg-brand-charcoal/50 border ${errors.name && touched.name ? 'border-red-500/80 focus:border-red-500' : 'border-brand-electric-purple/10 focus:border-brand-electric-purple/50'} text-brand-pure-white px-5 py-4 rounded-xl outline-none transition-all font-body text-left rtl:text-right`}
                          value={formData.name} 
                          onChange={(e) => handleFieldChange('name', e.target.value)}
                          onBlur={() => handleBlur('name')}
                        />
                        {errors.name && touched.name && (
                          <p className="text-red-400 text-xs mt-1 ml-1 rtl:mr-1 font-body flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="font-display text-[0.625rem] uppercase tracking-widest text-brand-pure-white/40 ml-1 rtl:mr-1">{t.company}</label>
                        <input 
                          type="text" placeholder="Acme Corp"
                          maxLength={100}
                          dir="auto"
                          className="w-full bg-brand-charcoal/50 border border-brand-electric-purple/10 text-brand-pure-white px-5 py-4 rounded-xl outline-none focus:border-brand-electric-purple/50 transition-all font-body text-left rtl:text-right"
                          value={formData.company} onChange={(e) => handleFieldChange('company', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-display text-[0.625rem] uppercase tracking-widest text-brand-pure-white/40 ml-1 rtl:mr-1">{t.phone}</label>
                      <input 
                        type="tel" placeholder="+966 5X XXX XXXX"
                        maxLength={15}
                        dir="ltr"
                        className={`w-full bg-brand-charcoal/50 border ${errors.phone && touched.phone ? 'border-red-500/80 focus:border-red-500' : 'border-brand-electric-purple/10 focus:border-brand-electric-purple/50'} text-brand-pure-white px-5 py-4 rounded-xl outline-none transition-all font-body text-left rtl:text-right`}
                        value={formData.phone} 
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                        onBlur={() => handleBlur('phone')}
                      />
                      {errors.phone && touched.phone && (
                        <p className="text-red-400 text-xs mt-1 ml-1 rtl:mr-1 font-body flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <EliteDropdown 
                        name="sector"
                        label={t.businessSector}
                        options={t.businessSectorOptions}
                        value={formData.sector}
                        onChange={(val) => handleFieldChange('sector', val)}
                        placeholder={lang === 'ar' ? 'اختر القطاع' : 'Select Sector'}
                        lang={lang}
                      />
                      <EliteDropdown 
                        name="projectType"
                        label={t.projectType}
                        options={t.projectTypeOptions}
                        value={formData.projectType}
                        onChange={(val) => handleFieldChange('projectType', val)}
                        placeholder={lang === 'ar' ? 'اختر النوع' : 'Select Type'}
                        lang={lang}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-display text-[0.625rem] uppercase tracking-widest text-brand-pure-white/40 ml-1 rtl:mr-1">{t.vision}</label>
                      <textarea 
                        rows="3" placeholder={t.visionPlaceholder}
                        maxLength={1000}
                        dir="auto"
                        className={`w-full bg-brand-charcoal/50 border ${errors.message && touched.message ? 'border-red-500/80 focus:border-red-500' : 'border-brand-electric-purple/10 focus:border-brand-electric-purple/50'} text-brand-pure-white px-5 py-4 rounded-xl outline-none transition-all font-body resize-none text-left rtl:text-right`}
                        value={formData.message} 
                        onChange={(e) => handleFieldChange('message', e.target.value)}
                        onBlur={() => handleBlur('message')}
                      />
                      {errors.message && touched.message && (
                        <p className="text-red-400 text-xs mt-1 ml-1 rtl:mr-1 font-body flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      variant="primary" 
                      isLoading={isSubmitting} 
                      loadingText={t.sending} 
                      className="w-full" 
                      caps={true}
                      disabled={!isFormValid}
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
                  <Button onClick={() => { resetFormState(); onClose(); }} variant="primary" className="w-full">
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
