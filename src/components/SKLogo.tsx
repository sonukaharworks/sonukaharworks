import React, { useState } from 'react';
import { motion } from 'motion/react';

interface SKLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function SKLogo({ size = 'md' }: SKLogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-28 h-28',
    xl: 'w-48 h-48',
  };

  const currentSize = sizeClasses[size];

  // Particle positions relative to center for the floating electric particles
  const electricParticles = [
    { delay: 0, scale: 0.8, x: -18, y: -18, color: '#00e5ff' },
    { delay: 0.4, scale: 1.2, x: 22, y: -12, color: '#a855f7' },
    { delay: 0.8, scale: 0.9, x: -14, y: 20, color: '#00ffb3' },
    { delay: 1.2, scale: 1.1, x: 18, y: 16, color: '#3b82f6' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative ${currentSize} flex items-center justify-center select-none group cursor-pointer`}
      style={{ perspective: 1000 }}
    >
      {/* 1. SOFT PULSE: Ambient neon aura glow in the background */}
      <motion.div
        animate={{
          scale: isHovered ? [1.05, 1.15, 1.05] : [1, 1.08, 1],
          opacity: isHovered ? [0.8, 1, 0.8] : [0.6, 0.8, 0.6]
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-blue-500/10 rounded-3xl blur-xl pointer-events-none"
      />

      {/* 2. ELECTRIC PARTICLES: Orbiting the glass logo */}
      {electricParticles.map((pt, index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -10, 0],
            x: [0, 8, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [pt.scale, pt.scale * 1.3, pt.scale],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5 + index * 0.5,
            delay: pt.delay,
            ease: "easeInOut"
          }}
          className="absolute w-1.5 h-1.5 rounded-full blur-[0.5px] pointer-events-none"
          style={{
            left: `calc(50% + ${pt.x}px)`,
            top: `calc(50% + ${pt.y}px)`,
            backgroundColor: pt.color,
            boxShadow: `0 0 8px ${pt.color}`,
          }}
        />
      ))}

      {/* 3. 3D DEPTH GLASS CONTAINER: Octagonal/Futuristic faceted plate (NOT a simple circle) */}
      <motion.div
        animate={{
          y: [0, -4, 0],
          rotateX: isHovered ? 12 : 0,
          rotateY: isHovered ? -12 : 0,
          rotateZ: isHovered ? 1 : 0,
        }}
        transition={{
          y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
          rotateX: { type: "spring", stiffness: 150, damping: 15 },
          rotateY: { type: "spring", stiffness: 150, damping: 15 }
        }}
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
        }}
      >
        {/* Real Glassmorphism backing */}
        <div 
          className="absolute inset-0 bg-slate-950/40 border border-white/10 shadow-[inset_0_2px_12px_rgba(255,255,255,0.08),0_10px_35px_rgba(0,0,0,0.7)]" 
          style={{
            backdropFilter: 'blur(16px)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)'
          }}
        />

        {/* Glossy Bevel Border Simulation (Metallic edge reflections) */}
        <div className="absolute inset-[1px] bg-gradient-to-tr from-white/5 via-transparent to-white/10 opacity-60 rounded-none pointer-events-none" 
          style={{
            clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
          }}
        />

        {/* 4. NEON BLUE & PURPLE GLOW (Backlights) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-radial-gradient from-cyan-500/20 via-purple-500/20 to-transparent blur-md pointer-events-none" />

        {/* 5. ENERGY RING: Rotating octagonal/dashed geometric frame */}
        <svg className="absolute inset-0 w-full h-full p-2 opacity-50 group-hover:opacity-100 transition-opacity duration-500" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="neon-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <motion.polygon
            points="50,12 78,25 78,75 50,88 22,75 22,25"
            fill="none"
            stroke="url(#neon-ring-grad)"
            strokeWidth="1.5"
            strokeDasharray="25 15 10 15"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="origin-center"
          />
        </svg>

        {/* 6. CUSTOM SK MONOGRAM (With Metallic Finish & Neon Accent strokes) */}
        <div className="relative z-10 w-1/2 h-1/2 flex items-center justify-center transform translate-z-[20px]">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(0,229,255,0.65)]">
            <defs>
              {/* Ultra-premium Metallic Chrome Gradient */}
              <linearGradient id="metallic-chrome" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="15%" stopColor="#f1f5f9" />
                <stop offset="35%" stopColor="#94a3b8" />
                <stop offset="50%" stopColor="#e2e8f0" />
                <stop offset="65%" stopColor="#475569" />
                <stop offset="85%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>

              {/* Gold/Neon highlights */}
              <linearGradient id="cyan-glow-line" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00E5FF" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>

              <linearGradient id="purple-glow-line" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>

            {/* MONOGRAM 'S' (Futuristic geometric brutalist path) */}
            <motion.path
              d="M 22 28 L 46 28 L 46 45 L 24 53 L 24 74 L 48 74"
              fill="none"
              stroke="url(#metallic-chrome)"
              strokeWidth="9.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            {/* Glowing outer neon trace for 'S' */}
            <motion.path
              d="M 22 28 L 46 28 L 46 45 L 24 53 L 24 74 L 48 74"
              fill="none"
              stroke="url(#cyan-glow-line)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-95 mix-blend-screen"
            />

            {/* MONOGRAM 'K' */}
            <motion.path
              d="M 58 28 L 58 74 M 58 51 L 76 28 M 66 59 L 76 74"
              fill="none"
              stroke="url(#metallic-chrome)"
              strokeWidth="9.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
            />
            {/* Glowing outer neon trace for 'K' */}
            <motion.path
              d="M 58 28 L 58 74 M 58 51 L 76 28 M 66 59 L 76 74"
              fill="none"
              stroke="url(#purple-glow-line)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-95 mix-blend-screen"
            />
          </svg>
        </div>

        {/* 7. ANIMATED LIGHT SWEEP: Elegant reflections glinting across */}
        <motion.div
          animate={{
            x: ['-200%', '200%'],
          }}
          transition={{
            repeat: Infinity,
            duration: 3.5,
            ease: "easeInOut",
            repeatDelay: 2
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent -skew-x-12 pointer-events-none"
        />

        {/* 8. DYNAMIC REFLECTIONS: Glass specular glare shine */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      </motion.div>

      {/* Decorative Outer Light Flares */}
      <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-cyan-400 blur-sm opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-2 h-2 rounded-full bg-purple-500 blur-sm opacity-20 pointer-events-none" />
    </motion.div>
  );
}
