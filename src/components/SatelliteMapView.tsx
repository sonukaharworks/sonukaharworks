import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Radio, Terminal, Cpu, Crosshair, Compass, Globe, CheckCircle2 } from 'lucide-react';

interface SatelliteMapViewProps {
  latitude: number;
  longitude: number;
  onComplete: () => void;
  isSoundOn: boolean;
}

// Pro Audio Feedback Generator
const playTrackerSound = (type: 'ping' | 'lock' | 'radar' | 'success', soundEnabled: boolean) => {
  if (!soundEnabled) return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    if (type === 'ping') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.4);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === 'lock') {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc2.frequency.setValueAtTime(880, now + 0.08); // A5
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc1.start(now);
      osc2.start(now + 0.08);
      osc1.stop(now + 0.3);
      osc2.stop(now + 0.4);
    } else if (type === 'radar') {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.linearRampToValueAtTime(250, now + 0.6);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, now);
      filter.frequency.exponentialRampToValueAtTime(1200, now + 0.6);
      filter.Q.setValueAtTime(8, now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.03, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.65);
    } else if (type === 'success') {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.type = 'triangle';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.setValueAtTime(659.25, now + 0.12); // E5
      osc2.frequency.setValueAtTime(783.99, now + 0.24); // G5
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc1.start(now);
      osc2.start(now + 0.24);
      osc1.stop(now + 0.6);
      osc2.stop(now + 0.6);
    }
  } catch (e) {
    console.warn('Audio synthesis deferred or blocked:', e);
  }
};

