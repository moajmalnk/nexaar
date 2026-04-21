import React, { useState, useEffect, useCallback } from 'react';
import { LanguageContext } from './LanguageContext';

/**
 * Detects the browser/device language.
 * Returns 'ar' if ANY preferred language starts with 'ar', otherwise 'en'.
 * navigator.languages gives the full ordered preference list (Chrome, Firefox, Safari).
 * navigator.language gives the primary UI language as fallback.
 */
const detectBrowserLanguage = () => {
  if (typeof window === 'undefined') return 'en';

  // navigator.languages is an array ordered by user preference.
  // We should respect the primary (first) language in this list.
  const languages = navigator.languages || [navigator.language || 'en'];
  const primary = languages[0].toLowerCase();
  
  if (primary.startsWith('ar')) {
    return 'ar';
  }
  return 'en';
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      const currentBrowserLang = detectBrowserLanguage();
      const lastBrowserLang = localStorage.getItem('nexaar_last_browser_lang');
      const userExplicitPref = localStorage.getItem('nexaar_user_lang_pref');
      
      // If the browser/device language has changed since the user's last visit
      // (or if we just started tracking it), this is a strong signal.
      // We should respect the new device language and discard old manual overrides.
      if (currentBrowserLang !== lastBrowserLang) {
        localStorage.setItem('nexaar_last_browser_lang', currentBrowserLang);
        localStorage.removeItem('nexaar_user_lang_pref');
        return currentBrowserLang;
      }

      // 1. Check if user has EXPLICITLY toggled the language (manual override)
      if (userExplicitPref) {
        return userExplicitPref;
      }

      // 2. No manual override — auto-detect from browser/device language
      return currentBrowserLang;
    }
    return 'en';
  });
  
  const [isChanging, setIsChanging] = useState(false);

  // Apply document attributes whenever language changes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    if (lang === 'ar') {
      document.body.classList.add('font-arabic');
    } else {
      document.body.classList.remove('font-arabic');
    }
  }, [lang]);

  // Listen for LIVE browser language changes (user changes Chrome/Safari language
  // while the site is already open). This event fires when navigator.language changes.
  useEffect(() => {
    const handleLanguageChange = () => {
      // Only auto-switch if the user hasn't explicitly toggled
      const userExplicitPref = localStorage.getItem('nexaar_user_lang_pref');
      if (!userExplicitPref) {
        const newBrowserLang = detectBrowserLanguage();
        setLang(newBrowserLang);
      }
    };

    window.addEventListener('languagechange', handleLanguageChange);
    return () => window.removeEventListener('languagechange', handleLanguageChange);
  }, []);

  const toggleLanguage = useCallback(() => {
    setIsChanging(true);
    
    setTimeout(() => {
      setLang(prev => {
        const newLang = prev === 'en' ? 'ar' : 'en';
        
        // Mark this as an EXPLICIT user preference
        localStorage.setItem('nexaar_user_lang_pref', newLang);
        
        return newLang;
      });
      
      // Keep loading screen for a bit longer to feel cinematic
      setTimeout(() => {
        setIsChanging(false);
      }, 1000);
    }, 800);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, isChanging, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
