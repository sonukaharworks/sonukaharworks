import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, ArrowLeft, Send } from 'lucide-react';

interface ThankYouViewProps {
  theme?: 'dark' | 'light';
}

export default function ThankYouView({ theme }: ThankYouViewProps) {
  const isDark = theme !== 'light';

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 relative select-none">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full ambient-glow-blue opacity-30 pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`relative overflow-hidden rounded-3xl border p-8 sm:p-12 text-center max-w-lg w-full relative z-10 shadow-xl ${
          isDark 
            ? 'bg-[#161920]/60 border-white/[0.06] shadow-[0_24px_60px_rgba(0,0,0,0.4)]' 
            : 'bg-white border-slate-200 shadow-[0_24px_60px_rgba(15,23,42,0.05)]'
        }`}
      >
        {/* Animated Check Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 mb-6"
        >
          <CheckCircle size={32} />
        </motion.div>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className={`font-display text-2xl sm:text-3xl font-bold tracking-tight uppercase ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Transmission Logged
          </h1>
          <p className={`font-mono text-[9px] tracking-widest uppercase font-bold ${
            isDark ? 'text-blue-400' : 'text-blue-600'
          }`}>
            Status: Successfully Received
          </p>
        </div>

        {/* Message */}
        <p className={`font-sans text-xs sm:text-sm leading-relaxed font-light mt-6 max-w-xs mx-auto ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Thank you for reaching out. Your project proposal has been successfully logged into my secure workflow. I will review the details and get back to you within 24 hours.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              window.location.hash = '#/';
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-mono text-[9px] font-bold tracking-widest uppercase bg-blue-600 hover:bg-blue-700 text-white transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <ArrowLeft size={12} />
            Back to Home
          </button>
          
          <button
            onClick={() => {
              window.location.hash = '#/projects';
            }}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-mono text-[9px] font-bold tracking-widest uppercase border transition-all cursor-pointer flex items-center justify-center gap-2 ${
              isDark 
                ? 'bg-white/[0.02] hover:bg-white/[0.06] text-white border-white/[0.08] hover:border-white/20' 
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <Send size={12} />
            Explore Projects
          </button>
        </div>
      </motion.div>
    </div>
  );
}
