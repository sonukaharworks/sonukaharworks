import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldAlert, Lock, Cpu, Server, Send, Sparkles, Terminal, 
  Network, CheckCircle2, ChevronRight, HelpCircle
} from 'lucide-react';

export default function HireView() {
  const [budget, setBudget] = useState(5000);

  return (
    <div className="space-y-16 max-w-4xl mx-auto relative select-none text-left">
      {/* Background ambient light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.05)_0%,transparent_70%)] pointer-events-none blur-3xl z-0" />

      {/* Header */}
      <section className="space-y-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyber-cyan/10 border border-cyber-cyan/30 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
          <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
          <span className="font-mono text-[8px] font-black tracking-[0.3em] text-cyber-cyan uppercase">PORTAL_STATUS: MAINTENANCE_CYBER</span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight uppercase text-white">
          CLIENT DISPATCH PORTAL
        </h1>
        <div className="h-[2px] w-16 bg-cyber-cyan mx-auto mt-4" />
        <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Synchronize your project goals directly with Sonu Kahar’s dispatch queue. Our end-to-end typesafe client deployment environment.
        </p>
      </section>

      {/* Holographic Form Card overlaid with "COMING SOON" */}
      <section className="relative z-10">
        {/* COMING SOON Holographic Blur Shield Overlay */}
        <div className="absolute inset-x-0 inset-y-0 bg-slate-950/80 backdrop-blur-md rounded-xl border border-cyber-cyan/30 z-30 flex flex-col items-center justify-center p-8 text-center shadow-[0_0_50px_rgba(0,240,255,0.15)]">
          {/* Animated Glowing Holographic Node Lock */}
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-cyber-pink/20 animate-ping" />
            <div className="w-16 h-16 rounded-md bg-slate-950 border border-cyber-pink/40 flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(255,0,127,0.3)]">
              <Lock className="text-cyber-pink animate-pulse" size={24} />
            </div>
          </div>

          <div className="space-y-3 max-w-md">
            <span className="font-mono text-xs text-cyber-cyan font-bold tracking-[0.4em] uppercase block">// ENCRYPTED TRANSACTION SHIELD</span>
            <h2 className="font-display text-3xl font-black text-white uppercase tracking-tight">
              COMING SOON
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
              This secure client dispatch portal is currently undergoing calibration and security auditing. Expected launch in Q4 2026.
            </p>
          </div>

          <div className="mt-8 font-mono text-[9px] text-slate-500 uppercase tracking-widest flex flex-wrap justify-center items-center gap-4 border border-cyber-cyan/10 px-6 py-2 rounded-lg bg-slate-950">
            <span className="text-cyber-cyan animate-pulse">● CALIBRATING SECURE PROXIES</span>
            <span>// RTT_TEST: COMPLETED</span>
          </div>
        </div>

        {/* Mock Form behind the screen - adds amazing layered depth! */}
        <div className="bg-slate-950/40 border border-cyber-cyan/15 rounded-xl p-8 sm:p-12 space-y-8 pointer-events-none select-none opacity-25">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            <div className="space-y-2">
              <label className="font-mono text-[9px] tracking-widest text-slate-500 uppercase font-bold">CLIENT_NAME</label>
              <input 
                type="text" 
                placeholder="ENTER YOUR NAME" 
                disabled
                className="w-full bg-slate-900 border border-cyber-cyan/20 rounded-lg px-4 py-3 font-sans text-xs text-slate-400 uppercase tracking-wider focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[9px] tracking-widest text-slate-500 uppercase font-bold">BUSINESS_EMAIL</label>
              <input 
                type="email" 
                placeholder="ENTER EMAIL ADDRESS" 
                disabled
                className="w-full bg-slate-900 border border-cyber-cyan/20 rounded-lg px-4 py-3 font-sans text-xs text-slate-400 uppercase tracking-wider focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-4 text-left">
            <div className="flex justify-between items-center font-mono text-[9px] tracking-widest text-slate-500 uppercase font-bold">
              <span>PROJECT_BUDGET (USD)</span>
              <span className="text-cyber-cyan">${budget.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="2000" 
              max="50000" 
              step="1000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              disabled
              className="w-full accent-cyber-cyan"
            />
            <div className="flex justify-between font-mono text-[8px] text-slate-600">
              <span>$2,000</span>
              <span>$50,000+</span>
            </div>
          </div>

          <div className="space-y-2 text-left">
            <label className="font-mono text-[9px] tracking-widest text-slate-500 uppercase font-bold">PROJECT_BRIEF_MEMO</label>
            <textarea 
              rows={4}
              placeholder="OUTLINE YOUR REQUIREMENTS, EXPECTATIONS, AND DELIVERABLES..."
              disabled
              className="w-full bg-slate-900 border border-cyber-cyan/20 rounded-lg p-4 font-sans text-xs text-slate-400 uppercase tracking-wider focus:outline-none resize-none"
            />
          </div>

          <button
            disabled
            className="w-full py-4 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan font-mono text-xs tracking-widest uppercase font-bold flex items-center justify-center gap-2"
          >
            <Send size={14} />
            DISPATCH TRANSMISSION
          </button>
        </div>
      </section>

      {/* Security Info Panel */}
      <section className="bg-slate-950 border border-cyber-pink/20 rounded-xl p-6 relative overflow-hidden z-10 flex flex-col sm:flex-row items-center gap-4 text-left">
        <ShieldAlert className="text-cyber-pink shrink-0" size={24} />
        <div className="space-y-1 font-mono text-[9px] text-slate-500 uppercase tracking-wider">
          <span className="text-white font-bold block">CIPHER INTEGRITY NOTICE</span>
          <p className="normal-case font-sans text-xs text-slate-400 leading-normal">
            For urgent requests or proposals, you may bypass this portal and communicate via general networks.
          </p>
        </div>
      </section>
    </div>
  );
}
