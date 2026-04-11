import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    // Update document direction and lang attribute
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLanguage = () => {
    setIsChanging(true);
    
    // Smooth transition delay for loading screen
    setTimeout(() => {
      setLang(prev => prev === 'en' ? 'ar' : 'en');
      
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

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
