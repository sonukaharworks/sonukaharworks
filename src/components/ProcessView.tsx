import React from 'react';
import { motion } from 'motion/react';
import { Clipboard, ShieldAlert, Cpu, CheckCircle2, ChevronRight, Activity } from 'lucide-react';

interface ProcessViewProps {
  theme: 'dark' | 'light';
}

export default function ProcessView({ theme }: ProcessViewProps) {
  const isDark = theme === 'dark';

  const steps = [
    {
      step: '01',
      title: 'Scoping & System Audit',
      subtitle: 'COMPLETED IN HOURS',
      icon: <Clipboard size={22} className={isDark ? 'text-blue-400' : 'text-blue-600'} />,
      desc: 'We analyze your system requirements and build secure architecture maps with strict input/output specifications, budget boundaries, and timeline parameters.',
      metrics: 'Zero hidden cost scope'
    },
    {
      step: '02',
      title: 'Hifi Visual Mockups',
      subtitle: '2-3 DAYS DELIVERY',
      icon: <ShieldAlert size={22} className={isDark ? 'text-purple-400' : 'text-purple-600'} />,
      desc: 'Formulating gorgeous dark-mode and light-mode designs with luxury typography, balanced negative space, custom icons, and fluid interactive animations.',
      metrics: 'Figma pixel precision'
    },
    {
      step: '03',
      title: 'Modular Development',
      subtitle: '7-14 DAYS SPEED',
      icon: <Cpu size={22} className={isDark ? 'text-pink-400' : 'text-pink-600'} />,
      desc: 'Developing fully typed structures using React, Kotlin, or TypeScript with zero infinite re-render bugs, absolute state safety, and rigid validation protocols.',
      metrics: '100% Type-safe code'
    },
    {
      step: '04',
      title: 'Audit & Launch Relay',
      subtitle: 'SAME DAY DEPLOY',
      icon: <CheckCircle2 size={22} className={isDark ? 'text-emerald-400' : 'text-emerald-600'} />,
      desc: 'Continuous performance auditing using Lighthouse and strict compiler lint testing. Deploying clean, minimized client bundles directly to safe, scalable runtimes.',
      metrics: '99% Lighthouse target'
    }
  ];

  return (
    <div className="space-y-16 pb-20 select-none text-left">
      {/* Process Header */}
      <section className="space-y-6 max-w-3xl relative">
        <div className={`absolute -top-12 -left-6 w-32 h-32 ${isDark ? 'bg-purple-500/5' : 'bg-purple-500/10'} rounded-full blur-2xl pointer-events-none`} />
        <span className={`font-mono text-xs ${isDark ? 'text-purple-400' : 'text-purple-600'} font-extrabold tracking-[0.4em] uppercase block`}>
          // DEPLOYMENT LIFECYCLE
        </span>
        <h1 className={`font-display text-3xl sm:text-5xl font-black tracking-tight uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
          MY DEVELOPMENT PROCESS
        </h1>
        <div className={`h-[2px] w-16 bg-gradient-to-r ${isDark ? 'from-purple-500 to-indigo-500' : 'from-purple-600 to-indigo-600'} mt-4 rounded-full`} />
        <p className={`font-sans ${isDark ? 'text-slate-400' : 'text-slate-650'} text-xs sm:text-sm leading-relaxed pt-2`}>
          A robust 4-stage systematic engine delivering fast development turnarounds without sacrificing visual aesthetic, logical type-safety, or performance limits.
        </p>
      </section>

      {/* Horizontal or Vertical step timelines depending on screen */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((st, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.15 }}
            className={`relative p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 ${
              isDark 
                ? 'bg-white/[0.01] border-white/[0.06] hover:border-purple-500/30 hover:bg-white/[0.02] shadow-[0_12px_40px_rgba(0,0,0,0.5)]'
                : 'bg-white border-slate-200 hover:border-purple-500/40 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] shadow-sm'
            }`}
          >
            {/* Step Number Badge */}
            <div className="absolute top-4 right-5 font-display font-black text-3xl opacity-10 tracking-widest text-slate-500 select-none">
              {st.step}
            </div>

            <div className="space-y-6 relative z-10">
              <div className="p-3 bg-slate-100 rounded-xl w-fit border border-transparent dark:bg-slate-950 dark:border-white/5 shadow-sm">
                {st.icon}
              </div>

              <div className="space-y-1.5">
                <span className={`text-[8.5px] font-mono tracking-widest font-black uppercase ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                  {st.subtitle}
                </span>
                <h3 className={`font-display text-base font-black uppercase tracking-wide ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {st.title}
                </h3>
              </div>

              <p className={`font-sans text-[11.5px] leading-relaxed ${isDark ? 'text-slate-350' : 'text-slate-600'}`}>
                {st.desc}
              </p>
            </div>

            <div className={`mt-6 pt-4 border-t flex items-center justify-between text-[9px] font-mono uppercase font-black ${
              isDark ? 'border-white/[0.05] text-slate-500' : 'border-slate-100 text-slate-500'
            }`}>
              <div className="flex items-center gap-1">
                <Activity size={10} className={isDark ? 'text-purple-400' : 'text-purple-600'} />
                <span>METRIC: {st.metrics}</span>
              </div>
              <ChevronRight size={12} className={isDark ? 'text-slate-600' : 'text-slate-400'} />
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
