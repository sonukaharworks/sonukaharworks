import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Eye, Sparkles, ArrowUpRight, Lock, Laptop, 
  Smartphone, Database, Palette, Layers, Globe, Shield, Terminal, Activity 
} from 'lucide-react';
import { PROJECTS } from '../data';

export default function ProjectsView() {
  const [filter, setFilter] = useState<'all' | 'Web' | 'Android' | 'Security' | 'UI/UX'>('all');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const filteredProjects = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Android': return <Smartphone className="text-cyber-cyan" size={16} />;
      case 'UI/UX': return <Palette className="text-cyber-purple" size={16} />;
      case 'Security': return <Shield className="text-cyber-pink" size={16} />;
      default: return <Globe className="text-cyber-emerald" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ONLINE': return 'text-cyber-emerald bg-cyber-emerald/10 border-cyber-emerald/30';
      case 'ACTIVE': return 'text-cyber-cyan bg-cyber-cyan/10 border-cyber-cyan/30';
      case 'ENCRYPTED': return 'text-cyber-purple bg-cyber-purple/10 border-cyber-purple/30';
      default: return 'text-cyber-pink bg-cyber-pink/10 border-cyber-pink/30';
    }
  };

  return (
    <div className="space-y-16 pb-20 select-none text-left">
      {/* Header */}
      <section className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 relative">
        <div className="absolute -top-12 -left-6 w-32 h-32 bg-cyber-cyan/5 rounded-full blur-2xl pointer-events-none" />
        <div className="space-y-4 max-w-xl text-left">
          <span className="font-display text-xs text-cyber-cyan font-extrabold tracking-[0.4em] uppercase block">// REGISTERED REPOSITORIES</span>
          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight uppercase text-white">
            SECURE PROJECTS
          </h1>
          <div className="h-[2px] w-16 bg-gradient-to-r from-cyber-cyan to-cyber-pink mt-4 rounded-full" />
          <p className="font-sans text-slate-400 text-sm sm:text-base leading-relaxed pt-2">
            A secure catalog showcasing native Android architectures, robust server modules, and responsive high-end frontends.
          </p>
        </div>

        {/* Filter Navigation Cockpit */}
        <div className="flex flex-wrap gap-2 bg-slate-950 border border-cyber-cyan/20 p-1.5 rounded-xl font-display text-[9px] font-black tracking-widest uppercase self-start lg:self-auto shadow-[0_0_15px_rgba(0,240,255,0.04)]">
          {[
            { id: 'all', label: 'ALL FILES' },
            { id: 'Web', label: 'WEB REPOS' },
            { id: 'Android', label: 'ANDROID APPS' },
            { id: 'Security', label: 'SECURITY' },
            { id: 'UI/UX', label: 'UI/UX CASES' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id as any)}
              className={`px-5 py-2.5 rounded-lg cursor-pointer transition-all duration-300 font-mono text-[9px] tracking-widest uppercase ${
                filter === btn.id 
                  ? 'bg-cyber-cyan/15 border border-cyber-cyan text-cyber-cyan shadow-[0_0_10px_rgba(0,240,255,0.2)]' 
                  : 'text-slate-550 hover:text-slate-300 border border-transparent'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid of Projects */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((proj, idx) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
            className="group cyber-panel-interactive rounded-xl overflow-hidden relative transition-all duration-300 flex flex-col justify-between h-full cursor-default"
          >
            {/* Image Wrap */}
            <div className="h-48 w-full relative overflow-hidden border-b border-cyber-cyan/10 bg-slate-950">
              <img 
                src={proj.image} 
                alt={proj.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              
              {/* Category Floating Badge */}
              <span className="absolute top-4 left-4 z-20 font-mono text-[8px] font-black tracking-widest text-cyber-cyan bg-slate-950/95 border border-cyber-cyan/30 px-3 py-1 rounded uppercase flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
                {proj.category}
              </span>

              {/* Status Indicator */}
              <span className={`absolute bottom-4 left-4 z-20 font-mono text-[8px] font-black tracking-widest border px-3 py-1 rounded uppercase ${getStatusColor(proj.status)}`}>
                {proj.status}
              </span>

              {/* Corner Technology Icon Accent */}
              <div className="absolute top-4 right-4 z-20 p-2 bg-slate-950/95 rounded-lg border border-cyber-cyan/30 text-white shadow-sm">
                {getCategoryIcon(proj.category)}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6.5 space-y-5 flex-grow flex flex-col justify-between text-left relative z-10">
              <div className="space-y-2.5">
                <h3 className="font-display text-lg font-black text-white uppercase tracking-wide group-hover:text-cyber-cyan transition-colors">
                  {proj.title}
                </h3>
                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  {proj.description}
                </p>
              </div>

              {/* Tech Tags */}
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-1.5 border-t border-cyber-cyan/10 pt-4">
                  {proj.tech.map((tech, tIdx) => (
                    <span key={tIdx} className="font-mono text-[8px] tracking-wider text-cyber-cyan bg-cyber-cyan/5 border border-cyber-cyan/20 px-2.5 py-1 rounded uppercase font-bold">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Core Action Buttons */}
                <div className="flex items-center gap-3 font-mono text-[9px] font-black tracking-widest uppercase pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(proj);
                    }}
                    className="flex-grow flex items-center justify-center gap-2 py-3 rounded-lg bg-slate-950 hover:bg-slate-900 border border-cyber-cyan/30 text-slate-300 hover:text-white transition-all cursor-pointer font-black"
                  >
                    <Eye size={12} className="text-cyber-cyan" />
                    DECRYPT INFO
                  </button>

                  <div className="flex-grow relative group/btn">
                    <button
                      disabled
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-slate-950/50 border border-cyber-pink/20 text-slate-500 cursor-not-allowed transition-all"
                    >
                      <Lock size={10} className="text-cyber-pink" />
                      LIVE LINK
                    </button>
                    
                    <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-950 border border-cyber-pink/35 text-cyber-pink text-[8px] font-black px-2.5 py-1 rounded shadow-md opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap tracking-wider">
                      COMING SOON
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ==========================================
          INTERACTIVE DETAILED OVERLAY MODAL
          ========================================== */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#010308]/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
              className="bg-slate-950 border border-cyber-cyan/40 rounded-xl max-w-2xl w-full overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.15)] flex flex-col text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Banner Graphic */}
              <div className="h-56 w-full relative bg-slate-950">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-60"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 z-20 p-2 bg-slate-950/90 border border-cyber-cyan/30 rounded-full text-slate-400 hover:text-white shadow-sm transition-all cursor-pointer"
                >
                  <X size={15} />
                </button>
                <div className="absolute bottom-5 left-6 z-20 space-y-1">
                  <span className="font-mono text-[8px] font-black tracking-widest text-cyber-cyan bg-slate-950 border border-cyber-cyan px-3 py-1 rounded uppercase">
                    {selectedProject.category}
                  </span>
                  <h2 className="font-display text-2xl font-black text-white uppercase tracking-wide pt-2">
                    {selectedProject.title}
                  </h2>
                </div>
              </div>

              {/* Modal Core Specifications body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-2.5">
                  <span className="font-mono text-[8px] font-black text-cyber-cyan tracking-widest uppercase block">// ARCHITECTURE DECODED</span>
                  <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
                  <div className="space-y-3">
                    <span className="font-mono text-[8px] font-black text-slate-500 tracking-widest uppercase block">// PARADIGMS & STACK</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tech.map((tech: string, tIdx: number) => (
                        <span key={tIdx} className="font-mono text-[8px] tracking-wider text-cyber-pink bg-cyber-pink/5 border border-cyber-pink/20 px-2.5 py-1 rounded font-bold uppercase">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="font-mono text-[8px] font-black text-slate-500 tracking-widest uppercase block">// SYSTEM SPECS</span>
                    <ul className="space-y-2">
                      {selectedProject.specs ? selectedProject.specs.map((spec: string, sIdx: number) => (
                        <li key={sIdx} className="flex items-center gap-2 font-mono text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                          <Activity size={11} className="text-cyber-cyan" />
                          <span>{spec}</span>
                        </li>
                      )) : (
                        <>
                          <li className="flex items-center gap-2 font-mono text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                            <Sparkles size={11} className="text-cyber-cyan" />
                            <span>Responsive Tested</span>
                          </li>
                          <li className="flex items-center gap-2 font-mono text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                            <Sparkles size={11} className="text-cyber-pink" />
                            <span>Clean Code Validated</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Bottom interactive actions */}
                <div className="border-t border-cyber-cyan/10 pt-6 flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-slate-950 border border-cyber-pink/30 text-cyber-pink font-mono text-[9px] font-black tracking-widest uppercase cursor-not-allowed opacity-60">
                    <Lock size={11} className="text-cyber-pink" />
                    LIVE PLATFORM INTERFACE LINK ENCRYPTED
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-full sm:w-auto px-6 py-3 rounded-lg bg-slate-900 text-white font-mono text-[9px] font-black tracking-widest uppercase hover:bg-slate-800 transition-all cursor-pointer text-center border border-cyber-cyan/30"
                  >
                    CLOSE WINDOW
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
