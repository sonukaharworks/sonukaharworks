import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowUpRight, Cpu } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  category: 'Android App' | 'Website';
  image: string;
  description: string;
  tech: string[];
}

interface PortfolioViewProps {
  theme: 'dark' | 'light';
  onSelectProject: (id: string) => void;
}

export default function PortfolioView({ theme, onSelectProject }: PortfolioViewProps) {
  const isDark = theme === 'dark';

  const premiumProjects: ProjectItem[] = [
    {
      id: 'p1',
      title: 'Secure Android Suite',
      category: 'Android App',
      image: 'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?auto=format&fit=crop&q=80&w=800',
      description: 'High-performance offline-first native Android app with biometric authentication, background sync adapters, and a military-grade encrypted local SQL storage layer.',
      tech: ['Kotlin', 'Coroutines', 'Room DB', 'Jetpack Compose', 'Biometrics API']
    },
    {
      id: 'p3',
      title: 'Cyber Security Dashboard',
      category: 'Website',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
      description: 'Real-time threat telemetry monitor visualizing active node IPs, socket payloads, dynamic threat level indicators, and encrypted transaction registries.',
      tech: ['React', 'D3.js', 'WebSockets', 'Tailwind CSS', 'Express.js']
    },
    {
      id: 'p2',
      title: 'Neural Assistant AI',
      category: 'Website',
      image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=800',
      description: 'Futuristic AI neural workspace integrating smart context vector embeddings, dynamic semantic maps, and responsive layout flows.',
      tech: ['React', 'TypeScript', 'Node.js', 'Vector DB', 'Framer Motion']
    },
    {
      id: 'p13',
      title: 'Secure Android Banking',
      category: 'Android App',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&q=80&w=800',
      description: 'High-security mobile banking companion layout implementing advanced secure SSL pinning, device anti-tamper modules, and root detection protocols.',
      tech: ['Kotlin', 'Compose', 'Coroutines', 'Retrofit', 'SSL Pinning']
    }
  ];

  return (
    <div className="space-y-16 pb-20 select-none text-left">
      {/* Portfolio Header */}
      <section className="space-y-6 max-w-3xl relative">
        <div className={`absolute -top-12 -left-6 w-32 h-32 ${isDark ? 'bg-blue-500/5' : 'bg-blue-500/10'} rounded-full blur-2xl pointer-events-none`} />
        <span className={`font-mono text-xs ${isDark ? 'text-blue-400' : 'text-blue-600'} font-extrabold tracking-[0.4em] uppercase block`}>
          // DECRYPTED EVIDENCE ARCHIVE
        </span>
        <h1 className={`font-display text-3xl sm:text-5xl font-black tracking-tight uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
          PREMIUM PORTFOLIO
        </h1>
        <div className={`h-[2px] w-16 bg-gradient-to-r ${isDark ? 'from-blue-500 to-purple-500' : 'from-blue-600 to-indigo-600'} mt-4 rounded-full`} />
        <p className={`font-sans ${isDark ? 'text-slate-400' : 'text-slate-650'} text-xs sm:text-sm leading-relaxed pt-2`}>
          A curated collection of verified software products built with industry-grade reliability, secure network proxies, and pixel-perfect layouts. No placeholders or template reuse.
        </p>
      </section>

      {/* Glass Project Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {premiumProjects.map((proj, idx) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`relative rounded-3xl border overflow-hidden transition-all duration-300 group flex flex-col justify-between ${
              isDark 
                ? 'bg-white/[0.01] border-white/[0.06] hover:border-blue-500/30 hover:bg-white/[0.02] shadow-[0_12px_40px_rgba(0,0,0,0.5)]'
                : 'bg-white border-slate-200 hover:border-blue-500/40 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] shadow-sm'
            }`}
          >
            {/* Project Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              
              {/* Category tag */}
              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-white/10 px-3.5 py-1 rounded-full">
                <span className="font-mono text-[8px] font-black tracking-widest uppercase text-blue-400">
                  {proj.category}
                </span>
              </div>
            </div>

            {/* Project Copy */}
            <div className="p-6 sm:p-8 space-y-5 flex-grow flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className={`font-display text-base sm:text-lg font-black uppercase tracking-wide group-hover:text-blue-400 transition-colors ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {proj.title}
                </h3>
                <p className={`font-sans text-[11.5px] leading-relaxed ${isDark ? 'text-slate-350' : 'text-slate-650'}`}>
                  {proj.description}
                </p>
              </div>

              {/* Technologies List */}
              <div className="space-y-4 pt-3 border-t border-slate-100 dark:border-white/[0.04] mt-auto">
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className={`font-mono text-[8.5px] font-bold px-2.5 py-1 rounded-md border ${
                        isDark 
                          ? 'bg-slate-950 border-white/5 text-slate-400' 
                          : 'bg-slate-50 border-slate-150 text-slate-600'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* View Details CTA */}
                <button
                  onClick={() => onSelectProject(proj.id)}
                  className={`w-full py-2.5 rounded-xl font-mono text-[9px] font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                    isDark 
                      ? 'bg-white/[0.02] border border-white/[0.08] hover:border-blue-500/30 text-slate-300 hover:text-white' 
                      : 'bg-slate-100 border border-slate-200/60 hover:border-blue-500/40 text-slate-700 hover:text-slate-900 shadow-sm'
                  }`}
                >
                  VIEW SPECIFICATION DETAILS
                  <ArrowUpRight size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
