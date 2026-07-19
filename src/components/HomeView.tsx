import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, Cpu, Globe, Layers, Briefcase, 
  ShieldAlert, ShieldCheck, Sparkles, Terminal as ConsoleIcon, 
  Activity, Zap, ChevronRight, Lock, Unlock, Radio, Shield, 
  Code, Smartphone, Terminal, Volume2, VolumeX, RefreshCw, TerminalSquare
} from 'lucide-react';

// ==========================================
// ROYALTY-FREE WEB AUDIO AUDIO SYNTHESIZER
// ==========================================
const playCyberSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    
    // LAYER 1: Fast random hacking beep sequences
    const notes = [650, 980, 520, 1300, 850, 1600, 420, 1100];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      // Randomize waveform types to create high-tech glitch noise
      osc.type = i % 2 === 0 ? 'sine' : 'square';
      osc.frequency.setValueAtTime(freq, now + i * 0.07);
      
      gain.gain.setValueAtTime(0.12, now + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.1);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 0.12);
    });

    // LAYER 2: Resonant Lowpass Filter sweep (electric pulse wave)
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain2 = ctx.createGain();
    
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(80, now);
    osc2.frequency.exponentialRampToValueAtTime(850, now + 0.5);
    osc2.frequency.exponentialRampToValueAtTime(30, now + 1.5);
    
    filter.type = 'lowpass';
    filter.Q.setValueAtTime(20, now);
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(100, now + 1.0);
    
    gain2.gain.setValueAtTime(0.25, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
    
    osc2.connect(filter);
    filter.connect(gain2);
    gain2.connect(ctx.destination);
    
    osc2.start(now);
    osc2.stop(now + 2.0);
    
    // LAYER 3: White noise blast (glitchy static compression)
    const bufferSize = ctx.sampleRate * 0.45; 
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 3500;
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.07, now + 0.05);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    
    noise.start(now + 0.05);
    noise.stop(now + 0.5);
  } catch (err) {
    console.warn('AudioContext synth was blocked or unavailable:', err);
  }
};

const playBeepSound = (freq = 800, duration = 0.05, type: OscillatorType = 'sine') => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // ignore
  }
};

const playCyberSoundSweep = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.45);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, now);
    filter.frequency.exponentialRampToValueAtTime(180, now + 0.45);
    
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(now + 0.55);
  } catch (e) {
    // ignore
  }
};

// ==========================================
// THE CYBER BUTTON COMPONENT (3D + MAGNETIC + GLOW + RIPPLE)
// ==========================================
interface CyberButtonProps {
  label: string;
  onClick: (e: React.MouseEvent) => void;
  variant?: 'cyan' | 'pink' | 'purple' | 'emerald';
  icon?: React.ReactNode;
  id?: string;
}

function CyberButton({ label, onClick, variant = 'cyan', icon, id }: CyberButtonProps) {
  const containerRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Apply soft magnetic pull percentage
    setCoords({ x: x * 0.32, y: y * 0.32 });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!containerRef.current) {
      onClick(e);
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    
    playBeepSound(550, 0.08, 'triangle');
    onClick(e);
  };

  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timer);
  }, [ripples]);

  const glowStyles = {
    cyan: 'border-cyber-cyan shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_35px_rgba(0,240,255,0.55)] hover:border-cyber-cyan text-white',
    pink: 'border-cyber-pink shadow-[0_0_15px_rgba(255,0,127,0.2)] hover:shadow-[0_0_35px_rgba(255,0,127,0.55)] hover:border-cyber-pink text-white',
    purple: 'border-cyber-purple shadow-[0_0_15px_rgba(176,38,255,0.2)] hover:shadow-[0_0_35px_rgba(176,38,255,0.55)] hover:border-cyber-purple text-white',
    emerald: 'border-cyber-emerald shadow-[0_0_15px_rgba(5,255,197,0.2)] hover:shadow-[0_0_35px_rgba(5,255,197,0.55)] hover:border-cyber-emerald text-white',
  };

  const gradientBgs = {
    cyan: 'from-cyber-cyan/15 to-transparent',
    pink: 'from-cyber-pink/15 to-transparent',
    purple: 'from-cyber-purple/15 to-transparent',
    emerald: 'from-cyber-emerald/15 to-transparent',
  };

  return (
    <motion.button
      id={id}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => {
        setIsHovered(true);
        playBeepSound(900, 0.02, 'sine');
      }}
      onClick={handleClick}
      animate={{
        x: coords.x,
        y: coords.y,
        rotateX: isHovered ? -coords.y * 0.12 : 0,
        rotateY: isHovered ? coords.x * 0.12 : 0,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 14 }}
      className={`group relative px-6.5 py-4 rounded-xl bg-slate-950/85 border font-display text-[9.5px] font-black tracking-[0.25em] uppercase cursor-pointer overflow-hidden select-none transition-all ${glowStyles[variant]}`}
    >
      {/* Laser Reflection Shimmer */}
      <motion.div 
        animate={isHovered ? {
          left: ['-100%', '200%']
        } : {}}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
        className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none -left-full"
      />

      {/* Cyber gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradientBgs[variant]} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {label} {icon}
      </span>

      {/* Dynamic Click Ripple elements */}
      {ripples.map((rip) => (
        <span
          key={rip.id}
          className="absolute bg-white/20 rounded-full animate-ping pointer-events-none"
          style={{
            left: rip.x,
            top: rip.y,
            width: 140,
            height: 140,
            transform: 'translate(-50%, -50%)',
            animationDuration: '0.6s',
          }}
        />
      ))}

      {/* Futuristic technical corners */}
      <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/40" />
      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/40" />
    </motion.button>
  );
}

