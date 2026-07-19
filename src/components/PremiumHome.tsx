import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Sparkles, RefreshCw, Activity, 
  Home, User, Layers, Cpu, Award, Image, Milestone, Mail,
  DollarSign, MessageSquare, TrendingUp, HelpCircle, MoreVertical,
  Sun, Moon, ShieldCheck, ArrowLeft, Lock, Globe, Info
} from 'lucide-react';

// Import our modular sub-views
import HomeView from './HomeView';
import AboutView from './AboutView';
import ServicesView from './ServicesView';
import SkillsView from './SkillsView';
import ProjectsView from './ProjectsView';
import PortfolioView from './PortfolioView';
import ExperienceView from './ExperienceView';
import ContactView from './ContactView';

// Additional premium views
import TestimonialsView from './TestimonialsView';
import ProcessView from './ProcessView';
import FAQView from './FAQView';
import PricingView from './PricingView';
import ProjectDetailsView from './ProjectDetailsView';
import ServiceDetailsView from './ServiceDetailsView';
import PackageDetailsView from './PackageDetailsView';
import HireView from './HireView';
import ThankYouView from './ThankYouView';
import { PROJECTS } from '../data';

import OwnerWorkspace from './OwnerWorkspace';
import { visitorLogService } from '../services/visitorLog';
import { auth, isFirebaseConfigured } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface PremiumHomeProps {
  // Empty props
}

type AppViewType = 
  | 'home' 
  | 'about' 
  | 'services' 
  | 'pricing' 
  | 'projects' 
  | 'portfolio' 
  | 'testimonials' 
  | 'process' 
  | 'faq' 
  | 'contact'
  | 'reviews'
  | 'hire'
  | 'thank-you'
  | 'project-details'
  | 'service-details'
  | 'package-details';

