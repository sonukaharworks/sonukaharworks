import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Smartphone, Globe, Palette, ShieldCheck, Database, 
  Sparkles, ArrowRight, RotateCw, ExternalLink 
} from 'lucide-react';

interface ServicesViewProps {
  theme: 'dark' | 'light';
  onNavigate?: (view: 'home' | 'about' | 'services' | 'skills' | 'projects' | 'portfolio' | 'experience' | 'contact') => void;
  onSelectService?: (id: 'web-dev' | 'android-dev') => void;
  onSelectPackageDetail?: (name: string, price: string) => void;
}

export default function ServicesView({ theme, onNavigate, onSelectService, onSelectPackageDetail }: ServicesViewProps) {
  const isDark = theme === 'dark';
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSelectPackage = (projectType: string, budget: string) => {
    if (onSelectPackageDetail) {
      onSelectPackageDetail(projectType, budget);
    } else {
      try {
        localStorage.setItem('sk_selected_project_type', projectType);
        localStorage.setItem('sk_selected_project_budget', budget);
      } catch (e) {
        console.warn('LocalStorage blocked:', e);
      }
      if (onNavigate) {
        onNavigate('hire' as any);
      } else {
        window.location.hash = '#/hire';
      }
    }
  };

  const coreServices = [
    {
      id: 'android-dev',
      title: 'Android App Development',
      icon: <Smartphone className={isDark ? 'text-blue-400' : 'text-blue-600'} size={24} />,
      shortDesc: 'Native high-performance mobile architectures crafted in Kotlin, XML layouts, and Jetpack Compose.',
      startingPrice: '₹3,999',
      features: [
        'Sleek Modern UI/UX',
        'Firebase Cloud Integration',
        'Full APK / AAB Bundle build',
        'Offline Room DB Cache',
        'Secure Android Keystore'
      ],
      deliveryTime: '7-14 Days',
      hasDetails: true
    },
    {
      id: 'web-dev',
      title: 'Website Development',
      icon: <Globe className={isDark ? 'text-purple-400' : 'text-purple-600'} size={24} />,
      shortDesc: 'High-speed glassmorphic websites built in React and Tailwind CSS for outstanding speed and responsiveness.',
      startingPrice: '₹1,499',
      features: [
        'Fully Responsive Design',
        'Performance Optimization',
        'Secure Client Contact Form',
        'Basic On-Page SEO Routing',
        'Modern Floating Effects'
      ],
      deliveryTime: '3-7 Days',
      hasDetails: true
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      icon: <Palette className={isDark ? 'text-indigo-400' : 'text-indigo-600'} size={24} />,
      shortDesc: 'Stunning luxury interfaces styled with elegant typography, rich dark gradients, and balanced negative space.',
      startingPrice: '₹999',
      features: [
        'Luxury Visual Theme Design',
        'Figma / Interactive Mockups',
        'Touch-Target Optimizations',
        'Custom SVG Asset Sets',
        'Style System Coordination'
      ],
      deliveryTime: '2-5 Days',
      hasDetails: false
    },
    {
      id: 'firebase-int',
      title: 'Firebase Integration',
      icon: <ShieldCheck className={isDark ? 'text-emerald-400' : 'text-emerald-600'} size={24} />,
      shortDesc: 'Cloud authentication gateways, lightning-fast Firestore sync, and secure serverside routing configurations.',
      startingPrice: '₹1,999',
      features: [
        'Google Auth / Passwordless',
        'Firestore Schema blueprint',
        'Rigid Firestore Security Rules',
        'Cloud Storage Bucket setup',
        'Real-time Listener triggers'
      ],
      deliveryTime: '2-4 Days',
      hasDetails: false
    },
    {
      id: 'custom-proj',
      title: 'Custom Projects',
      icon: <Database className={isDark ? 'text-pink-400' : 'text-pink-600'} size={24} />,
      shortDesc: 'Bespoke high-fidelity applications, automated business solutions, and admin panels styled to perfection.',
      startingPrice: 'Contact Me',
      features: [
        'Tailored System Architecture',
        'Custom Cloud Integrations',
        'Admin Monitoring Dashboards',
        'Bulk Data Loaders / APIs',
        'Premium Typography Systems'
      ],
      deliveryTime: 'Flexible Scoping',
      hasDetails: false
    }
  ];

  const pricingPackages = [
    {
      name: 'Starter Website',
      price: '₹1,499',
      features: [
        'Responsive Design',
        'Fast Loading',
        'Contact Form',
        'Basic SEO'
      ],
      btnText: 'GET STARTED',
      recommended: false
    },
    {
      name: 'Business Website',
      price: '₹2,999',
      features: [
        'Premium UI',
        'Multiple Pages',
        'Mobile Optimized',
        'Admin Support',
        'Fast Performance'
      ],
      btnText: 'ORDER NOW',
      recommended: false
    },
    {
      name: 'Android App',
      badge: 'Basic App',
      price: '₹3,999',
      features: [
        'Modern UI',
        'Firebase Support',
        'APK Build',
        'Responsive'
      ],
      btnText: 'BUILD MY APP',
      recommended: false
    },
    {
      name: 'Premium App',
      price: '₹6,999',
      features: [
        'Premium Design',
        'Authentication',
        'Database',
        'Admin Dashboard',
        'Cloud Integration',
        'Performance Optimized'
      ],
      btnText: 'START PROJECT',
      recommended: true // ⭐ MOST POPULAR
    },
    {
      name: 'Custom Project',
      price: 'Contact Me',
      features: [
        'Custom Apps',
        'Custom Websites',
        'Business Solutions',
        'Portfolio Websites',
        'Admin Panels',
        'Firebase Projects'
      ],
      btnText: 'CONTACT NOW',
      recommended: false
    }
  ];

  const pricingRef = useRef<HTMLDivElement>(null);

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-24 pb-20 select-none text-left">
      
      {/* 1. Core Services Section */}
      <section className="space-y-12">
        <div className="space-y-4 max-w-2xl relative">
          <div className={`absolute -top-12 -left-6 w-32 h-32 ${isDark ? 'bg-blue-500/5' : 'bg-blue-500/10'} rounded-full blur-2xl pointer-events-none`} />
          <span className={`font-mono text-xs ${isDark ? 'text-blue-400' : 'text-blue-600'} font-extrabold tracking-[0.3em] uppercase block`}>
            // SPECIALIZED SERVICE CATALOG
          </span>
          <h1 className={`font-display text-3xl sm:text-4xl font-black tracking-tight uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
            EXPERTISE & SOLUTIONS
          </h1>
          <div className={`h-[2px] w-16 bg-gradient-to-r ${isDark ? 'from-blue-500 to-purple-500' : 'from-blue-600 to-indigo-600'} mt-4 rounded-full`} />
          <p className={`font-sans ${isDark ? 'text-slate-400' : 'text-slate-650'} text-xs sm:text-sm leading-relaxed pt-2`}>
            Explore premium developer services designed specifically for client workflows requiring gorgeous layouts, high-performance engines, and reliable cloud operations.
          </p>
        </div>

        {/* 3D Flip Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {coreServices.map((srv) => {
            const isFlipped = flippedCards[srv.id] || false;
            return (
              <div 
                key={srv.id}
                className="w-full h-80 perspective-1000 cursor-pointer group"
                onClick={() => toggleFlip(srv.id)}
              >
                <div 
                  className={`relative w-full h-full duration-700 preserve-3d transition-all ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  
                  {/* FRONT SIDE */}
                  <div className={`absolute inset-0 w-full h-full backface-hidden rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 ${
                    isDark 
                      ? 'bg-white/[0.01] border-white/[0.06] hover:border-blue-500/30 shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
                      : 'bg-white border-slate-200 hover:border-blue-500/45 shadow-sm'
                  }`}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-xl border transition-all ${
                          isDark ? 'bg-white/[0.03] border-white/[0.06] text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                        }`}>
                          {srv.icon}
                        </div>
                        <div className={`flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                          isDark ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-700'
                        }`}>
                          <RotateCw size={10} className={`animate-spin-slow ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                          Click to Flip
                        </div>
                      </div>

                      <h3 className={`font-display text-base font-black uppercase tracking-wide transition-colors ${
                        isDark ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'
                      }`}>
                        {srv.title}
                      </h3>
                      
                      <p className={`font-sans text-xs leading-relaxed ${isDark ? 'text-slate-450' : 'text-slate-600'}`}>
                        {srv.shortDesc}
                      </p>
                    </div>

                    <div className={`flex items-center justify-between border-t pt-4 mt-auto ${isDark ? 'border-white/[0.06]' : 'border-slate-100'}`}>
                      <span className="font-mono text-[9px] text-slate-500 uppercase tracking-wider">
                        Starting Price
                      </span>
                      <span className={`font-display font-black text-sm tracking-wide ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {srv.startingPrice}
                      </span>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl border p-6 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.6)] ${
                    isDark 
                      ? 'border-purple-500/30 bg-gradient-to-br from-[#0c051a] to-[#040108]' 
                      : 'border-purple-500/30 bg-gradient-to-br from-purple-50/50 to-indigo-50/50'
                  }`}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className={`font-mono text-[9px] font-bold uppercase tracking-widest ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                          INCLUDED FEATURES
                        </span>
                        <span className="font-mono text-[8px] text-slate-500 uppercase">
                          INFO FLIP
                        </span>
                      </div>

                      <ul className={`space-y-2 text-left text-xs font-sans font-light ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {srv.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isDark ? 'bg-purple-500' : 'bg-purple-600'}`} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`space-y-3.5 pt-3 border-t ${isDark ? 'border-white/[0.04]' : 'border-slate-200'}`}>
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-slate-500 uppercase">Est. Delivery</span>
                        <span className={`font-bold uppercase ${isDark ? 'text-white' : 'text-slate-800'}`}>{srv.deliveryTime}</span>
                      </div>
                      
                      {srv.hasDetails && onSelectService ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectService(srv.id as 'web-dev' | 'android-dev');
                          }}
                          className={`w-full py-2.5 rounded-xl font-mono text-[9px] font-black tracking-widest uppercase transition-all cursor-pointer flex items-center justify-center gap-1 ${
                            isDark 
                              ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-600 hover:text-white'
                              : 'bg-purple-100 border border-purple-300 text-purple-700 hover:bg-purple-600 hover:text-white shadow-sm'
                          }`}
                        >
                          VIEW DEDICATED DETAILS
                          <ExternalLink size={10} />
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectPackage(srv.title, srv.startingPrice);
                          }}
                          className={`w-full py-2.5 rounded-xl font-mono text-[9px] font-black tracking-widest uppercase transition-all cursor-pointer ${
                            isDark
                              ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-600 hover:text-white'
                              : 'bg-purple-100 border border-purple-300 text-purple-700 hover:bg-purple-600 hover:text-white shadow-sm'
                          }`}
                        >
                          {srv.id === 'custom-proj' ? 'CONTACT NOW' : 'START PROJECT'}
                        </button>
                      )}
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Promotional Banner */}
      <section className={`relative overflow-hidden rounded-3xl border p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md ${
        isDark 
          ? 'border-blue-500/20 bg-gradient-to-r from-blue-950/20 to-purple-950/20' 
          : 'border-blue-200 bg-gradient-to-r from-blue-50/50 to-indigo-50/50'
      }`}>
        <div className="space-y-2 text-center sm:text-left">
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase ${
            isDark ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-800'
          }`}>
            ✨ Limited Time Offer
          </span>
          <h2 className={`font-display font-black text-lg sm:text-xl uppercase tracking-wide ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Websites starting from ₹1,499 &middot; Apps from ₹3,999
          </h2>
          <p className={`text-[11px] font-sans max-w-md ${isDark ? 'text-slate-405' : 'text-slate-600'}`}>
            Deploy secure, lighting fast business platforms optimized perfectly for native devices and desktop interfaces.
          </p>
        </div>

        <button
          onClick={scrollToPricing}
          className={`shrink-0 px-6 py-3 rounded-full text-[9px] font-mono font-black tracking-widest uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
            isDark ? 'bg-white text-slate-950 hover:bg-slate-200' : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          VIEW PRICING
          <ArrowRight size={11} />
        </button>
      </section>

      {/* 3. Pricing Section */}
      <section ref={pricingRef} className="space-y-12 pt-4">
        <div className="space-y-4 max-w-2xl relative">
          <span className={`font-mono text-xs ${isDark ? 'text-purple-400' : 'text-purple-600'} font-extrabold tracking-[0.3em] uppercase block`}>
            // TRANSPARENT INVESTMENT PLANS
          </span>
          <h2 className={`font-display text-3xl sm:text-4xl font-black tracking-tight uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
            SERVICES & PRICING
          </h2>
          <div className={`h-[2px] w-16 bg-gradient-to-r ${isDark ? 'from-purple-500 to-indigo-500' : 'from-purple-600 to-indigo-650'} mt-4 rounded-full`} />
          <p className={`font-sans ${isDark ? 'text-slate-450' : 'text-slate-650'} text-xs sm:text-sm leading-relaxed pt-2`}>
            No unnecessary text or clutter. Clean, trustworthy pricing packages. Select a blueprint to view comprehensive package specs.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {pricingPackages.map((pkg) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={`relative overflow-hidden rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 ${
                isDark 
                  ? 'bg-white/[0.01] border-white/[0.06] hover:border-purple-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.6)]'
                  : 'bg-white border-slate-200 hover:border-purple-500/40 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] shadow-sm'
              } ${
                pkg.recommended && isDark ? 'border-purple-500/35 bg-gradient-to-b from-purple-950/10 to-indigo-950/5' : ''
              } ${
                pkg.recommended && !isDark ? 'border-purple-400 bg-purple-50/20' : ''
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-blue-600/5 via-transparent to-purple-600/5' : 'from-blue-600/[0.02] to-purple-600/[0.02]'} pointer-events-none`} />

              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between min-h-[22px]">
                  {pkg.recommended ? (
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[8px] font-black tracking-wider ${
                      isDark ? 'bg-purple-500/20 border border-purple-500/30 text-purple-300' : 'bg-purple-600 text-white'
                    }`}>
                      ⭐ MOST POPULAR
                    </span>
                  ) : (
                    <div />
                  )}
                </div>

                <h3 className={`font-display text-xs sm:text-sm font-black uppercase tracking-wide ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {pkg.name}
                </h3>

                <div className="pt-2">
                  <span className={`font-display text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {pkg.price}
                  </span>
                </div>
              </div>

              <ul className={`relative z-10 space-y-2.5 text-left text-[11.5px] font-sans font-light py-5 border-t border-b my-4 flex-grow ${
                isDark ? 'border-white/[0.04] text-slate-350' : 'border-slate-100 text-slate-655'
              }`}>
                {pkg.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className={`w-1 h-1 rounded-full shrink-0 mt-1.5 ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="relative z-10 pt-2">
                <button
                  onClick={() => handleSelectPackage(pkg.name, pkg.price)}
                  className={`w-full py-3 rounded-xl font-mono text-[9px] font-black tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                    pkg.recommended
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] border border-purple-500/30'
                      : isDark 
                        ? 'bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/30 hover:bg-blue-500/10 text-slate-300 hover:text-white'
                        : 'bg-slate-100 border border-slate-200/50 hover:border-blue-500/40 hover:bg-blue-50 text-slate-750 hover:text-blue-900'
                  }`}
                >
                  {pkg.btnText}
                </button>
              </div>

            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
