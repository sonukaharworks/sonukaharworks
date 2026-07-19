import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Cpu, Shield, ExternalLink, Calendar, CheckCircle2, MessageSquare } from 'lucide-react';
import { Project } from '../data';

interface ProjectDetailsViewProps {
  project: Project;
  theme: 'dark' | 'light';
  onBack: () => void;
  onInquire: (projectName: string) => void;
}

export default function ProjectDetailsView({ project, theme, onBack, onInquire }: ProjectDetailsViewProps) {
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="space-y-12 pb-20 select-none text-left"
    >
      {/* Back navigation button */}
      <button
        onClick={onBack}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[9.5px] font-mono font-black uppercase tracking-widest transition-all cursor-pointer border ${
          isDark 
            ? 'bg-white/[0.02] border-white/10 hover:border-blue-500/30 text-slate-400 hover:text-white' 
            : 'bg-slate-150 border-slate-200 hover:border-blue-500/30 text-slate-600 hover:text-slate-900'
        }`}
      >
        <ArrowLeft size={13} />
        BACK TO DIRECTORY
      </button>

      {/* Main Grid: Hifi Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Capture */}
        <div className="lg:col-span-7 space-y-6">
          <div className={`relative rounded-3xl overflow-hidden border p-2.5 ${
            isDark ? 'bg-slate-950 border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.8)]' : 'bg-slate-100 border-slate-200 shadow-lg'
          }`}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto aspect-[16/10] object-cover rounded-2xl"
              referrerPolicy="no-referrer"
            />
            {/* Status Indicator */}
            <div className="absolute top-6 right-6 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <span className={`w-2 h-2 rounded-full animate-ping ${
                project.status === 'ONLINE' || project.status === 'ACTIVE' ? 'bg-emerald-400' : 'bg-yellow-400'
              }`} />
              <span className="font-mono text-[8px] font-black text-white uppercase tracking-wider">{project.status}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Specification readout */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <span className={`font-mono text-xs ${isDark ? 'text-blue-400' : 'text-blue-600'} font-extrabold tracking-[0.3em] uppercase block`}>
              {project.category} SPECIFICATION
            </span>
            <h1 className={`font-display text-2xl sm:text-4xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {project.title}
            </h1>
            <div className={`h-[2px] w-14 bg-gradient-to-r ${isDark ? 'from-blue-500 to-purple-500' : 'from-blue-600 to-indigo-600'} mt-3 rounded-full`} />
          </div>

          <p className={`font-sans text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-755'}`}>
            {project.description}
          </p>

          {/* Key Technologies used */}
          <div className="space-y-3 pt-2">
            <span className={`font-mono text-[8.5px] font-black uppercase tracking-wider block ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              CORE TECHNOLOGIES
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tc) => (
                <span
                  key={tc}
                  className={`font-mono text-[8.5px] font-black px-3 py-1.5 rounded-lg border ${
                    isDark 
                      ? 'bg-white/[0.02] border-white/[0.06] text-blue-300' 
                      : 'bg-blue-50/50 border-blue-100 text-blue-700'
                  }`}
                >
                  {tc}
                </span>
              ))}
            </div>
          </div>

          {/* Engineering Specifications */}
          <div className="space-y-3 pt-2">
            <span className={`font-mono text-[8.5px] font-black uppercase tracking-wider block ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              DEPLOYMENT METRICS
            </span>
            <div className="space-y-2">
              {project.specs.map((sp, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-3 rounded-xl border ${
                    isDark ? 'bg-white/[0.01] border-white/[0.04]' : 'bg-slate-50 border-slate-100'
                  }`}
                >
                  <CheckCircle2 size={12} className={isDark ? 'text-emerald-400' : 'text-emerald-600'} />
                  <span className={`font-mono text-[10px] uppercase font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{sp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => onInquire(project.title)}
              className="flex-grow py-3.5 px-6 rounded-xl font-mono text-[9px] font-black tracking-widest uppercase transition-all duration-300 cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] border border-indigo-500/30 flex items-center justify-center gap-2"
            >
              <MessageSquare size={12} />
              INQUIRE ABOUT THIS SYSTEM
            </button>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className={`px-6 py-3.5 rounded-xl font-mono text-[9px] font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 border ${
                  isDark 
                    ? 'bg-slate-950 border-white/10 hover:border-blue-500/30 text-slate-300 hover:text-white' 
                    : 'bg-white border-slate-200 hover:border-blue-500/40 text-slate-700 hover:text-slate-900 shadow-sm'
                }`}
              >
                DEPLOY PREVIEW
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