export default function PremiumHome({}: PremiumHomeProps) {
  const [activeView, setActiveView] = useState<AppViewType>('home');
  const [previousView, setPreviousView] = useState<AppViewType>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [threeDotOpen, setThreeDotOpen] = useState(false);
  const [clockTime, setClockTime] = useState('');
  
  // Custom states for detail sub-pages
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [selectedServiceId, setSelectedServiceId] = useState<'web-dev' | 'android-dev'>('web-dev');
  const [selectedPackageName, setSelectedPackageName] = useState<string>('');
  const [selectedPackagePrice, setSelectedPackagePrice] = useState<string>('');

  // Premium Theme Switcher state persistent to localStorage
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      return (localStorage.getItem('sk_portfolio_theme') as 'dark' | 'light') || 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  // Custom states for hidden Owner Workspace
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState(false);
  const [language, setLanguage] = useState<'en' | 'es'>(() => {
    try {
      return (localStorage.getItem('sk_portfolio_language') as 'en' | 'es') || 'en';
    } catch (e) {
      return 'en';
    }
  });
  const [aboutModalOpen, setAboutModalOpen] = useState(false);

  const threeDotRef = useRef<HTMLDivElement>(null);

  // Apply body background and theme attributes
  useEffect(() => {
    try {
      localStorage.setItem('sk_portfolio_theme', theme);
    } catch (e) {
      console.warn('LocalStorage blocked:', e);
    }

    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f9fafb';
      document.body.style.color = '#111827';
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.style.backgroundColor = '#0f1115';
      document.body.style.color = '#f3f4f6';
    }
  }, [theme]);

  // Synchronize dynamic UTC ticking clock for premium telemetry feel
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setClockTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Monitor Owner login status in realtime
  useEffect(() => {
    const checkBypass = () => {
      try {
        const bypass = localStorage.getItem('sk_admin_bypass_logged_in') === 'true';
        if (bypass) setIsOwnerLoggedIn(true);
      } catch (e) {}
    };

    if (!isFirebaseConfigured || !auth) {
      checkBypass();
      // Listen for local storage change events for seamless updates
      window.addEventListener('storage', checkBypass);
      return () => window.removeEventListener('storage', checkBypass);
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email === 'sonukahar2026@gmail.com') {
        setIsOwnerLoggedIn(true);
      } else {
        setIsOwnerLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Hash-based separate URL multi-page router with iframe safety
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash || hash === '#/') {
        setActiveView('home');
        return;
      }

      const cleanHash = hash.replace('#/', '');
      
      if (cleanHash.startsWith('project-details/')) {
        const projId = cleanHash.replace('project-details/', '');
        setSelectedProjectId(projId);
        setActiveView('project-details');
      } else if (cleanHash.startsWith('service-details/')) {
        const srvId = cleanHash.replace('service-details/', '') as 'web-dev' | 'android-dev';
        setSelectedServiceId(srvId);
        setActiveView('service-details');
      } else if (cleanHash.startsWith('package-details/')) {
        const content = cleanHash.replace('package-details/', '');
        const decoded = decodeURIComponent(content);
        const parts = decoded.split('|');
        if (parts.length >= 2) {
          setSelectedPackageName(parts[0]);
          setSelectedPackagePrice(parts[1]);
        }
        setActiveView('package-details');
      } else {
        const validViews: AppViewType[] = [
          'home', 'about', 'services', 'pricing', 'projects', 
          'portfolio', 'testimonials', 'process', 'faq', 'contact',
          'reviews', 'hire', 'thank-you'
        ];
        if (validViews.includes(cleanHash as any)) {
          setActiveView(cleanHash as any);
        } else {
          setActiveView('home');
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash dynamically when changing views internally
  const navigateToView = (view: any, details?: any) => {
    setPreviousView(activeView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);

    let targetView = view;
    if (view === 'skills' || view === 'experience') {
      targetView = 'about';
    }

    if (targetView === 'home') {
      window.location.hash = '#/';
    } else if (targetView === 'project-details' && details?.projectId) {
      window.location.hash = `#/project-details/${details.projectId}`;
    } else if (targetView === 'service-details' && details?.serviceId) {
      window.location.hash = `#/service-details/${details.serviceId}`;
    } else if (targetView === 'package-details' && details?.packageName) {
      const encoded = encodeURIComponent(`${details.packageName}|${details.packagePrice || ''}`);
      window.location.hash = `#/package-details/${encoded}`;
    } else {
      window.location.hash = `#/${targetView}`;
    }
  };

  // Close three-dot options menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (threeDotRef.current && !threeDotRef.current.contains(e.target as Node)) {
        setThreeDotOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Log page visits in realtime if visitor grants explicit permission
  useEffect(() => {
    if (visitorLogService.getConsentState() === 'granted') {
      visitorLogService.logVisit(activeView, null);
    }
  }, [activeView]);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: <Home size={12} /> },
    { id: 'services', label: 'Services', icon: <Layers size={12} /> },
    { id: 'projects', label: 'Projects', icon: <Award size={12} /> },
    { id: 'pricing', label: 'Pricing', icon: <DollarSign size={12} /> },
    { id: 'about', label: 'About', icon: <User size={12} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={12} /> },
  ];

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col justify-between selection:bg-blue-600/30 selection:text-white relative overflow-hidden font-sans transition-colors duration-300 ${
      isDark ? 'bg-[#0f1115] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Dynamic Premium Subtle Glows */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] blur-[150px] pointer-events-none z-0 ambient-glow-blue opacity-50" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] blur-[150px] pointer-events-none z-0 ambient-glow-purple opacity-30" />

      {/* ==========================================
          PREMIUM FLOATING GLASS NAVIGATION HEADER
          ========================================== */}
      <div className="sticky top-4 z-50 w-full max-w-7xl mx-auto px-4 sm:px-8">
        <header className={`w-full px-5 sm:px-6 py-3.5 rounded-2xl border backdrop-blur-xl shadow-xl flex items-center justify-between transition-all ${
          isDark 
            ? 'bg-[#161920]/80 border-white/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.3)]' 
            : 'bg-white/80 border-slate-200/80 shadow-[0_8px_32px_rgba(15,23,42,0.06)]'
        }`}>
          
          {/* Logo / Brand signature */}
          <div className="flex items-center gap-3">
            {/* If not on home page, show a premium back button */}
            {activeView !== 'home' && (
              <button
                onClick={() => window.history.back()}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[9px] font-black tracking-widest uppercase transition-all cursor-pointer border ${
                  isDark
                    ? 'bg-white/[0.02] border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.05]'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                }`}
                title="Return to previous view"
              >
                <ArrowLeft size={10} />
                BACK
              </button>
            )}

            <button
              onClick={() => {
                navigateToView('home');
              }}
              className="flex items-center gap-3.5 group cursor-pointer focus:outline-none"
            >
              <div className="relative">
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center relative z-10 shadow-sm transition-transform group-hover:rotate-6 ${
                  isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
                }`}>
                  <span className={`font-display font-bold text-xs tracking-wider ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>SK</span>
                </div>
              </div>
              <div className="text-left font-display hidden sm:block">
                <span className={`font-bold text-xs tracking-[0.25em] block uppercase transition-colors ${
                  isDark ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'
                }`}>SONU KAHAR</span>
                <span className={`text-[7.5px] font-medium tracking-widest block uppercase ${isDark ? 'text-blue-450' : 'text-blue-600'}`}>Software Engineer</span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links - Pill list */}
          <nav className={`hidden xl:flex items-center gap-0.5 border px-1.5 py-1 rounded-xl ${
            isDark ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-slate-100/50 border-slate-200'
          }`}>
            {navigationItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateToView(item.id as any)}
                  className={`relative px-3.5 py-1.5 rounded-lg font-mono text-[8.5px] font-black tracking-widest uppercase transition-all cursor-pointer flex items-center gap-1 ${
                    isActive 
                      ? isDark 
                        ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20' 
                        : 'text-blue-700 bg-blue-100/70 border border-blue-200'
                      : isDark
                        ? 'text-slate-400 hover:text-white border border-transparent'
                        : 'text-slate-600 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  {item.icon}
                  {item.label}
                  {isActive && (
                    <motion.span 
                      layoutId="activeGlowLine" 
                      className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full ${
                        isDark ? 'bg-blue-500' : 'bg-blue-600'
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header Panel: Standalone Toggle, Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Simple Elegant Indicator */}
            <div className="hidden lg:flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-wider uppercase mr-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>AVAILABLE FOR WORK</span>
            </div>

            {/* Premium Theme Toggle */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`p-2.5 border rounded-xl cursor-pointer transition-all ${
                isDark 
                  ? 'bg-[#1e222b]/60 border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.05]' 
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-blue-600" />}
            </button>

            {/* Three-dot dropdown menu */}
            <div className="relative" ref={threeDotRef}>
              <button
                onClick={() => setThreeDotOpen(!threeDotOpen)}
                className={`p-2.5 border rounded-xl cursor-pointer transition-all ${
                  isDark 
                    ? 'bg-slate-950/80 border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.05]' 
                    : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="More Options"
              >
                <MoreVertical size={14} />
              </button>

              <AnimatePresence>
                {threeDotOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className={`absolute right-0 mt-2.5 w-48 rounded-xl border p-2.5 shadow-2xl z-50 text-left ${
                      isDark 
                        ? 'bg-slate-950 border-white/[0.08] text-white shadow-[0_10px_40px_rgba(0,0,0,0.8)]' 
                        : 'bg-white border-slate-250 text-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.1)]'
                    }`}
                  >
                    <div className={`px-2.5 pb-1.5 mb-1.5 border-b font-mono text-[7px] tracking-wider uppercase font-bold ${
                      isDark ? 'border-white/5 text-slate-500' : 'border-slate-100 text-slate-400'
                    }`}>
                      {language === 'en' ? 'Actions' : 'Acciones'}
                    </div>

                    {/* Toggle Light/Dark Theme */}
                    <button
                      onClick={() => {
                        setTheme(isDark ? 'light' : 'dark');
                        setThreeDotOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[9px] font-mono font-black tracking-widest uppercase text-left cursor-pointer transition-all ${
                        isDark 
                          ? 'hover:bg-white/5 text-slate-300 hover:text-white' 
                          : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
                      }`}
                    >
                      {isDark ? (
                        <>
                          <Sun size={12} className="text-amber-400" />
                          {language === 'en' ? 'LIGHT MODE' : 'MODO CLARO'}
                        </>
                      ) : (
                        <>
                          <Moon size={12} className="text-blue-600" />
                          {language === 'en' ? 'DARK MODE' : 'MODO OSCURO'}
                        </>
                      )}
                    </button>

                    {/* Toggle Language Option */}
                    <button
                      onClick={() => {
                        const nextLang = language === 'en' ? 'es' : 'en';
                        setLanguage(nextLang);
                        try { localStorage.setItem('sk_portfolio_language', nextLang); } catch (e) {}
                        setThreeDotOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[9px] font-mono font-black tracking-widest uppercase text-left cursor-pointer transition-all ${
                        isDark 
                          ? 'hover:bg-white/5 text-slate-300 hover:text-white' 
                          : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
                      }`}
                    >
                      <Globe size={12} className="text-blue-450 animate-pulse" />
                      {language === 'en' ? 'LANG: ESPAÑOL' : 'IDIOMA: ENGLISH'}
                    </button>

                    {/* About Website Option */}
                    <button
                      onClick={() => {
                        setAboutModalOpen(true);
                        setThreeDotOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[9px] font-mono font-black tracking-widest uppercase text-left cursor-pointer transition-all ${
                        isDark 
                          ? 'hover:bg-white/5 text-slate-300 hover:text-white' 
                          : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
                      }`}
                    >
                      <Info size={12} className="text-purple-400" />
                      {language === 'en' ? 'ABOUT WEBSITE' : 'SOBRE EL SITIO'}
                    </button>

                     {/* Control Center Workspace option inside three-dot menu */}
                     <button
                       onClick={() => {
                         setIsAdminOpen(true);
                         setThreeDotOpen(false);
                       }}
                       className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[9px] font-mono font-black tracking-widest uppercase text-left cursor-pointer border border-dashed mt-2 transition-all ${
                         isDark 
                           ? 'bg-blue-950/20 border-blue-500/30 text-blue-300 hover:bg-blue-900/30' 
                           : 'bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100'
                       }`}
                     >
                       <ShieldCheck size={12} className="text-blue-500" />
                       {language === 'en' ? 'CONTROL CENTER' : 'CENTRO DE CONTROL'}
                     </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`xl:hidden p-2.5 border rounded-xl cursor-pointer transition-all ${
                isDark 
                  ? 'bg-slate-950/80 border-white/10 text-slate-400 hover:text-white' 
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900'
              }`}
            >
              {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </header>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`absolute left-4 right-4 top-full mt-2 border rounded-2xl p-4 space-y-1.5 z-40 xl:hidden flex flex-col shadow-xl text-left ${
                isDark ? 'bg-slate-950/95 border-white/10' : 'bg-white/95 border-slate-200'
              }`}
            >
              <div className={`px-3 pb-1 border-b font-mono text-[7px] tracking-widest uppercase font-bold ${
                isDark ? 'border-white/5 text-slate-500' : 'border-slate-100 text-slate-400'
              }`}>
                Menu Directories
              </div>

              {navigationItems.map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateToView(item.id as any)}
                    className={`w-full py-2.5 rounded-xl text-left font-mono text-[9px] tracking-widest uppercase font-black flex items-center gap-3 px-4 border transition-all cursor-pointer ${
                      isActive 
                        ? isDark
                          ? 'bg-blue-500/10 border-blue-500/25 text-blue-400' 
                          : 'bg-blue-100 border-blue-200 text-blue-800'
                        : isDark
                          ? 'border-transparent text-slate-400 hover:bg-slate-900/60 hover:text-white'
                          : 'border-transparent text-slate-650 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =======================================================
          MAIN VIEWS CONTAINER (0.5s - 1.0s SMOOTH CINEMATIC TRANSITION)
          ======================================================= */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-16 relative z-10 flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 15, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.985 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            {activeView === 'home' && (
              <HomeView 
                theme={theme}
                onNavigate={(view) => navigateToView(view as any)} 
              />
            )}
            {activeView === 'about' && <AboutView theme={theme} />}
            
            {activeView === 'services' && (
              <ServicesView 
                theme={theme} 
                onNavigate={(view) => navigateToView(view)} 
                onSelectService={(id) => navigateToView('service-details', { serviceId: id })}
                onSelectPackageDetail={(name, price) => navigateToView('package-details', { packageName: name, packagePrice: price })}
              />
            )}
            
            {activeView === 'pricing' && (
              <PricingView 
                theme={theme} 
                onSelectPackage={(name, price) => navigateToView('package-details', { packageName: name, packagePrice: price })}
              />
            )}

            {activeView === 'projects' && (
              <ProjectsView 
                theme={theme}
                onNavigate={(view) => navigateToView(view)} 
              />
            )}

            {activeView === 'portfolio' && (
              <PortfolioView 
                theme={theme} 
                onSelectProject={(id) => navigateToView('project-details', { projectId: id })}
              />
            )}

            {activeView === 'testimonials' && (
              <TestimonialsView 
                theme={theme} 
              />
            )}

            {activeView === 'process' && (
              <ProcessView 
                theme={theme} 
              />
            )}

            {activeView === 'faq' && (
              <FAQView 
                theme={theme} 
              />
            )}

            {activeView === 'contact' && (
              <ContactView theme={theme} />
            )}

            {activeView === 'reviews' && (
              <TestimonialsView theme={theme} />
            )}

            {activeView === 'hire' && (
              <HireView theme={theme} />
            )}

            {activeView === 'thank-you' && (
              <ThankYouView theme={theme} />
            )}

            {/* Premium Detail Pages */}
            {activeView === 'project-details' && (
              <ProjectDetailsView 
                project={PROJECTS.find(p => p.id === selectedProjectId) || PROJECTS[0]} 
                theme={theme} 
                onBack={() => window.history.back()} 
                onInquire={(name) => {
                  try {
                    localStorage.setItem('sk_selected_project_type', `Bespoke Clone: ${name}`);
                  } catch (e) {}
                  navigateToView('hire');
                }}
              />
            )}

            {activeView === 'service-details' && (
              <ServiceDetailsView 
                serviceId={selectedServiceId} 
                theme={theme} 
                onBack={() => window.history.back()} 
                onInquire={(name) => {
                  try {
                    localStorage.setItem('sk_selected_project_type', `Bespoke Service: ${name}`);
                  } catch (e) {}
                  navigateToView('hire');
                }}
                onSelectProject={(id) => navigateToView('project-details', { projectId: id })}
              />
            )}

            {activeView === 'package-details' && (
              <PackageDetailsView 
                packageName={selectedPackageName} 
                packagePrice={selectedPackagePrice} 
                theme={theme} 
                onBack={() => window.history.back()} 
                onInquire={(name, price) => {
                  try {
                    localStorage.setItem('sk_selected_project_type', `Bespoke Package: ${name}`);
                    localStorage.setItem('sk_selected_project_budget', price);
                  } catch (e) {}
                  navigateToView('hire');
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ==========================================
          LUXURY MINIMAL FOOTER
          ========================================== */}
      <footer className={`w-full border-t py-12 px-4 sm:px-8 relative z-20 ${
        isDark ? 'border-white/[0.04] bg-[#05030e]/90' : 'border-slate-200 bg-white'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          {/* Brand info */}
          <div className="space-y-1">
            <div className={`font-display text-xs font-black tracking-widest uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
              SONU KAHAR
            </div>
            <p className={`text-[8.5px] font-mono tracking-widest uppercase ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              Software Development Workspace
            </p>
          </div>

          {/* Navigation Links inside footer */}
          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-[8.5px] font-black uppercase tracking-widest">
            <button onClick={() => navigateToView('home')} className={`cursor-pointer transition-colors ${isDark ? 'text-slate-500 hover:text-blue-400' : 'text-slate-550 hover:text-blue-600'}`}>HOME</button>
            <span className={isDark ? 'text-slate-700' : 'text-slate-300'}>•</span>
            <button onClick={() => navigateToView('portfolio')} className={`cursor-pointer transition-colors ${isDark ? 'text-slate-500 hover:text-blue-400' : 'text-slate-550 hover:text-blue-600'}`}>GALLERY</button>
            <span className={isDark ? 'text-slate-700' : 'text-slate-300'}>•</span>
            <button onClick={() => navigateToView('contact')} className={`cursor-pointer transition-colors ${isDark ? 'text-slate-500 hover:text-blue-400' : 'text-slate-550 hover:text-blue-600'}`}>CONTACT</button>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1.5">
            <span className={`font-mono text-[9px] font-black uppercase tracking-widest ${isDark ? 'text-slate-450' : 'text-slate-600'}`}>
              STUDIO WORKSPACE
            </span>
            <span className={`font-mono text-[8px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-550' : 'text-slate-450'}`}>
              Made with ❤️ by Sonu Kahar
            </span>
          </div>

        </div>
      </footer>

      {/* Secure Owner Workspace Full Screen Overlay */}
      <AnimatePresence>
        {isAdminOpen && (
          <OwnerWorkspace onClose={() => setIsAdminOpen(false)} />
        )}
      </AnimatePresence>

      {/* Elegant About Website Glassmorphism Modal */}
      <AnimatePresence>
        {aboutModalOpen && (
          <div className="fixed inset-0 z-50 bg-[#020108]/90 backdrop-blur-xl flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-md rounded-2xl border p-6 relative overflow-hidden shadow-2xl ${
                isDark ? 'bg-slate-950 border-white/[0.08] text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <button
                onClick={() => setAboutModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Info size={18} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-display font-black text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                      {language === 'en' ? 'Sonu Kahar Studio' : 'Estudio de Sonu Kahar'}
                    </h3>
                    <span className="font-mono text-[8px] text-slate-500 tracking-wider block">VERSION 2.0.0</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed font-sans text-left">
                  {language === 'en' 
                    ? 'A luxury high-contrast workspace for custom Android and Website development. Engineered with premium design, glassmorphism, responsive components, and secure integrations.'
                    : 'Un espacio de trabajo premium de alto contraste para el desarrollo personalizado de sitios web y aplicaciones Android. Diseñado con glassmorphism y seguridad absoluta.'}
                </p>

                <div className="border-t border-white/5 pt-4 space-y-2 text-left">
                  <span className="font-mono text-[8px] text-slate-500 tracking-wider uppercase block">
                    {language === 'en' ? 'Core Architecture' : 'Arquitectura Principal'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'Firebase', 'Motion'].map(tech => (
                      <span key={tech} className="font-mono text-[8px] text-slate-300 bg-white/5 border border-white/5 px-2.5 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Secure Owner Entrance - completely hidden as a subtle key lock */}
                <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                  <span className="font-mono text-[8px] text-slate-500 uppercase">
                    {language === 'en' ? 'Developer Control' : 'Control del Desarrollador'}
                  </span>
                  <button
                    onClick={() => {
                      setAboutModalOpen(false);
                      setIsAdminOpen(true);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded bg-blue-500/10 border border-blue-500/25 hover:bg-blue-500/20 text-blue-400 font-mono text-[8px] transition-all uppercase cursor-pointer"
                  >
                    <Lock size={10} />
                    {language === 'en' ? 'Owner Entry' : 'Entrada del Propietario'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

