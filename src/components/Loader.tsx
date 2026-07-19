import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  // Cinematic state phases:
  // - 'initial': black pre-boot screen with glass button
  // - 'coding': high-speed multi-window terminal boot log
  // - 'vortex': dissolution of windows, particles spiral into center vortex
  // - 'reveal': name reveals letter by letter with motion blur and neon glows
  // - 'finished': transition out
  const [phase, setPhase] = useState<'initial' | 'coding' | 'vortex' | 'reveal' | 'finished'>('initial');
  const [progress, setProgress] = useState(0);
  const [systemMessage, setSystemMessage] = useState('Initializing Systems...');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [moduleLogs, setModuleLogs] = useState<string[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [showShine, setShowShine] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const logContainerRef = useRef<HTMLDivElement | null>(null);
  const moduleContainerRef = useRef<HTMLDivElement | null>(null);

  // Interval references to prevent memory leaks and dangling intervals on unmount
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const codeStreamIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const moduleStreamIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (codeStreamIntervalRef.current) clearInterval(codeStreamIntervalRef.current);
      if (moduleStreamIntervalRef.current) clearInterval(moduleStreamIntervalRef.current);
    };
  }, []);

  const roles = [
    'Android App Developer',
    'Website Developer',
    'UI/UX Designer'
  ];

  const brandName = "SK STUDIO";

  // Real-time scrolling logging feeds
  const mockSystemCodeLines = [
    'sys_call_exec(SYS_REBOOT_CODE_v4);',
    '#include <sk_core_graphics.h>',
    'val kernel = AndroidRuntime.getKernel()',
    'import { motion } from "framer-motion";',
    'const deviceProfile = getDeviceSpecs();',
    'const retinaScale = window.devicePixelRatio;',
    'init_pipeline_buffer(0x7FFF82);',
    'security_auth_aes_gcm_256(INIT);',
    'std::vector<Particle*> vortexCore;',
    'const double phi = 1.61803398875;',
    'class UIUXVessel : public CanvasRenderer',
    'android.app.ActivityThread.main()',
    'react_fiber_render(SK_STUDIO_SUITE);',
    'const sweepLine = new GlareSweep();',
    'let blurKernelSize = 16;',
    'let fpsMeter = 120;',
    'pipeline_success_ping();',
    'System.loadLibrary("bespoke_graphics");'
  ];

  const mockCompileModules = [
    '[COMPILED] AndroidManifest.xml -> OK',
    '[COMPILED] KotlinCoroutineBridge.kt -> OK',
    '[COMPILED] ReactEngineFiber.tsx -> OK',
    '[COMPILED] VectorCanvasRenderer.ts -> OK',
    '[COMPILED] SoundSwellSynthesizer.js -> OK',
    '[COMPILED] GlassmorphismPlate.css -> OK',
    '[COMPILED] UXPerspectiveMatrix.cpp -> OK',
    '[COMPILED] TouchRippleEnclave.swift -> OK'
  ];

  // 1. Play high-end modular FM synth startup swell on click (perfectly bypasses browser auto-play blocks)
  const playCinematicChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;
      const now = ctx.currentTime;

      // Base rich F# Maj 9 chord frequencies for luxury cinema vibe (F#1, C#2, F#2, A#2, C#3, F#3, G#3)
      const chordFrequencies = [46.25, 69.3, 92.5, 116.54, 138.59, 185.0, 207.65];
      const masterVolume = ctx.createGain();
      masterVolume.gain.setValueAtTime(0, now);
      masterVolume.gain.linearRampToValueAtTime(0.28, now + 0.3); // Warm swell up
      masterVolume.gain.exponentialRampToValueAtTime(0.001, now + 3.8); // Ultra long clean decay

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(70, now);
      filter.frequency.exponentialRampToValueAtTime(2800, now + 1.5);
      filter.Q.setValueAtTime(1.5, now);

      chordFrequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        // Blend triangle and sine waves for analog circuit emulation warmth
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.linearRampToValueAtTime(freq + (Math.random() - 0.5) * 1.5, now + 3.0);

        const relativeVol = idx === 0 ? 0.35 : idx === 1 ? 0.28 : 0.18;
        oscGain.gain.setValueAtTime(0, now);
        oscGain.gain.linearRampToValueAtTime(relativeVol, now + 0.05 + idx * 0.04);
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5 + idx * 0.1);

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start(now);
        osc.stop(now + 4.0);
      });

      // Shimmering crystalline harp roll bell (glass-like luxury feel)
      const bellGain = ctx.createGain();
      bellGain.gain.setValueAtTime(0, now);
      bellGain.gain.linearRampToValueAtTime(0.09, now + 0.1);
      bellGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

      const bellFreqs = [587.33, 880.0, 1108.73, 1479.98]; // D5, A5, C#6, F#6
      bellFreqs.forEach((bf, bIdx) => {
        const bOsc = ctx.createOscillator();
        bOsc.type = 'sine';
        bOsc.frequency.setValueAtTime(bf, now + bIdx * 0.05);
        bOsc.connect(bellGain);
        bOsc.start(now + bIdx * 0.05);
        bOsc.stop(now + 2.5);
      });

      filter.connect(masterVolume);
      bellGain.connect(ctx.destination);
      masterVolume.connect(ctx.destination);
    } catch (e) {
      console.warn('Audio Context creation skipped:', e);
    }
  };

  // 2. High-performance multi-window loading simulation
  const handleStartExperience = () => {
    playCinematicChime();
    setPhase('coding');

    // Rapid progress bar and message ticker (takes ~2.5 seconds total)
    let curProgress = 0;
    const progressInterval = setInterval(() => {
      curProgress += Math.random() * 6 + 2;
      if (curProgress >= 100) {
        curProgress = 100;
        setProgress(100);
        setSystemMessage('Launch Complete...');
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        
        // Dissolve code windows and transition to Vortex gathering phase
        setTimeout(() => {
          setPhase('vortex');
          // Vortex plays for 1.0 second before dramatically revealing name letters
          setTimeout(() => {
            setPhase('reveal');
          }, 1000);
        }, 300);
      } else {
        setProgress(Math.floor(curProgress));
        
        // Update high-end status labels according to completion percentage
        if (curProgress < 15) setSystemMessage('Initializing Core Modules...');
        else if (curProgress < 35) setSystemMessage('Loading Graphics Engine...');
        else if (curProgress < 55) setSystemMessage('Compiling Native Libraries...');
        else if (curProgress < 75) setSystemMessage('Deploying Neural Pipelines...');
        else if (curProgress < 90) setSystemMessage('Optimizing Responsive Interface...');
        else setSystemMessage('Readying Cinematic Presentation...');
      }
    }, 60);
    progressIntervalRef.current = progressInterval;

    // Stream random code snippets into Left Window
    const codeStreamInterval = setInterval(() => {
      setTerminalLogs(prev => {
        const nextLine = mockSystemCodeLines[Math.floor(Math.random() * mockSystemCodeLines.length)];
        const stream = [...prev, nextLine];
        return stream.slice(-14); // Limit stack for performance
      });
    }, 70);
    codeStreamIntervalRef.current = codeStreamInterval;

    // Stream compiled files into Right Window
    let moduleIdx = 0;
    const moduleStreamInterval = setInterval(() => {
      if (moduleIdx < mockCompileModules.length) {
        setModuleLogs(prev => [...prev, mockCompileModules[moduleIdx]]);
        moduleIdx++;
      } else {
        // Loop back or stream random details
        setModuleLogs(prev => {
          const nextVal = `[OPTIMIZED] CoreAssetBundle_${Math.floor(Math.random()*100)} -> MEM_RELEASED`;
          return [...prev, nextVal].slice(-10);
        });
      }
    }, 220);
    moduleStreamIntervalRef.current = moduleStreamInterval;

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      if (codeStreamIntervalRef.current) {
        clearInterval(codeStreamIntervalRef.current);
        codeStreamIntervalRef.current = null;
      }
      if (moduleStreamIntervalRef.current) {
        clearInterval(moduleStreamIntervalRef.current);
        moduleStreamIntervalRef.current = null;
      }
    };
  };

  // Auto-scroll logs to bottom for realistic active terminal behavior
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  useEffect(() => {
    if (moduleContainerRef.current) {
      moduleContainerRef.current.scrollTop = moduleContainerRef.current.scrollHeight;
    }
  }, [moduleLogs]);

  // 3. Sequential letter assembly reveal with Motion Blur
  useEffect(() => {
    if (phase !== 'reveal') return;

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < brandName.length) {
        setRevealedCount(prev => prev + 1);
        idx++;
      } else {
        clearInterval(interval);
        
        // Fully complete: Show light sweep, trigger sparkly particle burst and start subtitle typing
        setTimeout(() => {
          setShowShine(true);
          setShowBurst(true);
          
          // Complete entire experience and transition to main site after 3 seconds of holding brand
          setTimeout(() => {
            setPhase('finished');
          }, 3200);
        }, 200);
      }
    }, 70); // Rapid, high-speed premium letter appearance

    return () => clearInterval(interval);
  }, [phase]);

  // 4. Subtitle Roles typing animation loop
  useEffect(() => {
    if (phase !== 'reveal' && phase !== 'finished') return;

    let currentRole = roles[currentRoleIndex];
    let charIdx = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const handleTyping = () => {
      if (!isDeleting) {
        setTypingText(currentRole.substring(0, charIdx + 1));
        charIdx++;
        
        if (charIdx === currentRole.length) {
          timer = setTimeout(() => {
            isDeleting = true;
            handleTyping();
          }, 1600);
        } else {
          timer = setTimeout(handleTyping, 40);
        }
      } else {
        setTypingText(currentRole.substring(0, charIdx - 1));
        charIdx--;

        if (charIdx === 0) {
          isDeleting = false;
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
        timer = setTimeout(handleTyping, 25);
      }
    };

    timer = setTimeout(handleTyping, 500);
    return () => clearTimeout(timer);
  }, [phase, currentRoleIndex]);

  // 5. Canvas Particles System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let dpr = window.devicePixelRatio || 1;
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth * dpr;
        height = canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
      }
    };
    window.addEventListener('resize', handleResize);

    const displayW = window.innerWidth;
    const displayH = window.innerHeight;

    // Drifting particle pool
    const particleCount = 1000;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
      angle: number;
      speed: number;
      radius: number;
    }> = [];

    const colors = ['#00E5FF', '#a855f7', '#ffffff', '#3b82f6', '#c084fc'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * displayW,
        y: Math.random() * displayH,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.45 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.015 + 0.004,
        radius: Math.random() * 250 + 80
      });
    }

    // Sparkly burst particles generated upon reveal completion
    const burstParticles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
      life: number;
    }> = [];

    const createSparklyBurst = () => {
      const colorsBurst = ['#00E5FF', '#ffffff', '#e0f2fe', '#c084fc'];
      for (let i = 0; i < 280; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6.5 + 1.5;
        burstParticles.push({
          x: displayW / 2,
          y: displayH / 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2.2 + 0.6,
          alpha: 1.0,
          color: colorsBurst[Math.floor(Math.random() * colorsBurst.length)],
          life: 1.0
        });
      }
    };

    let burstTriggered = false;

    const draw = () => {
      // Clear on display bounds
      ctx.clearRect(0, 0, displayW, displayH);

      // Deep, futuristic black canvas background
      ctx.fillStyle = '#020205';
      ctx.fillRect(0, 0, displayW, displayH);

      // Radial vignette lighting glow to ground presentation
      const radialGrad = ctx.createRadialGradient(
        displayW / 2,
        displayH / 2,
        15,
        displayW / 2,
        displayH / 2,
        Math.max(displayW, displayH) / 1.2
      );
      radialGrad.addColorStop(0, 'rgba(5, 7, 24, 0.05)');
      radialGrad.addColorStop(1, '#000000');
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, displayW, displayH);

      // Trigger sparkles burst
      if (showBurst && !burstTriggered) {
        createSparklyBurst();
        burstTriggered = true;
      }

      // Update and draw standard background particles
      particles.forEach((p) => {
        if (phase === 'initial') {
          // Slow ambient drift
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = displayW;
          if (p.x > displayW) p.x = 0;
          if (p.y < 0) p.y = displayH;
          if (p.y > displayH) p.y = 0;
        } 
        else if (phase === 'coding') {
          // Particles flow towards the center core
          const dx = displayW / 2 - p.x;
          const dy = displayH / 2 - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 15) {
            // Magnetic force pulls them inward
            p.vx += (dx / dist) * 0.09;
            p.vy += (dy / dist) * 0.09;
            
            // Speed limiter
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (speed > 4.5) {
              p.vx = (p.vx / speed) * 4.5;
              p.vy = (p.vy / speed) * 4.5;
            }
          } else {
            // Teleport particles back out to the edges to sustain inward flow look
            const angle = Math.random() * Math.PI * 2;
            p.x = displayW / 2 + Math.cos(angle) * (Math.max(displayW, displayH) / 1.5);
            p.y = displayH / 2 + Math.sin(angle) * (Math.max(displayW, displayH) / 1.5);
            p.vx = 0;
            p.vy = 0;
          }
          p.x += p.vx;
          p.y += p.vy;
        } 
        else if (phase === 'vortex' || phase === 'reveal' || phase === 'finished') {
          // Particles gather into a beautiful circular energy vortex behind center
          p.angle += p.speed * 1.8;
          // Slowly adjust radius to keep them orbiting in a beautiful ring
          p.x = displayW / 2 + Math.cos(p.angle) * p.radius;
          p.y = displayH / 2 + Math.sin(p.angle) * p.radius * 0.65; // elegant compressed ellipse
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      // Update and draw burst sparkles
      for (let i = burstParticles.length - 1; i >= 0; i--) {
        const bp = burstParticles[i];
        bp.x += bp.vx;
        bp.y += bp.vy;
        bp.vx *= 0.96; // friction
        bp.vy *= 0.96;
        bp.life -= 0.015;
        bp.alpha = bp.life;

        if (bp.life <= 0) {
          burstParticles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(bp.x, bp.y, bp.size, 0, Math.PI * 2);
        ctx.fillStyle = bp.color;
        ctx.shadowColor = bp.color;
        ctx.shadowBlur = bp.size * 3.5;
        ctx.globalAlpha = bp.alpha;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [phase, showBurst]);

  // 6. Final smooth page reveal
  useEffect(() => {
    if (phase === 'finished') {
      const exitTimer = setTimeout(() => {
        onComplete();
      }, 950); // Gives time for elegant full-screen exit transition
      return () => clearTimeout(exitTimer);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'finished' && (
        <motion.div
          id="cinematic-intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }} // Cinematic zoom transition out
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#020205] overflow-hidden flex flex-col items-center justify-center select-none"
        >
          {/* BACKGROUND LAYER 1: Particles stay strictly BEHIND the text systems (z-index 10) */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <canvas ref={canvasRef} className="w-full h-full block" />
          </div>

          {/* BACKGROUND LAYER 2: Circular energy vortex backing aura (gathers behind name) */}
          {(phase === 'vortex' || phase === 'reveal') && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: [0.2, 0.45, 0.2],
                scale: [1, 1.12, 1],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute z-20 w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.18)_0%,transparent_70%)] pointer-events-none"
            />
          )}

          {/* FOREGROUND LAYER (z-index 50) - Guarantees text & buttons are 100% on top of all particles */}
          <div className="relative z-50 w-full h-full flex flex-col items-center justify-center pointer-events-none px-4">
            
            {/* SCREEN 1: PRE-BOOT GENTLE LANDING (🚀 ENTER EXPERIENCE Glass button) */}
            {phase === 'initial' && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex flex-col items-center justify-center text-center max-w-md w-full px-6 pointer-events-auto"
              >
                {/* Micro tech ring decor */}
                <div className="w-24 h-24 mb-10 relative flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border border-dashed border-cyan-400/25"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    className="absolute w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400/5 to-purple-500/5 blur-lg"
                  />
                  <div className="w-3 h-3 rounded-sm bg-cyan-400/80 shadow-[0_0_12px_rgba(6,182,212,0.8)] animate-pulse" />
                </div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-display text-2xl font-black tracking-[0.35em] text-white uppercase mb-2"
                >
                  SONU KAHAR
                </motion.h2>
                <p className="font-mono text-[9px] tracking-[0.45em] text-cyan-400/50 uppercase mb-12">
                  CINEMATIC PORTFOLIO SYSTEM v4.0
                </p>

                {/* PREMIUM GLASS ENTER EXPERIENCE BUTTON */}
                <motion.button
                  onClick={handleStartExperience}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  animate={{
                    boxShadow: [
                      "0 0 15px rgba(6,182,212,0.15)",
                      "0 0 35px rgba(139,92,246,0.35)",
                      "0 0 15px rgba(6,182,212,0.15)"
                    ]
                  }}
                  transition={{
                    boxShadow: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' },
                    scale: { type: 'spring', stiffness: 400, damping: 15 }
                  }}
                  className="group relative px-9 py-4.5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 text-white font-mono text-[10px] tracking-[0.25em] uppercase cursor-pointer backdrop-blur-xl overflow-hidden transition-all duration-300"
                >
                  {/* Subtle sweep line glint over button */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ repeat: Infinity, duration: 3.0, ease: 'easeInOut' }}
                      className="w-1/3 h-full bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent -skew-x-12"
                    />
                  </div>
                  
                  <span className="relative z-10 group-hover:text-cyan-300 transition-colors duration-300 flex items-center gap-2">
                    🚀 ENTER EXPERIENCE
                  </span>
                  
                  {/* Fill backlight layer */}
                  <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </motion.div>
            )}

            {/* SCREEN 2: HIGH-SPEED MULTI-WINDOW TERMINAL COMPILING COCKPIT */}
            {phase === 'coding' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-5 px-4 font-mono text-[9px] pointer-events-auto"
              >
                
                {/* WINDOW 1: System Core Logs (Left Window) */}
                <div className="col-span-12 md:col-span-4 bg-slate-950/85 border border-white/5 rounded-xl p-4 flex flex-col h-[280px] backdrop-blur-lg">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3 text-slate-500 font-bold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                      <span>SK_CORE_COMPILER</span>
                    </span>
                    <span>ACTIVE</span>
                  </div>
                  <div ref={logContainerRef} className="flex-1 overflow-y-auto space-y-1.5 scrollbar-thin text-cyan-400/80 leading-normal text-left pr-1 select-text">
                    {terminalLogs.map((line, idx) => (
                      <div key={idx} className={idx === terminalLogs.length - 1 ? 'text-white font-bold' : ''}>
                        {line}
                      </div>
                    ))}
                    <div className="w-1.5 h-3 bg-cyan-400 animate-pulse inline-block" />
                  </div>
                </div>

                {/* WINDOW 2: Central Circular HUD & Process Status (Middle Window) */}
                <div className="col-span-12 md:col-span-4 bg-slate-950/90 border border-cyan-500/15 rounded-2xl p-5 flex flex-col items-center justify-center text-center h-[280px] shadow-[0_0_30px_rgba(6,182,212,0.1)] backdrop-blur-xl relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-pulse" />
                  
                  {/* Glowing core orbital wheel */}
                  <div className="w-24 h-24 mb-5 relative flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="42"
                        className="stroke-white/5 fill-none"
                        strokeWidth="3.5"
                      />
                      <motion.circle
                        cx="48"
                        cy="48"
                        r="42"
                        className="stroke-cyan-400 fill-none"
                        strokeWidth="3.5"
                        strokeDasharray={263.8}
                        strokeDashoffset={263.8 - (263.8 * progress) / 100}
                        transition={{ ease: 'easeOut' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-lg font-black text-white tracking-tighter">{progress}%</span>
                      <span className="text-[7px] text-slate-500 font-bold uppercase tracking-widest">BOOTING</span>
                    </div>
                  </div>

                  {/* System stage status update */}
                  <div className="text-white font-bold tracking-widest text-[9px] uppercase mb-1.5 min-h-[14px]">
                    {systemMessage}
                  </div>
                  <div className="text-slate-500 tracking-wider text-[8px] uppercase">
                    SYSTEM_CORE // SEED_STABLE
                  </div>

                  {/* High tech neon linear tracking bar */}
                  <div className="w-full bg-white/5 h-[2px] rounded-full mt-4 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* WINDOW 3: Compiled Asset Bundles List (Right Window) */}
                <div className="col-span-12 md:col-span-4 bg-slate-950/85 border border-white/5 rounded-xl p-4 flex flex-col h-[280px] backdrop-blur-lg">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3 text-slate-500 font-bold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
                      <span>SYS_DIAGNOSTICS</span>
                    </span>
                    <span>120_FPS</span>
                  </div>
                  <div ref={moduleContainerRef} className="flex-1 overflow-y-auto space-y-1.5 scrollbar-thin text-purple-400/85 leading-normal text-left pr-1 select-text">
                    {moduleLogs.map((log, idx) => {
                      const logStr = typeof log === 'string' ? log : '';
                      const parts = logStr.split(' -> ');
                      return (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-slate-400">{parts[0] || ''}</span>
                          <span className="text-green-400 font-bold">{parts[1] || 'OK'}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </motion.div>
            )}

            {/* SCREEN 3: THE DRAMATIC REVEAL & BREATHING BRAND NAME */}
            {(phase === 'reveal' || phase === 'finished') && (
              <div className="flex flex-col items-center justify-center text-center px-4">
                
                {/* Perfect centering container for Brand Typography */}
                <div className="relative overflow-visible py-3 px-1">
                  
                  {/* Subtle neon bloom breathing glow */}
                  <motion.div
                    animate={{
                      filter: [
                        'drop-shadow(0 0 16px rgba(0,229,255,0.4))',
                        'drop-shadow(0 0 32px rgba(139,92,246,0.6))',
                        'drop-shadow(0 0 16px rgba(0,229,255,0.4))'
                      ]
                    }}
                    transition={{
                      duration: 4.8,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    className="flex justify-center items-center gap-2 sm:gap-4 md:gap-5 flex-nowrap whitespace-nowrap"
                  >
                    {Array.from(brandName).map((char, index) => {
                      const isRevealed = index < revealedCount;
                      return (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, x: -45, filter: 'blur(16px)', scale: 1.15 }}
                          animate={isRevealed ? { opacity: 1, x: 0, filter: 'blur(0px)', scale: 1.0 } : {}}
                          transition={{
                            duration: 0.65,
                            ease: [0.16, 1, 0.3, 1]
                          }}
                          className={`inline-block font-sans text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-wider text-white select-none
                            ${char === ' ' ? 'w-4 sm:w-10' : ''}`}
                          style={{
                            fontFamily: '"SF Pro Display", "-apple-system", "BlinkMacSystemFont", "Inter", sans-serif',
                            textShadow: '0 0 12px rgba(255,255,255,0.15)',
                          }}
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                      );
                    })}
                  </motion.div>

                  {/* Metallic glare horizontal light sweep pass */}
                  {showShine && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-overlay">
                      <motion.div
                        initial={{ x: '-160%' }}
                        animate={{ x: '160%' }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                        className="w-[45%] h-full bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent -skew-x-12"
                      />
                    </div>
                  )}
                </div>

                {/* Sleek cyber horizontal bracket line under text */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 280, opacity: 0.55 }}
                  transition={{ delay: 0.3, duration: 1.1 }}
                  className="h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent my-6 relative"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_12px_#00e5ff] animate-ping" />
                </motion.div>

                {/* Typing subtitle text with glowing blinking caret */}
                <div className="h-6 flex items-center justify-center">
                  <span className="font-mono text-[10px] sm:text-xs tracking-[0.38em] uppercase text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(6,182,212,0.45)]">
                    {typingText}
                  </span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.85 }}
                    className="w-[6px] h-3.5 bg-cyan-400 ml-1.5"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Constant technical system watermark inside bottom footer of screen */}
          <div className="absolute bottom-6 font-mono text-[7px] text-slate-800 tracking-[0.45em] uppercase z-50">
            SK_STUDIO_ENGINE // COMPILED // SECURE_PORT_3000
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
