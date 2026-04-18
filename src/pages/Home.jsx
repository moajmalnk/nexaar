import React from 'react';
import Hero from '../components/Hero';
import WhoThisIsFor from '../components/WhoThisIsFor';
import TaglineBridge from '../components/TaglineBridge';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import ProjectJourney from '../components/ProjectJourney';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import NumbersThatMatter from '../components/NumbersThatMatter';
import TechStack from '../components/TechStack';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';

const Home = () => {
  return (
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
  );
};

export default Home;
