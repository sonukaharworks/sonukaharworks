import React from 'react';
import { motion } from 'motion/react';
import { Target, Eye, Milestone, Trophy, Star } from 'lucide-react';
import PageBanner from './PageBanner';

export default function About() {
  const cards = [
    {
      title: 'Our Mission',
      icon: Target,
      color: 'text-cyber-primary border-cyber-primary/20 hover:border-cyber-primary/40',
      iconBg: 'bg-cyber-primary/5',
      glow: 'shadow-[0_0_15px_rgba(0,229,255,0.05)]',
      text: 'To engineer elite, high-performance, and secure digital software solutions that elevate user interaction, solve actual commercial bottlenecks, and establish brand superiority.'
    },
    {
      title: 'Our Vision',
      icon: Eye,
      color: 'text-cyber-secondary border-cyber-secondary/20 hover:border-cyber-secondary/40',
      iconBg: 'bg-cyber-secondary/5',
      glow: 'shadow-[0_0_15px_rgba(139,92,246,0.05)]',
      text: 'To be a premier global software brand at the forefront of the smart app revolution, setting world-class standards for visual identity, responsive engineering, and robust security.'
    },
    {
      title: 'Our Experience',
      icon: Milestone,
      color: 'text-cyber-accent border-cyber-accent/20 hover:border-cyber-accent/40',
      iconBg: 'bg-cyber-accent/5',
      glow: 'shadow-[0_0_15px_rgba(0,255,179,0.05)]',
      text: 'Over 3+ years of building native Android app files, responsive SaaS panels, customized enterprise databases, and e-commerce checkouts for startups around the world.'
    }
  ];

  return (
    <section id="about" className="py-12 relative overflow-hidden max-w-5xl mx-auto px-4">
      {/* Visual background decor */}
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-cyber-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

      <div className="relative z-10">
        {/* Unified Premium Page Banner */}
        <PageBanner
          title="About Sonu Kahar"
          subtitle="Futuristic software developer crafting robust Android Apps, modern websites, and military-grade code."
          tag="01 // PROFILE_BIOGRAPHY"
          imageUrl="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80"
          accentColor="cyber-secondary"
        />

        {/* Intro Section */}
        <div className="mb-8 p-5 bg-slate-950/40 rounded-2xl border border-white/5 backdrop-blur-md">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-sans text-slate-300 text-xs sm:text-sm leading-relaxed"
          >
            <span className="text-cyber-primary font-bold">Sonu Kahar</span> is a professional software development brand focused on creating native Android Applications, Responsive Websites, bespoke UI/UX Designs, high-scale E-commerce Solutions, and custom backend systems. Under our leading technical framework, we translate visionary concepts into high-converting, lightning-fast digital assets.
          </motion.p>
        </div>

        {/* Vision, Mission, Experience cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group relative p-5 glass-card rounded-2xl transition-all duration-400 hover:scale-[1.01] hover:-translate-y-0.5 overflow-hidden border ${card.color} ${card.glow}`}
              >
                {/* Dynamic card gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Tech Corner Decal */}
                <div className="absolute top-3 right-3 font-mono text-[8px] text-slate-600 tracking-wider">
                  SEC_NODE_0{idx + 1}
                </div>

                {/* Animated Graphic Backplate */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 relative z-10 transition-transform duration-500 group-hover:scale-110 ${card.iconBg}`}>
                  <Icon size={18} className="transition-all duration-300" />
                </div>

                <h3 className="font-display text-sm font-bold text-white mb-2 relative z-10">
                  {card.title}
                </h3>

                <p className="font-sans text-[11px] sm:text-xs text-slate-400 leading-relaxed font-light relative z-10">
                  {card.text}
                </p>

                {/* Floating particle detail */}
                <div className="absolute bottom-2 right-4 w-1 h-1 rounded-full bg-white/20 group-hover:bg-cyber-accent/50 group-hover:scale-150 transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>

        {/* Decorative Trust Quote Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-6 p-4 sm:p-5 glass-card-purple rounded-2xl border border-cyber-secondary/15 flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-secondary/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyber-secondary/10 flex items-center justify-center text-cyber-secondary shrink-0">
              <Trophy size={18} />
            </div>
            <div>
              <h4 className="font-display text-xs font-bold text-white tracking-wider uppercase">
                WORLD CLASS CODEC ENGINEERING
              </h4>
              <p className="font-sans text-[10px] text-slate-400 mt-0.5">
                We craft clean software conforming to strict SOLID, DRY, and Google-material developer rules.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-amber-400 shrink-0 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-white/5">
            <Star size={12} fill="currentColor" />
            <Star size={12} fill="currentColor" />
            <Star size={12} fill="currentColor" />
            <Star size={12} fill="currentColor" />
            <Star size={12} fill="currentColor" />
            <span className="font-mono text-[10px] text-white font-bold ml-1">5.0 / 5.0</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
