import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Layers, Mail, DollarSign } from 'lucide-react';

interface HomeViewProps {
  theme?: 'dark' | 'light';
  onNavigate: (view: 'home' | 'about' | 'services' | 'pricing' | 'projects' | 'portfolio' | 'testimonials' | 'process' | 'faq' | 'contact') => void;
}

export default function HomeView({ theme, onNavigate }: HomeViewProps) {
  const isDark = theme !== 'light';

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 relative select-none">
      {/* Soft, non-glaring background lights (Apple/Stripe style) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full ambient-glow-blue opacity-50 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full ambient-glow-purple opacity-40 pointer-events-none z-0" />

      <div className="max-w-3xl mx-auto space-y-10 relative z-10 py-12">
        {/* Simple elegant top label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[10px] font-semibold tracking-wider uppercase border ${
            isDark 
              ? 'bg-white/[0.02] border-white/10 text-slate-400' 
              : 'bg-slate-100 border-slate-200 text-slate-600'
          }`}
        >
          <Sparkles size={11} className="text-blue-500" />
          <span>Professional Workspace</span>
        </motion.div>

        {/* Hero Headlines */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`font-display text-5xl sm:text-7xl font-bold tracking-tight uppercase ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            SONU KAHAR
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 font-mono text-xs sm:text-sm tracking-widest font-bold uppercase ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}
          >
            <span>Software Engineer</span>
            <span className="hidden sm:inline text-slate-600">&bull;</span>
            <span>Android App Developer</span>
            <span className="hidden sm:inline text-slate-600">&bull;</span>
            <span>Website Developer</span>
          </motion.div>
        </div>

        {/* Short Professional Introduction */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`font-sans text-base sm:text-lg leading-relaxed font-light max-w-2xl mx-auto ${
            isDark ? 'text-slate-350' : 'text-slate-600'
          }`}
        >
          I design and compile clean, premium web ecosystems and native mobile applications. Committed to architectural integrity, elegant typography, responsive performance, and bulletproof deployment frameworks.
        </motion.p>

        {/* The requested 3 buttons: View Services, Contact Me, Pricing. Nothing else. */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
        >
          {/* View Services */}
          <button
            onClick={() => onNavigate('services')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-mono text-[10px] font-bold tracking-widest uppercase bg-blue-600 hover:bg-blue-700 text-white transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-blue-500/10"
          >
            <Layers size={13} />
            View Services
          </button>

          {/* Contact Me */}
          <button
            onClick={() => onNavigate('contact')}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-mono text-[10px] font-bold tracking-widest uppercase border transition-all cursor-pointer flex items-center justify-center gap-2 ${
              isDark 
                ? 'bg-white/[0.02] hover:bg-white/[0.06] text-white border-white/[0.08] hover:border-white/20' 
                : 'bg-white hover:bg-slate-50 text-slate-850 border-slate-200'
            }`}
          >
            <Mail size={13} />
            Contact Me
          </button>

          {/* Pricing */}
          <button
            onClick={() => onNavigate('pricing')}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-mono text-[10px] font-bold tracking-widest uppercase border transition-all cursor-pointer flex items-center justify-center gap-2 ${
              isDark 
                ? 'bg-white/[0.01] hover:bg-white/[0.04] text-slate-300 border-white/[0.06] hover:border-white/15' 
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/80'
            }`}
          >
            <DollarSign size={13} />
            Pricing
          </button>
        </motion.div>
      </div>
    </div>
  );
}
