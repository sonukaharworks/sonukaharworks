import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Cpu, Terminal } from 'lucide-react';

interface HeaderProps {
  activeSection: string; // Mapped to the current activePage
  onNavigate?: (page: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: 'index.html', page: 'home' },
    { name: 'About', href: 'about.html', page: 'about' },
    { name: 'Services', href: 'services.html', page: 'services' },
    { name: 'Portfolio', href: 'portfolio.html', page: 'portfolio' },
    { name: 'Projects', href: 'projects.html', page: 'projects' },
    { name: 'Coming Soon', href: 'comingsoon.html', page: 'comingsoon' }
  ];

  const handleLinkClick = (e: React.MouseEvent, page: string, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    window.location.hash = `#/${href}`;
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <>
      <header
        id="navbar"
        className={`fixed top-0 left-0 w-full z-45 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-[#050816]/85 backdrop-blur-md border-b border-cyber-primary/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Futuristic Animated SK Logo with Neon Glow, Rotating Rings, Glassmorphism, Floating core and sparkle particles */}
          <div
            id="nav-logo"
            onClick={(e) => handleLinkClick(e, 'home', 'index.html')}
            className="flex items-center gap-1.5 cursor-pointer group"
          >
            <div className="flex flex-col select-none relative group/name py-1">
              {/* Blinking background neon light effect and soft pulse */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyber-primary/10 via-cyber-secondary/15 to-transparent rounded-lg blur-md opacity-50 group-hover/name:opacity-100 transition-all duration-700 animate-pulse pointer-events-none" />
              
              <div className="relative flex items-center font-display text-[15px] sm:text-[17px] font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 uppercase leading-none">
                {Array.from("SK STUDIO").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ 
                      opacity: [0.9, 1, 0.92, 1],
                      textShadow: [
                        "0 0 6px rgba(0,229,255,0.3)",
                        "0 0 15px rgba(0,229,255,0.7)",
                        "0 0 8px rgba(0,229,255,0.4)",
                        "0 0 18px rgba(139,92,246,0.8)"
                      ],
                      y: [0, -1, 0]
                    }}
                    transition={{
                      delay: index * 0.05,
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                    className={char === " " ? "w-2" : "hover:text-cyber-accent hover:scale-110 transition-all duration-300 inline-block"}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              
              {/* Sweep/Shine lighting reflection across the text */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-sm">
                <motion.div
                  initial={{ x: "-150%" }}
                  animate={{ x: "250%" }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "linear", repeatDelay: 1.5 }}
                  className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-950/40 px-2 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.page;
              return (
                <a
                  key={link.name}
                  href={`#/${link.href}`}
                  onClick={(e) => handleLinkClick(e, link.page, link.href)}
                  className={`relative px-4 py-1.5 rounded-full font-sans text-xs tracking-wider transition-all duration-300 ${
                    isActive
                      ? 'text-cyber-primary font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute inset-0 bg-gradient-to-r from-cyber-primary/10 to-cyber-secondary/10 border border-cyber-primary/20 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Premium Cyber Indicator & Dark Theme Button */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-slate-950/80 border border-cyber-accent/20 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-accent animate-ping" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-accent absolute" />
              <span className="font-mono text-[10px] text-cyber-accent tracking-widest font-semibold uppercase">
                CYBER_OS V3.0
              </span>
            </div>
          </div>

          {/* Hamburger Menu Trigger */}
          <div className="flex items-center lg:hidden">
            <button
              id="hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-950/80 border border-cyber-primary/20 text-cyber-primary hover:bg-cyber-primary/10 transition-all duration-300"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-slate-950/95 backdrop-blur-xl border-b border-cyber-primary/20 lg:hidden p-6 flex flex-col gap-6 shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.page;
                return (
                  <button
                    key={link.name}
                    onClick={(e) => handleLinkClick(e as any, link.page, link.href)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 text-left ${
                      isActive
                        ? 'bg-cyber-primary/10 border-cyber-primary/30 text-cyber-primary font-bold'
                        : 'bg-transparent border-white/5 text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="font-sans text-sm tracking-widest">{link.name}</span>
                    <Terminal size={14} className={isActive ? 'text-cyber-primary' : 'text-slate-600'} />
                  </button>
                );
              })}
            </div>

            {/* Mobile Footer Meta */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <Cpu size={14} className="text-cyber-accent" />
                <span className="font-mono text-[10px] text-slate-400">SK STUDIO DIGITAL</span>
              </div>
              <span className="font-mono text-[9px] text-cyber-accent bg-cyber-accent/5 px-2.5 py-0.5 rounded border border-cyber-accent/20">
                ACTIVE
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