export default function SatelliteMapView({ latitude, longitude, onComplete, isSoundOn }: SatelliteMapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [zoomFactor, setZoomFactor] = useState(3);
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([]);
  const mapInstanceRef = useRef<any>(null);

  // Dynamic Leaflet Loader Helper
  useEffect(() => {
    let active = true;

    const initLeafletMap = async () => {
      // 1. Check/inject CSS and JS for Leaflet
      if (!(window as any).L) {
        await new Promise<void>((resolve) => {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
          link.crossOrigin = '';
          document.head.appendChild(link);

          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
          script.crossOrigin = '';
          script.onload = () => resolve();
          document.body.appendChild(script);
        });
      }

      if (!active) return;

      const L = (window as any).L;
      if (!L || !mapContainerRef.current) return;

      // Log calibration lines
      addTelemetryLog('CALIBRATING ORBITAL LINK...');
      addTelemetryLog('CONNECTED TO CORONA SATELLITE CO-9');

      // 2. Initialize Map with wide global view
      const map = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        touchZoom: false,
        doubleClickZoom: false,
        scrollWheelZoom: false,
        boxZoom: false,
        keyboard: false
      }).setView([0, 0], 2); // Start at wide global ocean/earth view

      mapInstanceRef.current = map;

      // 3. Mount Esri Premium Satellite Base Tile Layer
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19
      }).addTo(map);

      // Trigger radar and ping sounds on start
      playTrackerSound('radar', isSoundOn);

      // 4. Smooth flyTo camera zoom starting from wide Earth centered to visitor's exact coordinates
      setTimeout(() => {
        if (!active) return;
        setIsMapLoaded(true);
        addTelemetryLog('SATELLITE POSITION LOCATED.');
        addTelemetryLog(`COORDINATES: LAT ${latitude.toFixed(5)} / LNG ${longitude.toFixed(5)}`);

        // Smooth zoom to the exact area
        map.flyTo([latitude, longitude], 17, {
          duration: 2.2,
          easeLinearity: 0.25,
          animate: true
        });

        // Staggered tracking sounds during camera zoom
        setTimeout(() => playTrackerSound('ping', isSoundOn), 600);
        setTimeout(() => playTrackerSound('ping', isSoundOn), 1400);
        setTimeout(() => playTrackerSound('ping', isSoundOn), 2200);
      }, 400);

      // 5. Add custom glowing cyber-marker once camera reaches area
      setTimeout(() => {
        if (!active) return;

        addTelemetryLog('TARGET LOCKED WITH 99.9% PROBABILITY.');
        playTrackerSound('lock', isSoundOn);

        // Cybermatic custom glowing marker inside Leaflet
        const customIcon = L.divIcon({
          html: `
            <div class="relative flex items-center justify-center select-none pointer-events-none">
              <!-- Radar Sweep Rotating Rings -->
              <div class="absolute w-[220px] h-[220px] rounded-full border border-cyan-400/40 bg-cyan-950/5 flex items-center justify-center">
                <!-- Outer rotating scanner dash ring -->
                <div class="absolute inset-0 rounded-full border border-dashed border-cyan-400/25 animate-[spin_8s_linear_infinite]"></div>
                <!-- Inner sweep pulse ring -->
                <div class="absolute inset-4 rounded-full border border-cyan-500/15 animate-[ping_3s_ease-in-out_infinite]"></div>
                
                <!-- Crosshair reticle coordinates lines -->
                <div class="absolute w-[220px] h-[1px] bg-cyan-400/30"></div>
                <div class="absolute h-[220px] w-[1px] bg-cyan-400/30"></div>
                
                <!-- Concentric radar circular lines -->
                <div class="absolute w-[130px] h-[130px] rounded-full border border-dashed border-cyan-400/15"></div>
                <div class="absolute w-[60px] h-[60px] rounded-full border border-dotted border-cyan-400/30 animate-[spin_15s_linear_infinite]"></div>
              </div>
              
              <!-- Glowing center beacon -->
              <div class="absolute w-5 h-5 bg-cyan-400 rounded-full shadow-[0_0_20px_#00f0ff] border-2 border-white flex items-center justify-center animate-[ping_1.5s_infinite]"></div>
              <div class="absolute w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#00f0ff] border-2 border-white"></div>
            </div>
          `,
          className: 'cyber-satellite-target-marker',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        L.marker([latitude, longitude], { icon: customIcon }).addTo(map);
      }, 2200);
    };

    initLeafletMap();

    return () => {
      active = false;
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
          console.warn('Map cleanup error:', e);
        }
      }
    };
  }, [latitude, longitude]);

  // Telemetry logger helper
  const addTelemetryLog = (msg: string) => {
    setTelemetryLogs((prev) => [...prev.slice(-4), msg]);
  };

  // Step-by-step HUD messages reveal timing
  useEffect(() => {
    if (!isMapLoaded) return;

    // Display "✔ GPS Connected" at 0.5s
    const timer1 = setTimeout(() => {
      setCurrentStep(1);
      addTelemetryLog('ORBITAL BEACON ONLINE.');
      playTrackerSound('ping', isSoundOn);
    }, 500);

    // Display "✔ Current Location Detected" at 1.8s
    const timer2 = setTimeout(() => {
      setCurrentStep(2);
      addTelemetryLog('COORDINATE SCAN RESOLVED.');
      playTrackerSound('ping', isSoundOn);
    }, 1800);

    // Display "✔ Secure Connection Established" at 3.0s
    const timer3 = setTimeout(() => {
      setCurrentStep(3);
      addTelemetryLog('CLIENT COORDINATES SIGNED.');
      playTrackerSound('success', isSoundOn);
    }, 3000);

    // Transition out after 4.0s (total 4s duration as requested)
    const timer4 = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isMapLoaded]);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#010207] z-50 overflow-hidden select-none font-display">
      {/* 1. Leaflet satellite map container */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-full absolute inset-0 transition-all duration-[2s] pointer-events-none"
        style={{
          filter: 'hue-rotate(185deg) brightness(0.65) contrast(1.25) saturate(1.15)',
        }}
      />

      {/* 2. Cyber Scopic Grid HUD overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,#010206_85%)]" />
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0, 240, 255, 0.25) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Rotating Tech Compass in background corners */}
      <div className="absolute top-8 left-8 z-25 text-cyan-400/25 pointer-events-none hidden md:block">
        <Compass className="w-12 h-12 animate-spin-slow" />
      </div>

      <div className="absolute top-8 right-8 z-25 text-cyan-400/25 pointer-events-none hidden md:block">
        <div className="flex flex-col items-end gap-1.5 font-mono text-[9px] tracking-widest text-right">
          <span>LAT: {latitude.toFixed(4)}° N</span>
          <span>LNG: {longitude.toFixed(4)}° E</span>
          <span className="text-emerald-400/80 animate-pulse">// SYSTEM ONLINE //</span>
        </div>
      </div>

      {/* 3. Horizontal moving laser scan line */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <motion.div
          initial={{ y: '-10%' }}
          animate={{ y: '110%' }}
          transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
          className="w-full h-[3px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent shadow-[0_0_15px_rgba(0,240,255,0.4)]"
        />
      </div>

      {/* 4. Glassmorphism HUD Main Panel */}
      <div className="absolute inset-0 flex flex-col justify-between items-center py-12 px-6 z-30">
        {/* TOP STATUS */}
        <div className="flex items-center gap-3.5 bg-slate-950/85 border border-cyan-400/20 backdrop-blur-md px-6 py-2.5 rounded-full text-[9px] font-mono tracking-[0.25em] text-cyan-400 uppercase shadow-[0_0_20px_rgba(0,240,255,0.1)]">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <Radio size={13} className="text-cyan-400 animate-pulse" />
          <span>CYBER TRACER: ORBITAL ZOOM PHASE</span>
        </div>

        {/* MIDDLE CHRONICLE STEPS */}
        <div className="w-full max-w-xl bg-slate-950/75 border border-cyan-400/15 backdrop-blur-xl p-8 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)] space-y-6 relative overflow-hidden">
          {/* Cyber bracket corners */}
          <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-cyan-400" />
          <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-cyan-400" />
          <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-cyan-400" />
          <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-cyan-400" />

          {/* Staggered HUD Lines */}
          <div className="space-y-4">
            <AnimatePresence>
              {currentStep >= 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3.5"
                >
                  <CheckCircle2 className="text-cyan-400 animate-pulse shrink-0 w-5 h-5" />
                  <div>
                    <h3 className="font-display font-black text-white text-sm sm:text-base tracking-widest uppercase">
                      ✔ GPS Connected
                    </h3>
                    <p className="text-[10px] font-mono text-cyan-400/70 tracking-wider">
                      ORBITAL SAT CO-9 STABILIZED
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {currentStep >= 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                  className="flex items-center gap-3.5"
                >
                  <Crosshair className="text-fuchsia-400 animate-pulse shrink-0 w-5 h-5" />
                  <div>
                    <h3 className="font-display font-black text-white text-sm sm:text-base tracking-widest uppercase">
                      ✔ Current Location Detected
                    </h3>
                    <p className="text-[10px] font-mono text-fuchsia-400/70 tracking-wider">
                      GPS LAT: {latitude.toFixed(5)} / LNG: {longitude.toFixed(5)}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {currentStep >= 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                  className="flex items-center gap-3.5"
                >
                  <Shield className="text-emerald-400 shrink-0 w-5 h-5" />
                  <div>
                    <h3 className="font-display font-black text-white text-sm sm:text-base tracking-widest uppercase">
                      ✔ Secure Connection Established
                    </h3>
                    <p className="text-[10px] font-mono text-emerald-400/70 tracking-wider">
                      SHA-256 SECURED CLIENT INTERRUPT
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Micro HUD status bar */}
          <div className="w-full bg-slate-900/80 h-1.5 rounded-full overflow-hidden relative border border-cyan-400/10">
            <motion.div 
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 4.0, ease: 'linear' }}
              className="bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-emerald-400 h-full shadow-[0_0_8px_#00f0ff]"
            />
          </div>
        </div>

        {/* BOTTOM TELEMETRY BAR */}
        <div className="w-full max-w-2xl bg-slate-950/80 border border-cyan-400/10 rounded-xl p-3.5 flex flex-col md:flex-row items-center justify-between text-[8.5px] font-mono tracking-widest text-slate-450 uppercase gap-3">
          <div className="flex items-center gap-2">
            <Terminal size={11} className="text-cyan-400 animate-pulse" />
            <span>REAL-TIME SYSTEM DIAGNOSTIC STATS:</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            {telemetryLogs.length > 0 ? (
              <span className="text-cyan-400 font-bold">{telemetryLogs[telemetryLogs.length - 1]}</span>
            ) : (
              <span>STABILIZING SATELLITE ROTATION...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
