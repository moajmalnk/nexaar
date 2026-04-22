export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      portfolio: 'Portfolio',
      contact: 'Contact',
      who: 'Who It Is For',
      why: 'Why Us',
      process: 'Process',
      tech: 'Tech Stack',
      getStarted: 'Get Started',
      toggleLang: '🇸🇦 Switch to Arabic',
    },
    notFound: {
      title: '404 - Page Not Found',
      desc: 'It seems you have strayed into forbidden territory. The page you are looking for has been decommissioned or moved.',
      cta: 'Return to Hub',
    },
    offline: {
      title: 'OFFLINE MODE',
      desc: 'Connections lost. Showing cached content.',
    },
    whoThisIsFor: {
      tag: 'WHO THIS IS FOR',
      title: 'BUILT FOR SAUDI',
      titleAccent: 'SMEs & STARTUPS',
      description: 'If you’re a business owner looking for clarity, speed, and scalable digital solutions, NEXAAR is for you.',
      points: [
        'Reliable technology partners — not just vendors',
        'Clarity and structure in development',
        'Speed to market and scalable execution'
      ]
    },
    hero: {
      title1: 'Tech ',
      title1Accent: 'Solutions',
      title2: 'for Saudi Businesses',
      subtitle: 'We build websites, mobile apps, and digital platforms that help SMEs and startups in Saudi Arabia grow, scale, and operate efficiently. From idea to launch with clarity, speed and structure.',
      ctaPrimary: 'Talk to Us on WhatsApp',
      ctaSecondary: 'Get a Free Consultation',
    },
    services: {
      tag: 'OUR SERVICES',
      title: 'WHAT WE BUILD',
      items: [
        { title: 'Website Development', desc: 'Professional websites built for real business use.' },
        { title: 'Mobile App Development', desc: 'Scalable apps designed for performance and growth.' },
        { title: 'Branding & Digital Foundations', desc: 'Logos, brand systems, and visual identity.' }
      ]
    },
    whyChoose: {
      tag: 'THE NEXAAR ADVANTAGE',
      title: 'WHY CHOOSE',
      titleAccent: 'NEXAAR',
      desc: 'We bridge the gap between complex technology and real business impact, specifically tailored for the ambitious KSA market.',
      pillarLabel: 'Core Pillar',
      pillars: [
        { title: 'Saudi-Focused Approach', desc: 'We understand local business needs and the unique landscape of the KSA market.' },
        { title: 'Clear Scope & Process', desc: 'No confusion, no hidden surprises. We define every detail before we write a single line of code.' },
        { title: 'SME & Startup Friendly', desc: 'Practical, high-impact solutions built for speed and budget efficiency, not over-engineering.' },
        { title: 'Scalable Technology', desc: 'Built to grow with your business using enterprise-grade foundations that handle traffic spikes.' },
        { title: 'Direct Communication', desc: 'Talk to real people and lead developers, not layers of sales reps or middle managers.' },
        { title: 'Future-Ready Engineering', desc: 'We don\'t just build for today; we engineer foundations that evolve alongside your long-term business strategy.' }
      ]
    },
    modal: {
      title: 'Start Your',
      titleAccent: 'Journey',
      desc: 'Share your vision with Nexaar. We\'ll review your project and get back to you within 24 hours.',
      fullName: 'Full Name',
      company: 'Company',
      phone: 'Phone Number',
      businessSector: 'Business Sector',
      vision: 'Your Vision',
      visionPlaceholder: 'Tell us about your project goals...',
      businessSectorOptions: [
        'Technology', 
        'Retail / E-commerce', 
        'Real Estate', 
        'Logistics', 
        'Finance / Fintech', 
        'Other'
      ],
      projectType: 'Project Type',
      projectTypeOptions: [
        'Website Development',
        'Mobile App (iOS/Android)',
        'Custom Platform / SaaS',
        'UI/UX Design & Branding'
      ],
      submit: 'Request Free Consultation',
      sending: 'Sending...',
      secure: 'SECURE & CONFIDENTIAL',
      successTitle: 'Vision',
      successAccent: 'Received',
      successDesc: 'Thank you for reaching out, {name}. Our strategy team is currently reviewing your brief. Expect a call or email within 24 hours.',
      return: 'Return to Experience',
    },
    journey: {
      tag: '[ HOW WE WORK ]',
      title: 'THE PROJECT JOURNEY',
      steps: [
        { title: 'Discovery & Planning', desc: 'We understand your business, goals, and requirements through deep investigation.' },
        { title: 'Design & User Experience', desc: 'Clean, modern designs focused on usability and clarity for your end users.' },
        { title: 'Development', desc: 'Structured development using reliable and scalable technologies built to last.' },
        { title: 'Testing & Launch', desc: 'Quality checks, refinements, and smooth deployment to ensure a perfect start.' },
        { title: 'Support & Growth', desc: 'Post-launch support and future enhancements to keep your business ahead.' }
      ]
    },
    portfolio: {
      tag: 'OUR WORK',
      title: 'FEATURED PROJECTS',
      desc: 'Each project is built with a clear purpose — solving a business problem, not just creating visuals.',
      challenge: 'The Challenge',
      stack: 'Technology Stack',
      goBack: 'Go Back',
        items: [
          { 
            id: 1, 
            title: "FINEDGE", 
            category: "FinTech Platform", 
            problem: "Complex data visualization required real-time rendering for stock traders.", 
            solution: "We engineered a custom WebGL-based charting engine that handles 10,000+ data points per second with zero latency.", 
            result: "Increased user retention by 40% and reduced server load through efficient client-side data processing."
          },
          { 
            id: 2, 
            title: "LUMIERE", 
            category: "E-Commerce App", 
            problem: "High cart abandonment due to a slow, multi-step checkout process.", 
            solution: "Implemented a 'one-tap' checkout system with integrated Apple Pay and STC Pay, streamlining the funnel into a single page.", 
            result: "Direct increase in conversion rates by 25% within the first month of deployment."
          },
          { 
            id: 3, 
            title: "NEXUS", 
            category: "AI Dashboard", 
            problem: "Scattered marketing analytics needed a centralized, AI-driven command center.", 
            solution: "Centralized 12+ API streams into a unified GraphQL layer with an AI-agent that predicts ad-spend efficiency.", 
            result: "Marketing teams saved 20 hours per week on reporting and improved ROI by 15%."
          }
        ]
    },
    testimonials: {
      tag: 'CLIENT VOICES',
      title: 'TRUSTED BY VISIONARIES',
      desc: 'We focus on long-term relationships built on trust, transparency, and results within the Saudi tech ecosystem.',
      items: [
        { id: 1, name: "Ahmed Al-Fadhel", role: "Founder, SaaS Connect Riyadh", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150", quote: "Nexaar didn't just write code; they challenged our assumptions and improved our core product logic. True technical partners." },
        { id: 2, name: "Sarah Al-Ghamdi", role: "CEO, RetailNova", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150", quote: "The speed at which they moved from wireframes to a fully functional MVP was staggering. Clear communication, zero hidden surprises." },
        { id: 3, name: "Omar Tariq", role: "CTO, FinFlow", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150", quote: "Finding developers who understand scalable architecture is hard. Finding a team that cares about the business outcome is rarer. Nexaar delivers both." },
        { id: 4, name: "Layla Hassan", role: "Operations Lead, HealthSync", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150", quote: "Their focus on a clean, maintainable digital foundation saved us months of technical debt down the line." },
        { id: 5, name: "Faisal Bin Youssef", role: "Co-Founder, EduTech KSA", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150", quote: "We came to them with an idea; they handed us a market-ready platform. The design is world-class, and the performance is flawless." },
        { id: 6, name: "Nadia Malik", role: "Director, UrbanLogistics", avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150&h=150", quote: "Professionalism at its peak. Their discovery phase aligned our entire team, and the delivery was exactly on schedule." }
      ]
    },
    stats: {
      tag: 'OUR IMPACT',
      title: 'NUMBERS THAT MATTER',
      desc: 'Real numbers, real outcomes for real Saudi businesses.',
      checklist: ['Multiple industries served', 'Saudi-focused delivery'],
      delivered: 'Projects Delivered',
      supported: 'Businesses Supported',
      impactTag: 'High Impact'
    },
    techStack: {
      tag: 'OUR TECH STACK',
      title: 'ENGINEERED FOR SCALE',
      desc: 'We work with proven, scalable technologies trusted by modern businesses worldwide.'
    },
    faq: {
      tag: 'FAQ',
      title: 'COMMON QUESTIONS',
      items: [
        { q: "How long does a typical project take?", a: "Timelines depend on scope. Most websites take 3–6 weeks, while apps and platforms follow structured phases." },
        { q: "Do you work only with Saudi businesses?", a: "Our primary focus is Saudi Arabia, but we follow global best practices and work with international visionaries." },
        { q: "Will my project be scalable?", a: "Yes. All solutions are built with future growth in mind, utilizing modern, adaptable tech stacks." },
        { q: "Do you provide support after launch?", a: "Yes, we offer post-launch support and ongoing assistance when required to ensure your platform runs flawlessly." }
      ]
    },
    cta: {
      tag: "LET'S BUILD",
      title: 'READY TO START YOUR PROJECT?',
      desc: 'Talk directly with our team and get clear answers — no pressure, no confusion. We respond quickly and guide you step by step through the entire digital landscape.',
      whatsapp: 'Contact us on WhatsApp'
    },
    footer: {
      desc: 'Building the future of digital assets in Saudi Arabia with scalable, enterprise-grade architecture.',
      mail: 'info@nexaartech.com',
      newsletter: {
        title: 'Stay Ahead of the Curve',
        desc: 'Get expert insights on the Saudi tech landscape and digital transformation.',
        placeholder: 'Enter your email',
        button: 'Subscribe',
        success: 'Welcome to the inner circle!',
      },
      links: {
        services: 'Services',
        explore: 'Explore',
        connect: 'Connect'
      },
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      rights: 'Nexaar Tech. All rights reserved.',
      location: 'RIYADH, KSA',
      slogan: 'هندسة النتائج للملكة',
    },
    legal: {
      contactNote: 'Questions regarding our {title}? Contact us at {email}',
      privacy: {
        title: 'Privacy Policy',
        lastUpdated: '22 April 2025',
        sections: [
          {
            title: 'Information We Collect',
            content: [
              'We collect only the information necessary to respond to your enquiries and deliver our services:',
              'Name — to identify and address you properly',
              'Email address — to communicate with you about your project, enquiry, or account',
              'We do not collect payment card numbers, government IDs, passwords, or any sensitive personal data unless explicitly stated at the time of collection.'
            ]
          },
          {
            title: 'How We Use Your Information',
            content: [
              'Your name and email address are used solely for the following purposes:',
              'To respond to contact form submissions and enquiries',
              'To communicate updates, proposals, or deliverables related to your project',
              'To manage our business relationship with you',
              'To send important notices about changes to our services or policies',
              'We will never use your information to send unsolicited marketing emails, and we will never sell or trade your personal data to any third party.'
            ]
          },
          {
            title: 'Legal Basis for Processing',
            content: [
              'We process your personal data on the basis of your consent (when you submit a contact form or sign up to our platform) and on the basis of legitimate interests in operating our business and delivering services you have requested.'
            ]
          },
          {
            title: 'Data Storage & Security',
            content: [
              'Your data is stored securely on industry-standard cloud infrastructure. We apply reasonable technical and organisational measures to protect your information from unauthorised access, loss, or disclosure. Access to personal data is restricted to team members who require it to deliver your project.',
              'We retain your data only for as long as is necessary for the purpose it was collected, or as required by applicable law.'
            ]
          },
          {
            title: 'Third-Party Sharing',
            content: [
              'We do not sell, rent, or share your personal information with third parties for their own marketing purposes. We may share data with trusted service providers (e.g. cloud hosting, email delivery) solely to the extent required to operate our services. All such providers are bound by appropriate data protection obligations.',
              'Our website may contain links to external sites. We are not responsible for the privacy practices of those sites and encourage you to review their policies.'
            ]
          },
          {
            title: 'Cookies & Analytics',
            content: [
              'Our website may use standard analytics tools (such as Google Analytics) to understand how visitors interact with our site. These tools may collect anonymised usage data via cookies. You may disable cookies in your browser settings; this will not affect your ability to use our core site.'
            ]
          },
          {
            title: 'Your Rights',
            content: [
              'Depending on your location, you may have the right to:',
              'Access the personal data we hold about you',
              'Request correction of inaccurate data',
              'Request deletion of your data',
              'Withdraw your consent at any time',
              'Object to or restrict certain processing activities',
              'To exercise any of these rights, please contact us at legal@nexaartech.com. We will respond within a reasonable timeframe.'
            ]
          },
          {
            title: 'Changes to This Policy',
            content: [
              'We may update this Privacy Policy from time to time. When we do, we will revise the effective date at the top of this page. Continued use of our website or services after any changes constitutes your acceptance of the updated policy.'
            ]
          },
          {
            title: 'Contact',
            content: [
              'If you have any questions about this Privacy Policy, please contact us:',
              'Email: legal@nexaartech.com',
              'Website: https://nexaartech.com',
              'Address: Riyadh, Kingdom of Saudi Arabia'
            ]
          }
        ]
      },
      terms: {
        title: 'Terms of Service',
        lastUpdated: '22 April 2025',
        sections: [
          {
            title: 'About Nexaar Tech',
            content: [
              'Nexaar Tech is a technology development agency based in Riyadh, Kingdom of Saudi Arabia. We specialise in end-to-end digital product development — including web applications, mobile applications, and technology strategy — primarily for early-stage entrepreneurs and startups in the Saudi Arabian ecosystem.'
            ]
          },
          {
            title: 'Acceptance of Terms',
            content: [
              'By submitting an enquiry, signing a proposal, or accessing any part of our website or client portal, you confirm that you have read, understood, and agree to these Terms. If you are entering into these Terms on behalf of a company or organisation, you represent that you have authority to bind that entity.'
            ]
          },
          {
            title: 'Our Services',
            content: [
              'Nexaar Tech provides the following categories of services:',
              'Web and mobile application design and development',
              'Technology consulting and product strategy',
              'Access to client portals, project dashboards, and related platforms operated by Nexaar Tech',
              'Specific deliverables, timelines, pricing, and project scope are agreed separately in written proposals or service agreements between Nexaar Tech and the client. In the event of any conflict between these Terms and a specific agreement, the specific agreement prevails.'
            ]
          },
          {
            title: 'Your Responsibilities',
            content: [
              'When using our services or website, you agree to:',
              'Provide accurate and up-to-date information when requested',
              'Use our website and services for lawful purposes only',
              'Not attempt to disrupt, hack, or gain unauthorised access to our systems',
              'Not copy, reverse-engineer, or reproduce any part of our website or platforms without written permission',
              'Cooperate reasonably with our team to enable timely delivery of agreed services'
            ]
          },
          {
            title: 'Intellectual Property',
            content: [
              'Unless otherwise agreed in writing, all content on the Nexaar Tech website — including text, graphics, logos, and code — is the property of Nexaar Tech and protected by applicable intellectual property laws.',
              'Intellectual property rights in deliverables created specifically for a client project will be as specified in the relevant project agreement. Where no agreement is in place, ownership remains with Nexaar Tech until full payment is received.'
            ]
          },
          {
            title: 'Limitation of Liability',
            content: [
              'To the fullest extent permitted by law, Nexaar Tech shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of our website or services, including but not limited to loss of profits, loss of data, or business interruption.',
              'Our total liability to you in connection with any claim shall not exceed the amount paid by you to Nexaar Tech in the three months preceding the event giving rise to the claim.'
            ]
          },
          {
            title: 'Disclaimer of Warranties',
            content: [
              'Our website and services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that our website will be uninterrupted, error-free, or free of viruses or other harmful components.'
            ]
          },
          {
            title: 'Governing Law',
            content: [
              'These Terms shall be governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia. Any disputes arising from or related to these Terms shall be subject to the exclusive jurisdiction of the courts of Riyadh, Saudi Arabia.'
            ]
          },
          {
            title: 'Changes to These Terms',
            content: [
              'We reserve the right to update or modify these Terms at any time. Changes will be effective upon posting to our website with a revised effective date. Your continued use of our services after any such changes constitutes your acceptance of the new Terms.'
            ]
          },
          {
            title: 'Termination',
            content: [
              'We reserve the right to suspend or terminate access to our services or website at our discretion if we believe you are in breach of these Terms or applicable law. Sections related to intellectual property, liability, and governing law will survive termination.'
            ]
          },
          {
            title: 'Contact',
            content: [
              'For any questions or concerns about these Terms, please contact us:',
              'Email: legal@nexaartech.com',
              'Website: https://nexaartech.com',
              'Address: Riyadh, Kingdom of Saudi Arabia'
            ]
          }
        ]
      }
    },
    marquee: {
      ribbon1: 'Reliable Technology / Clarity in Code / Scalable Execution / Future Ready / Built for Saudi / SME Focused / Think Forward / Digital Excellence',
      ribbon2: 'Reliable Technology / Clarity in Code / Scalable Execution / Future Ready / Built for Saudi / SME Focused / Think Forward / Digital Excellence'
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'خدماتنا',
      portfolio: 'أعمالنا',
      contact: 'اتصل بنا',
      who: 'من نحن',
      why: 'لماذا نحن',
      process: 'خطواتنا',
      tech: 'تقنياتنا',
      getStarted: 'ابداً الآن',
      toggleLang: '🇺🇸 التغيير للإنجليزية',
    },
    notFound: {
      title: '404 - الصفحة غير موجودة',
      desc: 'يبدو أنك ضللت الطريق إلى منطقة محظورة. الصفحة التي تبحث عنها تم إخراجها من الخدمة أو نقلها.',
      cta: 'العودة للرئيسية',
    },
    offline: {
      title: 'وضع عدم الاتصال',
      desc: 'فقد الاتصال. يتم عرض المحتوى المخزن.',
    },
    whoThisIsFor: {
      tag: 'من نحن',
      title: 'خدماتنا مصممة لـ',
      titleAccent: 'الشركات السعودية الناشئة',
      description: 'إذا كنت صاحب عمل تبحث عن الوضوح، السرعة، والحلول الرقمية القابلة للتطوير، فإن نكسار هي الخيار الأمثل لك.',
      points: [
        'شركاء تقنيون موثوقون - وليسوا مجرد موردين',
        'الوضوح والهيكلة في التطوير',
        'السرعة في طرح المنتجات في السوق والتنفيذ القابل للتوسع'
      ]
    },
    hero: {
      title1Accent: 'تقنية',
      title1: 'حلول ',
      title2: 'للأعمال السعودية',
      subtitle: 'نحن نبني المواقع الإلكترونية، تطبيقات الجوال، والمنصات الرقمية التي تساعد الشركات الصغيرة والمتوسطة والناشئة في المملكة العربية السعودية على النمو، التوسع، والعمل بكفاءة. من الفكرة إلى الإطلاق بوضوح، سرعة، ومنهجية.',
      ctaPrimary: 'تحدث معنا عبر واتساب',
      ctaSecondary: 'احصل على استشارة مجانية',
    },
    services: {
      tag: 'خدماتنا',
      title: 'ماذا نبني',
      items: [
        { title: 'تطوير المواقع الإلكترونية', desc: 'مواقع احترافية مصممة خصيصاً لاستخدام الشركات.' },
        { title: 'تطوير تطبيقات الجوال', desc: 'تطبيقات قابلة للتوسع مصممة للأداء والنمو.' },
        { title: 'الهوية البصرية والأسس الرقمية', desc: 'شعارات، أنظمة هوية تجارية، وهوية مرئية متكاملة.' }
      ]
    },
    whyChoose: {
      tag: 'ميزة نكسار',
      title: 'لماذا تختار',
      titleAccent: 'نكسار',
      desc: 'نحن نسد الفجوة بين التكنولوجيا المعقدة والأثر التجاري الحقيقي، مصمم خصيصاً للسوق السعودي الطموح.',
      pillarLabel: 'ركيزة أساسية',
      pillars: [
        { title: 'نهج يركز على السوق السعودي', desc: 'نفهم احتياجات الأعمال المحلية والمشهد الفريد للسوق في المملكة العربية السعودية.' },
        { title: 'نطاق وعملية واضحة', desc: 'لا غموض أو مفاجآت خفية. نحدد كل التفاصيل قبل كتابة سطر واحد من التعليمات البرمجية.' },
        { title: 'صديق للشركات الناشئة والمتوسطة', desc: 'حلول عملية عالية التأثير مصممة للسرعة وكفاءة الميزانية، دون مبالغة في الهندسة.' },
        { title: 'تكنولوجيا قابلة للتوسع', desc: 'مصممة للنمو مع عملك باستخدام أسس برمجية قوية تتحمل ضغط الزيارات العالي.' },
        { title: 'تواصل مباشر', desc: 'تحدث مع أشخاص حقيقيين ومطورين رئيسيين، وليس طبقات من مندوبي المبيعات.' },
        { title: 'هندسة مستعدة للمستقبل', desc: 'نحن لا نبني لليوم فحسب؛ بل نصمم أسساً تتطور جنباً إلى جنب مع استراتيجية عملك على المدى الطويل.' }
      ]
    },
    modal: {
      title: 'ابدأ',
      titleAccent: 'رحلتك',
      desc: 'شاركنا رؤيتك. سنراجع مشروعك ونتواصل معك خلال 24 ساعة.',
      fullName: 'الاسم الكامل',
      company: 'الشركة',
      phone: 'رقم الجوال',
      businessSector: 'قطاع الأعمال',
      vision: 'رؤيتك',
      visionPlaceholder: 'أخبرنا عن أهداف مشروعك...',
      businessSectorOptions: [
        'التقنية', 
        'التجزئة / التجارة الإلكترونية', 
        'العقارات', 
        'الخدمات اللوجستية', 
        'المالية / التقنية المالية', 
        'أخرى'
      ],
      projectType: 'نوع المشروع',
      projectTypeOptions: [
        'تطوير موقع إلكتروني',
        'تطبيق جوال (iOS/Android)',
        'منصة خاصة / SaaS',
        'تصميم واجهة المستخدم والهوية'
      ],
      submit: 'طلب استشارة مجانية',
      sending: 'جاري الإرسال...',
      secure: 'آمن وسري للغاية',
      successTitle: 'تم استلام',
      successAccent: 'الرؤية',
      successDesc: 'شكرًا لتواصلك معنا يا {name}. فريق الاستراتيجية لدينا يراجع طلبك حاليًا. توقع اتصالاً أو بريداً إلكترونياً خلال 24 ساعة.',
      return: 'العودة للموقع',
    },
    journey: {
      tag: '[ كيف نعمل ]',
      title: 'رحلة المشروع',
      steps: [
        { title: 'الاكتشاف والتخطيط', desc: 'نفهم عملك وأهدافك ومتطلباتك من خلال تحقيق عميق وشامل.' },
        { title: 'التصميم وتجربة المستخدم', desc: 'تصاميم حديثة ونظيفة تركز على سهولة الاستخدام والوضوح لمستخدميك.' },
        { title: 'التطوير', desc: 'تطوير منهجي باستخدام تقنيات موثوقة وقابلة للتطوير صممت لتدوم.' },
        { title: 'الاختبار والإطلاق', desc: 'فحص الجودة والتحسينات والنشر السلس لضمان بداية مثالية.' },
        { title: 'الدعم والنمو', desc: 'دعم ما بعد الإطلاق والتحسينات المستقبلية لإبقاء عملك في المقدمة.' }
      ]
    },
    portfolio: {
      tag: 'أعمالنا',
      title: 'مشاريع مختارة',
      desc: 'كل مشروع مبني بهدف واضح - حل مشكلة تجارية، وليس مجرد ابتكار بصري.',
      challenge: 'التحدي',
      stack: 'المجموعة التقنية',
      goBack: 'الرجوع',
        items: [
          { 
            id: 1, 
            title: "FINEDGE", 
            category: "منصة التقنية المالية", 
            problem: "تطلب تصور البيانات المعقدة عرضًا فوريًا لتجار الأسهم.", 
            solution: "قمنا بتصميم محرك رسوم بيانية مخصص يعتمد على WebGL يعالج أكثر من 10,000 نقطة بيانات في الثانية مع زمن انتقال صفر.", 
            result: "زيادة استبقاء المستخدمين بنسبة 40٪ وتقليل حمل الخادم من خلال معالجة البيانات بكفاءة من جانب العميل."
          },
          { 
            id: 2, 
            title: "LUMIERE", 
            category: "تطبيق تجارة إلكترونية", 
            problem: "ارتفاع نسبة التخلي عن عربة التسوق بسبب عملية دفع بطيئة ومتعددة الخطوات.", 
            solution: "نظام دفع بـ 'نقرة واحدة' مع دمج Apple Pay و STC Pay، مما أدى إلى تبسيط عملية الدفع في صفحة واحدة.", 
            result: "زيادة مباشرة في معدلات التحويل بنسبة 25٪ خلال الشهر الأول من الإطلاق."
          },
          { 
            id: 3, 
            title: "NEXUS", 
            category: "لوحة بيانات الذكاء الاصطناعي", 
            problem: "احتاجت تحليلات التسويق المشتتة إلى مركز قيادة مركزي مدعوم بالذكاء الاصطناعي.", 
            solution: "مركزية أكثر من 12 تدفقًا لواجهة برمجة التطبيقات في طبقة GraphQL موحدة مع وكيل ذكاء اصطناعي يتوقع كفاءة الإنفاق الإعلاني.", 
            result: "وفرت فرق التسويق 20 ساعة أسبوعيًا في إعداد التقارير وحسنت العائد على الاستثمار بنسبة 15٪."
          }
        ]
    },
    testimonials: {
      tag: 'أصوات العملاء',
      title: 'موثوق من قبل المبدعين',
      desc: 'نركز على العلاقات طويلة الأمد القائمة على الثقة والشفافية والنتائج داخل منظومة التقنية السعودية.',
      items: [
        { id: 1, name: "أحمد الفاضل", role: "مؤسس، SaaS Connect الرياض", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150", quote: "نكسار لم يكتفوا بكتابة الكود؛ لقد تحدوا افتراضاتنا وحسنوا المنطق الأساسي لمنتجنا. شركاء تقنيون حقيقيون." },
        { id: 2, name: "سارة الغامدي", role: "الرئيس التنفيذي، RetailNova", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150", quote: "السرعة التي انتقلوا بها من المخططات الأولية إلى منتج أولي كامل الوظائف كانت مذهلة. تواصل واضح، ولا مفاجآت خفية." },
        { id: 3, name: "عمر طارق", role: "المدير التقني، FinFlow", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150", quote: "من الصعب العثور على مطورين يفهمون الهندسة البرمجية القابلة للتوسع. العثور على فريق يهتم بنتيجة العمل أندر. نكسار تقدم كلاهما." },
        { id: 4, name: "ليلى حسن", role: "مسؤول العمليات، HealthSync", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150", quote: "تركيزهم على أساس رقمي نظيف وقابل للصيانة وفر علينا شهورًا من الديون التقنية في المستقبل." },
        { id: 5, name: "فيصل بن يوسف", role: "شريك مؤسس، EduTech KSA", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150", quote: "جئنا إليهم بفكرة؛ سلمونا منصة جاهزة للسوق. التصميم عالمي المستوى والأداء مثالي." },
        { id: 6, name: "نادية مالك", role: "مديرة، UrbanLogistics", avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150&h=150", quote: "الاحترافية في ذروتها. مرحلة الاكتشاف الخاصة بهم وحدت فريقنا بالكامل، وكان التسليم في الموعد المحدد تمامًا." }
      ]
    },
    stats: {
      tag: 'أثرنا',
      title: 'أرقام تهمك',
      desc: 'أرقام حقيقية، نتائج حقيقية للشركات السعودية الحقيقية.',
      checklist: ['خدمة صناعات متعددة', 'تنفيذ يركز على السوق السعودي'],
      delivered: 'مشاريع تم تسليمها',
      supported: 'شركات تم دعمها',
      impactTag: 'تأثير عالي'
    },
    techStack: {
      tag: 'مجموعتنا التقنية',
      title: 'هندسة قابلة للتوسع',
      desc: 'نحن نعمل مع تقنيات مجربة وقابلة للتطوير موثوقة من قبل الشركات الحديثة في جميع أنحاء العالم.'
    },
    faq: {
      tag: 'الأسئلة الشائعة',
      title: 'أسئلة شائعة',
      items: [
        { q: "كم يستغرق المشروع المعتاد؟", a: "تعتمد الجداول الزمنية على النطاق. تستغرق معظم المواقع من 3 إلى 6 أسابيع، بينما تتبع التطبيقات والمنصات مراحل منظمة." },
        { q: "هل تعملون فقط مع الشركات السعودية؟", a: "تركيزنا الأساسي هو المملكة العربية السعودية، لكننا نتبع أفضل الممارسات العالمية ونعمل مع المبدعين الدوليين." },
        { q: "هل سيكون مشروعي قابلاً للتطوير؟", a: "نعم. يتم بناء جميع الحلول مع مراعاة النمو المستقبلي، باستخدام مجموعات تقنية حديثة وقابلة للتكيف." },
        { q: "هل تقدمون الدعم بعد الإطلاق؟", a: "نعم، نحن نقدم دعم ما بعد الإطلاق والمساعدة المستمرة عند الحاجة لضمان عمل منصتك بشكل مثالي." }
      ]
    },
    cta: {
      tag: "دعونا نبني",
      title: 'هل أنت جاهز لبدء مشروعك؟',
      desc: 'تحدث مباشرة مع فريقنا واحصل على إجابات واضحة - لا ضغوط، لا غموض. نحن نستجيب بسرعة ونوجهك خطوة بخطوة عبر المشهد الرقمي بالكامل.',
      whatsapp: 'تواصل معنا عبر واتساب'
    },
    footer: {
      desc: 'بناء مستقبل الأصول الرقمية في المملكة العربية السعودية بهندسة برمجية قابلة للتطوير على مستوى المؤسسات.',
      mail: 'info@nexaartech.com',
      newsletter: {
        title: 'ابق في الطليعة',
        desc: 'احصل على رؤى الخبراء حول المشهد التقني في السعودية والتحول الرقمي.',
        placeholder: 'أدخل بريدك الإلكتروني',
        button: 'اشترك',
        success: 'مرحباً بك في دائرتنا الخاصة!',
      },
      links: {
        services: 'الخدمات',
        explore: 'استكشف',
        connect: 'تواصل معنا'
      },
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة',
      rights: 'نكسار تك. جميع الحقوق محفوظة.',
      location: 'الرياض، المملكة العربية السعودية',
    },
    legal: {
      contactNote: 'لديك أسئلة بخصوص {title}؟ تواصل معنا عبر {email}',
      privacy: {
        title: 'سياسة الخصوصية',
        lastUpdated: '22 أبريل 2025',
        sections: [
          {
            title: 'المعلومات التي نجمعها',
            content: [
              'نحن نجمع فقط المعلومات الضرورية للرد على استفساراتك وتقديم خدماتنا:',
              'الاسم — لتحديد هويتك ومخاطبتك بشكل صحيح',
              'عنوان البريد الإلكتروني — للتواصل معك بشأن مشروعك أو استفسارك أو حسابك',
              'نحن لا نجمع أرقام بطاقات الدفع، أو الهويات الحكومية، أو كلمات المرور، أو أي بيانات شخصية حساسة ما لم يتم ذكر ذلك صراحة وقت الجمع.'
            ]
          },
          {
            title: 'كيفية استخدام معلوماتك',
            content: [
              'يتم استخدام اسمك وعنوان بريدك الإلكتروني فقط للأغراض التالية:',
              'للرد على طلبات نماذج الاتصال والاستفسارات',
              'لإبلاغك بالتحديثات أو المقترحات أو المخرجات المتعلقة بمشروعك',
              'لإدارة علاقتنا التجارية معك',
              'لإرسال إشعارات مهمة حول التغييرات في خدماتنا أو سياساتنا',
              'لن نستخدم معلوماتك أبداً لإرسال رسائل بريد إلكتروني تسويقية غير مرغوب فيها، ولن نبيع أو نتاجر ببياناتك الشخصية مع أي طرف ثالث.'
            ]
          },
          {
            title: 'الأساس القانوني للمعالجة',
            content: [
              'نقوم بمعالجة بياناتك الشخصية بناءً على موافقتك (عندما ترسل نموذج اتصال أو تسجل في منصتنا) وبناءً على المصالح المشروعة في تشغيل أعمالنا وتقديم الخدمات التي طلبتها.'
            ]
          },
          {
            title: 'تخزين البيانات وأمنها',
            content: [
              'يتم تخزين بياناتك بشكل آمن على بنية تحتية سحابية متوافقة مع معايير الصناعة. نحن نطبق تدابير تقنية وتنظيمية معقولة لحماية معلوماتك من الوصول غير المصرح به أو الفقدان أو الكشف. يقتصر الوصول إلى البيانات الشخصية على أعضاء الفريق الذين يحتاجون إليها لتنفيذ مشروعك.',
              'نحتفظ ببياناتك فقط للفترة الضرورية للغرض الذي جمعت من أجله، أو حسب ما يقتضيه القانون المعمول به.'
            ]
          },
          {
            title: 'المشاركة مع أطراف ثالثة',
            content: [
              'نحن لا نبيع أو نؤجر أو نشارك معلوماتك الشخصية مع أطراف ثالثة لأغراض التسويق الخاصة بهم. قد نشارك البيانات مع مزودي الخدمة الموثوق بهم (مثل استضافة السحاب، توصيل البريد الإلكتروني) فقط بالقدر المطلوب لتشغيل خدماتنا. جميع هؤلاء المزودين ملزمون بالتزامات حماية البيانات المناسبة.',
              'قد يحتوي موقعنا على روابط لمواقع خارجية. نحن لسنا مسؤولين عن ممارسات الخصوصية لتلك المواقع ونشجعك على مراجعة سياساتها.'
            ]
          },
          {
            title: 'ملفات تعريف الارتباط والتحليلات',
            content: [
              'قد يستخدم موقعنا أدوات تحليل قياسية (مثل Google Analytics) لفهم كيفية تفاعل الزوار مع موقعنا. قد تجمع هذه الأدوات بيانات استخدام مجهولة المصدر عبر ملفات تعريف الارتباط. يمكنك تعطيل ملفات تعريف الارتباط في إعدادات متصفحك؛ لن يؤثر ذلك على قدرتك على استخدام موقعنا الأساسي.'
            ]
          },
          {
            title: 'حقوقك',
            content: [
              'بناءً على موقعك، قد يكون لك الحق في:',
              'الوصول إلى البيانات الشخصية التي نحتفظ بها عنك',
              'طلب تصحيح البيانات غير الدقيقة',
              'طلب حذف بياناتك',
              'سحب موافقتك في أي وقت',
              'الاعتراض على أو تقييد بعض أنشطة المعالجة',
              'لممارسة أي من هذه الحقوق، يرجى الاتصال بنا على legal@nexaartech.com. سنرد خلال إطار زمني معقول.'
            ]
          },
          {
            title: 'التغييرات في هذه السياسة',
            content: [
              'قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. عندما نفعل ذلك، سنقوم بمراجعة تاريخ السريان في أعلى هذه الصفحة. استمرار استخدام موقعنا أو خدماتنا بعد أي تغييرات يشكل قبولك للسياسة المحدثة.'
            ]
          },
          {
            title: 'اتصل بنا',
            content: [
              'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا:',
              'البريد الإلكتروني: legal@nexaartech.com',
              'الموقع الإلكتروني: https://nexaartech.com',
              'العنوان: الرياض، المملكة العربية السعودية'
            ]
          }
        ]
      },
      terms: {
        title: 'شروط الخدمة',
        lastUpdated: '22 أبريل 2025',
        sections: [
          {
            title: 'عن نكسار تك',
            content: [
              'نكسار تك هي وكالة تطوير تقني مقرها الرياض، المملكة العربية السعودية. نحن متخصصون في تطوير المنتجات الرقمية الشاملة — بما في ذلك تطبيقات الويب وتطبيقات الجوال واستراتيجية التكنولوجيا — في المقام الأول لرواد الأعمال والشركات الناشئة في مراحلها المبكرة في منظومة الأعمال السعودية.'
            ]
          },
          {
            title: 'قبول الشروط',
            content: [
              'من خلال تقديم استفسار، أو التوقيع على اقتراح، أو الوصول إلى أي جزء من موقعنا أو بوابة العملاء الخاصة بنا، فإنك تؤكد أنك قرأت وفهمت ووافقت على هذه الشروط. إذا كنت تدخل في هذه الشروط نيابة عن شركة أو منظمة، فإنك تقر بأن لديك السلطة لإلزام هذا الكيان.'
            ]
          },
          {
            title: 'خدماتنا',
            content: [
              'تقدم نكسار تك الفئات التالية من الخدمات:',
              'تصميم وتطوير تطبيقات الويب والجوال',
              'الاستشارات التقنية واستراتيجية المنتج',
              'الوصول إلى بوابات العملاء، لوحات التحكم الخاصة بالمشاريع، والمنصات ذات الصلة التي تديرها نكسار تك',
              'يتم الاتفاق على المخرجات المحددة، الجداول الزمنية، الأسعار، ونطاق المشروع بشكل منفصل في مقترحات مكتوبة أو اتفاقيات خدمة بين نكسار تك والعميل. في حال حدوث أي تعارض بين هذه الشروط واتفاقية محددة، تسود الاتفاقية المحددة.'
            ]
          },
          {
            title: 'مسؤولياتك',
            content: [
              'عند استخدام خدماتنا أو موقعنا الإلكتروني، فإنك توافق على:',
              'تقديم معلومات دقيقة ومحدثة عند طلبها',
              'استخدام موقعنا وخدماتنا لأغراض قانونية فقط',
              'عدم محاولة تعطيل أو اختراق أو الوصول غير المصرح به إلى أنظمتنا',
              'عدم نسخ أو عكس هندسة أو إعادة إنتاج أي جزء من موقعنا أو منصاتنا دون إذن كتابي',
              'التعاون المعقول مع فريقنا لتمكين التسليم في الوقت المحدد للخدمات المتفق عليها'
            ]
          },
          {
            title: 'الملكية الفكرية',
            content: [
              'ما لم يتم الاتفاق على خلاف ذلك كتابةً، فإن جميع المحتويات الموجودة على موقع نكسار تك — بما في ذلك النصوص والرسومات والشعارات والأكواد — هي ملك لنكسار تك ومحمية بموجب قوانين الملكية الفكرية المعمول بها.',
              'ستكون حقوق الملكية الفكرية في المخرجات التي تم إنشاؤها خصيصاً لمشروع العميل كما هو محدد في اتفاقية المشروع ذات الصلة. في حال عدم وجود اتفاقية، تظل الملكية لنكسار تك حتى يتم استلام المبلغ بالكامل.'
            ]
          },
          {
            title: 'تحديد المسؤولية',
            content: [
              'إلى أقصى حد يسمح به القانون، لا تتحمل نكسار تك المسؤولية عن أي أضرار غير مباشرة أو عرضية أو تبعية أو عقابية تنشأ عن استخدامك لموقعنا أو خدماتنا، بما في ذلك على سبيل المثال لا الحصر فقدان الأرباح أو فقدان البيانات أو انقطاع الأعمال.',
              'لن تتجاوز مسؤوليتنا الإجمالية تجاهك فيما يتعلق بأي مطالبة المبلغ الذي دفعته لنكسار تك في الأشهر الثلاثة السابقة للحدث الذي أدى إلى المطالبة.'
            ]
          },
          {
            title: 'إخلاء المسؤولية عن الضمانات',
            content: [
              'يتم تقديم موقعنا وخدماتنا "كما هي" و "كما هي متوفرة" دون ضمانات من أي نوع، سواء كانت صريحة أو ضمنية. نحن لا نضمن أن موقعنا سيكون دون انقطاع، أو خالياً من الأخطاء، أو خالياً من الفيروسات أو المكونات الضارة الأخرى.'
            ]
          },
          {
            title: 'القانون الحاكم',
            content: [
              'تخضع هذه الشروط وتفسر وفقاً لقوانين المملكة العربية السعودية. أي نزاعات تنشأ عن أو تتعلق بهذه الشروط تخضع للولاية القضائية الحصرية لمحاكم الرياض، المملكة العربية السعودية.'
            ]
          },
          {
            title: 'التغييرات في هذه الشروط',
            content: [
              'نحتفظ بالحق في تحديث أو تعديل هذه الشروط في أي وقت. ستكون التغييرات فعالة عند نشرها على موقعنا مع تاريخ سريان مراجع. استمرار استخدامك لخدماتنا بعد أي من هذه التغييرات يشكل قبولك للشروط الجديدة.'
            ]
          },
          {
            title: 'الإنهاء',
            content: [
              'نحتفظ بالحق في تعليق أو إنهاء الوصول إلى خدماتنا أو موقعنا وفقاً لتقديرنا إذا اعتقدنا أنك انتهكت هذه الشروط أو القانون المعمول به. الأقسام المتعلقة بالملكية الفكرية والمسؤولية والقانون الحاكم ستظل سارية بعد الإنهاء.'
            ]
          },
          {
            title: 'اتصل بنا',
            content: [
              'لأي أسئلة أو استفسارات حول هذه الشروط، يرجى الاتصال بنا:',
              'البريد الإلكتروني: legal@nexaartech.com',
              'الموقع الإلكتروني: https://nexaartech.com',
              'العنوان: الرياض، المملكة العربية السعودية'
            ]
          }
        ]
      }
    },
    marquee: {
      ribbon1: 'تكنولوجيا موثوقة / وضوح في الكود / تنفيذ قابل للتوسع / مستعد للمستقبل / بني للسعودية / يركز على المشاريع الصغيرة والمتوسطة / فكر للمستقبل / تميز رقمي',
      ribbon2: 'تكنولوجيا موثوقة / وضوح في الكود / تنفيذ قابل للتوسع / مستعد للمستقبل / بني للسعودية / يركز على المشاريع الصغيرة والمتوسطة / فكر للمستقبل / تميز رقمي'
    }
  }
};
