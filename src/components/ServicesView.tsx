import React from 'react';
import { motion } from 'motion/react';
import { 
  Smartphone, Globe, Layers, Briefcase, ShieldCheck, 
  LayoutDashboard, Cpu, Palette, Network, Zap, ArrowUpRight 
} from 'lucide-react';

export default function ServicesView() {
  const customServices = [
    {
      id: 'srv-1',
      title: 'Native Android Cryptography',
      desc: 'Formulating high-performance mobile architectures in Kotlin, employing encrypted Keystore parameters, Biometric authentication gateways, and secure offline-first Room databases.',
      icon: <Smartphone size={22} className="text-cyber-cyan" />,
      tag: 'MOBILE CORE'
    },
    {
      id: 'srv-2',
      title: 'Secure Full Stack Operations',
      desc: 'Constructing robust Express microservices, relational PostgreSQL structures, strict CORS policies, JWT validation modules, and automated rate-limiting guards.',
      icon: <Globe size={22} className="text-cyber-pink" />,
      tag: 'CLOUD BACKEND'
    },
    {
      id: 'srv-3',
      title: 'Holographic User Interfaces',
      desc: 'Building responsive frontend single-page web assets using React 19, custom GPU-accelerated motion loops, and clean layout geometry at a locked 60fps.',
      icon: <Layers size={22} className="text-cyber-purple" />,
      tag: 'CLIENT PORTAL'
    },
    {
      id: 'srv-4',
      title: 'AI-Powered Orchestrators',
      desc: 'Deploying secure automated LLM agent wrappers, vector retrieval pipelines, semantic routing algorithms, and custom backend proxies to protect API endpoints.',
      icon: <Cpu size={22} className="text-cyber-emerald" />,
      tag: 'NEURAL INFRA'
    }
  ];

  return (
    <div className="space-y-36 pb-20 select-none text-left">
      {/* Services Header */}
      <section className="space-y-6 max-w-3xl text-left relative">
        <div className="absolute -top-12 -left-6 w-32 h-32 bg-cyber-pink/5 rounded-full blur-2xl pointer-events-none" />
        <span className="font-display text-xs text-cyber-cyan font-extrabold tracking-[0.4em] uppercase block">// SYSTEM SERVICES CATALOG</span>
        <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight uppercase text-white">
          SECURITY & DEVELOPMENT
        </h1>
        <div className="h-[2px] w-16 bg-gradient-to-r from-cyber-cyan to-cyber-pink mt-4 rounded-full" />
        <p className="font-sans text-slate-400 text-sm sm:text-base leading-relaxed pt-2">
          High-end developer services engineered specifically for clients, corporations, and elite projects requiring pixel-perfect, secure, and robust digital systems.
        </p>
      </section>

      {/* Services Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        {customServices.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
            className="group cyber-panel-interactive rounded-xl p-7 relative overflow-hidden flex flex-col justify-between aspect-[1.35]"
          >
            {/* Ambient soft glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/5 via-transparent to-transparent pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-slate-950 rounded-lg border border-cyber-cyan/15 group-hover:border-cyber-cyan/40 transition-all duration-300">
                  {item.icon}
                </div>
                <span className="font-mono text-[8px] tracking-[0.25em] text-cyber-cyan bg-cyber-cyan/15 px-3 py-1 rounded border border-cyber-cyan/25 font-black uppercase">
                  {item.tag}
                </span>
              </div>

              <h3 className="font-display text-lg sm:text-xl font-black text-white uppercase tracking-wide group-hover:text-cyber-cyan transition-colors">
                {item.title}
              </h3>
              
              <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4.5 border-t border-cyber-cyan/10 mt-auto relative z-10">
              <span className="font-mono text-[8px] tracking-wider text-slate-500 uppercase font-bold">
                GUARANTEED DEPLOYMENT: 100% SECURE
              </span>
              <ArrowUpRight size={14} className="text-slate-550 group-hover:text-cyber-pink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </motion.div>
        ))}
      </section>

      {/* Trust & Guarantee metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-display text-[10px] text-slate-400 uppercase tracking-widest font-bold text-left">
        <div className="cyber-panel p-6 rounded-xl space-y-3.5">
          <div className="flex items-center gap-2 text-cyber-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan animate-pulse" />
            <span>SECURE API ENDPOINTS</span>
          </div>
          <p className="text-[10px] text-slate-400 normal-case leading-relaxed font-sans font-medium">
            Every route is fully hardened through clean JSON validation, reverse proxy models, and rigorous parameter filtering.
          </p>
        </div>

        <div className="cyber-panel p-6 rounded-xl space-y-3.5">
          <div className="flex items-center gap-2 text-cyber-purple">
            <span className="h-1.5 w-1.5 rounded-full bg-cyber-purple animate-pulse" />
            <span>TYPESAFE FLOWS</span>
          </div>
          <p className="text-[10px] text-slate-400 normal-case leading-relaxed font-sans font-medium">
            Strict mathematical alignment between state providers, application interfaces, and cloud databases.
          </p>
        </div>

        <div className="cyber-panel p-6 rounded-xl space-y-3.5">
          <div className="flex items-center gap-2 text-cyber-pink">
            <span className="h-1.5 w-1.5 rounded-full bg-cyber-pink animate-pulse" />
            <span>ZERO MEMORY NOISE</span>
          </div>
          <p className="text-[10px] text-slate-400 normal-case leading-relaxed font-sans font-medium">
            Efficient state hooks, garbage-clean arrays, and optimized asynchronous intervals guarantee high rendering speed.
          </p>
        </div>
      </section>
    </div>
  );
}
