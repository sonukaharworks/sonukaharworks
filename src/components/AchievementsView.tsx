import React from 'react';
import { motion } from 'motion/react';
import { Award, Shield, Target, Cpu, CheckCircle2, ChevronRight, Zap, Star } from 'lucide-react';

export default function AchievementsView() {
  const credentials = [
    {
      title: 'Cloud Workspace Integration Specialist',
      authority: 'CLOUD DEVELOPER SYSTEMS',
      desc: 'Recognized specialization in designing server-side OAuth2 protocols, multi-service calendar queries, and secured sheets pipelines.',
      date: 'OCT 2025',
      icon: <Award className="text-cyan-400" size={22} />,
      color: '#00e5ff',
      badge: 'VERIFIED_OK'
    },
    {
      title: 'Performance Matrix Optimization (99.9% efficiency)',
      authority: 'SK STUDIO BENCHMARK LABS',
      desc: 'Optimized high-performance Canvas loops, web worker message arrays, and state trees to guarantee 60fps execution profiles.',
      date: 'AUG 2025',
      icon: <Zap className="text-purple-400" size={22} />,
      color: '#8b5cf6',
      badge: 'PERF_ELITE'
    },
    {
      title: 'Top 1% React Core Architect Honors',
      authority: 'FULL STACK CONSORTIUM',
      desc: 'Honors for pristine component design, asynchronous hook encapsulation, memoization setups, and modular UI structure development.',
      date: 'JUN 2025',
      icon: <Star className="text-emerald-400" size={22} />,
      color: '#10b981',
      badge: 'GOLD_TIER'
    },
    {
      title: 'Android Ecosystem Star (Kotlin Compose)',
      authority: 'MOBILE ENGINEERING FORUM',
      desc: 'Achievement for designing responsive declarative views, coroutines structures, and optimized local relational database pools.',
      date: 'FEB 2025',
      icon: <Cpu className="text-pink-400" size={22} />,
      color: '#ec4899',
      badge: 'CORE_MOBILE'
    }
  ];

  return (
    <div className="space-y-24">
      {/* Achievements Header */}
      <section className="space-y-6 max-w-3xl">
        <span className="font-mono text-xs text-cyan-400 font-bold tracking-[0.4em] uppercase block">// RECOGNITIONS SYSTEM DECK</span>
        <h1 className="font-sans text-3xl sm:text-5xl font-black tracking-tight uppercase text-white">
          ACHIEVEMENTS & CREDENTIALS
        </h1>
        <div className="h-[2px] w-16 bg-cyan-400 mt-4" />
        <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed pt-2">
          A collection of verified credentials, performance benchmarks, and industry recognitions accumulated by Sonu Kahar.
        </p>
      </section>

      {/* Grid of Achievements */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {credentials.map((cred, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            className="group bg-white/[0.01] border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between aspect-[1.3] relative overflow-hidden shadow-xl hover:border-cyan-400/25 transition-all duration-300"
          >
            {/* Glowing spot background */}
            <div 
              className="absolute -top-12 -right-12 w-28 h-28 blur-3xl pointer-events-none opacity-20"
              style={{ background: `radial-gradient(circle, ${cred.color} 0%, transparent 75%)` }}
            />

            <div className="space-y-4 text-left">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-white/10 transition-colors">
                  {cred.icon}
                </div>
                <span 
                  className="font-mono text-[8px] font-black px-2 py-0.5 rounded tracking-widest uppercase border"
                  style={{ backgroundColor: `${cred.color}10`, borderColor: `${cred.color}25`, color: cred.color }}
                >
                  {cred.badge}
                </span>
              </div>

              <span className="font-mono text-[8px] text-slate-500 font-bold tracking-widest uppercase block">
                {cred.authority} // APPROVED ON: {cred.date}
              </span>

              <h3 className="font-sans text-lg sm:text-xl font-black text-white uppercase tracking-wide group-hover:text-cyan-300 transition-colors">
                {cred.title}
              </h3>

              <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
                {cred.desc}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-6 border-t border-white/5 mt-6 font-mono text-[8px] text-slate-500 uppercase tracking-widest">
              <CheckCircle2 size={12} className="text-emerald-400" />
              <span>VERIFIED DEPLOYMENT CONTRACT SECURE</span>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Benchmarks telemetry log row */}
      <section className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 space-y-6 text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-cyan-400/10 to-transparent blur-xl pointer-events-none" />

        <div className="space-y-2">
          <span className="font-mono text-[10px] text-cyan-400 font-bold tracking-[0.4em] uppercase block">// RUNTIME PERFORMANCE METRICS</span>
          <h3 className="font-sans text-xl font-black text-white uppercase tracking-wide">SYSTEM EFFICIENCY TARGETS</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 font-mono text-[10px] text-slate-500 tracking-widest">
          <div className="space-y-1">
            <span>CORE_LATENCY</span>
            <div className="text-white font-sans text-xl sm:text-2xl font-black tracking-tight text-cyan-400">0.02ms</div>
          </div>
          <div className="space-y-1">
            <span>UI_REFRESH_RATE</span>
            <div className="text-white font-sans text-xl sm:text-2xl font-black tracking-tight text-purple-400">60 FPS</div>
          </div>
          <div className="space-y-1">
            <span>MEM_UTILIZATION</span>
            <div className="text-white font-sans text-xl sm:text-2xl font-black tracking-tight text-emerald-400">12.4 MB</div>
          </div>
          <div className="space-y-1">
            <span>UPTIME_METRIC</span>
            <div className="text-white font-sans text-xl sm:text-2xl font-black tracking-tight text-pink-400">99.99%</div>
          </div>
        </div>
      </section>
    </div>
  );
}
