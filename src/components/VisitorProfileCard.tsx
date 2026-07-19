import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  MapPin, 
  Clock, 
  Globe, 
  Laptop, 
  Smartphone, 
  UserCheck, 
  Tv, 
  Calendar, 
  Compass, 
  Radio, 
  Sparkles,
  CheckCircle2,
  Lock,
  ChevronRight
} from 'lucide-react';

interface VisitorProfileCardProps {
  latitude: number | null;
  longitude: number | null;
  isGuestMode: boolean;
  isSoundOn: boolean;
  onComplete: () => void;
}

// Sound Synthesis using Web Audio API
const playProfileFX = (type: 'tick' | 'reveal' | 'success' | 'click', soundEnabled: boolean) => {
  if (!soundEnabled) return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    if (type === 'tick') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);
      gain.gain.setValueAtTime(0.004, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'reveal') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.12);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'success') {
      // Ascending major chord voicing
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const osc3 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.type = 'sine';
      osc2.type = 'sine';
      osc3.type = 'sine';
      
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc2.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc3.frequency.setValueAtTime(783.99, now + 0.16); // G5
      
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
      
      osc1.connect(gain);
      osc2.connect(gain);
      osc3.connect(gain);
      gain.connect(ctx.destination);
      
      osc1.start(now);
      osc2.start(now + 0.08);
      osc3.start(now + 0.16);
      
      osc1.stop(now + 0.7);
      osc2.stop(now + 0.7);
      osc3.stop(now + 0.7);
    } else if (type === 'click') {
      // Futuristic mechanical latch feedback
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(880, now + 0.08);
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    }
  } catch (e) {
    // Fail silently
  }
};

