import React from 'react';
import { motion } from 'motion/react';
import { Bell, Server } from 'lucide-react';
import PageBanner from './PageBanner';

export default function ComingSoon() {
  return (
    <section id="coming-soon" className="py-12 relative overflow-hidden bg-slate-950/10 max-w-4xl mx-auto px-4">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyber-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyber-secondary/5 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />

      <div className="relative z-10">
        
        {/* Unified Premium Page Banner */}
        <PageBanner
          title="Digital Solutions Studio"
          subtitle="Interactive portals, real-time telemetry systems, and custom secure messaging channels are currently in compilation."
          tag="06 // LAB_ENVIRONMENTS"
          imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
          accentColor="cyber-accent"
        />

        {/* Main Glassmorphic Wrapper */}
        <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-cyber-primary/20 via-white/5 to-cyber-secondary/20 shadow-xl overflow-hidden">
          
          <div className="bg-slate-950/90 backdrop-blur-xl p-5 sm:p-10 rounded-2xl relative flex flex-col items-center text-center overflow-hidden">
            
            {/* Tech grid details */}
            <div className="absolute inset-0 cyber-grid-dense opacity-20 pointer-events-none" />
            
            {/* Glow backing light */}
            <div className="absolute -top-24 w-80 h-80 rounded-full bg-cyber-primary/10 blur-[80px] pointer-events-none" />

            {/* Floating Rocket Animation Container */}
            <div className="relative mb-6 z-10">
              
              {/* Pulsing Backlight circles */}
              <motion.div
                animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute inset-0 w-24 h-24 rounded-full bg-cyber-accent/10 blur-xl -translate-x-1/2 left-1/2"
              />

              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 1, -1, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: 'easeInOut',
                }}
                className="relative w-24 h-24 flex items-center justify-center bg-slate-900 border border-white/5 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.5)] group"
              >
                {/* Tech decors */}
                <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-cyber-accent/20" />
                <div className="absolute bottom-2 right-2 w-1 h-1 rounded-full bg-cyber-accent/20" />

                {/* Highly structured Rocket SVG Vector */}
                <svg viewBox="0 0 100 100" className="w-12 h-12 text-cyber-accent drop-shadow-[0_0_15px_rgba(0,255,179,0.5)]">
                  {/* Rocket body plume tail fire */}
                  <motion.path
                    d="M 50 70 L 46 85 L 50 95 L 54 85 Z"
                    fill="#FF8000"
                    animate={{ scaleY: [1, 1.2, 0.9, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 0.2 }}
                  />
                  <motion.path
                    d="M 50 70 L 48 80 L 50 88 L 52 80 Z"
                    fill="#FFFF00"
                    animate={{ scaleY: [1, 1.3, 0.8, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.15 }}
                  />
                  
                  {/* Rocket fins */}
                  <path d="M 35 60 L 30 72 L 40 70 Z" fill="#8B5CF6" />
                  <path d="M 65 60 L 70 72 L 60 70 Z" fill="#8B5CF6" />
                  
                  {/* Rocket Main body */}
                  <path d="M 50 15 Q 60 40 60 65 L 40 65 Q 40 40 50 15 Z" fill="#ffffff" />
                  
                  {/* Cabin glass */}
                  <circle cx="50" cy="40" r="6" fill="#00E5FF" stroke="#8B5CF6" strokeWidth="2" />
                  
                  {/* Nose cone */}
                  <path d="M 50 15 Q 54 28 50 32 Q 46 28 50 15 Z" fill="#00E5FF" />
                </svg>
              </motion.div>
            </div>

            {/* Display Headline */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-base sm:text-lg font-bold text-white tracking-wide relative z-10"
            >
              🚀 Interactive Solutions Launchpad
            </motion.h3>

            {/* Display Subtitle */}
            <p className="font-sans text-xs text-slate-400 mt-2 max-w-md leading-relaxed relative z-10 font-light">
              "We're currently building advanced client-facing tools, interactive booking pipelines, and real-time support widgets."
            </p>

            {/* Extra interactive visual: shaking notification bell */}
            <div className="mt-5 p-4 bg-slate-900/60 border border-white/5 rounded-xl max-w-sm w-full relative z-10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <motion.div
                    animate={{
                      rotate: [0, -10, 10, -10, 10, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatDelay: 3,
                      duration: 0.6,
                    }}
                    className="text-cyber-primary"
                  >
                    <Bell size={16} />
                  </motion.div>
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900 flex items-center justify-center font-mono text-[6px] text-white font-bold">
                    1
                  </span>
                </div>
                <div className="text-left">
                  <span className="font-mono text-[8px] text-slate-500 block">ALERT_RECEIVER</span>
                  <span className="font-sans text-[11px] text-slate-300 font-semibold">Immediate System Broadcasts</span>
                </div>
              </div>

              {/* Disabled Button */}
              <button
                disabled
                className="px-3 py-1 rounded-lg bg-slate-950 text-slate-600 border border-slate-800 font-mono text-[8px] tracking-wider uppercase font-semibold cursor-not-allowed opacity-55"
              >
                OFFLINE
              </button>
            </div>

            {/* Telemetry log bottom line */}
            <div className="mt-6 flex items-center gap-2 font-mono text-[8px] text-slate-600 uppercase">
              <Server size={8} />
              <span>STAGE_07 // SECURE_CHANNEL_PENDING</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
