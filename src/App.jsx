import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LegalPage from './pages/LegalPage';
import { LanguageProvider } from './context/LanguageProvider';
import LanguageLoader from './components/shared/LanguageLoader';
import Lenis from 'lenis';

// Helper component to reset scroll position on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

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
