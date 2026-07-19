import React from 'react';
import { motion } from 'motion/react';

interface PageBannerProps {
  title: string;
  subtitle: string;
  tag: string;
  imageUrl: string;
  accentColor?: string; // e.g. "cyber-primary", "cyber-secondary", "cyber-accent"
}

export default function PageBanner({ title, subtitle, tag, imageUrl, accentColor = 'cyber-primary' }: PageBannerProps) {
  const borderColMap: Record<string, string> = {
    'cyber-primary': 'border-[#00E5FF]/40 group-hover:border-[#00E5FF]/80 shadow-[#00E5FF]/10',
    'cyber-secondary': 'border-[#8B5CF6]/40 group-hover:border-[#8B5CF6]/80 shadow-[#8B5CF6]/10',
    'cyber-accent': 'border-[#00FFB3]/40 group-hover:border-[#00FFB3]/80 shadow-[#00FFB3]/10',
  };

  const textColMap: Record<string, string> = {
    'cyber-primary': 'text-[#00E5FF]',
    'cyber-secondary': 'text-[#8B5CF6]',
    'cyber-accent': 'text-[#00FFB3]',
  };

  const borderClass = borderColMap[accentColor] || borderColMap['cyber-primary'];
  const textClass = textColMap[accentColor] || textColMap['cyber-primary'];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative w-full h-[140px] sm:h-[180px] rounded-2xl overflow-hidden mb-6 group"
    >
      {/* Background Banner Image with subtle zoom on hover */}
      <img
        src={imageUrl}
        alt={title}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.3] contrast-[1.1] transition-transform duration-1000 group-hover:scale-105"
      />

      {/* Cyberpunk overlays: grid and neon gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-black/40" />
      <div className="absolute inset-0 cyber-grid opacity-25" />

      {/* Glassmorphic card overlay with glowing borders */}
      <div className={`absolute inset-0 flex flex-col justify-end p-4 sm:p-6 border border-white/5 rounded-2xl`}>
        {/* Subtle accent vertical neon bar */}
        <div className={`absolute top-0 left-0 w-1 h-full bg-${accentColor}`} />

        <div className="relative z-10 flex flex-col gap-1">
          {/* Section badge tag */}
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full bg-${accentColor} animate-pulse`} />
            <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-slate-400 uppercase font-bold">
              {tag}
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-xl sm:text-2xl font-black text-white tracking-wider flex items-center gap-2">
            {title}
            <span className="text-xs sm:text-sm">✨</span>
          </h1>

          {/* Subheading */}
          <p className="font-sans text-xs text-slate-400 max-w-xl line-clamp-1">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Outer sleek border accent */}
      <div className={`absolute inset-0 pointer-events-none rounded-2xl border ${borderClass} transition-all duration-500 shadow-lg`} />
    </motion.div>
  );
}
