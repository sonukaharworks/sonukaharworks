import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Cpu, ArrowDown } from 'lucide-react';
import SKLogo from './SKLogo';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const phrases = [
    '⚡ Designing Immersive Systems.',
    '🌌 Engineering Premium Digital Products.',
    '💎 Crafting High-Fidelity Architectures.'
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const currentPhrase = phrases[phraseIndex];

    const tick = () => {
      setTypedText((prev) => {
        if (isDeleting) {
          if (prev === '') {
            setIsDeleting(false);
            setPhraseIndex((idx) => (idx + 1) % phrases.length);
            return '';
          }
          return currentPhrase.substring(0, prev.length - 1);
        } else {
          if (prev === currentPhrase) {
            // Wait before starting deletion
            timer = setTimeout(() => setIsDeleting(true), 2500);
            return prev;
          }
          return currentPhrase.substring(0, prev.length + 1);
        }
      });
    };

    const speed = isDeleting ? 30 : 70;
    if (!isDeleting && typedText === currentPhrase) {
      // Handled by timeout above
    } else {
      timer = setTimeout(tick, speed);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIndex]);

  const navigateToPage = (href: string) => {
    window.location.hash = `#/${href}`;
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Background Cyber Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyber-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyber-secondary/5 blur-[120px] pointer-events-none" />

      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 cyber-grid-dense opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Hero Left Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Micro Tagline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-3 py-1 bg-slate-950/80 border border-cyber-primary/20 rounded-full mb-6"
          >
            <Cpu size={12} className="text-cyber-primary animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-300 font-bold">
              BUILDING_THE_FUTURE_NOW
            </span>
          </motion.div>

          {/* Headline Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.2] mb-6 h-36 sm:h-28 flex items-center"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary via-white to-cyber-accent neon-text-primary">
              {typedText}
            </span>
            <span className="text-cyber-primary animate-pulse ml-1">|</span>
          </motion.h1>

          {/* Subheading Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed mb-8"
          >
            Professional Android App Development, Website Development, UI/UX Design &amp; Digital Solutions engineered with cutting-edge tech, responsive architectures, and beautiful Apple style typography.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => navigateToPage('services.html')}
              className="group relative px-6 py-3.5 bg-gradient-to-r from-cyber-primary to-cyber-secondary rounded-xl text-black font-semibold font-display text-[11px] tracking-widest uppercase transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] flex items-center justify-center gap-2"
            >
              Explore Services 🚀
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigateToPage('portfolio.html')}
              className="group px-6 py-3.5 bg-slate-950/90 border border-white/10 rounded-xl text-white font-medium font-display text-[11px] tracking-widest uppercase transition-all duration-300 hover:bg-white/5 hover:border-cyber-accent active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              View Portfolio 💻
              <div className="w-1.5 h-1.5 rounded-full bg-cyber-accent animate-ping" />
            </button>
          </motion.div>

          {/* Designed & Developed by Sonu Kahar Premium Animated Banner */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 py-3 px-5 bg-gradient-to-r from-cyber-primary/5 via-cyber-secondary/5 to-transparent border-l-2 border-cyber-primary/40 rounded-r-xl max-w-lg w-full"
          >
            <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block mb-1">
              CREATOR_CREDENTIAL
            </span>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xs sm:text-sm text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary via-white to-cyber-accent tracking-wider">
                DESIGNED &amp; DEVELOPED BY SONU KAHAR
              </span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-xs"
              >
                ✨
              </motion.span>
            </div>
          </motion.div>

          {/* Founder Signature Credits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex items-center gap-3 font-mono text-[10px] text-slate-500"
          >
            <div className="w-6 h-[1px] bg-slate-800" />
            <span>FOUNDER: SONU KAHAR</span>
            <div className="w-2 h-2 rounded-full bg-cyber-accent" />
            <span>HQ: INDIA</span>
          </motion.div>
        </div>

        {/* Hero Right Content: Beautiful 3D SK Logo Simulation */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: 'spring' }}
            className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center group"
          >
            {/* Spinning background geometric telemetry dials */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-cyber-primary/10 flex items-center justify-center"
            >
              <div className="w-11/12 h-11/12 rounded-full border border-dashed border-cyber-secondary/15" />
            </motion.div>

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
              className="absolute inset-4 rounded-full border border-dashed border-cyber-accent/10"
            />

            {/* Glowing backlight circle */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-cyber-primary/5 via-cyber-secondary/5 to-cyber-accent/5 blur-3xl" />

            {/* Simulated Floating Glass Plate with 3D shadow */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotateX: [0, 5, 0],
                rotateY: [0, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: 'easeInOut',
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-cyber-primary/20 hover:border-cyber-primary/60 rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.8)] neon-glow-primary flex items-center justify-center transition-all duration-500 hover:scale-105"
            >
              <div className="absolute inset-[1px] bg-[radial-gradient(ellipse_at_top_right,rgba(0,229,255,0.08),transparent_70%)] rounded-[31px]" />
              
              {/* Premium SKLogo Component of Large size */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                <SKLogo size="lg" />
                
                <div className="text-center mt-3 select-none">
                  <span className="font-display text-[10px] font-black tracking-[0.3em] text-cyber-accent uppercase block drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]">
                    SONU KAHAR APPS
                  </span>
                  <span className="font-mono text-[7px] text-slate-500 tracking-[0.2em] uppercase mt-1 block">
                    HIGH_FIDELITY // LABS
                  </span>
                </div>
              </div>

              {/* Corner tech decals */}
              <div className="absolute top-4 left-4 font-mono text-[8px] text-cyber-primary/40 tracking-widest font-bold">CORE_OS_v4.0</div>
              <div className="absolute bottom-4 right-4 font-mono text-[8px] text-cyber-accent/40 tracking-widest font-bold">SYS_ACTIVE_SECURE</div>
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* Floating Animated Scroller Arrow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5">
        <span className="font-mono text-[9px] text-slate-500 tracking-widest uppercase">SCROLL_DOWN</span>
        <motion.button
          onClick={() => navigateToPage('about.html')}
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyber-primary hover:border-cyber-primary/40 transition-colors cursor-pointer bg-slate-950/60 backdrop-blur"
        >
          <ArrowDown size={14} />
        </motion.button>
      </div>

    </section>
  );
}