export default function VisitorProfileCard({ latitude, longitude, isGuestMode, isSoundOn, onComplete }: VisitorProfileCardProps) {
  const [revealedCount, setRevealedCount] = useState(0); // 0 to 11
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
  const [btnCoords, setBtnCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isExiting, setIsExiting] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [geoData, setGeoData] = useState({
    city: 'Detecting...',
    state: 'Querying...',
    country: 'Sourcing...',
  });

  const userAgent = navigator.userAgent;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  const language = navigator.language || 'en-US';
  const screenRes = `${window.screen.width} x ${window.screen.height}`;

  // Browser parser
  const getBrowserName = () => {
    if (userAgent.includes('Chrome') && !userAgent.includes('Chromium') && !userAgent.includes('Edg')) return 'Chrome';
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Edg')) return 'Edge';
    return 'Web Browser';
  };

  // OS parser
  const getOSName = () => {
    if (userAgent.includes('Windows NT 10.0')) return 'Windows 10/11';
    if (userAgent.includes('Macintosh')) return 'macOS';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
    if (userAgent.includes('Linux')) return 'Linux';
    return 'Operating System';
  };

  const getDeviceType = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      return 'Mobile Node';
    }
    return 'Desktop Terminal';
  };

  // Clock updating
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
      setCurrentDate(now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }));
    };
    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Reverse geocoding
  useEffect(() => {
    if (isGuestMode || latitude === null || longitude === null) {
      setGeoData({
        city: 'Unavailable',
        state: 'Unavailable',
        country: 'Unavailable',
      });
      return;
    }

    let active = true;
    const fetchAddress = async () => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`, {
          headers: { 'Accept-Language': 'en' }
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (!active) return;
        const addr = data.address || {};
        setGeoData({
          city: addr.city || addr.town || addr.village || addr.suburb || addr.county || 'Metro Node',
          state: addr.state || addr.region || 'Active State',
          country: addr.country || 'Global Network',
        });
      } catch (e) {
        if (active) {
          const tzParts = timeZone.split('/');
          setGeoData({
            city: tzParts[1] ? tzParts[1].replace('_', ' ') : 'Active Node',
            state: 'Active Region',
            country: tzParts[0] ? tzParts[0].replace('_', ' ') : 'Global Orbit',
          });
        }
      }
    };
    fetchAddress();
    return () => { active = false; };
  }, [latitude, longitude, isGuestMode, timeZone]);

  // Handle step progress revealed one by one (total 11 fields)
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      if (count < 11) {
        count++;
        setRevealedCount(count);
        playProfileFX('reveal', isSoundOn);
      } else {
        clearInterval(interval);
        playProfileFX('success', isSoundOn);
      }
    }, 380); // Reveals one-by-one every 380ms

    return () => clearInterval(interval);
  }, [isSoundOn]);

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMagneticPos({ x: x * 0.22, y: y * 0.22 });
    setBtnCoords({ x: x / rect.width, y: y / rect.height });
  };

  const handleButtonMouseLeave = () => {
    setMagneticPos({ x: 0, y: 0 });
    setBtnCoords({ x: 0, y: 0 });
    setHovered(false);
  };

  const handleButtonMouseEnter = () => {
    setHovered(true);
    playProfileFX('tick', isSoundOn);
  };

  const handleEnterHome = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isExiting) return;
    setIsExiting(true);
    
    // Ripple click coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    const rx = e.clientX - rect.left;
    const ry = e.clientY - rect.top;
    setRipples([{ id: Date.now(), x: rx, y: ry }]);

    playProfileFX('click', isSoundOn);

    // Premium delay transition
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  // Define 11 precise fields to display sequentially
  const fields = [
    { label: 'Status', value: isGuestMode ? 'Guest Mode' : 'Verified Client', icon: Shield, index: 1, accent: !isGuestMode },
    { label: 'Current City', value: geoData.city, icon: MapPin, index: 2 },
    { label: 'Current State', value: geoData.state, icon: Compass, index: 3 },
    { label: 'Current Country', value: geoData.country, icon: Globe, index: 4 },
    { label: 'Browser', value: getBrowserName(), icon: Globe, index: 5 },
    { label: 'Device Type', value: getDeviceType(), icon: getDeviceType() === 'Mobile Node' ? Smartphone : Laptop, index: 6 },
    { label: 'Operating System', value: getOSName(), icon: Laptop, index: 7 },
    { label: 'Language', value: language.toUpperCase(), index: 8 },
    { label: 'Time Zone', value: timeZone, icon: Clock, index: 9 },
    { label: 'Current Date', value: currentDate || 'Acquiring...', icon: Calendar, index: 10 },
    { label: 'Current Time', value: currentTime || 'Acquiring...', icon: Clock, index: 11 }
  ];

  const progress = Math.min(100, Math.round((revealedCount / 11) * 100));
  const allFieldsLoaded = revealedCount >= 11;

  return (
    <div className={`fixed inset-0 w-full h-full bg-[#010207] z-50 flex flex-col justify-center items-center px-4 select-none font-display text-white overflow-hidden transition-all duration-700 ${isExiting ? 'scale-95 opacity-0 filter blur-lg' : ''}`}>
      {/* Background radial matrix overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.06)_0%,rgba(176,38,255,0.03)_60%,transparent_95%)] pointer-events-none" />
      
      {/* Float animated micro glassmorphic profile card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-sm w-full bg-slate-950/85 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,240,255,0.12)] space-y-4.5 overflow-hidden transform-gpu will-change-transform animate-[float_6s_ease-in-out_infinite]"
        style={{
          boxShadow: isGuestMode 
            ? '0 0 45px rgba(255,0,127,0.1)' 
            : '0 0 45px rgba(0,240,255,0.14)'
        }}
      >
        {/* Holographic Glowing Border Corners */}
        <span className={`absolute top-0 left-0 w-4 h-4 border-t border-l ${isGuestMode ? 'border-cyber-pink shadow-[0_0_6px_#ff007f]' : 'border-cyber-cyan shadow-[0_0_6px_#00f0ff]'}`} />
        <span className={`absolute top-0 right-0 w-4 h-4 border-t border-r ${isGuestMode ? 'border-cyber-pink shadow-[0_0_6px_#ff007f]' : 'border-cyber-cyan shadow-[0_0_6px_#00f0ff]'}`} />
        <span className={`absolute bottom-0 left-0 w-4 h-4 border-b border-l ${isGuestMode ? 'border-cyber-pink shadow-[0_0_6px_#ff007f]' : 'border-cyber-cyan shadow-[0_0_6px_#00f0ff]'}`} />
        <span className={`absolute bottom-0 right-0 w-4 h-4 border-b border-r ${isGuestMode ? 'border-cyber-pink shadow-[0_0_6px_#ff007f]' : 'border-cyber-cyan shadow-[0_0_6px_#00f0ff]'}`} />

        {/* Status Line */}
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center gap-1.5">
            <Radio size={11} className={`animate-pulse ${isGuestMode ? 'text-cyber-pink' : 'text-cyber-cyan'}`} />
            <span className="text-[8px] font-mono tracking-[0.2em] text-slate-500 uppercase">
              {isGuestMode ? 'LOCATION ACCESS DENIED' : 'VISITOR PROFILE'}
            </span>
          </div>
          <span className={`text-[8.5px] font-mono font-black uppercase tracking-wider ${isGuestMode ? 'text-cyber-pink' : 'text-cyber-cyan'}`}>
            {isGuestMode ? 'GUEST_RECON' : 'SECURE_NODE'}
          </span>
        </div>

        {/* Circular Avatar + Ring */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="40" cy="40" r="35" className="stroke-slate-900 fill-none" strokeWidth="2" />
            <motion.circle
              cx="40"
              cy="40"
              r="35"
              className={`fill-none ${isGuestMode ? 'stroke-cyber-pink' : 'stroke-cyber-cyan'}`}
              strokeWidth="2.5"
              strokeDasharray="219.9"
              animate={{ strokeDashoffset: 219.9 - (219.9 * progress) / 100 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              strokeLinecap="round"
              style={{
                filter: isGuestMode 
                  ? 'drop-shadow(0 0 3px #ff007f)' 
                  : 'drop-shadow(0 0 3px #00f0ff)'
              }}
            />
          </svg>
          <div className={`w-15 h-15 rounded-full bg-slate-950 flex items-center justify-center border ${isGuestMode ? 'border-cyber-pink/40 shadow-[0_0_8px_rgba(255,0,127,0.15)]' : 'border-cyber-cyan/40 shadow-[0_0_8px_rgba(0,240,255,0.15)]'} overflow-hidden relative`}>
            <svg className={`w-7 h-7 ${isGuestMode ? 'text-cyber-pink/80' : 'text-cyber-cyan/80'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <div className={`absolute bottom-0 w-full text-[6.5px] font-mono text-center py-0.5 ${isGuestMode ? 'bg-cyber-pink/15 text-cyber-pink' : 'bg-cyber-cyan/15 text-cyber-cyan'}`}>
              {isGuestMode ? 'GUEST' : 'CLIENT'}
            </div>
          </div>
          
          <div className={`absolute -bottom-1.5 bg-slate-950 border px-2 py-0.5 rounded-full text-[8px] font-mono font-black ${isGuestMode ? 'border-cyber-pink/50 text-cyber-pink shadow-[0_0_5px_rgba(255,0,127,0.15)]' : 'border-cyber-cyan/50 text-cyber-cyan shadow-[0_0_5px_rgba(0,240,255,0.15)]'}`}>
            {progress}%
          </div>
        </div>

        {/* Step-by-Step Grid revealed based on progress percentage */}
        <div className="bg-slate-950/60 border border-white/5 rounded-xl p-3 min-h-[250px] flex flex-col justify-center">
          <div className="grid grid-cols-1 gap-y-1.5">
            {fields.map((field, idx) => {
              const isRevealed = revealedCount >= field.index;
              const Icon = (field as any).icon;
              return (
                <div key={idx} className="h-[19px] relative">
                  <AnimatePresence>
                    {isRevealed && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-between transform-gpu text-[9.5px] font-mono"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-cyber-emerald font-black shrink-0 text-[10px]">✔</span>
                          <span className="text-slate-400 uppercase tracking-wider">{field.label}</span>
                        </div>
                        <span className={`font-semibold tracking-wide truncate max-w-[170px] text-right ${
                          field.accent 
                            ? isGuestMode ? 'text-cyber-pink' : 'text-cyber-emerald'
                            : 'text-white'
                        }`}>
                          {field.value}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Loading ring & verified labels */}
        <div className="pt-2 border-t border-white/5 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            {!allFieldsLoaded ? (
              <>
                <div className={`w-3 h-3 rounded-full border border-t-transparent animate-spin ${isGuestMode ? 'border-cyber-pink' : 'border-cyber-cyan'}`} />
                <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                  Sourcing Client Data...
                </span>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-1.5"
              >
                <div className="flex items-center gap-1.5 text-cyber-emerald text-[9.5px] font-mono font-bold tracking-widest uppercase">
                  <CheckCircle2 size={13} className="text-cyber-emerald" /> Secure Session Verified
                </div>
                <div className="text-slate-400 text-[8.5px] font-mono tracking-widest uppercase">
                  System Ready
                </div>
              </motion.div>
            )}
          </div>

          {/* Premium "ENTER HOME" button */}
          <AnimatePresence>
            {allFieldsLoaded && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.2 }}
                className="w-full relative transition-transform duration-300"
                style={{
                  transform: `translate3d(${magneticPos.x}px, ${magneticPos.y}px, 0)`,
                }}
              >
                {/* Neon backlighting blur */}
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink blur-md opacity-25" />

                <div
                  style={{
                    transform: `perspective(1000px) rotateX(${-btnCoords.y * 10}deg) rotateY(${btnCoords.x * 10}deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                  className="transition-transform duration-200 ease-out w-full"
                >
                  <button
                    ref={buttonRef}
                    onMouseMove={handleButtonMouseMove}
                    onMouseLeave={handleButtonMouseLeave}
                    onMouseEnter={handleButtonMouseEnter}
                    onClick={handleEnterHome}
                    className="w-full relative py-3.5 rounded-xl text-[9px] font-black tracking-[0.4em] uppercase cursor-pointer select-none overflow-hidden text-white font-display border border-cyber-cyan/40 bg-slate-950 hover:border-cyber-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.25)] transition-all duration-300"
                  >
                    {/* Sliding laser reflection */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <motion.div
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
                        className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                      />
                    </div>

                    {/* Ripples */}
                    {ripples.map((ripple) => (
                      <motion.span
                        key={ripple.id}
                        initial={{ scale: 0, opacity: 0.7 }}
                        animate={{ scale: 6, opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        style={{ left: ripple.x, top: ripple.y }}
                        className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyber-pink pointer-events-none"
                      />
                    ))}

                    <span className="relative z-10 flex items-center justify-center gap-2">
                      ENTER HOME <ChevronRight size={11} className="text-cyber-cyan animate-pulse" />
                    </span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
