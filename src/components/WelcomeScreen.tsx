import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Lock, Cpu, Radio, Zap, Volume2, VolumeX, Terminal, ShieldAlert } from 'lucide-react';
import CodingTerminalView from './CodingTerminalView';
import VisitorProfileCard from './VisitorProfileCard';

interface WelcomeScreenProps {
  onEnter: () => void;
}

// ========================================================
// CODE-DRIVEN PRO AUDIO SYNTH ENGINE (Web Audio API)
// ========================================================
class CyberSoundEngine {
  private ctx: AudioContext | null = null;
  private droneOscs: OscillatorNode[] = [];
  private droneGain: GainNode | null = null;
  private soundEnabled = true;

  constructor() {
    // Audio Context is lazily initialized on user interaction
  }

  setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    if (!enabled && this.droneGain) {
      // Fade out drone immediately
      try {
        this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, this.ctx?.currentTime || 0);
        this.droneGain.gain.exponentialRampToValueAtTime(0.0001, (this.ctx?.currentTime || 0) + 0.3);
      } catch (e) {}
    } else if (enabled && this.ctx && this.ctx.state !== 'closed') {
      this.playBootDrone();
    }
  }

  isSoundEnabled() {
    return this.soundEnabled;
  }

  private init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Low hum + warm ambient AI drone chord
  playBootDrone() {
    if (!this.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Stop any existing drone oscs
      this.stopDrone();

      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0, now);
      this.droneGain.gain.linearRampToValueAtTime(0.04, now + 2.0); // very soft
      this.droneGain.connect(this.ctx.destination);

      // Low frequency cinematic hum (60Hz)
      const hum = this.ctx.createOscillator();
      hum.type = 'sine';
      hum.frequency.setValueAtTime(60, now);
      
      const humFilter = this.ctx.createBiquadFilter();
      humFilter.type = 'lowpass';
      humFilter.frequency.setValueAtTime(90, now);
      
      hum.connect(humFilter);
      humFilter.connect(this.droneGain);
      hum.start(now);
      this.droneOscs.push(hum);

      // Warm futuristic chord voicing (C major 9 / Fmaj9 mix)
      const freqs = [130.81, 196.00, 246.94, 293.66, 392.00, 493.88]; // C3, G3, B3, D4, G4, B4
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const chordGain = this.ctx.createGain();
        const pan = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        // Subtle frequency modulation
        osc.frequency.linearRampToValueAtTime(freq + (Math.random() - 0.5) * 2, now + 5);

        chordGain.gain.setValueAtTime(0, now);
        chordGain.gain.linearRampToValueAtTime(0.006 - idx * 0.0008, now + 1.5 + idx * 0.3);

        if (pan) {
          pan.pan.setValueAtTime((idx / freqs.length) * 2 - 1, now);
          osc.connect(pan);
          pan.connect(chordGain);
        } else {
          osc.connect(chordGain);
        }
        
        chordGain.connect(this.droneGain!);
        osc.start(now);
        this.droneOscs.push(osc);
      });
    } catch (e) {
      console.warn('Audio Context deferred or blocked:', e);
    }
  }

  stopDrone() {
    try {
      this.droneOscs.forEach(o => {
        try { o.stop(); } catch(e) {}
      });
      this.droneOscs = [];
      if (this.droneGain) {
        this.droneGain.disconnect();
        this.droneGain = null;
      }
    } catch(e) {}
  }

  // Tactile haptic feedback click for hover
  playHoverPing() {
    if (!this.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.04, now);
      g.connect(this.ctx.destination);

      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1500, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.06);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.06, now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(oscGain);
      oscGain.connect(g);
      osc.start(now);
      osc.stop(now + 0.08);

      // Brief high-tech click
      const chirp = this.ctx.createOscillator();
      const chirpGain = this.ctx.createGain();
      chirp.type = 'triangle';
      chirp.frequency.setValueAtTime(2500, now);
      chirpGain.gain.setValueAtTime(0.015, now);
      chirpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

      chirp.connect(chirpGain);
      chirpGain.connect(g);
      chirp.start(now);
      chirp.stop(now + 0.03);
    } catch (e) {}
  }

  // Soft sweep played during energy charging on button hover
  playChargingSweep() {
    if (!this.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const g = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(360, now + 1.0);

      filter.type = 'peaking';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.linearRampToValueAtTime(1600, now + 1.0);
      filter.Q.setValueAtTime(8, now);

      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.02, now + 0.3);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);

      osc.connect(filter);
      filter.connect(g);
      g.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.1);
    } catch(e) {}
  }

  // Heavy cinematic system-boot sweep on entry
  playEnterSweep() {
    if (!this.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Stop drone
      this.stopDrone();

      const master = this.ctx.createGain();
      master.gain.setValueAtTime(0.2, now);
      master.connect(this.ctx.destination);

      // Deep cinematic sub-bass explosion drop
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(110, now);
      sub.frequency.exponentialRampToValueAtTime(24, now + 1.6);

      subGain.gain.setValueAtTime(0.4, now);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

      sub.connect(subGain);
      subGain.connect(master);
      sub.start(now);
      sub.stop(now + 1.7);

      // Laser energy sweep rise
      const sweep = this.ctx.createOscillator();
      const sweepFilter = this.ctx.createBiquadFilter();
      const sweepGain = this.ctx.createGain();

      sweep.type = 'sawtooth';
      sweep.frequency.setValueAtTime(80, now);
      sweep.frequency.exponentialRampToValueAtTime(900, now + 1.3);

      sweepFilter.type = 'lowpass';
      sweepFilter.frequency.setValueAtTime(150, now);
      sweepFilter.frequency.exponentialRampToValueAtTime(3500, now + 1.3);

      sweepGain.gain.setValueAtTime(0.001, now);
      sweepGain.gain.linearRampToValueAtTime(0.12, now + 0.3);
      sweepGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

      sweep.connect(sweepFilter);
      sweepFilter.connect(sweepGain);
      sweepGain.connect(master);
      sweep.start(now);
      sweep.stop(now + 1.6);
    } catch(e) {}
  }

  // Voice speech synthesis helper
  speak(text: string) {
    if (!this.soundEnabled) return;
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        const cyberVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Robot') || v.name.includes('David') || v.name.includes('Zira') || v.name.includes('Hazel')));
        if (cyberVoice) {
          utterance.voice = cyberVoice;
        }
        utterance.pitch = 0.85; // cybernetic lower pitch
        utterance.rate = 1.05;  // professional pacing
        utterance.volume = 0.95;
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.warn('Speech synthesis failed:', e);
    }
  }

  playSecurityAlert() {
    if (!this.soundEnabled) return;
    try {
      this.init();

      // Trigger high-fidelity cyber speech synthesis immediately on user gesture event
      this.speak("ACCESS DETECTED. SYSTEM INITIALIZING.");

      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      this.stopDrone();

      const master = this.ctx.createGain();
      master.gain.setValueAtTime(0.18, now);
      master.connect(this.ctx.destination);

      // Warning alert tone dual oscillator sequence (sirens)
      for (let i = 0; i < 3; i++) {
        const start = now + i * 0.45;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(650, start);
        osc.frequency.exponentialRampToValueAtTime(1100, start + 0.15);
        osc.frequency.exponentialRampToValueAtTime(450, start + 0.35);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(900, start);
        filter.frequency.exponentialRampToValueAtTime(2200, start + 0.15);
        filter.Q.setValueAtTime(5, start);

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.2, start + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.42);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(master);

        osc.start(start);
        osc.stop(start + 0.43);
      }

      // Deep warning sub-kick / boom drop
      const kick = this.ctx.createOscillator();
      const kickGain = this.ctx.createGain();
      kick.type = 'sine';
      kick.frequency.setValueAtTime(150, now);
      kick.frequency.exponentialRampToValueAtTime(32, now + 1.8);

      kickGain.gain.setValueAtTime(0.65, now);
      kickGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      kick.connect(kickGain);
      kickGain.connect(master);
      kick.start(now);
      kick.stop(now + 1.9);

      // Rapid telemetry handshake clicks
      const clickCount = 4;
      for (let i = 0; i < clickCount; i++) {
        const bTime = now + 1.4 + i * 0.12;
        const bOsc = this.ctx.createOscillator();
        const bGain = this.ctx.createGain();
        
        bOsc.type = 'sine';
        bOsc.frequency.setValueAtTime(2200, bTime);
        bGain.gain.setValueAtTime(0, bTime);
        bGain.gain.linearRampToValueAtTime(0.12, bTime + 0.02);
        bGain.gain.exponentialRampToValueAtTime(0.0001, bTime + 0.1);
        
        bOsc.connect(bGain);
        bGain.connect(master);
        bOsc.start(bTime);
        bOsc.stop(bTime + 0.11);
      }
    } catch(e) {}
  }
}

