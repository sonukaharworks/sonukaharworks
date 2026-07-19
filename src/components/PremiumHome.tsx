import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Sparkles, RefreshCw, Activity, 
  Home, User, Layers, Cpu, Award, Image, Milestone, Mail 
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

interface PremiumHomeProps {
  onReplayIntro: () => void;
}

export default function PremiumHome({ onReplayIntro }: PremiumHomeProps) {
  const [activeView, setActiveView] = useState<'home' | 'about' | 'services' | 'skills' | 'projects' | 'portfolio' | 'experience' | 'contact'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clockTime, setClockTime] = useState('');

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

  // Smooth scroll back to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  }, [activeView]);

  const navigationItems = [
    { id: 'home', label: 'Main', icon: <Home size={13} /> },
    { id: 'about', label: 'Specs', icon: <User size={13} /> },
    { id: 'services', label: 'Services', icon: <Layers size={13} /> },
    { id: 'skills', label: 'Stack', icon: <Cpu size={13} /> },
    { id: 'projects', label: 'Repos', icon: <Award size={13} /> },
    { id: 'portfolio', label: 'Gallery', icon: <Image size={13} /> },
    { id: 'experience', label: 'Chronicle', icon: <Milestone size={13} /> },
    { id: 'contact', label: 'Channel', icon: <Mail size={13} /> },
  ];

  return (
    <div className="min-h-screen bg-[#020309] text-white flex flex-col justify-between selection:bg-cyber-cyan/30 selection:text-white relative overflow-hidden font-display">
      
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none z-0" />

      {/* Dynamic Cyber Auroras */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-cyber-cyan/5 blur-[150px] pointer-events-none z-0 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-cyber-pink/5 blur-[150px] pointer-events-none z-0" />

      {/* ==========================================
          LUXURY CYBER SECURITY HEADER
          ========================================== */}
      <header className="sticky top-0 z-50 w-full px-4 sm:px-8 py-4 bg-slate-950/80 backdrop-blur-xl border-b border-cyber-cyan/20 shadow-[0_4px_30px_rgba(0,240,255,0.05)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo / Brand signature */}
          <button
            onClick={() => setActiveView('home')}
            className="flex items-center gap-3.5 group cursor-pointer focus:outline-none"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-md bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink blur-sm opacity-25 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-10 h-10 rounded-lg bg-slate-950 border border-cyber-cyan/30 flex items-center justify-center relative z-10 shadow-sm transition-transform group-hover:rotate-6">
                <span className="font-display font-black text-xs text-cyber-cyan tracking-wider">SK</span>
              </div>
            </div>
            <div className="text-left font-display">
              <span className="text-white font-black text-xs tracking-[0.25em] block uppercase group-hover:text-cyber-cyan transition-colors">SONU KAHAR</span>
              <span className="text-[7.5px] text-cyber-pink font-extrabold tracking-widest block uppercase">SECURITY OPERATIVE</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-950 border border-cyber-cyan/25 px-2 py-1.5 rounded-xl">
            {navigationItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id as any)}
                  className={`relative px-4 py-2 rounded-lg font-mono text-[9px] font-black tracking-widest uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive 
                      ? 'text-cyber-cyan bg-cyber-cyan/15 border border-cyber-cyan/35' 
                      : 'text-slate-400 hover:text-white border border-transparent'
                  }`}
                >
                  {item.icon}
                  {item.label}
                  {isActive && (
                    <motion.span 
                      layoutId="activeGlowLine" 
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4.5 h-[2px] bg-cyber-pink rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop telemetry stats clock */}
          <div className="hidden xl:flex items-center gap-6 font-mono text-[9px] text-slate-450 font-bold tracking-wider uppercase">
            <div className="flex items-center gap-2">
              <Activity size={12} className="text-cyber-cyan animate-pulse" />
              <span className="text-cyber-cyan">SYSTEM: ENCRYPTED</span>
            </div>
            <span>{clockTime}</span>
          </div>

          {/* Mobile menu triggers */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white focus:outline-none cursor-pointer border border-cyber-cyan/25 rounded-lg bg-slate-950"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0 right-0 top-full bg-slate-950/95 border-b border-cyber-cyan/20 px-6 py-6 space-y-2 z-40 lg:hidden flex flex-col shadow-lg text-left"
            >
              {navigationItems.map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id as any)}
                    className={`w-full py-3 rounded-lg text-left font-mono text-[10px] tracking-widest uppercase font-black flex items-center gap-3 px-4 border ${
                      isActive 
                        ? 'bg-cyber-cyan/15 border-cyber-cyan text-cyber-cyan shadow-md' 
                        : 'border-cyber-cyan/10 text-slate-400 hover:bg-slate-900 hover:text-white'
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
      </header>

      {/* ==========================================
          MAIN VIEWS CONTAINER (CINEMATIC SLIDE TRANSITIONS)
          ========================================== */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-16 relative z-10 flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full h-full"
          >
            {activeView === 'home' && <HomeView onNavigate={(view) => setActiveView(view)} />}
            {activeView === 'about' && <AboutView />}
            {activeView === 'services' && <ServicesView />}
            {activeView === 'skills' && <SkillsView />}
            {activeView === 'projects' && <ProjectsView />}
            {activeView === 'portfolio' && <PortfolioView />}
            {activeView === 'experience' && <ExperienceView />}
            {activeView === 'contact' && <ContactView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ==========================================
          LUXURY MINIMAL FOOTER
          ========================================== */}
      <footer className="w-full border-t border-cyber-cyan/15 bg-slate-950/90 py-10 px-4 sm:px-8 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          {/* Brand info */}
          <div className="space-y-1">
            <div className="font-display text-xs font-black text-white tracking-widest uppercase">
              SONU KAHAR
            </div>
            <p className="text-[8.5px] text-slate-500 font-mono tracking-widest uppercase">
              SECURE TELEMETRY INTERFACE STACK
            </p>
          </div>

          {/* Navigation Links inside footer */}
          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-[8.5px] font-black text-slate-500 uppercase tracking-widest">
            <button onClick={() => setActiveView('home')} className="hover:text-cyber-cyan cursor-pointer transition-colors">MAIN</button>
            <span>•</span>
            <button onClick={() => setActiveView('portfolio')} className="hover:text-cyber-cyan cursor-pointer transition-colors">GALLERY</button>
            <span>•</span>
            <button onClick={() => setActiveView('contact')} className="hover:text-cyber-cyan cursor-pointer transition-colors">CHANNEL</button>
          </div>

          {/* REPLAY INTRO */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <button
              onClick={onReplayIntro}
              className="group relative px-5 py-2 rounded-lg bg-slate-950 border border-cyber-cyan/25 hover:border-cyber-cyan/50 text-slate-400 hover:text-white font-mono text-[8px] font-black tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-sm flex items-center gap-2"
            >
              <RefreshCw size={11} className="group-hover:rotate-180 transition-transform duration-700 text-cyber-pink" />
              REPLAY INITIAL INTRO
            </button>
            <span className="font-mono text-[8px] text-slate-550 font-bold uppercase tracking-widest">
              © Sonu Kahar
            </span>
          </div>

        </div>
      </footer>
    </div>
  );
}