// ==========================================
// 3D NAV CYBER PANEL COMPONENT
// ==========================================
interface NavCyberPanelProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  subtitle: string;
  statusText: string;
  onSelect: () => void;
}

function NavCyberPanel({ id, label, icon, subtitle, statusText, onSelect }: NavCyberPanelProps) {
  const [isFlipping, setIsFlipping] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handlePanelClick = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    playCyberSoundSweep();
    
    setTimeout(() => {
      onSelect();
      setIsFlipping(false);
    }, 750); // delay to let 3D flip complete
  };

  return (
    <div 
      className="perspective-1000 w-full"
      onMouseEnter={() => {
        setIsHovered(true);
        playBeepSound(1100, 0.02, 'sine');
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        onClick={handlePanelClick}
        animate={isFlipping ? {
          rotateY: 360,
          scale: [1, 1.15, 1],
          z: [0, 80, 0]
        } : {
          rotateY: 0,
          y: isHovered ? -6 : 0
        }}
        transition={{
          duration: 0.75,
          ease: [0.16, 1, 0.3, 1]
        }}
        className={`relative w-full aspect-[16/10] sm:aspect-square md:aspect-[1.5/1] rounded-2xl p-5 border cursor-pointer select-none flex flex-col justify-between overflow-hidden transition-all duration-300 ${
          isHovered 
            ? 'bg-slate-900/90 border-cyber-cyan shadow-[0_0_25px_rgba(0,240,255,0.22)]' 
            : 'bg-slate-950/75 border-cyber-cyan/15 shadow-[0_10px_35px_rgba(0,0,0,0.55)]'
        }`}
      >
        {/* Holographic light trail when flipping */}
        {isFlipping && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.7, 1.5, 2.2], rotate: 180 }}
            transition={{ duration: 0.75 }}
            className="absolute inset-0 bg-gradient-to-tr from-cyber-cyan via-cyber-purple/50 to-cyber-pink pointer-events-none blur-lg rounded-2xl"
            style={{ mixBlendMode: 'screen' }}
          />
        )}

        {/* Dynamic laser border trail on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ left: '-100%' }}
              animate={{ left: '100%' }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
              className="absolute top-0 h-[2px] w-1/3 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Tech Corner Glowing Dots */}
        <span className="absolute top-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-cyber-cyan/30 animate-pulse" />
        <span className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-cyber-pink/30" />

        {/* Metadata Telemetry */}
        <div className="flex justify-between items-center text-[7.5px] font-mono font-black text-slate-550 tracking-widest uppercase">
          <span>PORT_DEC_{id.slice(0,3).toUpperCase()}</span>
          <span className="text-cyber-cyan font-bold animate-pulse">{statusText}</span>
        </div>

        {/* Icon & Title */}
        <div className="my-auto flex flex-col items-center justify-center gap-2">
          <motion.div
            animate={isHovered ? {
              scale: [1, 1.25, 1],
              rotate: [0, 8, -8, 0]
            } : {}}
            transition={{ duration: 0.45 }}
            className={`p-3 rounded-xl border transition-all ${
              isHovered 
                ? 'bg-cyber-cyan/12 border-cyber-cyan text-cyber-cyan shadow-[0_0_15px_rgba(0,240,255,0.25)]' 
                : 'bg-slate-950/90 border-cyber-cyan/10 text-slate-350'
            }`}
          >
            {icon}
          </motion.div>
          <span className="font-display text-xs sm:text-[11.5px] font-black text-white uppercase tracking-widest mt-1">
            {label}
          </span>
        </div>

        {/* Human Decrypted Footer */}
        <div className="text-center font-mono text-[8.5px] text-slate-450 font-bold tracking-[0.2em] border-t border-cyber-cyan/10 pt-2 uppercase">
          {subtitle}
        </div>
      </motion.div>
    </div>
  );
}

