import React from 'react';
import { motion } from 'motion/react';
import { 
  Award, Briefcase, Calendar, ShieldCheck, MapPin, 
  Cpu, Layout, Sparkles, Star, Milestone, Radio, Terminal, Zap 
} from 'lucide-react';

export default function AboutView() {
  const stats = [
    { number: '13+', suffix: 'REPOS', label: 'DEPLOYED APPLICATIONS' },
    { number: '4+', suffix: 'YRS', label: 'ENGINEERING WORK' },
    { number: '99%', suffix: 'SECURE', label: 'THREAT BARRIER' },
    { number: '24/7', suffix: 'OPS', label: 'INTEGRATED RUNTIMES' }
  ];

  const timelineData = [
    {
      year: '2024 - PRESENT',
      role: 'Lead Full Stack & AI Architect',
      company: 'SK Cyber Solutions',
      location: 'California, US (Remote)',
      description: 'Engineering resilient containerized architectures, smart neural assistant tools, and responsive interface workflows.',
      achievements: [
        'Built full-fidelity AI core platforms syncing vector indexing channels.',
        'Structured database schemas with secure access role limits.',
        'Deployed continuous automation workflows increasing build up-times.'
      ]
    },
    {
      year: '2022 - 2024',
      role: 'Senior Software Architect',
      company: 'TechVibe Infrastructure LLC',
      location: 'Austin, TX (Hybrid)',
      description: 'Designed interactive telemetry systems, visual performance graphs, and API reverse proxy handlers.',
      achievements: [
        'Constructed custom CSS/Vite bundling models minimizing transfer weight.',
        'Configured state routing adapters preventing component rendering noise.',
        'Supervised deployment pipelines across 8 developers.'
      ]
    },
    {
      year: '2020 - 2022',
      role: 'Native Android Engineer',
      company: 'ApexMobile Systems',
      location: 'Seattle, WA (On-Site)',
      description: 'Created highly visible native Android applications, maintaining fluid layouts and background routines.',
      achievements: [
        'Implemented modern Kotlin Jetpack Compose views.',
        'Engineered offline-first SQLite databases with background data synchronizers.',
        'Reduced memory leaks by 25% via rigid Coroutines debugging.'
      ]
    }
  ];

  const corePhilosophy = [
    {
      title: 'Structural Resilience',
      icon: <Cpu className="text-cyber-cyan" size={18} />,
      desc: 'Developing fully typed architectures with zero assumptions, clean error handlers, and self-documenting logic.'
    },
    {
      title: 'Ergonomic Polish',
      icon: <Layout className="text-cyber-purple" size={18} />,
      desc: 'Formulating pristine layouts, custom dark modes, glowing responsive nodes, and micro-interactions.'
    },
    {
      title: 'Absolute Security',
      icon: <ShieldCheck className="text-cyber-emerald" size={18} />,
      desc: 'Configuring safe API reverse proxies, hiding access credentials, rate limits, and solid code validation.'
    }
  ];

  return (
    <div className="space-y-36 pb-20 select-none text-left">
      {/* Intro Banner */}
      <section className="space-y-6 max-w-3xl text-left relative">
        <div className="absolute -top-12 -left-6 w-32 h-32 bg-cyber-cyan/5 rounded-full blur-2xl pointer-events-none" />
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-display text-xs text-cyber-cyan font-extrabold tracking-[0.4em] uppercase block"
        >
          // THE OPERATING HUMAN
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl sm:text-5xl font-black tracking-tight uppercase text-white"
        >
          ENGINEERING REGISTRY
        </motion.h1>
        <div className="h-[2px] w-16 bg-gradient-to-r from-cyber-cyan to-cyber-pink mt-4 rounded-full" />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-sans text-slate-450 text-sm sm:text-base leading-relaxed pt-2"
        >
          A detailed diagnostic database covering professional operations, system architectures, and native android suites designed by Sonu Kahar. Built upon rigorous modular standards.
        </motion.p>
      </section>

      {/* Floating telemetry counters */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="cyber-panel p-6 rounded-xl text-center relative overflow-hidden"
          >
            {/* Ambient pulse dot */}
            <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-cyber-cyan rounded-full animate-ping" />
            
            <div className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight flex items-center justify-center">
              <span className="text-cyber-gradient font-black">{stat.number}</span>
              <span className="text-slate-500 font-light text-xl ml-1">{stat.suffix}</span>
            </div>
            <p className="font-display text-[9px] tracking-[0.25em] text-cyber-cyan font-bold uppercase mt-3">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* Experience Timeline */}
      <section className="space-y-12 text-left">
        <div className="space-y-3">
          <span className="font-display text-xs text-cyber-pink font-extrabold tracking-[0.4em] uppercase block">// ARCHITECTURE REGISTRY</span>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            SYSTEM CHRONOLOGY
          </h2>
        </div>

        <div className="relative border-l-2 border-cyber-cyan/15 pl-8 ml-4 space-y-16">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group space-y-4"
            >
              {/* Custom cyber timeline lock node */}
              <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-md bg-slate-950 border-2 border-cyber-cyan/40 group-hover:border-cyber-pink transition-colors flex items-center justify-center shadow-sm z-10">
                <span className="w-1.5 h-1.5 rounded-sm bg-cyber-cyan group-hover:bg-cyber-pink transition-colors" />
              </div>

              {/* Specs label */}
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-mono text-[9px] tracking-widest font-black text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/30 px-3 py-1 rounded uppercase">
                  {item.year}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium font-mono">
                  <MapPin size={12} className="text-cyber-pink" /> {item.location}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-xl font-black text-white uppercase tracking-wide group-hover:text-cyber-cyan transition-colors">
                  {item.role}
                </h3>
                <h4 className="font-display text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {item.company}
                </h4>
              </div>

              <p className="font-sans text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl pt-1">
                {item.description}
              </p>

              {/* Achievements Staggered Bullets */}
              <ul className="space-y-2.5 max-w-2xl pl-1 pt-1">
                {item.achievements.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2.5 font-sans text-xs text-slate-400">
                    <Star size={11} className="text-cyber-purple shrink-0 mt-1" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cyber philosophy card grid */}
      <section className="space-y-12 text-left">
        <div className="space-y-3">
          <span className="font-display text-xs text-cyber-cyan font-extrabold tracking-[0.4em] uppercase block">// ALGORITHM STANDARDS</span>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            ENGINEERING CODES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {corePhilosophy.map((philosophy, i) => (
            <div
              key={i}
              className="cyber-panel-interactive p-7 rounded-xl space-y-4"
            >
              <div className="p-3 bg-slate-950 rounded-lg w-fit border border-cyber-cyan/15 group-hover:border-cyber-cyan/30">
                {philosophy.icon}
              </div>
              <h4 className="font-display font-black text-slate-200 uppercase tracking-wider text-sm">{philosophy.title}</h4>
              <p className="font-sans text-xs text-slate-400 leading-relaxed">{philosophy.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
