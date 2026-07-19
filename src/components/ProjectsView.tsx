import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Globe, Smartphone, Palette, Database, Laptop, 
  ArrowRight, CheckCircle2, DollarSign, Clock 
} from 'lucide-react';

interface ProjectsViewProps {
  theme?: 'dark' | 'light';
  onNavigate?: (view: 'home' | 'about' | 'services' | 'pricing' | 'projects' | 'portfolio' | 'testimonials' | 'process' | 'faq' | 'contact') => void;
}

interface ServiceShowcase {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  techStack: string[];
  startingPrice: string;
  deliveryTime: string;
}

export default function ProjectsView({ theme, onNavigate }: ProjectsViewProps) {
  const isDark = theme !== 'light';

  const showcaseServices: ServiceShowcase[] = [
    {
      id: 'web-dev',
      title: 'Website Development',
      category: 'Web Applications',
      icon: <Globe className={isDark ? 'text-blue-400' : 'text-blue-600'} size={22} />,
      description: 'High-performance modern websites and single-page applications engineered for lightning-fast loads, robust responsive flows, and complete SEO compliance.',
      features: [
        'Fluid responsive structures for all devices',
        'Performance optimization (High Lighthouse scores)',
        'Semantic on-page SEO structured architecture',
        'Secure custom contact form pipelines',
        'Interactive charts & motion graphics'
      ],
      techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'motion'],
      startingPrice: '₹1,499',
      deliveryTime: '4-7 Days'
    },
    {
      id: 'android-dev',
      title: 'Android App Development',
      category: 'Mobile Apps',
      icon: <Smartphone className={isDark ? 'text-blue-400' : 'text-blue-600'} size={22} />,
      description: 'Native high-fidelity Android experiences styled with Material Design 3 guidelines, leveraging fast offline-first local caching layers and secure biometrics.',
      features: [
        'Beautiful Material Design 3 user interfaces',
        'Robust offline-first databases with Room DB',
        'Efficient background sync & push notifications',
        'Secure local file system & Keystore systems',
        'Ready-to-publish APK and AAB bundle builds'
      ],
      techStack: ['Kotlin', 'Jetpack Compose', 'Room DB', 'Retrofit', 'Coroutines'],
      startingPrice: '₹3,999',
      deliveryTime: '10-14 Days'
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      category: 'Creative Design',
      icon: <Palette className={isDark ? 'text-blue-400' : 'text-blue-600'} size={22} />,
      description: 'Stunning premium interfaces centered on generous negative space, beautiful typography hierarchies, clean contrast, and interactive wireframes.',
      features: [
        'Comprehensive high-fidelity Figma files',
        'Complete interactive wireframe clickable prototypes',
        'Pixel-perfect grid layouts & touch target sizing',
        'Custom clean SVG icon assets & color palettes',
        'Comprehensive developer style token guides'
      ],
      techStack: ['Figma', 'Adobe Illustrator', 'Custom SVGs', 'Style Tokens'],
      startingPrice: '₹1,999',
      deliveryTime: '3-5 Days'
    },
    {
      id: 'firebase-int',
      title: 'Firebase Integration',
      category: 'Cloud Services',
      icon: <Database className={isDark ? 'text-blue-400' : 'text-blue-600'} size={22} />,
      description: 'Seamless cloud databases, persistent cloud object storage, secure social/passwordless sign-in gates, and zero-compromise firestore rules.',
      features: [
        'Google, Email, & Passwordless verification gateways',
        'Highly optimized Firestore schema structures',
        'Strict Firestore Security Rules ensuring zero leaks',
        'Real-time data listener subscriptions & caching',
        'Cloud Storage buckets for user assets'
      ],
      techStack: ['Firebase Auth', 'Firestore', 'Cloud Storage', 'Rules Guard'],
      startingPrice: '₹1,999',
      deliveryTime: '3-5 Days'
    },
    {
      id: 'custom-solutions',
      title: 'Custom Business Solutions',
      category: 'Full-Stack Systems',
      icon: <Laptop className={isDark ? 'text-blue-400' : 'text-blue-600'} size={22} />,
      description: 'Tailor-made backend services, management control desks, deal dashboards, secure internal API proxy hubs, and automatic cron schedulers.',
      features: [
        'Custom interactive administrative dashboards',
        'Secure API route managers & request proxy guards',
        'Robust background tasks & recurring cron routines',
        'CSV/Excel bulk data importers & exporters',
        'Fine-grained role-based dashboard access controls'
      ],
      techStack: ['Node.js', 'Express', 'PostgreSQL', 'REST APIs', 'Recharts'],
      startingPrice: '₹6,999',
      deliveryTime: '10-15 Days'
    }
  ];

  const handleInquire = (serviceTitle: string, startingPrice: string) => {
    try {
      localStorage.setItem('sk_selected_project_type', serviceTitle);
      localStorage.setItem('sk_selected_project_budget', startingPrice);
    } catch (e) {
      console.warn('LocalStorage blocked:', e);
    }
    if (onNavigate) {
      onNavigate('hire' as any);
    } else {
      window.location.hash = '#/hire';
    }
  };

  return (
    <div className="space-y-16 pb-20 select-none text-left">
      {/* Premium Header */}
      <section className="relative">
        <div className="absolute -top-12 -left-6 w-32 h-32 ambient-glow-blue opacity-50 pointer-events-none" />
        <div className="space-y-4 max-w-2xl text-left">
          <span className={`font-mono text-xs ${isDark ? 'text-blue-400' : 'text-blue-600'} font-bold tracking-[0.3em] uppercase block`}>
            Professional Services
          </span>
          <h1 className={`font-display text-3xl sm:text-4xl font-bold tracking-tight uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Service Showcases
          </h1>
          <div className="h-[2px] w-16 bg-blue-600 mt-4 rounded-full" />
          <p className={`font-sans ${isDark ? 'text-slate-400' : 'text-slate-600'} text-xs sm:text-sm leading-relaxed pt-2`}>
            Explore a detailed breakdown of the bespoke services I provide to help grow your business. Each card outlines real-world workflows, precise tech stacks, and professional deliverables.
          </p>
        </div>
      </section>

      {/* Grid of Real Services */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {showcaseServices.map((srv, idx) => (
          <motion.div
            key={srv.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className={`rounded-2xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${
              isDark 
                ? 'bg-[#161920] border-white/[0.06] hover:border-blue-500/20 shadow-xl'
                : 'bg-white border-slate-200 hover:border-blue-500/35 shadow-sm hover:shadow-md'
            }`}
          >
            {/* Soft Ambient Spark behind icons */}
            <div className="absolute top-0 right-0 w-32 h-32 ambient-glow-blue opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity" />

            <div className="space-y-6 relative z-10">
              {/* Top Row: Icon & Tag */}
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl border ${
                  isDark ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-slate-100 border-slate-200'
                }`}>
                  {srv.icon}
                </div>
                <span className={`font-mono text-[9px] font-bold tracking-widest px-3 py-1 rounded-full uppercase border ${
                  isDark 
                    ? 'text-blue-400 bg-slate-950/80 border-blue-500/20' 
                    : 'text-blue-700 bg-blue-50 border-blue-200'
                }`}>
                  {srv.category}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className={`font-display text-lg sm:text-xl font-bold uppercase tracking-wide ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {srv.title}
                </h3>
                <p className={`font-sans text-xs sm:text-sm leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-slate-650'
                }`}>
                  {srv.description}
                </p>
              </div>

              {/* Deliverables Checklist */}
              <div className="space-y-3 pt-2">
                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block font-bold">// INCLUDED DELIVERABLES</span>
                <ul className="space-y-2 text-xs font-sans text-left">
                  {srv.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 size={14} className="text-blue-500 shrink-0 mt-0.5" />
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack Used */}
              <div className="space-y-2 pt-2">
                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block font-bold">// TECHNOLOGY STACK</span>
                <div className="flex flex-wrap gap-1.5">
                  {srv.techStack.map((tech) => (
                    <span key={tech} className={`font-mono text-[8px] border px-2.5 py-1 rounded-md uppercase font-bold ${
                      isDark 
                        ? 'text-slate-300 bg-slate-950/60 border-white/[0.06]' 
                        : 'text-slate-700 bg-slate-100 border-slate-200'
                    }`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row: Specs & Actions */}
            <div className={`mt-8 pt-5 border-t flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 ${
              isDark ? 'border-white/[0.04]' : 'border-slate-100'
            }`}>
              <div className="flex items-center gap-6 self-start sm:self-auto font-mono text-[10px]">
                <div className="space-y-0.5">
                  <span className="text-slate-500 uppercase block text-[8px]">Starting Price</span>
                  <div className="flex items-center gap-0.5 font-display font-bold">
                    <span className={isDark ? 'text-white' : 'text-slate-900'}>{srv.startingPrice}</span>
                  </div>
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-500 uppercase block text-[8px]">Est. Delivery</span>
                  <div className="flex items-center gap-1 font-bold">
                    <Clock size={11} className="text-blue-500" />
                    <span className={isDark ? 'text-white' : 'text-slate-800'}>{srv.deliveryTime}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleInquire(srv.title, srv.startingPrice)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-mono text-[9px] font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-blue-500/10"
              >
                Inquire Service
                <ArrowRight size={11} />
              </button>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
