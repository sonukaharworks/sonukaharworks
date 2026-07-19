import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onEnter: () => void;
}

export default function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  const [clicked, setClicked] = useState(false);

  const handleEnterClick = () => {
    if (clicked) return;
    setClicked(true);
    setTimeout(() => {
      onEnter();
    }, 400);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0f1115] flex items-center justify-center text-white select-none">
      
      {/* Soft Luxury Floating Light Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Violet Gradient Orb */}
        <motion.div 
          animate={{
            x: [0, 30, -10, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-[380px] h-[380px] rounded-full bg-blue-600/5 blur-[120px]"
        />

        {/* Soft Blue Gradient Orb */}
        <motion.div 
          animate={{
            x: [0, -20, 30, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] rounded-full bg-blue-500/5 blur-[130px]"
        />
      </div>

      {/* Main Glassmorphic Container */}
      <div className="relative z-10 w-full max-w-lg mx-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.01] backdrop-blur-[24px] p-8 sm:p-12 text-center shadow-[0_24px_60px_rgba(0,0,0,0.6)]"
        >
          {/* Top Elegant Indicator */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/10 bg-blue-500/5 text-blue-400 text-[9px] font-mono tracking-[0.25em] uppercase mb-8 font-bold">
            <Sparkles size={11} className="text-blue-400" />
            PROFESSIONAL STUDIO
          </div>

          {/* Core Branding Header */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-[0.25em] pl-[0.25em] uppercase bg-gradient-to-b from-white via-white to-slate-450 bg-clip-text text-transparent">
              SONU KAHAR
            </h1>

            {/* Static Professional Sub-headings */}
            <div className="flex flex-col gap-1 pt-1.5">
              <span className="text-[10px] font-mono tracking-[0.2em] text-slate-400 uppercase">
                Software Engineer
              </span>
              <span className="text-[10px] font-mono tracking-[0.2em] text-blue-400 uppercase font-bold">
                Android App Developer
              </span>
              <span className="text-[10px] font-mono tracking-[0.2em] text-slate-400 uppercase">
                Website Developer
              </span>
            </div>
          </div>

          {/* Short Welcoming Message */}
          <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed max-w-sm mx-auto mt-6 font-sans font-light">
            Welcome to my professional software engineering website. Discover high-quality Android apps, responsive website development, and premium software solutions.
          </p>

          {/* Premium "ENTER WEBSITE" Action Button */}
          <div className="mt-8">
            <button
              onClick={handleEnterClick}
              disabled={clicked}
              className="group relative inline-flex items-center justify-center px-10 py-3.5 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase text-white overflow-hidden transition-all duration-300 bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer focus:outline-none"
            >
              <span className="flex items-center gap-2">
                ENTER WEBSITE
                <ArrowRight size={11} className="text-white group-hover:translate-x-1.5 transition-transform" />
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
