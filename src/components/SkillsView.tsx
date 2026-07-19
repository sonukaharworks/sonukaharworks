import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trophy, Cpu, Code2, Terminal, ShieldAlert } from 'lucide-react';
import { SKILLS } from '../data';

export default function SkillsView() {
  // Let's group skills by classification for deep cyber diagnostic feel
  const classifications = ['FRONTEND', 'BACKEND', 'MOBILE', 'PLATFORM'] as const;

  return (
    <div className="space-y-24 pb-20 select-none text-left">
      {/* Skills Header */}
      <section className="space-y-6 max-w-3xl text-left relative">
        <div className="absolute -top-12 -left-6 w-32 h-32 bg-cyber-purple/5 rounded-full blur-2xl pointer-events-none" />
        <span className="font-display text-xs text-cyber-cyan font-extrabold tracking-[0.4em] uppercase block">// ACTIVE CORES MATRIX</span>
        <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight uppercase text-white">
          TECHNICAL CAPABILITIES
        </h1>
        <div className="h-[2px] w-16 bg-gradient-to-r from-cyber-cyan to-cyber-pink mt-4 rounded-full" />
        <p className="font-sans text-slate-400 text-sm sm:text-base leading-relaxed pt-2">
          Real-time capabilities, software architectures, languages, and security modules certified for active cyber operations.
        </p>
      </section>

      {/* Grouped Skills Matrix Grid */}
      <div className="space-y-16">
        {classifications.map((classification) => {
          const categorySkills = SKILLS.filter(s => s.classification === classification);
          
          return (
            <div key={classification} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-cyber-cyan/15 pb-2">
                <span className="w-1.5 h-3 bg-cyber-cyan rounded-full shadow-[0_0_8px_rgba(0,240,255,0.7)]" />
                <h3 className="font-mono text-xs font-black tracking-[0.3em] text-cyber-cyan uppercase">
                  {classification} DIVISION
                </h3>
                <span className="text-slate-600 font-mono text-[9px]">// STABLE</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {categorySkills.map((skill, index) => {
                  // Circle stroke math
                  const radius = 34;
                  const circumference = 2 * Math.PI * radius;
                  const strokeDashoffset = circumference - (skill.level / 100) * circumference;

                  // Select glowing neon colors cyclically based on category
                  const getAccentColor = (classification: string) => {
                    switch (classification) {
                      case 'FRONTEND': return { stroke: 'stroke-cyber-cyan', text: '0 0 10px rgba(0, 240, 255, 0.4)' };
                      case 'BACKEND': return { stroke: 'stroke-cyber-pink', text: '0 0 10px rgba(255, 0, 127, 0.4)' };
                      case 'MOBILE': return { stroke: 'stroke-cyber-purple', text: '0 0 10px rgba(176, 38, 255, 0.4)' };
                      default: return { stroke: 'stroke-cyber-emerald', text: '0 0 10px rgba(5, 255, 197, 0.4)' };
                    }
                  };
                  
                  const colors = getAccentColor(skill.classification);

                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="cyber-panel-interactive rounded-xl p-5 flex flex-col items-center justify-center text-center space-y-4"
                    >
                      {/* Animated Circular Progress Gauge */}
                      <div className="relative w-20 h-20 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          {/* Track Circle */}
                          <circle
                            cx="40"
                            cy="40"
                            r={radius}
                            className="stroke-slate-900 fill-none"
                            strokeWidth="3"
                          />
                          {/* Progress Circle */}
                          <motion.circle
                            cx="40"
                            cy="40"
                            r={radius}
                            fill="none"
                            strokeWidth="4"
                            strokeLinecap="round"
                            initial={{ strokeDashoffset: circumference }}
                            whileInView={{ strokeDashoffset: strokeDashoffset }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            style={{
                              strokeDasharray: circumference,
                            }}
                            className={colors.stroke}
                          />
                        </svg>
                        {/* Center Percentage Display */}
                        <span 
                          className="absolute font-mono text-xs font-black text-white"
                          style={{ textShadow: colors.text }}
                        >
                          {skill.level}%
                        </span>
                      </div>

                      {/* Title */}
                      <div className="space-y-0.5">
                        <h4 className="font-display font-black text-[10px] text-white uppercase tracking-wider line-clamp-1">
                          {skill.name}
                        </h4>
                        <div className="font-mono text-[7px] text-slate-500 font-bold uppercase tracking-widest">
                          SECURED
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cyber guarantee metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-display text-[10px] text-slate-400 uppercase tracking-widest font-bold text-left pt-12">
        <div className="cyber-panel p-6.5 rounded-xl flex items-center gap-5">
          <div className="p-3 bg-slate-950 border border-cyber-cyan/15 rounded-lg shrink-0">
            <Trophy className="text-cyber-cyan" size={20} />
          </div>
          <div>
            <h4 className="text-white font-extrabold tracking-widest uppercase mb-1">PROVEN ALGORITHMS</h4>
            <p className="text-[10px] text-slate-400 normal-case leading-relaxed font-sans font-medium">
              Every system deployment represents live production commits, zero-leak optimization, and complete architectural audits.
            </p>
          </div>
        </div>

        <div className="cyber-panel p-6.5 rounded-xl flex items-center gap-5">
          <div className="p-3 bg-slate-950 border border-cyber-pink/15 rounded-lg shrink-0">
            <Cpu className="text-cyber-pink" size={20} />
          </div>
          <div>
            <h4 className="text-white font-extrabold tracking-widest uppercase mb-1">CONTINUOUS HARDENING</h4>
            <p className="text-[10px] text-slate-400 normal-case leading-relaxed font-sans font-medium">
              Regular dependency updates, strict linting, TypeScript compiler rules, and automated rate limits block vulnerability surface doors.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
