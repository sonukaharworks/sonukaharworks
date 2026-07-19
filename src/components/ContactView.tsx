import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Sparkles, Hourglass, Lock, Radio, Terminal } from 'lucide-react';

export default function ContactView() {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center py-12 px-6 select-none relative text-left">
      {/* Soft background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] rounded-full bg-cyber-cyan/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] rounded-full bg-cyber-pink/5 blur-[100px] pointer-events-none animate-pulse" />

      {/* Main cyber panel container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="cyber-panel-premium max-w-xl w-full p-8 sm:p-12 text-center rounded-xl relative overflow-hidden space-y-8"
      >
        {/* Soft reflection sweep */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyber-cyan/5 via-transparent to-cyber-pink/5 pointer-events-none" />

        {/* Animated radar status indicator */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Pulsing rings */}
            <div className="absolute inset-0 rounded-full bg-cyber-pink/15 animate-ping" />
            <div className="absolute w-[80%] h-[80%] rounded-full bg-cyber-cyan/15 animate-pulse" />
            
            {/* Center Lock node */}
            <div className="relative w-11 h-11 rounded-md bg-slate-950 border border-cyber-cyan/30 flex items-center justify-center shadow-sm">
              <Lock size={16} className="text-cyber-cyan" />
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 font-mono text-[9px] font-black text-cyber-cyan tracking-[0.25em] uppercase">
            <Radio size={12} className="text-cyber-cyan animate-pulse" />
            <span>SECURE LINK STANDBY</span>
          </div>
        </div>

        {/* Cinematic Labels */}
        <div className="space-y-4">
          <h1 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            COMMUNICATION NODE
          </h1>
          <p className="font-mono text-xs font-bold text-cyber-pink tracking-[0.3em] uppercase">
            LAUNCHING SOON
          </p>
          <div className="h-[2px] w-12 bg-gradient-to-r from-cyber-cyan to-cyber-pink mx-auto rounded-full" />
        </div>

        <p className="font-sans text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
          Our transmission module is currently undergoing strict cryptographic auditing and handshake tests. This communication portal will activate shortly.
        </p>

        {/* Status Deck badge */}
        <div className="bg-slate-950 border border-cyber-cyan/20 p-4 rounded-lg max-w-xs mx-auto flex items-center gap-3 shadow-[0_0_15px_rgba(0,240,255,0.03)]">
          <Hourglass size={16} className="text-cyber-pink animate-spin-slow shrink-0" />
          <span className="font-mono text-[8px] font-black text-slate-450 uppercase tracking-[0.2em] text-left leading-normal">
            TRANSMISSION PORT UNDER CONSTRUCTION PROTOCOL
          </span>
        </div>
      </motion.div>
    </div>
  );
}
