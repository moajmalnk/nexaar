import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LegalPage from './pages/LegalPage';
import { LanguageProvider } from './context/LanguageProvider';
import LanguageLoader from './components/shared/LanguageLoader';

// Helper component to reset scroll position on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <LanguageProvider>
      <div className="bg-brand-deep-navy min-h-screen text-brand-pure-white selection:bg-brand-electric-purple/30">
        <LanguageLoader />
        <ScrollToTop />
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<LegalPage type="privacy" />} />
          <Route path="/terms" element={<LegalPage type="terms" />} />
        </Routes>

        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
