import React, { useState, useEffect } from 'react';
import { LanguageContext } from './LanguageContext';

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      // 1. Check for explicit user preference (highest priority)
      const explicitSaved = localStorage.getItem('nexaar_user_lang_pref');
      if (explicitSaved) return explicitSaved;
      
      // 2. Check the browser's primary language setting
      const primaryLanguage = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';
      if (primaryLanguage.toLowerCase().startsWith('ar')) {
        return 'ar';
      }
      return 'en';
    }
    // 3. System default fallback
    return 'en';
  });
  
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    // Update document direction and lang attribute
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Smooth transition: small delay to let direction change settle
    if (lang === 'ar') {
      document.body.classList.add('font-arabic');
    } else {
      document.body.classList.remove('font-arabic');
    }
  }, [lang]);

  const toggleLanguage = () => {
    setIsChanging(true);
    
    // Smooth transition delay for loading screen
    setTimeout(() => {
      const newLang = lang === 'en' ? 'ar' : 'en';
      setLang(newLang);
      
      // PERSIST: Only save to localStorage when user explicitly toggles
      localStorage.setItem('nexaar_user_lang_pref', newLang);
      
      // Keep loading screen for a bit longer to feel cinematic
      setTimeout(() => {
        setIsChanging(false);
      }, 1000);
    }, 800);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, isChanging, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
