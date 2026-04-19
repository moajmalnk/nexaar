import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../utils/translations';



const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-[#2D2D3A]">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-start gap-4 py-6 text-left rtl:text-right cursor-pointer group outline-none"
      >
        <span className={`font-display font-bold text-xl md:text-2xl transition-colors duration-300 ${
          isOpen ? 'text-brand-electric-purple' : 'text-brand-pure-white group-hover:text-brand-electric-purple'
        } flex-1`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-brand-electric-purple flex-shrink-0 mt-0.5"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="font-body text-brand-soft-lavender text-base md:text-lg leading-relaxed pb-6 pr-0 md:pr-12 rtl:pr-0 rtl:pl-0 md:rtl:pl-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const { lang } = useLanguage();
  const t = translations[lang].faq;
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = t.items.map(item => ({
    question: item.q,
    answer: item.a
  }));

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-brand-deep-navy py-12 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Area */}
        <div className="text-center mb-16">
          <div className="mb-4 flex items-center justify-center space-x-2 rtl:space-x-reverse">
            <span className="font-body font-medium text-sm text-brand-pure-white flex items-center">
              <span className="text-brand-electric-purple mr-1 rtl:ml-1 rtl:mr-0">[</span> 
              {t.tag} 
              <span className="text-brand-electric-purple ml-1 rtl:mr-1 rtl:ml-0">]</span>
            </span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-brand-pure-white uppercase text-center">
            {t.title}
          </h2>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={activeIndex === index}
              onClick={() => toggleItem(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
