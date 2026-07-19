import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ChevronRight, 
  Cpu, 
  Terminal, 
  Layers, 
  Compass, 
  Radio, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight, 
  Network, 
  Activity, 
  ArrowRight, 
  Laptop, 
  Smartphone, 
  ShoppingBag, 
  Palette, 
  Database, 
  Zap, 
  Users, 
  Award, 
  Calendar, 
  Check,
  ChevronLeft
} from 'lucide-react';
import SKLogo from './SKLogo';

// Audio Context chime for high-end micro-interactions
const playUISound = (freq: number = 800, type: OscillatorType = 'sine', duration: number = 0.1, gainVal: number = 0.04) => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(gainVal, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + duration + 0.02);
  } catch (error) {
    // Silently fail on user gesture requirements
  }
};

export default function NewHome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [stats, setStats] = useState({ projects: 0, clients: 0, rate: 0, hours: 0 });
  const [reviewIndex, setReviewIndex] = useState(0);

  // Mouse trail tracker for cursor glow
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Numbers increment animation on viewport entrance
  useEffect(() => {
    let start = 0;
    const endProjects = 150;
    const endClients = 100;
    const endRate = 99;
    const endHours = 24;
    
    const duration = 2000;
    const steps = 50;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setStats({
        projects: Math.floor((endProjects / steps) * currentStep),
        clients: Math.floor((endClients / steps) * currentStep),
        rate: Math.floor((endRate / steps) * currentStep),
        hours: Math.floor((endHours / steps) * currentStep)
      });

      if (currentStep >= steps) {
        setStats({ projects: endProjects, clients: endClients, rate: endRate, hours: endHours });
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const handlePageNavigation = (targetHash: string) => {
    playUISound(900, 'sine', 0.08, 0.05);
    window.location.hash = targetHash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const services = [
    {
      id: 1,
      icon: <Smartphone className="w-6 h-6 text-cyber-primary" />,
      title: "📱 Android Apps Development",
      description: "State-of-the-art native mobile experiences programmed in Kotlin and Jetpack Compose. Engineered for fluid gesture mechanics, thread-safe asynchronous operations, and offline Room database synchronizations.",
      tag: "KOTLIN / COMPOSE",
      color: "from-cyber-primary/20 via-transparent to-transparent",
      borderColor: "group-hover:border-cyber-primary/50",
      accentGlow: "rgba(0,229,255,0.15)"
    },
    {
      id: 2,
      icon: <Laptop className="w-6 h-6 text-cyber-secondary" />,
      title: "🌐 Website Development",
      description: "Next-generation single page architectures designed in custom high-fidelity frameworks. Optimized for Google Core Web Vitals, ultra-low loading states, and responsive layout grids.",
      tag: "VITE / REACT",
      color: "from-cyber-secondary/20 via-transparent to-transparent",
      borderColor: "group-hover:border-cyber-secondary/50",
      accentGlow: "rgba(139,92,246,0.15)"
    },
    {
      id: 3,
      icon: <ShoppingBag className="w-6 h-6 text-cyber-accent" />,
      title: "🛒 Premium E-commerce",
      description: "Tailored transactional architectures integrating seamless payment portals, digital wallets, dynamic checkout steps, and secure custom administrative inventories.",
      tag: "SECURE STRIPE",
      color: "from-cyber-accent/20 via-transparent to-transparent",
      borderColor: "group-hover:border-cyber-accent/50",
      accentGlow: "rgba(0,255,179,0.15)"
    },
    {
      id: 4,
      icon: <Database className="w-6 h-6 text-cyber-primary" />,
      title: "💻 Custom Software Suites",
      description: "Sturdy custom backend logic, secure databases, scalable API microservices, and dedicated monitoring telemetry designed to simplify complex company workstreams.",
      tag: "NODE / EXPRESS",
      color: "from-cyber-primary/20 via-transparent to-transparent",
      borderColor: "group-hover:border-cyber-primary/50",
      accentGlow: "rgba(0,229,255,0.15)"
    },
    {
      id: 5,
      icon: <Palette className="w-6 h-6 text-cyber-secondary" />,
      title: "🎨 Bespoke UI/UX Design",
      description: "Original vector screens and responsive interfaces designed with elegant typography, generous whitespace, smooth layout animations, and eye-safe color palettes.",
      tag: "APPLE / STRIPE STYLE",
      color: "from-cyber-secondary/20 via-transparent to-transparent",
      borderColor: "group-hover:border-cyber-secondary/50",
      accentGlow: "rgba(139,92,246,0.15)"
    },
    {
      id: 6,
      icon: <Zap className="w-6 h-6 text-cyber-accent" />,
      title: "⚡ Digital Solutions Strategy",
      description: "Continuous speed optimizations, premium cloud migrations, custom tokenizations, security hardening, and structural performance fine-tuning.",
      tag: "PRODUCTION READY",
      color: "from-cyber-accent/20 via-transparent to-transparent",
      borderColor: "group-hover:border-cyber-accent/50",
      accentGlow: "rgba(0,255,179,0.15)"
    }
  ];

  const timelineSteps = [
    {
      step: "01",
      title: "Handshake & Scope Architecture",
      description: "We initiate a detailed scope analysis. Every interface and system behavior is specified to establish an exact, high-fidelity development footprint without templates.",
      icon: <Terminal className="w-5 h-5 text-cyber-primary" />
    },
    {
      step: "02",
      title: "Premium Interactive Prototyping",
      description: "We create fluid, fully animated interactive high-contrast prototypes displaying real typography, transitions, and actual design elements.",
      icon: <Palette className="w-5 h-5 text-cyber-secondary" />
    },
    {
      step: "03",
      title: "Rigorous Production Coding",
      description: "Our core engine is hand-coded using the highest standards of TypeScript, Kotlin, or React. No bloated code. Maximum native efficiency.",
      icon: <Cpu className="w-5 h-5 text-cyber-accent" />
    },
    {
      step: "04",
      title: "Continuous Testing & Deployment",
      description: "Every module undergoes unit benchmarking and strict security verification, followed by instant hosting using lightning-fast production containers.",
      icon: <CheckCircle2 className="w-5 h-5 text-cyber-primary" />
    }
  ];

  const featuredProjects = [
    {
      title: "OmniX Admin Telemetry Suite",
      client: "Apex Media Corp",
      tag: "Enterprise Portal",
      description: "A highly complex administrative dashboard hosting 15 distinct secure microservices. Features animated real-time canvas charting, dynamic data filtering, and absolute database synchronization.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      tech: ["React", "Express ESM", "D3.js", "WebSockets"],
      color: "from-cyber-primary/20 to-transparent",
      link: "#/portfolio.html"
    },
    {
      title: "Nova Web3 Cyber Wallet",
      client: "Decentralized Labs",
      tag: "Blockchain Interface",
      description: "A breathtaking decentralized crypto wallet interface built with an eye-safe glassmorphic design, custom SVG network nodes, and high-frequency real-time token tracking.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
      tech: ["Vite", "Motion", "Tailwind", "Web3.js"],
      color: "from-cyber-secondary/20 to-transparent",
      link: "#/portfolio.html"
    }
  ];

  const clientReviews = [
    {
      name: "Michael Chen",
      role: "CTO",
      company: "Apex Media Corp",
      content: "Sonu Kahar engineered a complex admin telemetry panel that integrates 15 distinct API microservices seamlessly. Their attention to security, clean coding, and UX micro-animations sets them apart.",
      avatarSeed: "michael"
    },
    {
      name: "Sarah Jenkins",
      role: "Founder",
      company: "Decentralized Labs",
      content: "The Nova Cyber Wallet web3 layout is an absolute masterpiece. Our users are consistently blown away by the glassmorphism aesthetic and the instant 120 FPS performance.",
      avatarSeed: "sarah"
    },
    {
      name: "David Ross",
      role: "Product Director",
      company: "ZenSpace Systems",
      content: "Excellent Kotlin execution. The offline room database functions beautifully, and the custom synthesizer engine delivers premium, calming audio loops without any lag.",
      avatarSeed: "david"
    }
  ];

  const nextReview = () => {
    playUISound(850, 'sine', 0.06, 0.03);
    setReviewIndex((prev) => (prev + 1) % clientReviews.length);
  };

  const prevReview = () => {
    playUISound(750, 'sine', 0.06, 0.03);
    setReviewIndex((prev) => (prev - 1 + clientReviews.length) % clientReviews.length);
  };

  return (
    <div ref={containerRef} className="w-full bg-[#030510] text-white relative font-sans overflow-hidden">
      
      {/* 1. MOUSE GLOW BACKGROUND EFFECT (Apple/Stripe Inspired) */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-20"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 229, 255, 0.08), rgba(139, 92, 246, 0.05), transparent 80%)`
        }}
      />

      {/* 2. SILK GRADIENT LIGHT BACKDROP */}
      <div className="absolute top-[-10%] left-[5%] w-[600px] h-[600px] rounded-full bg-cyber-primary/5 blur-[140px] pointer-events-none" />
      <div className="absolute top-[30%] right-[5%] w-[700px] h-[700px] rounded-full bg-cyber-secondary/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-cyber-accent/5 blur-[130px] pointer-events-none" />

      {/* SECTION 1: CINEMATIC MOVIE-LAUNCH HERO BANNER */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-32 pb-24 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden">
        
        {/* Dynamic Canvas Background for drifting code particles & digital sparkles */}
        <canvas 
          id="hero-particles-canvas"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
          ref={(el) => {
            if (!el) return;
            const ctx = el.getContext('2d');
            if (!ctx) return;
            let width = (el.width = window.innerWidth);
            let height = (el.height = window.innerHeight);

            const handleResize = () => {
              width = el.width = window.innerWidth;
              height = el.height = window.innerHeight;
            };
            window.addEventListener('resize', handleResize);

            // Create drifting star and particle list
            const dots: Array<{ x: number; y: number; size: number; vy: number; vx: number; alpha: number; color: string }> = [];
            const colors = ['#00e5ff', '#a855f7', '#ffffff', '#2563eb'];
            
            for (let i = 0; i < 250; i++) {
              dots.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.5 + 0.4,
                vy: -Math.random() * 0.8 - 0.2, // drifting upwards elegantly
                vx: (Math.random() - 0.5) * 0.4,
                alpha: Math.random() * 0.5 + 0.1,
                color: colors[Math.floor(Math.random() * colors.length)]
              });
            }

            let animId: number;
            const animate = () => {
              ctx.clearRect(0, 0, width, height);
              dots.forEach((dot) => {
                dot.y += dot.vy;
                dot.x += dot.vx;
                
                // Wrap boundaries
                if (dot.y < 0) {
                  dot.y = height;
                  dot.x = Math.random() * width;
                }
                if (dot.x < 0 || dot.x > width) dot.x = Math.random() * width;

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
                ctx.fillStyle = dot.color;
                ctx.globalAlpha = dot.alpha;
                ctx.fill();
              });
              ctx.globalAlpha = 1.0;
              animId = requestAnimationFrame(animate);
            };
            animate();

            // Cleanup
            (el as any)._cleanup = () => {
              window.removeEventListener('resize', handleResize);
              cancelAnimationFrame(animId);
            };
          }}
        />

        {/* Subtle cinematic tech background grids */}
        <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-gradient-to-tr from-cyan-500/5 via-purple-500/5 to-transparent blur-[110px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* LEFT SIDE: Giant, Typography-Led Cinematic Branding & Heading */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-10">
            
            {/* Status indicator with premium code terminal tags */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-950/80 border border-cyan-500/25 text-[8px] sm:text-[9px] font-mono tracking-[0.25em] text-cyan-400 uppercase shadow-[0_0_20px_rgba(6,182,212,0.1)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>SK Studio Labs // DESIGN DEPLOYMENT LABS</span>
            </motion.div>

            {/* THE VISUAL BRAND IDENTITY: A massive, stunning typography presentation of SK STUDIO */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative select-none p-4 xs:p-6 sm:p-8 rounded-2xl xs:rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] group/brand overflow-hidden flex flex-col items-start gap-4 max-w-full"
            >
              {/* Vibrant backlight aura */}
              <div className="absolute -inset-10 bg-gradient-to-r from-cyan-500/15 via-purple-500/15 to-transparent rounded-3xl blur-2xl opacity-75 group-hover/brand:opacity-100 transition-opacity duration-700 animate-pulse" />
              
              {/* Glass reflection shine sweep */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                <motion.div
                  animate={{ x: ['-150%', '150%'] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                  className="w-[40%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                />
              </div>

              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ repeat: Infinity, duration: 5.0, ease: "easeInOut" }}
                className="relative flex flex-nowrap items-center text-3xl xs:text-5xl sm:text-7xl md:text-8xl font-black tracking-[0.15em] xs:tracking-[0.25em] sm:tracking-[0.3em] uppercase leading-none select-none text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)] whitespace-nowrap"
                style={{
                  fontFamily: '"SF Pro Display", "-apple-system", "BlinkMacSystemFont", "Inter", sans-serif',
                }}
              >
                {Array.from("SK STUDIO").map((char, index) => (
                  <motion.span
                    key={index}
                    animate={{
                      textShadow: [
                        "0 0 12px rgba(6,182,212,0.2)",
                        "0 0 30px rgba(6,182,212,0.65)",
                        "0 0 12px rgba(139,92,246,0.2)",
                        "0 0 35px rgba(139,92,246,0.7)"
                      ]
                    }}
                    transition={{
                      delay: index * 0.06,
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                    className={char === " " ? "w-2 xs:w-3 sm:w-4" : "hover:text-cyan-300 hover:scale-110 transition-all duration-300 inline-block"}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Dynamic, High-End Headline replacement of generic text */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl sm:text-7xl font-black tracking-tight leading-[1.05] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400"
                style={{
                  fontFamily: '"SF Pro Display", "-apple-system", "BlinkMacSystemFont", "Inter", sans-serif',
                }}
              >
                BUILDING DIGITAL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-[0_0_20px_rgba(0,229,255,0.35)]">
                  FUTURE
                </span>
              </motion.h1>

              {/* Sub-headline with modern luxury tag look */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-950/40 border border-white/5 backdrop-blur-md text-xs sm:text-sm font-mono tracking-[0.2em] text-cyan-300 font-bold uppercase"
              >
                Apps • Websites • AI Solutions
              </motion.div>
            </div>

            {/* Core Subtitle with luxury phrasing */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-sans text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-xl"
            >
              Custom engineered software products hand-crafted with rigorous design architectures, lightweight Native Android components, high-efficiency React systems, and breathtaking user interfaces. No templates. Pure, bespoke digital excellence.
            </motion.p>

            {/* Luxury Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2"
            >
              <button
                onClick={() => {
                  playUISound(1050, 'sine', 0.08, 0.06);
                  handlePageNavigation('#/contact.html');
                }}
                className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-mono text-[10px] tracking-[0.25em] font-black uppercase transition-all duration-500 overflow-hidden shadow-[0_0_25px_rgba(0,229,255,0.3)] hover:shadow-[0_0_45px_rgba(0,229,255,0.65)] text-center cursor-pointer"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">🚀 INITIALIZE_PROJECT</span>
                <div className="absolute inset-0 bg-slate-950 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 -z-1" />
              </button>

              <button
                onClick={() => {
                  playUISound(850, 'triangle', 0.06, 0.04);
                  handlePageNavigation('#/portfolio.html');
                }}
                className="group relative px-8 py-4 rounded-xl bg-slate-950/90 border border-white/10 hover:border-cyan-400 text-white font-mono text-[10px] tracking-[0.25em] font-bold uppercase hover:bg-slate-900 transition-all duration-300 text-center cursor-pointer shadow-lg overflow-hidden"
              >
                <span className="relative z-10">DISCOVER_SYSTEMS</span>
                <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </motion.div>

            {/* High-end technical specifications grid with visual brackets */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-white/5 w-full max-w-lg font-mono text-[9px] text-slate-500 relative"
            >
              <div>
                <span className="uppercase tracking-widest block text-[8px]">ARCHITECTURE</span>
                <span className="text-white font-bold block mt-0.5 tracking-wider">SOLID / CLEAN</span>
              </div>
              <div>
                <span className="uppercase tracking-widest block text-[8px]">SECURITY ENCLAVE</span>
                <span className="text-cyan-400 font-bold block mt-0.5 tracking-wider">TLS 1.3 // AES</span>
              </div>
              <div>
                <span className="uppercase tracking-widest block text-[8px]">ENGINE VERSION</span>
                <span className="text-purple-400 font-bold block mt-0.5 tracking-wider">V4.0_CINEMA</span>
              </div>
            </motion.div>

          </div>

          {/* RIGHT SIDE: An Immersive Film-Intro Floating Holographic Plate containing interactive terminal diagnostic lists */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[460px]">
            
            {/* Spinning orbital telemetry lines */}
            <div className="absolute w-[360px] h-[360px] rounded-full border border-white/5 flex items-center justify-center animate-spin-slow pointer-events-none" />
            <div className="absolute w-[260px] h-[260px] rounded-full border border-dashed border-cyan-400/10 flex items-center justify-center animate-reverse-spin pointer-events-none" />

            {/* Glowing purple ambient aura backing */}
            <div className="absolute w-60 h-60 rounded-full bg-gradient-to-tr from-purple-500/10 to-transparent blur-3xl pointer-events-none" />

            {/* CINEMATIC TELEMETRY INTERACTIVE PANEL (Looks like a clean terminal display plate) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.9 }}
              className="relative w-full max-w-[360px] bg-slate-950/85 border border-white/10 rounded-2xl p-5 shadow-3xl backdrop-blur-xl z-20 overflow-hidden"
              style={{ perspective: 1000 }}
            >
              {/* Glossy glare line sweep */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none animate-pulse" />
              <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent pointer-events-none" />

              {/* Panel Top HUD Controls */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500/60" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                  <span className="w-2 h-2 rounded-full bg-green-500/60" />
                </div>
                <span className="font-mono text-[7px] text-slate-500 tracking-widest uppercase font-bold">SONU_KAHAR_SHELL.LOG</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </div>

              {/* System readout list */}
              <div className="space-y-3 font-mono text-[8px] sm:text-[9px] text-slate-400 leading-normal">
                <div className="flex items-center justify-between text-white border-b border-white/5 pb-1 font-bold">
                  <span>METRIC_ID</span>
                  <span>STATUS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">&gt; NATIVE_MOBILE_CORE</span>
                  <span className="text-cyan-400 font-bold">99.9% FLUID</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">&gt; WEB_INTERFACE_FPS</span>
                  <span className="text-cyan-400 font-bold">120_FPS_PASS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">&gt; SECURE_SANDBOX</span>
                  <span className="text-purple-400 font-bold">AES-GCM-256</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">&gt; CLOUD_EDGE_REDUNDANCY</span>
                  <span className="text-cyan-400 font-bold">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">&gt; LAUNCH_CHIME_SWELL</span>
                  <span className="text-white font-bold">FM_SYNTH</span>
                </div>
              </div>

              {/* Embedded Interactive graphic widget */}
              <div className="mt-5 p-3 rounded-lg bg-slate-900/60 border border-white/5 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[7px] text-slate-500">LIVE COGNITIVE LATENCY</span>
                  <span className="font-mono text-[7px] text-cyan-400 font-bold">8ms</span>
                </div>
                <div className="h-10 flex items-end justify-between gap-[3px] px-1">
                  {[25, 40, 60, 45, 85, 30, 95, 65, 50, 75, 40, 80, 55].map((val, idx) => (
                    <motion.div
                      key={idx}
                      className="w-full bg-gradient-to-t from-purple-500 via-cyan-400 to-white rounded-t-[1px]"
                      animate={{ height: [`${val}%`, `${Math.min(100, Math.max(10, val + (Math.random() - 0.5) * 30))}%`, `${val}%`] }}
                      transition={{ repeat: Infinity, duration: 2.0 + idx * 0.15, ease: 'easeInOut' }}
                      style={{ height: `${val}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Tech Spec Footnotes */}
              <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 font-mono text-[7px] text-slate-500">
                <span>STABILITY: ACTIVE</span>
                <span>GRID: STABLE_v4</span>
              </div>
            </motion.div>

            {/* Bottom-Right Abstract Glass badge */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 4.0, ease: 'easeInOut' }}
              className="absolute -bottom-4 right-4 p-2 px-3 bg-slate-900/95 border border-white/10 rounded-lg shadow-xl backdrop-blur-md z-30 font-mono text-[7.5px] text-cyan-400 font-bold"
            >
              <span>SYS_ENVELOPE // ENCRYPTED</span>
            </motion.div>
          </div>

        </div>
      </section>

      {/* SECTION 2: OUR SERVICES - HIGH CONTRAST ASYMMETRICAL CARDS */}
      <section id="services" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5 z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-16">
            <div className="space-y-3">
              <span className="font-mono text-[9px] text-cyber-primary tracking-[0.3em] uppercase block font-bold">
                CORE TECHNICAL SOLUTIONS
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
                NEXT-GEN <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary via-white to-cyber-secondary">DIGITAL SOLUTIONS</span>
              </h2>
            </div>
            <p className="font-sans text-xs sm:text-sm text-slate-400 font-light max-w-md leading-relaxed">
              Custom Android Apps, Premium Websites, AI Automation & Modern Digital Solutions built with performance, creativity and innovation.
            </p>
          </div>

          {/* Asymmetrical layout of premium glassmorphic cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, idx) => (
              <motion.div
                key={svc.id}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-white/5 hover:border-white/15 p-6 sm:p-8 overflow-hidden transition-all duration-300 shadow-2xl flex flex-col justify-between min-h-[290px]"
                style={{
                  boxShadow: hoveredCard === idx ? `0 15px 35px -5px ${svc.accentGlow}` : 'none'
                }}
              >
                {/* Sleek top corner gradient highlight */}
                <div className={`absolute inset-[1px] bg-gradient-to-tr ${svc.color} rounded-[15px] pointer-events-none`} />

                <div className="space-y-5">
                  <div className="flex items-center justify-between relative z-10">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-white/10">
                      {svc.icon}
                    </div>
                    <span className="font-mono text-[8px] text-slate-500 tracking-widest font-bold">
                      {svc.tag}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-cyber-primary transition-colors duration-300">
                    {svc.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                    {svc.description}
                  </p>
                </div>

                {/* Bottom line accent */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[8px] text-slate-500 relative z-10">
                  <span>DEPLOYED // CLOUD_CONTAINERS</span>
                  <button 
                    onClick={() => handlePageNavigation('#/services.html')}
                    className="text-cyber-primary font-bold hover:text-white transition-colors cursor-pointer"
                  >
                    READ_MORE
                  </button>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 3: WHY CHOOSE US - LUXURY TIMELINE */}
      <section className="relative py-28 bg-slate-950/30 border-t border-white/5 z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="font-mono text-[9px] text-cyber-accent tracking-[0.3em] uppercase block font-bold">
              OUR STANDARDS OF EXECUTION
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              A Highly Rigid Methodology
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
              We leverage strict, modern workflows to transform ambitious digital concepts into highly polished, secure, and ready-to-scale assets.
            </p>
          </div>

          {/* Timeline Layout */}
          <div className="relative border-l border-white/10 max-w-4xl mx-auto pl-6 sm:pl-12 space-y-12">
            {timelineSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Floating Chrono Bullet Indicator */}
                <div className="absolute -left-[31px] sm:-left-[55px] top-0 w-4 h-4 rounded-full bg-[#030510] border border-cyber-accent/80 flex items-center justify-center shadow-[0_0_10px_rgba(0,255,179,0.3)] group-hover:scale-110 transition-transform">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyber-accent" />
                </div>

                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-white/5 hover:border-cyber-accent/30 transition-all duration-300 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-1 flex items-center justify-start sm:justify-center">
                    <span className="font-mono text-xl sm:text-2xl font-black text-cyber-accent">
                      {step.step}
                    </span>
                  </div>
                  <div className="md:col-span-11 space-y-2 text-left">
                    <div className="flex items-center gap-2">
                      {step.icon}
                      <h3 className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                        {step.title}
                      </h3>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: FEATURED PROJECTS WITH SCREENSHOT PREVIEW DECK */}
      <section id="portfolio" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5 z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-16">
            <div className="space-y-3">
              <span className="font-mono text-[9px] text-cyber-secondary tracking-[0.3em] uppercase block font-bold">
                PREMIUM RELEASES
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
                Featured Case Studies
              </h2>
            </div>
            <button
              onClick={() => handlePageNavigation('#/portfolio.html')}
              className="group flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-cyber-secondary uppercase hover:text-white transition-colors cursor-pointer"
            >
              EXPLORE_ALL_CASE_STUDIES <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((proj, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl bg-slate-950/90 border border-white/5 overflow-hidden transition-all duration-500 shadow-2xl hover:border-cyber-primary/30 flex flex-col justify-between"
              >
                {/* Large high resolution screenshot with dynamic zoom on hover */}
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <img 
                    src={proj.image} 
                    alt={proj.title}
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-75 transition-all duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-slate-950/95 border border-white/10 text-slate-300 font-mono text-[8px] tracking-wider uppercase font-bold">
                    {proj.tag}
                  </div>
                </div>

                {/* Card Descriptions Side */}
                <div className="p-6 sm:p-8 space-y-4">
                  <span className="font-mono text-[8.5px] text-cyber-primary tracking-widest block uppercase font-bold">
                    CLIENT // {proj.client}
                  </span>
                  
                  <h3 className="text-xl sm:text-2xl font-extrabold uppercase text-white tracking-tight">
                    {proj.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.tech.map((t, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[8px] font-mono text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Live actions bar */}
                <div className="px-6 sm:px-8 pb-6 pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-white/5 mt-2">
                  <span className="font-mono text-[8px] text-slate-500 uppercase">SYS_BENCH_PASS // 120FPS</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handlePageNavigation(proj.link)}
                      className="inline-flex items-center gap-1 font-mono text-[9px] tracking-wider text-cyber-primary uppercase hover:text-white transition-colors cursor-pointer"
                    >
                      LIVE_DEMO <ArrowUpRight size={12} />
                    </button>
                    <span className="text-slate-700 font-mono">/</span>
                    <button
                      onClick={() => handlePageNavigation('#/contact.html')}
                      className="inline-flex items-center gap-1 font-mono text-[9px] tracking-wider text-slate-400 uppercase hover:text-cyber-accent transition-colors cursor-pointer"
                    >
                      GITHUB_CODE
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5: REAL-TIME STATISTICS WITH METRIC COUNT CHANNELS */}
      <section className="relative py-28 bg-[#030510] border-t border-white/5 z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-center">
            
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-white/5 hover:border-cyber-primary/20 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-cyber-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 block tracking-tight">
                {stats.projects}+
              </span>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest block mt-3 font-bold">
                COMPLETED_PROJECTS
              </span>
              <span className="text-[7.5px] text-cyber-primary block mt-1">SYS_COMMIT_LOG_PASS</span>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-white/5 hover:border-cyber-secondary/20 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-cyber-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 block tracking-tight">
                {stats.clients}+
              </span>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest block mt-3 font-bold">
                HAPPY_ENTERPRISES
              </span>
              <span className="text-[7.5px] text-cyber-secondary block mt-1">SECURE_CONTRACT_OK</span>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-white/5 hover:border-cyber-accent/20 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-cyber-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 block tracking-tight">
                {stats.rate}%
              </span>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest block mt-3 font-bold">
                CLIENT_SUCCESS_RATE
              </span>
              <span className="text-[7.5px] text-cyber-accent block mt-1">QA_VERIFIED_SLA</span>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-white/5 hover:border-cyber-primary/20 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-cyber-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 block tracking-tight">
                {stats.hours}/7
              </span>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest block mt-3 font-bold">
                CONTINUOUS_SUPPORT
              </span>
              <span className="text-[7.5px] text-cyber-primary block mt-1">SYS_PING_ONLINE</span>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: CLIENT REVIEWS WITH DECRYPT & SLIDER ANIMATIONS */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5 z-10">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16 space-y-3">
            <span className="font-mono text-[9px] text-cyber-primary tracking-[0.3em] uppercase block font-bold">
              VERIFIED ENTERPRISE TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              Client Commendations
            </h2>
          </div>

          {/* Testimonial card slider frame */}
          <div className="relative rounded-3xl bg-slate-950/90 border border-white/5 p-6 sm:p-10 shadow-2xl min-h-[220px] flex flex-col justify-between">
            <div className="absolute top-4 right-4 text-cyber-primary font-mono text-[10px]">
              TRANSIT // CASE_0{reviewIndex + 1}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={reviewIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <p className="font-sans text-sm sm:text-base text-slate-300 font-light italic leading-relaxed text-left">
                  "{clientReviews[reviewIndex].content}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-white/5 text-left">
                  <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center font-mono font-black text-cyber-primary text-xs uppercase">
                    {clientReviews[reviewIndex].name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                      {clientReviews[reviewIndex].name}
                    </h4>
                    <span className="font-mono text-[9px] text-slate-500 uppercase block mt-0.5">
                      {clientReviews[reviewIndex].role} // {clientReviews[reviewIndex].company}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Micro transit navigation triggers */}
            <div className="flex items-center justify-end gap-3 mt-6 border-t border-white/5 pt-4">
              <button
                onClick={prevReview}
                className="p-1.5 rounded bg-white/5 border border-white/5 hover:border-cyber-primary transition-all text-slate-400 hover:text-white cursor-pointer"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={nextReview}
                className="p-1.5 rounded bg-white/5 border border-white/5 hover:border-cyber-primary transition-all text-slate-400 hover:text-white cursor-pointer"
              >
                <ChevronRight size={14} />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7: CORE PREMIUM HIGH-CONTRAST CTA */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-gradient-to-b from-[#030510] to-[#010208] z-10 text-center">
        
        {/* Glowing floating decorative orbs inside CTA */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyber-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto space-y-8">
          <span className="font-mono text-[9px] text-cyber-accent tracking-[0.3em] uppercase block font-bold">
            READY TO COLLABORATE?
          </span>
          
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
            Let's Build Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary via-white to-cyber-accent drop-shadow-[0_0_10px_rgba(0,229,255,0.2)] font-sans font-black">
              Dream Digital Product
            </span>
          </h2>

          <p className="font-sans text-xs sm:text-sm text-slate-400 font-light max-w-xl mx-auto leading-relaxed">
            Let's bypass the cookie-cutter templates. Connect with our engineering core to produce an ultra-fast native Android client app, modern responsive portal, or highly complex custom software suite.
          </p>

          <button
            onClick={() => {
              playUISound(1200, 'sine', 0.1, 0.08);
              handlePageNavigation('#/contact.html');
            }}
            className="group relative px-8 py-4.5 rounded-xl bg-slate-950 border border-cyber-accent/40 text-cyber-accent font-mono text-[10px] tracking-[0.25em] font-bold uppercase hover:bg-cyber-accent hover:text-black transition-all duration-500 cursor-pointer shadow-[0_0_20px_rgba(0,255,179,0.15)] hover:shadow-[0_0_35px_rgba(0,255,179,0.45)] overflow-hidden"
          >
            <span className="relative z-10">INITIALIZE_COLLABORATION_ROUTINE</span>
            <div className="absolute inset-0 bg-cyber-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 -z-5" />
          </button>
        </div>

      </section>

    </div>
  );
}