// ==========================================
// RADAR SWEEP CANVAS COMPONENT
// ==========================================
function RadarSweep() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;
    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = Math.min(cx, cy) - 5;

      // 1. Concentric circular rings
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
      ctx.lineWidth = 1;
      for (let r = 25; r <= radius; r += 25) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 2. Crosshairs
      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.stroke();

      // 3. Sweep lines & gradient wedge
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      const sweepGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      sweepGradient.addColorStop(0, 'rgba(0, 240, 255, 0)');
      sweepGradient.addColorStop(0.8, 'rgba(0, 240, 255, 0.05)');
      sweepGradient.addColorStop(1, 'rgba(0, 240, 255, 0.3)');

      ctx.fillStyle = sweepGradient;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, -0.4, 0);
      ctx.lineTo(0, 0);
      ctx.fill();

      // Leading beam edge
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.8)';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00f0ff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(radius, 0);
      ctx.stroke();

      ctx.restore();
      ctx.shadowBlur = 0; // reset

      // 4. Target blips (cyber threat nodes detected)
      const blips = [
        { x: cx + radius * 0.4, y: cy - radius * 0.35, size: 3, age: (angle + 1.2) % (Math.PI * 2) },
        { x: cx - radius * 0.5, y: cy + radius * 0.2, size: 4.5, age: (angle + 3.1) % (Math.PI * 2) },
        { x: cx + radius * 0.2, y: cy + radius * 0.5, size: 2, age: (angle + 4.9) % (Math.PI * 2) }
      ];

      blips.forEach((blip) => {
        // Blink when sweep line is near
        const intensity = Math.max(0.1, Math.sin(blip.age));
        ctx.fillStyle = `rgba(255, 0, 127, ${intensity})`;
        ctx.beginPath();
        ctx.arc(blip.x, blip.y, blip.size, 0, Math.PI * 2);
        ctx.fill();

        // Outer glow
        ctx.strokeStyle = `rgba(255, 0, 127, ${intensity * 0.4})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(blip.x, blip.y, blip.size * 2.2, 0, Math.PI * 2);
        ctx.stroke();
      });

      angle = (angle + 0.02) % (Math.PI * 2);
      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="relative w-full flex items-center justify-center p-3">
      <canvas 
        ref={canvasRef} 
        width={180} 
        height={180} 
        className="border border-cyber-cyan/10 rounded-full bg-slate-950/60 p-1"
      />
    </div>
  );
}

// ==========================================
// THE COMPLETE REDESIGNED HOMEVIEW COMPONENT
// ==========================================
interface HomeViewProps {
  onNavigate: (view: 'about' | 'services' | 'skills' | 'projects' | 'portfolio' | 'experience' | 'hire' | 'contact') => void;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
  const [isGlitched, setIsGlitched] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    '[SK_SEC]: Ports audited, core secure.',
    '[SYSTEM]: Establishing neural connection layers...',
    '[AUTH]: Token exchange verified via SHA-512.',
    '[HUD]: Parallax command cameras synced.'
  ]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [resumeLoading, setResumeLoading] = useState(false);

  // Sync dynamic mouse position for elegant 3D parallax offsets
  const handleMouseMoveGlobal = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = (clientX / width) * 2 - 1; // Range: -1 to 1
    const y = (clientY / height) * 2 - 1; // Range: -1 to 1
    setMousePos({ x, y });
  };

  // Continual telemetry logs feed
  useEffect(() => {
    const logPool = [
      '[SK_SHIELD]: System firewall status: ACTIVE',
      '[CORE_NET]: Node 0x9AF01 fully encrypted',
      '[TELEMETRY]: Frame state drawing at 60.0 FPS',
      '[DECRYPT]: Syncing biometric security keychain',
      '[AI_AGENT]: Machine learning cores online',
      '[MATRIX]: Recalibrating holographic viewport',
      '[INTEGRITY]: Data package buffers validated (100%)',
      '[RECON]: Scanned host: PORT 3000 online'
    ];

    const interval = setInterval(() => {
      const randomLog = logPool[Math.floor(Math.random() * logPool.length)];
      const timestamp = new Date().toLocaleTimeString().split(' ')[0];
      setLogs((prev) => [...prev.slice(-6), `[${timestamp}] ${randomLog}`]);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  // Handle glitched state duration and audio triggers
  const triggerGlitchEffect = () => {
    if (isGlitched) return;
    setIsGlitched(true);
    playCyberSound();
    
    setTimeout(() => {
      setIsGlitched(false);
    }, 2500); // 2.5 seconds duration
  };

  // Simulate CV decryption popup
  const handleResumeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setResumeModalOpen(true);
    setResumeLoading(true);
    playBeepSound(1200, 0.15, 'sine');
    
    setTimeout(() => {
      setResumeLoading(false);
      playCyberSoundSweep();
    }, 1800);
  };

  return (
    <div 
      onMouseMove={handleMouseMoveGlobal}
      className={`relative min-h-screen pb-20 select-none text-left flex flex-col gap-12 transition-all duration-300 ${
        isGlitched ? 'bg-red-950/20 contrast-125 saturate-150' : 'bg-transparent'
      }`}
    >
      {/* Glitched Warning banner */}
      <AnimatePresence>
        {isGlitched && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-red-600 border border-red-500 text-white font-mono text-[9px] font-black tracking-[0.3em] px-6 py-2.5 rounded shadow-[0_0_20px_#ff0000] uppercase flex items-center gap-3"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            WARNING: PROTOCOL CORRUPTION ACTIVED // SONU KAHAR MATRIX DEPLOYED
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Cyber Auroras */}
      <div className="absolute top-1/4 left-1/4 w-[45vw] h-[45vw] rounded-full bg-cyber-cyan/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[45vw] h-[45vw] rounded-full bg-cyber-pink/5 blur-[130px] pointer-events-none" />

      {/* ========================================================
          1. HERO COMMANDER STATION (CENTERED HERO)
          ======================================================== */}
      <section className="relative min-h-[55vh] flex flex-col items-center justify-center text-center py-10 overflow-hidden">
        
        {/* Holographic Spinning Rings */}
        <div className="absolute w-[360px] h-[360px] md:w-[440px] md:h-[440px] rounded-full border border-cyber-cyan/15 pointer-events-none flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-cyber-cyan/10"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
            className="absolute w-[92%] h-[92%] rounded-full border border-cyber-pink/20"
          />
          <motion.div 
            animate={{ rotate: 180 }}
            transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
            className="absolute w-[80%] h-[80%] rounded-full border-2 border-dotted border-cyber-purple/20"
          />
        </div>

        {/* Floating Digital particles using framer-motion */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(14)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-cyber-cyan/30"
              style={{
                left: `${15 + i * 6.5}%`,
                top: `${20 + (i % 3) * 22}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.95, 0.2],
                scale: [0.8, 1.3, 0.8]
              }}
              transition={{
                duration: 4.5 + (i % 2) * 2.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>

        {/* Main Content inside Floating Ring */}
        <div className="relative z-10 max-w-2xl px-4 space-y-6">
          <motion.div 
            animate={isGlitched ? {
              scale: [1, 1.08, 0.95, 1],
              skewX: [0, 8, -8, 0]
            } : {}}
            className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-md bg-slate-950/80 border border-cyber-cyan/30 shadow-[0_0_15px_rgba(0,240,255,0.08)]"
          >
            <span className={`h-2.5 w-2.5 rounded-full ${isGlitched ? 'bg-red-500 animate-pulse' : 'bg-cyber-cyan animate-ping'}`} />
            <span className="font-mono text-[9px] tracking-[0.25em] text-cyber-cyan font-bold uppercase">
              {isGlitched ? 'MODE: CYBER_ALERT_ACTIVE' : 'SECURITY_COMMAND_HUB_VERIFIED'}
            </span>
          </motion.div>

          <div className="space-y-4">
            <h3 className="font-display text-xs tracking-[0.44em] text-cyber-pink font-extrabold uppercase">
              // SONU KAHAR PROTOCOL
            </h3>
            
            {/* Interactive Name Click glitched trigger */}
            <h1 
              onClick={triggerGlitchEffect}
              className={`font-display text-5xl sm:text-7xl font-black tracking-tight uppercase leading-[0.9] cursor-pointer group relative select-none ${
                isGlitched ? 'text-red-500 line-through scale-95 skew-y-3' : 'text-white'
              }`}
              title="Click to activate Cyber Mode"
            >
              {isGlitched ? (
                <span className="glitch-text" data-text="SONU KAHAR">
                  S0NU K4H4R
                </span>
              ) : (
                <span className="hover:text-cyber-cyan transition-colors relative block">
                  SONU KAHAR
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-16 h-[2.5px] bg-cyber-pink rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_8px_#ff007f]" />
                </span>
              )}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[10px] sm:text-xs text-cyber-cyan tracking-widest uppercase font-bold pt-1.5">
              <span>SOFTWARE ENGINEER</span>
              <span className="text-cyber-pink">•</span>
              <span>FULL STACK DEVELOPER</span>
              <span className="text-cyber-pink">•</span>
              <span>ANDROID DEVELOPER</span>
              <span className="text-cyber-pink">•</span>
              <span>AI DEVELOPER</span>
            </div>
          </div>

          <p className="font-sans text-slate-400 text-sm leading-relaxed max-w-xl mx-auto">
            Interactive command center driving zero-trust web deployments, secure biometrics architectures, and AI deep-search integrations. Click my name to inject digital glitches into the grid system.
          </p>

          {/* ========================================================
              BUTTONS DECK WITH ALL SPECIAL STYLINGS (3D, MAGNETIC, GLOW, RIPPLE)
              ======================================================== */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <CyberButton 
              label="Hire Me" 
              onClick={() => onNavigate('contact')} 
              variant="cyan" 
              icon={<ChevronRight size={13} className="text-cyber-pink group-hover:translate-x-1 transition-transform" />}
            />
            <CyberButton 
              label="Projects" 
              onClick={() => onNavigate('projects')} 
              variant="pink" 
              icon={<ArrowUpRight size={13} className="text-cyber-cyan group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />}
            />
            <CyberButton 
              label="Services" 
              onClick={() => onNavigate('services')} 
              variant="purple" 
              icon={<Layers size={13} />}
            />
            <CyberButton 
              label="Portfolio" 
              onClick={() => onNavigate('portfolio')} 
              variant="emerald" 
              icon={<Sparkles size={13} />}
            />
            <CyberButton 
              label="Resume" 
              onClick={handleResumeClick} 
              variant="cyan" 
              icon={<Lock size={13} className="text-cyber-pink" />}
            />
          </div>
        </div>
      </section>

      {/* ========================================================
          2. FLOATING HOLOGRAPHIC GLASS PANELS (HUD DIAGNOSTICS)
          ======================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 px-1">
        
        {/* PANEL 1: SECURITY COMMAND STATUS (LEFT) */}
        <motion.div
          animate={{
            y: [0, -5, 0],
            rotateX: mousePos.y * 3,
            rotateY: -mousePos.x * 3,
          }}
          transition={{
            y: { repeat: Infinity, duration: 5.5, ease: 'easeInOut' },
            rotateX: { type: 'spring', stiffness: 100, damping: 15 },
            rotateY: { type: 'spring', stiffness: 100, damping: 15 },
          }}
          className={`lg:col-span-4 rounded-2xl p-6.5 border relative overflow-hidden flex flex-col justify-between min-h-[290px] backdrop-blur-xl ${
            isGlitched 
              ? 'border-red-500 bg-red-950/20 shadow-[0_0_20px_rgba(239,68,68,0.25)]' 
              : 'border-cyber-cyan/20 bg-slate-950/75 shadow-[0_12px_40px_rgba(0,0,0,0.6)]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-cyber-cyan/15 pb-3">
            <span className="font-display text-[9px] text-slate-400 font-extrabold tracking-widest uppercase flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isGlitched ? 'bg-red-500' : 'bg-cyber-emerald'} animate-pulse`} />
              TACTICAL SEC STATUS
            </span>
            <span className="font-mono text-[9px] text-cyber-cyan uppercase font-bold">SEC_PORTAL_CORE</span>
          </div>

          {/* Stats Lines */}
          <div className="space-y-4 my-4 font-mono text-[11px] text-slate-300">
            <div className="flex justify-between items-center">
              <span>DECRYPT KEYCHAIN</span>
              <span className="text-cyber-cyan font-bold flex items-center gap-1">
                <ShieldCheck size={12} className="text-cyber-emerald" /> AES_256_STABLE
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span>FIREWALL INTEGRITY</span>
              <span className="text-cyber-pink font-bold flex items-center gap-1">
                <Lock size={12} className="text-cyber-pink animate-pulse" /> 100.0% COGNITIVE
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span>ACTIVE THREAT INDEX</span>
              <span className="text-cyber-cyan font-bold flex items-center gap-1">
                <ShieldAlert size={12} className="text-cyber-cyan" /> 0x000 (SECURE)
              </span>
            </div>

            {/* Dynamic visual slider */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[9px] text-slate-450 uppercase font-bold">
                <span>BUFFER BANDWIDTH LOAD</span>
                <span>8.2% CORES</span>
              </div>
              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden p-[0.5px]">
                <motion.div 
                  animate={{ width: ['20%', '90%', '20%'] }} 
                  transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }} 
                  className="h-full rounded-full bg-cyber-cyan shadow-[0_0_8px_#00f0ff]" 
                />
              </div>
            </div>
          </div>

          <div className="font-mono text-[8.5px] text-slate-500 border-t border-cyber-cyan/5 pt-3 flex justify-between">
            <span>SECTOR: 0x9AF01</span>
            <span>OS: SHIELD v5.8</span>
          </div>
        </motion.div>

        {/* PANEL 2: CYBER DIAGNOSTIC RADAR (RIGHT) */}
        <motion.div
          animate={{
            y: [0, -5, 0],
            rotateX: mousePos.y * 3.5,
            rotateY: -mousePos.x * 3.5,
          }}
          transition={{
            y: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 0.3 },
            rotateX: { type: 'spring', stiffness: 100, damping: 15 },
            rotateY: { type: 'spring', stiffness: 100, damping: 15 },
          }}
          className={`lg:col-span-4 rounded-2xl p-6 border relative overflow-hidden flex flex-col justify-between min-h-[290px] backdrop-blur-xl ${
            isGlitched 
              ? 'border-red-500 bg-red-950/20 shadow-[0_0_20px_rgba(239,68,68,0.25)]' 
              : 'border-cyber-cyan/20 bg-slate-950/75 shadow-[0_12px_40px_rgba(0,0,0,0.6)]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-cyber-cyan/15 pb-3">
            <span className="font-display text-[9px] text-slate-400 font-extrabold tracking-widest uppercase flex items-center gap-2">
              <Radio size={12} className="text-cyber-pink animate-pulse" />
              CYBER DEPLOY SWEEP
            </span>
            <span className="font-mono text-[9px] text-cyber-pink uppercase font-bold">RADAR_HUD_02</span>
          </div>

          {/* Sweep Canvas */}
          <div className="flex-grow flex items-center justify-center my-1.5">
            <RadarSweep />
          </div>

          {/* Decryption check info */}
          <div className="font-mono text-[8.5px] text-slate-500 border-t border-cyber-cyan/5 pt-3 text-center">
            SCANNING ADJACENT NODE BLOCKS... <span className="text-cyber-emerald">ACTIVE</span>
          </div>
        </motion.div>

        {/* PANEL 3: TELEMETRY PROCESSOR FEED (RIGHT-MOST) */}
        <motion.div
          animate={{
            y: [0, -5, 0],
            rotateX: mousePos.y * 4,
            rotateY: -mousePos.x * 4,
          }}
          transition={{
            y: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.6 },
            rotateX: { type: 'spring', stiffness: 100, damping: 15 },
            rotateY: { type: 'spring', stiffness: 100, damping: 15 },
          }}
          className={`lg:col-span-4 rounded-2xl p-6 border relative overflow-hidden flex flex-col justify-between min-h-[290px] backdrop-blur-xl ${
            isGlitched 
              ? 'border-red-500 bg-red-950/20 shadow-[0_0_20px_rgba(239,68,68,0.25)]' 
              : 'border-cyber-cyan/20 bg-slate-950/75 shadow-[0_12px_40px_rgba(0,0,0,0.6)]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-cyber-cyan/15 pb-3">
            <span className="font-display text-[9px] text-slate-400 font-extrabold tracking-widest uppercase flex items-center gap-2">
              <ConsoleIcon size={12} className="text-cyber-cyan animate-pulse" />
              SYSTEM LOG TELEMETRY
            </span>
            <span className="font-mono text-[9px] text-cyber-cyan uppercase font-bold">TERMINAL_STDOUT</span>
          </div>

          {/* Logs Feed Container */}
          <div className="flex-grow my-4 bg-slate-950/90 border border-cyber-cyan/10 rounded-lg p-3.5 font-mono text-[8.5px] text-slate-350 space-y-2 text-left h-36 overflow-hidden">
            {logs.map((log, index) => (
              <div key={index} className="truncate border-l border-cyber-cyan/20 pl-2.5 hover:border-cyber-pink transition-all">
                <span className="text-cyber-cyan font-bold">&gt;&nbsp;</span>
                {log}
              </div>
            ))}
          </div>

          {/* Decryption Check Footer */}
          <div className="font-mono text-[8.5px] text-slate-550 border-t border-cyber-cyan/5 pt-3 flex justify-between items-center">
            <span>PACKET COUNT: 14,809</span>
            <span className="text-cyber-emerald flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald animate-ping" /> STABLE
            </span>
          </div>
        </motion.div>
      </section>

      {/* ========================================================
          3. NAVIGATION GRID (THE 3D FLIPPING PREMIUM CYBER PANELS)
          ======================================================== */}
      <section className="space-y-8 relative z-10">
        <div className="space-y-2 text-center md:text-left">
          <span className="font-display text-xs text-cyber-pink font-extrabold tracking-[0.4em] uppercase block">// SYSTEM NAV PANEL</span>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            CORE DIRECTORIES
          </h2>
          <div className="h-[2.5px] w-14 bg-gradient-to-r from-cyber-cyan to-cyber-pink mt-1 mx-auto md:mx-0 rounded-full" />
        </div>

        {/* The 7 Navigation Options as Beautiful 3D Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <NavCyberPanel 
            id="about"
            label="Specs"
            icon={<Shield className="text-cyber-cyan" size={20} />}
            subtitle="About Sonu"
            statusText="0x01_ONLINE"
            onSelect={() => onNavigate('about')}
          />
          <NavCyberPanel 
            id="skills"
            label="Stack"
            icon={<Cpu className="text-cyber-purple animate-pulse" size={20} />}
            subtitle="Capabilities & Tech"
            statusText="0x02_STABLE"
            onSelect={() => onNavigate('skills')}
          />
          <NavCyberPanel 
            id="services"
            label="Services"
            icon={<Layers className="text-cyber-pink" size={20} />}
            subtitle="Deep Core Features"
            statusText="0x03_SECURE"
            onSelect={() => onNavigate('services')}
          />
          <NavCyberPanel 
            id="projects"
            label="Repos"
            icon={<ArrowUpRight className="text-cyber-emerald" size={20} />}
            subtitle="Development Repos"
            statusText="0x04_ACTIVE"
            onSelect={() => onNavigate('projects')}
          />
          <NavCyberPanel 
            id="portfolio"
            label="Gallery"
            icon={<Sparkles className="text-cyber-cyan" size={20} />}
            subtitle="Visual Portfolio"
            statusText="0x05_DECRYPT"
            onSelect={() => onNavigate('portfolio')}
          />
          <NavCyberPanel 
            id="experience"
            label="Chronicle"
            icon={<Briefcase className="text-cyber-purple" size={20} />}
            subtitle="Employment History"
            statusText="0x06_VERIFIED"
            onSelect={() => onNavigate('experience')}
          />
          <NavCyberPanel 
            id="contact"
            label="Channel"
            icon={<Radio className="text-cyber-pink" size={20} />}
            subtitle="Secure Inbox"
            statusText="0x07_OPEN"
            onSelect={() => onNavigate('contact')}
          />
          {/* Decorative Terminal block to fill the 8-grid layout */}
          <div className="relative w-full aspect-[16/10] sm:aspect-square md:aspect-[1.5/1] rounded-2xl p-5 border border-cyber-cyan/10 bg-slate-950/45 flex flex-col justify-between text-left">
            <div className="flex justify-between text-[7.5px] font-mono font-black text-slate-550 uppercase">
              <span>AUXILIARY ENGINE</span>
              <span className="text-cyber-pink">Armed</span>
            </div>
            <div className="my-auto space-y-1">
              <span className="font-display text-[10px] text-slate-300 font-bold tracking-widest uppercase block">NODE STATUS</span>
              <span className="font-mono text-[9px] text-cyber-cyan font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-ping" />
                INTEGRATED STACK OK
              </span>
            </div>
            <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest block text-right">SYSTEM_v5.8</span>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. RESUME DECRYPTION SYSTEM MODAL (100% ROYALTY-FREE SFX)
          ======================================================== */}
      <AnimatePresence>
        {resumeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setResumeModalOpen(false);
                playBeepSound(400, 0.08, 'sine');
              }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-slate-950 border border-cyber-cyan p-6 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.3)] z-10"
            >
              {/* Corner Indicators */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyber-cyan" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyber-cyan" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyber-cyan" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyber-cyan" />

              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-cyber-cyan/20 pb-3">
                  <span className="font-display text-xs font-black text-white tracking-widest uppercase">
                    RESUME DECRYPTION ENGINE
                  </span>
                  <button 
                    onClick={() => {
                      setResumeModalOpen(false);
                      playBeepSound(400, 0.08, 'sine');
                    }}
                    className="text-slate-400 hover:text-white font-mono text-[9px] hover:bg-slate-900 border border-cyber-cyan/20 px-2.5 py-1 rounded cursor-pointer"
                  >
                    CLOSE [X]
                  </button>
                </div>

                {resumeLoading ? (
                  <div className="py-12 flex flex-col items-center justify-center gap-4 text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                    >
                      <RefreshCw size={36} className="text-cyber-cyan" />
                    </motion.div>
                    <div className="space-y-1">
                      <p className="font-mono text-xs text-cyber-cyan font-bold tracking-widest uppercase">DECRYPTING CV PATHWAYS...</p>
                      <p className="font-mono text-[8px] text-slate-500 uppercase">DECRYPTION STRENGTH: AES_256_GCM</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="bg-slate-900/60 p-4.5 rounded-xl border border-cyber-emerald/30 text-left space-y-3">
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck size={18} className="text-cyber-emerald" />
                        <span className="font-display text-[10.5px] font-black text-white tracking-widest uppercase">DECRYPTION SUCCESSFUL</span>
                      </div>
                      <p className="font-sans text-xs text-slate-350 leading-relaxed">
                        Sonu Kahar's resume credentials have been successfully compiled and decrypted on secure system nodes. You can access the direct channel below to hire.
                      </p>
                    </div>

                    <div className="space-y-2.5 text-xs font-mono text-slate-300">
                      <div className="flex justify-between border-b border-slate-900 pb-1.5">
                        <span className="text-slate-500 uppercase font-bold">Operative:</span>
                        <span className="font-bold text-white uppercase">Sonu Kahar</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-900 pb-1.5">
                        <span className="text-slate-500 uppercase font-bold">Primary Specs:</span>
                        <span className="font-bold text-white uppercase">React / Android / Kotlin / Node</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-900 pb-1.5">
                        <span className="text-slate-500 uppercase font-bold">Cert Integrity:</span>
                        <span className="font-bold text-cyber-cyan uppercase">100% Crypt Stable</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setResumeModalOpen(false);
                          onNavigate('contact');
                        }}
                        className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 hover:from-cyber-cyan/35 hover:to-cyber-purple/35 border border-cyber-cyan text-white font-display text-[9px] font-black tracking-widest uppercase cursor-pointer text-center"
                      >
                        Secure Hire Channel
                      </button>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Resume file download initiated in background container.');
                        }}
                        className="flex-1 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-cyber-pink/40 hover:border-cyber-cyan text-slate-300 hover:text-white font-display text-[9px] font-black tracking-widest uppercase cursor-pointer text-center flex items-center justify-center gap-1.5"
                      >
                        Download PDF
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
