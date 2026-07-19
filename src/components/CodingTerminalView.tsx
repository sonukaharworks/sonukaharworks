import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Cpu, 
  Activity, 
  Database, 
  Radio, 
  Globe,
  Lock,
  Terminal,
  Zap,
  Server
} from 'lucide-react';

interface CodingTerminalViewProps {
  isSoundOn: boolean;
  onComplete: () => void;
}

// Mobile-optimized synthesized sound engine for authentic cyber alerts
const playTerminalChirp = (frequency: number, duration: number, volume: number, soundEnabled: boolean) => {
  if (!soundEnabled) return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = Math.random() > 0.5 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(frequency, now);
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.5, now + duration);
    
    gainNode.gain.setValueAtTime(volume, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + duration);
  } catch (e) {}
};

export default function CodingTerminalView({ isSoundOn, onComplete }: CodingTerminalViewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [percent, setPercent] = useState(0);
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [packetsSent, setPacketsSent] = useState(128);
  const [currentIp, setCurrentIp] = useState('192.168.4.122');
  const [activeHash, setActiveHash] = useState('0x9F3B2A');
  const [currentCoords, setCurrentCoords] = useState({ lat: '28.6139', lng: '77.2090' });

  // 6 system messages
  const systemMessages = [
    'Initializing Security Engine...',
    'Scanning Network...',
    'Loading Encryption...',
    'Authenticating...',
    'Decrypting...',
    'Launching Portfolio...'
  ];

  useEffect(() => {
    // Exact 5.5-second sequence duration
    const duration = 5500;
    const intervalTime = 50;
    const steps = duration / intervalTime;
    const percentIncrement = 100 / steps;
    let currentPercent = 0;

    const progressTimer = setInterval(() => {
      currentPercent += percentIncrement;
      if (currentPercent >= 100) {
        setPercent(100);
        clearInterval(progressTimer);
      } else {
        setPercent(Math.floor(currentPercent));
        
        // Stagger message index based on percent range
        const msgIndex = Math.min(
          systemMessages.length - 1, 
          Math.floor((currentPercent / 100) * systemMessages.length)
        );
        setActiveMessageIndex(msgIndex);

        // Cyber audio triggers
        if (Math.random() > 0.78) {
          const freq = 450 + Math.random() * 950;
          playTerminalChirp(freq, 0.05, 0.004, isSoundOn);
        }
      }
    }, intervalTime);

    // Fast-updating cyber data parameters
    const dataTimer = setInterval(() => {
      setPacketsSent(prev => prev + Math.floor(Math.random() * 15) + 3);
      
      const hexChars = '0123456789ABCDEF';
      let hash = '0x';
      for (let i = 0; i < 6; i++) {
        hash += hexChars[Math.floor(Math.random() * 16)];
      }
      setActiveHash(hash);

      // Fast randomized coordinates
      setCurrentCoords({
        lat: (28.6 + Math.random() * 0.2).toFixed(4),
        lng: (77.2 + Math.random() * 0.2).toFixed(4)
      });
    }, 120);

    // End sequence trigger
    const completeTimer = setTimeout(() => {
      playTerminalChirp(1200, 0.18, 0.015, isSoundOn);
      onComplete();
    }, duration);

    return () => {
      clearInterval(progressTimer);
      clearInterval(dataTimer);
      clearTimeout(completeTimer);
    };
  }, [isSoundOn, onComplete]);

  // High-performance canvas cyber visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Binary particles & digital rain
    const binaryColumns = Math.floor(width / 12) + 1;
    const drops = Array(binaryColumns).fill(0).map(() => Math.random() * -height);

    // Scrolling console log strings
    const logStrings = [
      'SEC_ALLOC: SUCCESS', 'SHA256_HASH: OK', 'BYPASS_FIREWALL: TRUE',
      'IP_STREAM: SYNCHRONIZED', 'ANTIVIRUS: BYPASS', 'DECRYPTING: AES_256',
      'OS_MOUNTED: MOBILE_DROID', 'LINK_SAT: ORBIT_9', 'SEC_CHANNEL: ENABLED'
    ];
    const logRows: Array<{ y: number; text: string; speed: number }> = [];
    for (let i = 0; i < 15; i++) {
      logRows.push({
        y: Math.random() * height,
        text: logStrings[Math.floor(Math.random() * logStrings.length)] + ` [${Math.random().toString(16).substring(2, 6).toUpperCase()}]`,
        speed: Math.random() * 2 + 1.5
      });
    }

    let frame = 0;
    const draw = () => {
      frame++;
      
      // Absolute black deep-space base
      ctx.fillStyle = '#010207';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle holographic background grid
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.025)';
      ctx.lineWidth = 1;
      const spacing = 32;
      for (let x = 0; x < width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // Render ultra-fast moving binary stream columns (0 1 0 1 1 0)
      ctx.save();
      ctx.font = '9px monospace';
      for (let i = 0; i < binaryColumns; i++) {
        const x = i * 12;
        const y = drops[i];

        // Random binary digit
        const digit = Math.random() > 0.5 ? '1' : '0';
        
        ctx.fillStyle = 'rgba(0, 240, 255, 0.12)';
        ctx.fillText(digit, x, y);

        // Lead glowing character
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.fillText(digit, x, y + 10);

        drops[i] += 6; // Extreme high speed falling
        if (drops[i] > height) {
          drops[i] = -20 - Math.random() * 150;
        }
      }
      ctx.restore();

      // Horizontal code log stream layers
      ctx.save();
      ctx.font = '7.5px monospace';
      ctx.fillStyle = 'rgba(176, 38, 255, 0.18)';
      logRows.forEach(row => {
        row.y += row.speed;
        if (row.y > height) {
          row.y = -10;
          row.text = logStrings[Math.floor(Math.random() * logStrings.length)] + ` [${Math.random().toString(16).substring(2, 6).toUpperCase()}]`;
        }
        ctx.fillText(row.text, 8, row.y);
      });
      ctx.restore();

      // Interactive laser sweep line
      const laserY = (frame * 5.5) % height;
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 0, 127, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, laserY);
      ctx.lineTo(width, laserY);
      ctx.stroke();
      ctx.restore();

      requestAnimationFrame(draw);
    };

    const animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#010207] z-50 flex flex-col justify-between p-4 font-mono select-none overflow-hidden text-xs text-cyber-cyan">
      {/* High-performance background animation */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block opacity-80 pointer-events-none" />

      {/* Futuristic Mobile OS top bar */}
      <div className="relative z-20 flex justify-between items-center bg-slate-950/75 border border-white/5 rounded-2xl py-2 px-4 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Terminal size={12} className="text-cyber-cyan animate-pulse" />
          <span className="text-[9px] font-black tracking-widest text-white uppercase">SYS_LINK_SECURE</span>
        </div>
        <div className="flex items-center gap-3 text-[8.5px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-pink animate-ping shrink-0" />
          <span className="text-cyber-pink tracking-wider">GPS: Delhi, IN</span>
        </div>
      </div>

      {/* Centered / Layered Mobile Floating Windows */}
      <div className="relative z-20 flex-grow flex flex-col justify-center gap-4 py-6">
        
        {/* WINDOW 1: TELEMETRY STREAM */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-950/85 border border-cyber-cyan/30 rounded-2xl p-4 backdrop-blur-lg shadow-[0_0_25px_rgba(0,240,255,0.08)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyber-cyan/10 to-transparent pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2.5">
            <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
              <Activity size={11} className="text-cyber-pink" /> TELEMETRY STREAM
            </span>
            <span className="text-[7.5px] text-cyber-cyan font-bold bg-cyber-cyan/10 border border-cyber-cyan/20 px-1.5 py-0.5 rounded uppercase">LIVE</span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[9px]">
            <div className="flex flex-col">
              <span className="text-slate-500 text-[8px] uppercase">IP GATEWAY</span>
              <span className="text-white font-bold tracking-wide">{currentIp}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-500 text-[8px] uppercase">CRYPT_HASH</span>
              <span className="text-cyber-pink font-bold tracking-wide">{activeHash}</span>
            </div>
            <div className="flex flex-col mt-1">
              <span className="text-slate-500 text-[8px] uppercase">PACKETS SYNC</span>
              <span className="text-cyber-cyan font-bold tracking-wide">{packetsSent} PKTS</span>
            </div>
            <div className="flex flex-col mt-1">
              <span className="text-slate-500 text-[8px] uppercase">COORDS</span>
              <span className="text-cyber-emerald font-bold tracking-wide">{currentCoords.lat}° N / {currentCoords.lng}° E</span>
            </div>
          </div>
        </motion.div>

        {/* WINDOW 2: SYSTEM MESSAGES LOADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-950/85 border border-cyber-pink/30 rounded-2xl p-4 backdrop-blur-lg shadow-[0_0_25px_rgba(255,0,127,0.08)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyber-pink/10 to-transparent pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
            <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
              <Shield size={11} className="text-cyber-cyan" /> PROTOCOL SEQUENCE
            </span>
            <span className="text-[7.5px] text-cyber-pink font-bold bg-cyber-pink/10 border border-cyber-pink/20 px-1.5 py-0.5 rounded uppercase animate-pulse">RUNNING</span>
          </div>

          {/* Core messages */}
          <div className="space-y-1.5 text-[10px]">
            {systemMessages.map((msg, idx) => {
              const isActive = idx === activeMessageIndex;
              const isPast = idx < activeMessageIndex;
              
              return (
                <div 
                  key={idx} 
                  className={`flex items-center justify-between transition-all duration-300 ${
                    isActive ? 'text-white font-bold scale-[1.02] pl-1' : isPast ? 'text-cyber-cyan/50' : 'text-slate-600'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-cyber-pink animate-ping' : isPast ? 'bg-cyber-cyan' : 'bg-slate-700'}`} />
                    {msg}
                  </span>
                  <span className={`text-[8px] font-mono ${isActive ? 'text-cyber-pink animate-pulse' : isPast ? 'text-cyber-cyan' : 'text-slate-700'}`}>
                    {isActive ? 'PROCESSING' : isPast ? '✔ COMPLETED' : 'STANDBY'}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>

      {/* Bottom boot sector core load info & progress bar */}
      <div className="relative z-20 flex flex-col gap-3.5 bg-slate-950/85 border border-white/5 rounded-2xl p-4 backdrop-blur-md">
        <div className="flex justify-between items-center text-[9px]">
          <div className="flex flex-col gap-0.5">
            <span className="text-slate-400 uppercase tracking-widest font-black">ENCRYPTION ENGINE DESCRIPTOR</span>
            <span className="text-cyber-cyan tracking-wider">{systemMessages[activeMessageIndex]}</span>
          </div>
          <span className="text-cyber-cyan font-bold bg-cyber-cyan/15 border border-cyber-cyan/35 px-2 py-0.5 rounded-md shadow-[0_0_8px_rgba(0,240,255,0.1)]">
            {percent}% SYNCED
          </span>
        </div>

        {/* Flat high-tech progress loading track */}
        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5 p-0.5 relative flex items-center">
          <motion.div 
            initial={{ width: '0%' }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
            className="h-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink rounded-full shadow-[0_0_8px_#00f0ff]"
          />
        </div>
      </div>
    </div>
  );
}
