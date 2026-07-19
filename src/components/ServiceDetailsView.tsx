import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Cpu, Smartphone, Globe, ShieldCheck, CheckCircle2, MessageSquare, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data';

interface ServiceDetailsViewProps {
  serviceId: 'web-dev' | 'android-dev';
  theme: 'dark' | 'light';
  onBack: () => void;
  onInquire: (serviceName: string) => void;
  onSelectProject: (projId: string) => void;
}

export default function ServiceDetailsView({ serviceId, theme, onBack, onInquire, onSelectProject }: ServiceDetailsViewProps) {
  const isDark = theme === 'dark';
  const isAndroid = serviceId === 'android-dev';

  // Details dictionary
  const details = {
    'android-dev': {
      title: 'Android Mobile App Development',
      subtitle: 'NATIVE KOTLIN & JETPACK COMPOSE ARCHITECTURE',
      icon: <Smartphone size={28} className={isDark ? 'text-blue-400' : 'text-blue-600'} />,
      desc: 'Native mobile companion systems designed specifically for performance, absolute Keystore-level biometrics security, offline-first SQL cache adapters, and fluid reactive view layouts.',
      tools: ['Kotlin', 'Coroutines', 'Jetpack Compose', 'Room Database', 'Biometrics API', 'Retrofit API client', 'SSL Pinning'],
      standards: [
        '99.9% Crash-Free target index',
        'AES-256 local storage keystore encryption',
        'Offline-first seamless Room DB sync',
        'Rigid Google Play Store guidelines alignment'
      ],
      metrics: 'SDK 34 SECURED & STABLE'
    },
    'web-dev': {
      title: 'High-Speed Web Development',
      subtitle: 'MODERN CLIENT-SIDE REACT & LIGHTHOUSE SYSTEMS',
      icon: <Globe size={28} className={isDark ? 'text-purple-400' : 'text-purple-600'} />,
      desc: 'Stunning luxury corporate sites, dynamic portfolio platforms, and complex admin panels styled with premium glassmorphism, responsive visual margins, and micro-interactions.',
      tools: ['React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite compiler', 'Redux Toolkit', 'Recharts / D3.js'],
      standards: [
        '99% Lighthouse performance target',
        'Complete search-engine index optimizations',
        'Fluid hardware-accelerated transitions',
        'Fine-grained defensive input validation'
      ],
      metrics: 'LATENCY < 50MS / 100% RESPONSIVE'
    }
  };

  const info = details[serviceId];

  // Filter associated projects
  const categoryFilter = isAndroid ? 'Android' : 'Web';
  const relatedProjects = PROJECTS.filter(p => p.category === categoryFilter).slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="space-y-12 pb-20 select-none text-left"
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[9.5px] font-mono font-black uppercase tracking-widest transition-all cursor-pointer border ${
          isDark 
            ? 'bg-white/[0.02] border-white/10 hover:border-blue-500/30 text-slate-400 hover:text-white' 
            : 'bg-slate-150 border-slate-200 hover:border-blue-500/30 text-slate-600 hover:text-slate-900'
        }`}
      >
        <ArrowLeft size={13} />
        BACK TO SERVICES
      </button>

      {/* Main Grid: Info + Stack Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Spec Outline */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-4.5">
            <div className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-950 border-white/10' : 'bg-slate-100 border-slate-200 shadow-sm'
            }`}>
              {info.icon}
            </div>
            <div className="space-y-1">
              <span className={`font-mono text-[9px] tracking-widest font-black uppercase ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                {info.subtitle}
              </span>
              <h1 className={`font-display text-xl sm:text-3xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {info.title}
              </h1>
            </div>
          </div>

          <p className={`font-sans text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
            {info.desc}
          </p>

          {/* Standards checklist */}
          <div className="space-y-3.5 pt-4">
            <span className={`font-mono text-[8.5px] font-black uppercase tracking-wider block ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              ENGINEERING STANDARDS
            </span>
            <div className="space-y-3">
              {info.standards.map((st, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 size={13} className={`shrink-0 mt-0.5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  <span className={`font-sans text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{st}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action triggers */}
          <div className="pt-6">
            <button
              onClick={() => onInquire(info.title)}
              className="w-full sm:w-auto py-3.5 px-8 rounded-xl font-mono text-[9px] font-black tracking-widest uppercase transition-all duration-300 cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] border border-indigo-500/30 flex items-center justify-center gap-2"
            >
              <MessageSquare size={12} />
              ORDER THIS SERVICE BLUEPRINT
            </button>
          </div>
        </div>

        {/* Right Column: Stack readout */}
        <div className="lg:col-span-5 space-y-8">
          {/* Tools & Tech Card */}
          <div className={`p-6 sm:p-7 rounded-2xl border ${
            isDark ? 'bg-[#0b091c]/55 border-white/[0.06]' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className={`font-mono text-[9px] tracking-widest font-black uppercase block mb-4 ${isDark ? 'text-slate-450' : 'text-slate-500'}`}>
              AUTHORIZED TOOLCHAIN
            </span>
            <div className="flex flex-wrap gap-2.5">
              {info.tools.map(tool => (
                <span
                  key={tool}
                  className={`font-mono text-[9px] font-black px-3.5 py-2 rounded-xl border ${
                    isDark 
                      ? 'bg-slate-950 border-white/10 text-slate-300 hover:border-blue-500/30' 
                      : 'bg-white border-slate-200 text-slate-700 hover:border-blue-500/40 shadow-sm'
                  } transition-colors`}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Mini Portfolio Showcase */}
          <div className="space-y-4">
            <span className={`font-mono text-[8.5px] font-black uppercase tracking-wider block ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              COMPLETED DIRECTORY PREVIEWS
            </span>
            <div className="grid grid-cols-1 gap-4">
              {relatedProjects.map(proj => (
                <div
                  key={proj.id}
                  onClick={() => onSelectProject(proj.id)}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer group transition-all ${
                    isDark 
                      ? 'bg-white/[0.01] border-white/[0.04] hover:border-blue-500/30 hover:bg-white/[0.02]' 
                      : 'bg-white border-slate-100 hover:border-blue-500/40 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-10 h-10 object-cover rounded-lg shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className={`font-display text-xs font-black uppercase tracking-wide group-hover:text-blue-400 transition-colors ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {proj.title}
                      </h4>
                      <p className={`text-[9px] font-mono uppercase ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                        {proj.tech.slice(0, 2).join(' / ')}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight size={13} className="text-slate-450 group-hover:text-blue-400 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
