import React from 'react';
import { motion } from 'motion/react';
import { 
  Award, Briefcase, Calendar, ShieldCheck, MapPin, 
  Cpu, Layout, Sparkles, Star, Milestone, Zap, Database
} from 'lucide-react';

interface AboutViewProps {
  theme?: 'dark' | 'light';
}

export default function AboutView({ theme }: AboutViewProps) {
  const isDark = theme !== 'light';

  const stats = [
    { number: '4+', suffix: 'YRS', label: 'ENGINEERING WORK' },
    { number: '13+', suffix: 'REPOS', label: 'DEPLOYED APPLICATIONS' },
    { number: '99%', suffix: 'STABLE', label: 'SUCCESSFUL RELEASES' },
    { number: '24/7', suffix: 'OPS', label: 'CLOUD SYSTEM INTEGRATION' }
  ];

  const timelineData = [
    {
      year: '2024 - PRESENT',
      role: 'Lead Full-Stack Developer & App Architect',
      company: 'Sonu Kahar Software Workspace',
      location: 'India (Remote / Global)',
      description: 'Designing highly resilient mobile app structures, production-grade databases, and luxury responsive frontends for clients globally.',
      achievements: [
        'Built modern high-performance native Android apps using Kotlin and Jetpack Compose.',
        'Engineered responsive web applications in React with smooth 60 FPS page transitions.',
        'Structured Firestore database schemas with zero-compromise security rules.'
      ]
    },
    {
      year: '2022 - 2024',
      role: 'Senior Web & Mobile Engineer',
      company: 'Digital Solutions LLC',
      location: 'Hybrid / Remote',
      description: 'Crafted interactive business portals, automated dashboard layouts, and customized state management systems.',
      achievements: [
        'Optimized client web assets to achieve high speed scores and fluid mobile responsive designs.',
        'Minimized rendering lags in complex React lists via custom hook stabilizers.',
        'Integrated multi-channel payment modules and custom authentication gateways.'
      ]
    },
    {
      year: '2020 - 2022',
      role: 'Android App Developer',
      company: 'ApexMobile Apps',
      location: 'On-Site',
      description: 'Engineered clean-architecture mobile companion applications focusing on offline-first databases and material designs.',
      achievements: [
        'Developed native Java and Kotlin mobile views with offline SQLite/Room caches.',
        'Constructed background alarm sync synchronizers and biometrics login guards.',
        'Successfully deployed and maintained 6+ apps in the Google Play Store.'
      ]
    }
  ];

  const corePhilosophy = [
    {
      title: 'Clean Architecture',
      icon: <Cpu className={isDark ? 'text-blue-400' : 'text-blue-600'} size={18} />,
      desc: 'Developing fully typed, scalable codebases utilizing solid MVVM design principles with zero guess-work or assumptions.'
    },
    {
      title: 'Aesthetic Ergonomics',
      icon: <Layout className={isDark ? 'text-purple-400' : 'text-purple-600'} size={18} />,
      desc: 'Formulating eye-pleasing, glassmorphic interfaces with balanced negative space, high contrast, and smooth transitions.'
    },
    {
      title: 'Robust Integrations',
      icon: <Database className={isDark ? 'text-emerald-400' : 'text-emerald-600'} size={18} />,
      desc: 'Building reliable third-party connections and server-side logic APIs to support seamless mobile and web communication.'
    }
  ];

  return (
    <div className="space-y-32 pb-16 text-left select-none relative">
      
      {/* Dynamic Background Light */}
      <div className="absolute top-1/4 left-10 w-44 h-44 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Intro Banner */}
      <section className="space-y-5 max-w-3xl text-left relative">
        <span className={`font-mono text-xs ${isDark ? 'text-blue-400' : 'text-blue-600'} font-extrabold tracking-[0.3em] uppercase block`}>
          ⭐ The Software Engineer
        </span>
        <h1 className={`font-display text-3xl sm:text-5xl font-black tracking-tight uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
          About Sonu Kahar
        </h1>
        <div className="h-[2px] w-16 bg-gradient-to-r from-blue-500 to-purple-500 mt-4 rounded-full" />
        <p className={`font-sans ${isDark ? 'text-slate-350' : 'text-slate-650'} text-xs sm:text-sm leading-relaxed pt-2 font-light`}>
          I am a dedicated software engineer with a track record of compiling and shipping premium, production-ready applications. My expertise spans native mobile development and responsive React ecosystems, built around clean structures, high usability, and bulletproof security.
        </p>
      </section>

      {/* Statistics counters */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`border rounded-2xl text-center relative overflow-hidden p-6 ${
              isDark ? 'border-white/[0.06] bg-white/[0.01] backdrop-blur-md' : 'bg-white border-slate-200'
            }`}
          >
            {/* Ambient visual indicator */}
            <span className={`absolute top-3 right-3 w-1.5 h-1.5 rounded-full animate-pulse ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`} />
            
            <div className="font-display text-3xl sm:text-4xl font-black tracking-tight flex items-center justify-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{stat.number}</span>
              <span className={`font-light text-base ml-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{stat.suffix}</span>
            </div>
            <p className={`font-mono text-[8px] tracking-[0.2em] font-bold uppercase mt-3.5 ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}>{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* Experience Timeline */}
      <section className="space-y-10 text-left">
        <div className="space-y-3">
          <span className="font-mono text-xs text-purple-400 font-extrabold tracking-[0.3em] uppercase block">
            ⚡ Career Milestones
          </span>
          <h2 className={`font-display text-2xl sm:text-3xl font-black uppercase tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Professional Chronology
          </h2>
          <div className="h-[2px] w-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
        </div>

        <div className={`relative border-l-2 pl-6 sm:pl-8 ml-3 sm:ml-4 space-y-12 ${
          isDark ? 'border-white/[0.06]' : 'border-slate-200'
        }`}>
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative group space-y-3"
            >
              {/* Chronology timeline node */}
              <div className={`absolute -left-[35px] sm:-left-[41px] top-1 w-5 h-5 rounded border-2 transition-colors flex items-center justify-center shadow-sm z-10 ${
                isDark ? 'bg-slate-950 border-white/[0.12] group-hover:border-blue-500' : 'bg-white border-slate-300 group-hover:border-blue-600'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-sm transition-colors ${
                  isDark ? 'bg-slate-500 group-hover:bg-blue-400' : 'bg-slate-300 group-hover:bg-blue-600'
                }`} />
              </div>

              {/* Specs label */}
              <div className="flex flex-wrap items-center gap-3">
                <span className={`font-mono text-[8.5px] tracking-widest font-black px-2.5 py-0.5 rounded uppercase border ${
                  isDark ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' : 'text-blue-700 bg-blue-50 border-blue-200'
                }`}>
                  {item.year}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                  <MapPin size={10} className="text-purple-400" /> {item.location}
                </span>
              </div>

              <div className="space-y-0.5">
                <h3 className={`font-display text-lg font-black uppercase tracking-wide transition-colors ${
                  isDark ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'
                }`}>
                  {item.role}
                </h3>
                <h4 className="font-mono text-[9px] font-black text-slate-500 uppercase tracking-widest">
                  {item.company}
                </h4>
              </div>

              <p className={`font-sans text-xs sm:text-sm leading-relaxed max-w-2xl font-light ${
                isDark ? 'text-slate-400' : 'text-slate-650'
              }`}>
                {item.description}
              </p>

              {/* Achievements Bullets */}
              <ul className="space-y-2 max-w-2xl pl-1 pt-1">
                {item.achievements.map((bullet, i) => (
                  <li key={i} className={`flex items-start gap-2 font-sans text-xs font-light ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    <Star size={11} className="text-purple-500 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core philosophy cards */}
      <section className="space-y-10 text-left">
        <div className="space-y-3">
          <span className="font-mono text-xs text-emerald-400 font-extrabold tracking-[0.3em] uppercase block">
            🛡️ Core Philosophy
          </span>
          <h2 className={`font-display text-2xl sm:text-3xl font-black uppercase tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            How We Build Software
          </h2>
          <div className="h-[2px] w-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {corePhilosophy.map((phil, i) => (
            <div
              key={i}
              className={`border p-6 rounded-2xl space-y-3.5 shadow-md ${
                isDark ? 'border-white/[0.06] bg-white/[0.01]' : 'bg-white border-slate-200'
              }`}
            >
              <div className={`p-3 border rounded-xl w-fit ${
                isDark ? 'bg-slate-950 border-white/[0.06] text-blue-400' : 'bg-slate-50 border-slate-200 text-blue-600'
              }`}>
                {phil.icon}
              </div>
              <h4 className={`font-display font-black uppercase tracking-wider text-xs ${
                isDark ? 'text-slate-200' : 'text-slate-800'
              }`}>{phil.title}</h4>
              <p className={`font-sans text-xs leading-relaxed font-light ${
                isDark ? 'text-slate-400' : 'text-slate-605'
              }`}>{phil.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
