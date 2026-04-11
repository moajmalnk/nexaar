import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhoThisIsFor from './components/WhoThisIsFor';
import TaglineBridge from './components/TaglineBridge';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import ProjectJourney from './components/ProjectJourney';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import NumbersThatMatter from './components/NumbersThatMatter';
import TechStack from './components/TechStack';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';
import LanguageLoader from './components/shared/LanguageLoader';

function App() {
  return (
    <LanguageProvider>
      <div className="bg-brand-deep-navy min-h-screen text-brand-pure-white selection:bg-brand-electric-purple/30">
        <LanguageLoader />
        <Navbar />
      
      <main>
        <Hero />
        <WhoThisIsFor />
        <TaglineBridge />
        <Services />
        <WhyChooseUs />
        <ProjectJourney />
        <Portfolio />
        <Testimonials />
        <NumbersThatMatter />
        <TechStack />
        <FAQ />
        <CTA />
      </main>

      <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
