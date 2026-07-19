import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, ShieldAlert, Sparkles, Clock, MessageSquare } from 'lucide-react';

interface PackageDetailsViewProps {
  packageName: string;
  packagePrice: string;
  theme: 'dark' | 'light';
  onBack: () => void;
  onInquire: (packageName: string, packagePrice: string) => void;
}

export default function PackageDetailsView({ packageName, packagePrice, theme, onBack, onInquire }: PackageDetailsViewProps) {
  const isDark = theme === 'dark';

  // Determine specific details based on package name
  const isAndroid = packageName.toLowerCase().includes('android') || packageName.toLowerCase().includes('app');
  const isCustom = packageName.toLowerCase().includes('custom');

  const detailedFeatures = [
    'Fully custom layouts styled from scratch (no repeated themes)',
    '100% responsive cross-device fluid performance',
    'Rigid inputs validation & clean contact form integrations',
    'Minified code optimization targeting high Lighthouse scores',
    isAndroid ? 'Secure Android Keystore certified sign-off release bundle' : 'On-page SEO routing configuration ready',
    isCustom ? 'Dedicated priority direct support channel' : 'Staged milestones review staging URLs'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="space-y-12 pb-20 select-none text-left"
    >
      {/* Back button */}
      <button
        onClick={onBack}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[9.5px] font-mono font-black uppercase tracking-widest transition-all cursor-pointer border ${
          isDark 
            ? 'bg-white/[0.02] border-white/10 hover:border-blue-500/30 text-slate-400 hover:text-white' 
            : 'bg-slate-150 border-slate-200 hover:border-blue-500/30 text-slate-600 hover:text-slate-900'
        }`}
      >
        <ArrowLeft size={13} />
        BACK TO PRICING
      </button>

      {/* Package details layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Specs List */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <span className={`font-mono text-xs ${isDark ? 'text-indigo-400' : 'text-indigo-600'} font-extrabold tracking-[0.3em] uppercase block`}>
              INVESTMENT SPECIFICATION
            </span>
            <h1 className={`font-display text-2xl sm:text-4xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {packageName}
            </h1>
            <div className="flex items-baseline gap-2 pt-1.5">
              <span className={`font-display text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {packagePrice}
              </span>
              <span className={`font-mono text-[9px] uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                &middot; FIXED INVESTMENT TIER
              </span>
            </div>
            <div className={`h-[2px] w-14 bg-gradient-to-r ${isDark ? 'from-indigo-500 to-purple-500' : 'from-indigo-600 to-purple-600'} mt-4 rounded-full`} />
          </div>

          <p className={`font-sans text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
            This high-fidelity engineering package is designed to deploy a completely customized, high-performance solution that satisfies professional security audits and provides a smooth client interface.
          </p>

          {/* SLA Features list */}
          <div className="space-y-3.5 pt-4">
            <span className={`font-mono text-[8.5px] font-black uppercase tracking-wider block ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              INCLUDED ARCHITECTURAL PARAMETERS
            </span>
            <div className="space-y-3">
              {detailedFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 size={13} className={`shrink-0 mt-0.5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  <span className={`font-sans text-xs ${isDark ? 'text-slate-350' : 'text-slate-700'}`}>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Time / SLA card & CTA */}
        <div className="lg:col-span-5 space-y-6">
          {/* Timeline SLA Card */}
          <div className={`p-6 sm:p-7 rounded-2xl border ${
            isDark ? 'bg-[#0b091c]/55 border-white/[0.06]' : 'bg-slate-50 border-slate-200'
          } space-y-4`}>
            <span className={`font-mono text-[9px] tracking-widest font-black uppercase block ${isDark ? 'text-slate-450' : 'text-slate-500'}`}>
              DELIVERY EXPECTATIONS
            </span>
            <div className="flex items-center gap-3">
              <Clock className={isDark ? 'text-indigo-400' : 'text-indigo-600'} size={20} />
              <div>
                <span className={`font-display text-xs font-black uppercase block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {isCustom ? 'FLEXIBLE SCHEDULES' : isAndroid ? '7-14 DAYS TOTAL' : '3-7 DAYS TOTAL'}
                </span>
                <span className={`font-mono text-[8.5px] uppercase block ${isDark ? 'text-slate-500' : 'text-slate-550'}`}>
                  ESTIMATED COMPILATION SPEED
                </span>
              </div>
            </div>

            <div className={`pt-4 border-t ${isDark ? 'border-white/[0.05]' : 'border-slate-200/50'} space-y-2.5`}>
              <div className="flex justify-between items-center text-[10px] font-mono uppercase">
                <span className="text-slate-500">Staging Checkpoints</span>
                <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Included</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono uppercase">
                <span className="text-slate-500">Source Code Release</span>
                <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Authorized</span>
              </div>
            </div>
          </div>

          {/* Main Action Form Link */}
          <button
            onClick={() => onInquire(packageName, packagePrice)}
            className="w-full py-4 px-6 rounded-xl font-mono text-[9.5px] font-black tracking-widest uppercase transition-all duration-300 cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] border border-indigo-500/30 flex items-center justify-center gap-2"
          >
            <MessageSquare size={12} />
            ORDER THIS PACKAGE
          </button>
        </div>
      </div>
    </motion.div>
  );
}
