import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LegalPage from './pages/LegalPage';
import { LanguageProvider } from './context/LanguageProvider';
import LanguageLoader from './components/shared/LanguageLoader';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Helper component to reset scroll position on route changes
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = hash;
      const scrollToTarget = () => {
        const node = document.querySelector(target);
        if (!node) return;

        if (window.lenis?.scrollTo) {
          window.lenis.scrollTo(target, { duration: 0.9, lock: true });
        } else {
          node.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(scrollToTarget);
      });

      return () => cancelAnimationFrame(frame);
    }

    if (window.lenis?.scrollTo) {
      window.lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

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
      prevent: (node) => node?.closest?.('[data-lenis-prevent]'),
    });

    window.lenis = lenis;

    return () => {
      lenis.destroy();
      if (window.lenis === lenis) {
        delete window.lenis;
      }
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
