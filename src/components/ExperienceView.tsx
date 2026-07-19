import React from 'react';
import { motion } from 'motion/react';
import { 
  Milestone, Compass, Code2, Rocket, ArrowRight, 
  Sparkles, Award, Globe, Database, ShieldAlert, Terminal, Activity 
} from 'lucide-react';

export default function ExperienceView() {
  const milestones = [
    {
      year: '2024',
      title: 'SK Cyber Foundation',
      subtitle: 'Lead Architect & Founder',
      desc: 'Established a premium boutique development studio catering to enterprise SaaS businesses, publishing flawless native mobile applications and full-stack platforms.'
    },
    {
      year: '2022',
      title: 'TechVibe Systems',
      subtitle: 'Senior Lead Software Developer',
      desc: 'Formulated robust architectural strategies for high-frequency user traffic. Standardized state machines, minimized asset weights, and scaled PostgreSQL setups.'
    },
    {
      year: '2020',
      title: 'ApexMobile Engineering',
      subtitle: 'Senior Android Architect',
      desc: 'Directed core development cycles for highly visible play store mobile applications. Optimized background synchronizations and offline-first Room data models.'
    }
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Hacker Specification',
      desc: 'Developing precise architectural specifications, security rules, and type matrices prior to writing any production line of code.',
      icon: <Compass className="text-cyber-cyan" size={18} />
    },
    {
      step: '02',
      title: 'Pristine Layout',
      desc: 'Iterating through highly polished responsive layouts, fine-tuning negative spaces, typography pairings, and micro-interactions.',
      icon: <Code2 className="text-cyber-purple" size={18} />
    },
    {
      step: '03',
      title: 'Agile Hardening',
      desc: 'Engineering with robust type contracts, modular hooks, strict lint configurations, and comprehensive optimization audits.',
      icon: <Milestone className="text-cyber-pink" size={18} />
    },
    {
      step: '04',
      title: 'Telemetry Release',
      desc: 'Ensuring seamless server proxy integrations, Play Store submission, secure SSL setups, and robust operational tracking.',
      icon: <Rocket className="text-cyber-emerald" size={18} />
    }
  ];

  return (
    <div className="space-y-36 pb-20 select-none text-left">
      {/* Experience Header */}
      <section className="space-y-6 max-w-3xl relative">
        <div className="absolute -top-12 -left-6 w-32 h-32 bg-cyber-cyan/5 rounded-full blur-2xl pointer-events-none" />
        <span className="font-display text-xs text-cyber-cyan font-extrabold tracking-[0.4em] uppercase block">// SYSTEM CHRONICLES SYSTEM</span>
        <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight uppercase text-white">
          EXPERIENCE FILE
        </h1>
        <div className="h-[2px] w-16 bg-gradient-to-r from-cyber-cyan to-cyber-pink mt-4 rounded-full" />
        <p className="font-sans text-slate-400 text-sm sm:text-base leading-relaxed pt-2">
          An executive breakdown of career highlights, core architectural milestones, and our rigorous systematic development process.
        </p>
      </section>

      {/* Milestones Cards */}
      <section className="space-y-12">
        <div className="space-y-3">
          <span className="font-display text-xs text-cyber-pink font-extrabold tracking-[0.4em] uppercase block">// OPERATIONAL REVEAL</span>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            SYSTEM MILESTONES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {milestones.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="cyber-panel p-7 rounded-xl flex flex-col justify-between aspect-[1.15] hover:border-cyber-cyan/40 transition-all group relative overflow-hidden"
            >
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[9px] font-black text-cyber-cyan bg-cyber-cyan/15 border border-cyber-cyan/35 px-3.5 py-1 rounded uppercase tracking-widest">
                    {item.year}
                  </span>
                  <Award size={16} className="text-cyber-purple animate-pulse" />
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-display text-lg font-black text-white uppercase tracking-wide group-hover:text-cyber-cyan transition-colors">
                    {item.title}
                  </h3>
                  <h4 className="font-display text-[10px] text-slate-450 font-bold uppercase tracking-wider font-mono">
                    {item.subtitle}
                  </h4>
                </div>

                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Systematic Workflow Steps */}
      <section className="space-y-12">
        <div className="space-y-3">
          <span className="font-display text-xs text-cyber-purple font-extrabold tracking-[0.4em] uppercase block">// DEVELOPMENT PIPELINES</span>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            ENGINEERING WORkFLOW
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="cyber-panel-interactive p-7 rounded-xl relative overflow-hidden flex flex-col justify-between aspect-[1.1]"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-3xl font-black text-slate-700">
                    {step.step}
                  </span>
                  <div className="p-2.5 bg-slate-950 border border-cyber-cyan/20 rounded-lg">
                    {step.icon}
                  </div>
                </div>

                <h3 className="font-display text-base font-black text-white uppercase tracking-wide">
                  {step.title}
                </h3>

                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