// Create single global/static instance of sound engine
const soundEngine = new CyberSoundEngine();

export default function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isEntering, setIsEntering] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [btnCoords, setBtnCoords] = useState({ x: 0, y: 0 });
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [subtitlesRevealed, setSubtitlesRevealed] = useState(false);

  // Geo tracking flow states
  const [welcomeSubPhase, setWelcomeSubPhase] = useState<'welcome' | 'requesting' | 'map' | 'profile' | 'denied'>('welcome');
  const [visitorCoords, setVisitorCoords] = useState<{ lat: number; lng: number } | null>(null);

  const clickXRef = useRef(0);
  const clickYRef = useRef(0);
  const energyBlastRadiusRef = useRef(0);

  // Toggle Sound State
  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const targetState = !isSoundOn;
    setIsSoundOn(targetState);
    soundEngine.setSoundEnabled(targetState);
    if (targetState) {
      soundEngine.playBootDrone();
    }
  };

  // Initialize background boot sound
  useEffect(() => {
    soundEngine.setSoundEnabled(isSoundOn);
    // Play drone chord (will start as soon as user first touches/clicks screen)
    soundEngine.playBootDrone();
    
    // Automatically trigger subtitles list assembly timing
    const subTimer = setTimeout(() => {
      setSubtitlesRevealed(true);
    }, 1800);

    // Pre-trigger voice retrieval for speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }

    return () => {
      clearTimeout(subTimer);
      soundEngine.stopDrone();
    };
  }, []);

  // Redesigned: Dark futuristic cyber background with animated holographic grid
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationId: number;
    let frame = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Soft moving light beams
    const lightBeams: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
    }> = [
      { x: width * 0.15, y: height * 0.25, radius: width * 0.45, vx: 0.18, vy: 0.12, color: 'rgba(0, 240, 255, 0.05)' }, // Cyan Glow
      { x: width * 0.85, y: height * 0.75, radius: width * 0.55, vx: -0.15, vy: -0.12, color: 'rgba(176, 38, 255, 0.045)' }, // Purple Glow
      { x: width * 0.5, y: height * 0.45, radius: width * 0.4, vx: 0.12, vy: -0.18, color: 'rgba(0, 114, 255, 0.04)' } // Electric Blue Glow
    ];

    const render = () => {
      frame++;
      
      // Cine cyber dark base
      ctx.fillStyle = '#010206';
      ctx.fillRect(0, 0, width, height);

      // Render Soft Moving Light Beams
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      lightBeams.forEach(beam => {
        beam.x += beam.vx;
        beam.y += beam.vy;

        if (beam.x < 0 || beam.x > width) beam.vx *= -1;
        if (beam.y < 0 || beam.y > height) beam.vy *= -1;

        const grad = ctx.createRadialGradient(beam.x, beam.y, 0, beam.x, beam.y, beam.radius);
        grad.addColorStop(0, beam.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      });
      ctx.restore();

      // Render Animated Holographic Grid
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.035)';
      ctx.lineWidth = 1;

      // Vertical perspective lines
      const horizonY = height * 0.45;
      const verticalLineCount = 30;
      for (let i = 0; i <= verticalLineCount; i++) {
        const ratio = i / verticalLineCount;
        const xStart = (ratio - 0.5) * width * 3 + width / 2;
        ctx.beginPath();
        ctx.moveTo(width / 2 + (ratio - 0.5) * 45, horizonY);
        ctx.lineTo(xStart, height);
        ctx.stroke();
      }

      // Horizontal receding lines
      const speed = 0.0035;
      const gridOffset = (frame * speed) % 1.0;
      const horizontalLineCount = 13;
      for (let i = 0; i < horizontalLineCount; i++) {
        const progress = (i + gridOffset) / horizontalLineCount;
        const y = horizonY + Math.pow(progress, 2.2) * (height - horizonY);
        
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.055 * progress})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // Render Subtle Scan Lines (high-tech CRT filter)
      ctx.save();
      ctx.fillStyle = 'rgba(0, 240, 255, 0.005)';
      for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 1);
      }
      ctx.restore();

      // Energy shockwave sweep if entering
      if (energyBlastRadiusRef.current > 0) {
        energyBlastRadiusRef.current += 24;
        ctx.beginPath();
        ctx.arc(clickXRef.current, clickYRef.current, energyBlastRadiusRef.current, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 240, 255, ${Math.max(0, 1 - energyBlastRadiusRef.current / (width * 1.5))})`;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00f0ff';
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Magnetic button calculations & hover trigger
  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Magnetic drift
    setMagneticPos({ x: x * 0.22, y: y * 0.22 });
    
    // 3D tilt coordinates
    setBtnCoords({ x: x / rect.width, y: y / rect.height });
  };

  const handleButtonMouseLeave = () => {
    setMagneticPos({ x: 0, y: 0 });
    setBtnCoords({ x: 0, y: 0 });
    setHovered(false);
  };

  const handleButtonMouseEnter = () => {
    setHovered(true);
    soundEngine.playHoverPing();
    soundEngine.playChargingSweep();
  };

  // Play SECURITY ALERT sound and transition smoothly
  const handleEnterSystem = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isEntering) return;
    setIsEntering(true);
    
    clickXRef.current = e.clientX;
    clickYRef.current = e.clientY;
    energyBlastRadiusRef.current = 1; // trigger expansion
    
    // Add visual ripple inside button coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    const rx = e.clientX - rect.left;
    const ry = e.clientY - rect.top;
    setRipples([{ id: Date.now(), x: rx, y: ry }]);

    // Play advanced SECURITY ALERT sound
    soundEngine.playSecurityAlert();

    // Trigger silent Geolocation lookup right away in the background
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setVisitorCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.warn('Geolocation denied or failed:', error);
          setVisitorCoords(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 4500,
          maximumAge: 0
        }
      );
    } else {
      setVisitorCoords(null);
    }

    // Direct transition to Coding screen with a very fast 200ms delay so there is no lag
    setTimeout(() => {
      setWelcomeSubPhase('map');
    }, 200);
  };

  if (welcomeSubPhase === 'map') {
    return (
      <CodingTerminalView
        isSoundOn={isSoundOn}
        onComplete={() => setWelcomeSubPhase('profile')}
      />
    );
  }

  if (welcomeSubPhase === 'profile') {
    return (
      <VisitorProfileCard
        latitude={visitorCoords ? visitorCoords.lat : null}
        longitude={visitorCoords ? visitorCoords.lng : null}
        isGuestMode={!visitorCoords}
        isSoundOn={isSoundOn}
        onComplete={onEnter}
      />
    );
  }

  if (welcomeSubPhase === 'requesting') {
    return (
      <div className="fixed inset-0 w-full h-full bg-[#010207] z-50 flex flex-col justify-center items-center px-6 select-none font-display text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none" 
          style={{ 
            backgroundImage: `radial-gradient(circle, rgba(0, 240, 255, 0.2) 1px, transparent 1px)`, 
            backgroundSize: '30px 30px' 
          }} 
        />
        
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative max-w-lg w-full bg-slate-950/90 border border-cyber-cyan/40 rounded-3xl p-8 backdrop-blur-3xl text-center space-y-6 shadow-[0_0_60px_rgba(0,240,255,0.2)] overflow-hidden"
        >
          {/* Accent corners */}
          <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-cyber-cyan" />
          <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-cyber-cyan" />
          <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-cyber-cyan" />
          <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-cyber-cyan" />

          {/* Premium holographic scanner icon & effect */}
          <div className="relative mx-auto w-16 h-16 rounded-full border-2 border-cyber-cyan/40 flex items-center justify-center bg-cyber-cyan/10 text-cyber-cyan">
            <Radio size={30} className="animate-pulse" />
            <div className="absolute inset-0 rounded-full border border-dashed border-cyber-cyan/50 animate-[spin_5s_linear_infinite]" />
          </div>

          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black tracking-[0.15em] uppercase text-white animate-pulse">
              Requesting Secure Location Access...
            </h2>
            <p className="text-[10px] font-mono tracking-widest text-cyber-cyan/85 uppercase">
              // GEOLOCATION AUTHENTICATION LINK //
            </p>
          </div>

          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-relaxed">
            Please authorize geolocation tracking to verify client identity and synchronise real-time orbital maps.
          </p>

          {/* Repeating laser scanning line */}
          <div className="w-full bg-slate-900/60 h-2 rounded-full overflow-hidden relative border border-cyber-cyan/10">
            <motion.div 
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
              className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent shadow-[0_0_12px_#00f0ff]"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden bg-[#010206] flex flex-col justify-between items-center py-8 px-6 select-none font-display transition-transform duration-1000 ${
        isEntering ? 'scale-105 filter blur-[0.5px]' : ''
      }`}
    >
      {/* Cinematic Perspective Canvas Backdrop */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-0 pointer-events-none" />

      {/* Holographic light leaks overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#010206]/85 via-transparent to-cyber-cyan/[0.03] z-10 pointer-events-none" />

      {/* ========================================================
          TOP SECURITY TELEMETRY HEADER
          ======================================================== */}
      <header className="relative z-20 w-full max-w-7xl flex justify-between items-center text-[9px] font-mono tracking-[0.3em] text-cyber-cyan uppercase">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-cyber-pink animate-ping shrink-0" />
          <Radio size={12} className="text-cyber-pink animate-pulse" />
          <span>CYBER OPS // SECURITY INTELLIGENCE MATRIX</span>
        </div>

        <div className="flex items-center gap-4.5">
          {/* Sound Toggle controls */}
          <button
            onClick={toggleSound}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-950/80 border border-cyber-cyan/25 hover:border-cyber-pink/50 rounded-md text-[8px] text-slate-450 hover:text-white transition-all cursor-pointer font-bold tracking-widest"
          >
            {isSoundOn ? (
              <>
                <Volume2 size={11} className="text-cyber-cyan" />
                <span>SOUND ON</span>
              </>
            ) : (
              <>
                <VolumeX size={11} className="text-cyber-pink animate-pulse" />
                <span>SOUND MUTED</span>
              </>
            )}
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <Terminal size={11} className="text-cyber-emerald animate-pulse" />
            <span className="text-slate-500">PORT: 3000</span>
          </div>
          <span className="border border-cyber-cyan/30 px-2 py-0.5 rounded text-white bg-cyber-cyan/10">SYSTEM: v6.0</span>
        </div>
      </header>

      {/* ========================================================
          CENTER HOLOGRAPHIC ASSEMBLY BLOCK
          ======================================================== */}
      <div className="relative z-20 my-auto w-full max-w-4xl text-center flex flex-col items-center gap-8">
        <div className="relative w-full">
          {/* Neon backlighting halos */}
          <div className="absolute -inset-10 rounded-full bg-cyber-cyan/10 blur-[130px] animate-pulse pointer-events-none" />
          <div className="absolute -inset-4 rounded-full bg-cyber-pink/5 blur-[90px] pointer-events-none" />

          {/* Security identity label */}
          <div className="mb-2">
            <span className="font-mono text-[9px] text-cyber-cyan/70 tracking-[0.45em] font-extrabold uppercase animate-pulse">
              // SECURE IDENTITY PROTOCOL //
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="relative select-none"
          >
            {/* Single fixed text with RGB holo light text animation */}
            <div className="relative inline-block w-full">
              <h1 className="text-4xl sm:text-7xl md:text-8xl font-black tracking-[0.18em] uppercase leading-none pl-[0.18em] select-none pointer-events-none font-display holo-shine-text break-words">
                SONU KAHAR
              </h1>
            </div>

            {/* Glowing neon alignment lines */}
            <div className="flex justify-center items-center gap-2 mt-6 w-full max-w-lg mx-auto">
              <span className="h-[1.5px] flex-grow bg-gradient-to-r from-transparent to-cyber-cyan rounded-full" />
              <Zap size={13} className="text-cyber-cyan animate-pulse shrink-0" />
              <span className="h-[1.5px] flex-grow bg-gradient-to-l from-transparent to-cyber-cyan rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* Subtitles (Soft staggered luxury reveal below) */}
        <div className="h-20 flex flex-col items-center justify-center">
          <AnimatePresence>
            {subtitlesRevealed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-2 text-center max-w-sm"
              >
                <div className="flex flex-col gap-1.5 items-center justify-center">
                  <span className="font-display text-[10px] sm:text-xs text-slate-300 font-extrabold tracking-[0.3em] uppercase">
                    Software Engineer
                  </span>
                  <span className="font-display text-[10px] sm:text-xs text-cyber-cyan font-extrabold tracking-[0.3em] uppercase animate-pulse">
                    Android Developer
                  </span>
                  <span className="font-display text-[10px] sm:text-xs text-cyber-pink font-extrabold tracking-[0.3em] uppercase">
                    Full Stack Developer
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ========================================================
          ENTER SYSTEM LUXURY INTERACTIVE BUTTON
          ======================================================== */}
      <div className="relative z-20 w-full flex flex-col items-center gap-8">
        <div 
          className="relative transition-transform duration-300"
          style={{
            transform: `translate3d(${magneticPos.x}px, ${magneticPos.y}px, 0)`,
          }}
        >
          {/* Rotating halo holographic background glow */}
          <div className="absolute -inset-4 rounded-full border border-cyber-cyan/10 animate-[spin_10s_linear_infinite] pointer-events-none" />
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink blur-md opacity-25 group-hover:opacity-100 transition-opacity" />

          {/* Luxury 3D tilting button container */}
          <div
            style={{
              transform: `perspective(1000px) rotateX(${-btnCoords.y * 12}deg) rotateY(${btnCoords.x * 12}deg)`,
              transformStyle: 'preserve-3d',
            }}
            className="transition-transform duration-250 ease-out"
          >
            <motion.button
              onMouseMove={handleButtonMouseMove}
              onMouseLeave={handleButtonMouseLeave}
              onMouseEnter={handleButtonMouseEnter}
              onClick={handleEnterSystem}
              whileTap={{ scale: 0.95 }}
              disabled={isEntering}
              className={`group relative px-10 py-3.5 rounded-full text-[10px] font-bold tracking-[0.35em] uppercase cursor-pointer select-none transition-all duration-300 overflow-hidden text-white font-display border backdrop-blur-md ${
                isEntering 
                  ? 'bg-cyber-cyan/20 border-cyber-pink shadow-[0_0_20px_rgba(255,0,127,0.4)] text-cyber-pink'
                  : 'bg-slate-950/75 border-cyber-cyan/40 hover:border-cyber-cyan shadow-[0_0_25px_rgba(0,240,255,0.35)]'
              }`}
              style={{
                textShadow: hovered ? '0 0 8px rgba(255, 255, 255, 0.8)' : 'none',
              }}
            >
              {/* Liquid Light / Animated Energy Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/10 via-cyber-purple/15 to-cyber-pink/10 opacity-30 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Energy Charging Linear Backdrop Fill */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div 
                  className={`absolute inset-0 bg-gradient-to-r from-transparent via-cyber-cyan/25 to-transparent transition-transform duration-1000 ${
                    hovered ? 'translate-x-0 scale-x-100 opacity-100' : '-translate-x-full scale-x-50 opacity-0'
                  }`}
                />
              </div>

              {/* Fast moving laser sweep inside the button */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 2.0, ease: 'linear' }}
                  className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12"
                />
              </div>

              {/* Click Ripple elements */}
              {ripples.map((ripple) => (
                <motion.span
                  key={ripple.id}
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 8, opacity: 0 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  style={{ left: ripple.x, top: ripple.y }}
                  className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyber-pink pointer-events-none"
                />
              ))}

              {/* Laser-dot/Electric pulse borders chasing in corner points */}
              <span className="absolute top-0 left-0 w-6 h-[2px] bg-cyber-pink shadow-[0_0_8px_#ff007f] animate-pulse" />
              <span className="absolute top-0 left-0 w-[2px] h-3 bg-cyber-pink shadow-[0_0_8px_#ff007f] animate-pulse" />
              
              <span className="absolute bottom-0 right-0 w-6 h-[2px] bg-cyber-cyan shadow-[0_0_8px_#00f0ff] animate-pulse" />
              <span className="absolute bottom-0 right-0 w-[2px] h-3 bg-cyber-cyan shadow-[0_0_8px_#00f0ff] animate-pulse" />

              <span className="relative z-10 flex items-center justify-center gap-3">
                {isEntering ? 'SYNCHRONIZING...' : 'ENTER SYSTEM'}
                {!isEntering && (
                  <Shield 
                    size={13} 
                    className="text-cyber-cyan group-hover:text-cyber-pink transition-all group-hover:rotate-12 duration-500 animate-pulse" 
                  />
                )}
              </span>
            </motion.button>
          </div>
        </div>

        {/* Diagnostic connection outputs */}
        <div className="flex flex-col items-center text-[8.5px] font-mono text-slate-500 uppercase tracking-[0.3em] gap-1.5">
          <span>COGNITIVE HANDSHAKE: STANDBY</span>
          <span className="text-cyber-emerald animate-pulse font-extrabold tracking-widest">
            AUTHENTICATION PROTOCOL: GRANTED
          </span>
        </div>
      </div>

      {/* Cinematic holographic warning grid scan overlay */}
      {isEntering && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.7, 1, 0.8, 1, 0, 1] }}
          transition={{ duration: 1.8 }}
          className="fixed inset-0 bg-[#00f0ff]/10 backdrop-blur-[1px] z-50 flex flex-col items-center justify-center pointer-events-none border border-cyber-cyan/30"
        >
          <div className="text-white font-mono text-xs tracking-[0.55em] font-black uppercase text-center space-y-3 px-8">
            <p className="animate-pulse text-cyber-pink">// DECRYPT SHIELD INITIATING //</p>
            <p className="text-[9px] text-slate-350">OVERRIDING CORE DRIVES ... OK</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
