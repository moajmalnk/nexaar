import React, { useState, useEffect } from 'react';
import { LanguageContext } from './LanguageContext';

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      // 1. Check for explicit user preference (highest priority)
      // Note: We use a new key to avoid users being 'stuck' in English from the previous bug
      const explicitSaved = localStorage.getItem('nexaar_user_lang_pref');
      if (explicitSaved) return explicitSaved;
      
      // 2. Check all browser preferred languages for Arabic
      // Support for ar, ar-SA, ar-EG, etc.
      const preferredLanguages = navigator.languages || [navigator.language];
      const hasArabicPreference = preferredLanguages.some(l => 
        l && l.toLowerCase().startsWith('ar')
      );

      if (hasArabicPreference) {
        return 'ar';
      }
    }
    // 3. System default
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
