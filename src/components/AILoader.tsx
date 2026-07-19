import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Cpu, RefreshCw, Activity, Lock, Globe, Server } from 'lucide-react';

interface AILoaderProps {
  onComplete: () => void;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export default function AILoader({ onComplete }: AILoaderProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing Secure Environment...');
  const [isFinishing, setIsFinishing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Status transitions
  useEffect(() => {
    const duration = 4800; // ~5 seconds loading duration
    const intervalTime = 30;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + increment, 100);

        // Required text transitions
        if (next < 22) {
          setLoadingText('Initializing Secure Environment...');
        } else if (next < 48) {
          setLoadingText('Loading Digital Workspace...');
        } else if (next < 72) {
          setLoadingText('Synchronizing Systems...');
        } else if (next < 92) {
          setLoadingText('Preparing Interface...');
        } else {
          setLoadingText('Access Granted');
        }

        if (next >= 100) {
          clearInterval(timer);
          // Trigger cinematic light transition bloom before final transition
          setIsFinishing(true);
          setTimeout(() => {
            onComplete();
          }, 650); // Delay for light-bloom flash
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Quantum Core & 3D Holographic Rendering Canvas
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

    // 1. 3D Cube Math Helpers (Holographic projection)
    const vertices: Point3D[] = [
      { x: -1, y: -1, z: -1 },
      { x: 1, y: -1, z: -1 },
      { x: 1, y: 1, z: -1 },
      { x: -1, y: 1, z: -1 },
      { x: -1, y: -1, z: 1 },
      { x: 1, y: -1, z: 1 },
      { x: 1, y: 1, z: 1 },
      { x: -1, y: 1, z: 1 },
    ];

    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // Back face
      [4, 5], [5, 6], [6, 7], [7, 4], // Front face
      [0, 4], [1, 5], [2, 6], [3, 7]  // Connector edges
    ];

    const rotateX = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: p.x,
        y: p.y * cos - p.z * sin,
        z: p.y * sin + p.z * cos
      };
    };

    const rotateY = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: p.x * cos + p.z * sin,
        y: p.y,
        z: -p.x * sin + p.z * cos
      };
    };

    const rotateZ = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: p.x * cos - p.y * sin,
        y: p.x * sin + p.y * cos,
        z: p.z
      };
    };

    // 2. Encrypted string telemetry data particles
    const encStrings = [
      '0x7F2A39B1', 'CIPHER_OK', 'AES_256_ACTIVE', 'SEC_GATEWAY_8',
      'HOST: SECURE_PORT', 'KEY_SH_VALID', 'SYS_INTEGRITY: 100%', 'LINK_STABLE'
    ];
    const dataStreams: Array<{
      x: number;
      y: number;
      text: string;
      speed: number;
      alpha: number;
      scale: number;
    }> = [];

    for (let i = 0; i < 15; i++) {
      dataStreams.push({
        x: Math.random() * width,
        y: Math.random() * height,
        text: encStrings[Math.floor(Math.random() * encStrings.length)],
        speed: -(Math.random() * 0.6 + 0.2),
        alpha: Math.random() * 0.2 + 0.05,
        scale: Math.random() * 0.3 + 0.75
      });
    }

    // 3. Security wave shockwaves
    const shockwaves: Array<{
      radius: number;
      maxRadius: number;
      speed: number;
      color: string;
      alpha: number;
    }> = [];

    // Main animation loop
    const render = () => {
      frame++;
      ctx.fillStyle = '#010206';
      ctx.fillRect(0, 0, width, height);

      // Subtle dynamic background cyber grid
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.015)';
      ctx.lineWidth = 1;
      const step = 45;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw and update telemetry encrypted streams
      dataStreams.forEach((stream) => {
        stream.y += stream.speed;
        if (stream.y < -30) {
          stream.y = height + 30;
          stream.x = Math.random() * width;
        }
        ctx.font = `900 ${10 * stream.scale}px monospace`;
        ctx.fillStyle = `rgba(0, 240, 255, ${stream.alpha})`;
        ctx.fillText(stream.text, stream.x, stream.y);
      });

      // Periodically trigger expanding security shockwaves from center
      if (frame % 90 === 0) {
        shockwaves.push({
          radius: 10,
          maxRadius: Math.min(width, height) * 0.45,
          speed: 2.2,
          color: Math.random() > 0.5 ? '#00f0ff' : '#ff007f',
          alpha: 0.35
        });
      }

      // Update and draw security shockwaves
      shockwaves.forEach((sw, idx) => {
        sw.radius += sw.speed;
        sw.alpha = Math.max(0, 0.35 - sw.radius / sw.maxRadius);
        if (sw.radius >= sw.maxRadius) {
          shockwaves.splice(idx, 1);
          return;
        }
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = sw.color;
        ctx.globalAlpha = sw.alpha;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.globalAlpha = 1.0; // reset
      });

      // 4. THE CORE CENTER POINT
      const cx = width / 2;
      const cy = height / 2 - 20; // slight upward offset
      const coreSize = Math.min(180, Math.min(width, height) * 0.28);

      // Cyber radar sweeping line
      const radarAngle = (frame * 0.015) % (Math.PI * 2);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + coreSize * 1.5 * Math.cos(radarAngle), cy + coreSize * 1.5 * Math.sin(radarAngle));
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.035)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Soft glow sweeping radar fan
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, coreSize * 1.5, radarAngle - 0.2, radarAngle);
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 240, 255, 0.012)';
      ctx.fill();

      // Outer security glass ring rotated
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(frame * 0.003);
      ctx.beginPath();
      ctx.arc(0, 0, coreSize * 1.35, 0, Math.PI * 1.4);
      ctx.strokeStyle = 'rgba(255, 0, 127, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Opposite rotating cyber rings
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-frame * 0.005);
      ctx.beginPath();
      ctx.arc(0, 0, coreSize * 1.15, 0, Math.PI * 1.6);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.18)';
      ctx.lineWidth = 1;
      ctx.setLineDash([12, 16]);
      ctx.stroke();
      ctx.restore();

      // 5. Mathematically Rendered 3D Rotating Holographic Cube inside center
      ctx.save();
      ctx.translate(cx, cy);
      
      const rotAngleX = frame * 0.008;
      const rotAngleY = frame * 0.012;
      const rotAngleZ = frame * 0.005;

      const projected: { x: number; y: number }[] = [];
      const cubeRadius = coreSize * 0.35;

      vertices.forEach((v) => {
        // Apply rotations
        let rotated = rotateX(v, rotAngleX);
        rotated = rotateY(rotated, rotAngleY);
        rotated = rotateZ(rotated, rotAngleZ);

        // Orthographic projection to 2D
        projected.push({
          x: rotated.x * cubeRadius,
          y: rotated.y * cubeRadius
        });
      });

      // Draw cube edges (Lines representing data nodes / network connections)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
      ctx.lineWidth = 1.2;
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#00f0ff';
      edges.forEach(([u, v]) => {
        ctx.moveTo(projected[u].x, projected[u].y);
        ctx.lineTo(projected[v].x, projected[v].y);
      });
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // Draw glowing AI neural nodes at vertices
      projected.forEach((pt, idx) => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = idx % 2 === 0 ? '#ff007f' : '#00f0ff';
        ctx.save();
        ctx.shadowBlur = 8;
        ctx.shadowColor = idx % 2 === 0 ? '#ff007f' : '#00f0ff';
        ctx.fill();
        ctx.restore();
      });

      ctx.restore(); // Restore core coordinate system translation

      // 6. Integrated Circular Premium HUD Loading Animation around core
      const hudRadius = coreSize * 0.95;
      
      // Background track
      ctx.beginPath();
      ctx.arc(cx, cy, hudRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 5;
      ctx.stroke();

      // Progress bar arc
      const progressAngle = (progress / 100) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, hudRadius, -Math.PI / 2, -Math.PI / 2 + progressAngle);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.7)';
      ctx.lineWidth = 4;
      ctx.save();
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00f0ff';
      ctx.stroke();
      ctx.restore();

      // Tiny laser guide dot chasing progress
      const dotAngle = -Math.PI / 2 + progressAngle;
      ctx.beginPath();
      ctx.arc(cx + hudRadius * Math.cos(dotAngle), cy + hudRadius * Math.sin(dotAngle), 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.save();
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#00f0ff';
      ctx.fill();
      ctx.restore();

      // Concentric inner targets/crosshairs
      ctx.beginPath();
      ctx.arc(cx, cy, coreSize * 0.65, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
      ctx.setLineDash([2, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 7. Light bloom flash overlay on complete
      if (isFinishing) {
        const factor = (progress - 100) * 1.5; // grows
        const bloom = ctx.createRadialGradient(cx, cy, 10, cx, cy, width * 1.2);
        bloom.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        bloom.addColorStop(0.3, 'rgba(0, 240, 255, 0.85)');
        bloom.addColorStop(0.7, 'rgba(176, 38, 255, 0.4)');
        bloom.addColorStop(1, 'transparent');
        ctx.fillStyle = bloom;
        ctx.fillRect(0, 0, width, height);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [progress, isFinishing]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#010206] text-white flex flex-col justify-between items-center py-10 px-4 select-none font-display">
      {/* Background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none z-0" />

      {/* Cyber energy glowing backlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-cyber-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[30vw] h-[30vw] rounded-full bg-cyber-pink/4 blur-[100px] pointer-events-none animate-pulse" />

      {/* Diagnostic telemetry header */}
      <header className="relative z-10 w-full max-w-7xl flex justify-between items-center border-b border-cyber-cyan/10 pb-4 text-[9px] font-mono tracking-widest text-slate-500 uppercase">
        <div className="flex items-center gap-2.5">
          <Activity size={12} className="text-cyber-cyan animate-pulse" />
          <span>PORTAL_CORE_LOADER: READY</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5"><Lock size={10} className="text-cyber-emerald" /> SSL_CIPHER_OK</span>
          <span className="hidden md:inline text-slate-500">QUANTUM LINK: SECURE_CHANNEL_3000</span>
        </div>
      </header>

      {/* Main holographic Quantum Core HUD (rendered on canvas) */}
      <div className="relative z-10 flex-grow flex items-center justify-center w-full max-w-7xl my-auto">
        {/* Floating AI telemetry indicators bordering left/right of center */}
        <div className="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-6 w-64 text-left">
          <div className="bg-slate-950/65 border border-cyber-cyan/15 p-4.5 rounded-xl space-y-2.5 backdrop-blur-md">
            <span className="font-mono text-[8px] text-cyber-cyan tracking-widest block uppercase">// SHIELD INTEGRITY</span>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="text-cyber-emerald animate-pulse" size={16} />
              <div>
                <div className="font-mono text-[9px] text-slate-200 font-bold">CRYPTO BARRIER</div>
                <div className="font-mono text-[8px] text-slate-400">STATUS: REINFORCED</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/65 border border-cyber-cyan/15 p-4.5 rounded-xl space-y-2 backdrop-blur-md">
            <span className="font-mono text-[8px] text-cyber-pink tracking-widest block uppercase">// CORE TEMP</span>
            <div className="flex items-center justify-between font-mono text-[9px] text-slate-300">
              <span>FREQUENCY:</span>
              <span className="text-cyber-pink animate-pulse font-bold">4.8 GHz</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[9px] text-slate-300">
              <span>STABILITY:</span>
              <span className="text-cyber-emerald font-bold">99.98%</span>
            </div>
          </div>
        </div>

        <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-6 w-64 text-left">
          <div className="bg-slate-950/65 border border-cyber-cyan/15 p-4.5 rounded-xl space-y-2.5 backdrop-blur-md">
            <span className="font-mono text-[8px] text-cyber-purple tracking-widest block uppercase">// NODE BALANCER</span>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] text-slate-300">PRIMARY:</span>
              <span className="font-mono text-[9px] text-cyber-emerald font-bold">ACTIVE</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] text-slate-300">FAILOVER:</span>
              <span className="font-mono text-[9px] text-cyber-cyan font-bold">STANDBY</span>
            </div>
          </div>

          <div className="bg-slate-950/65 border border-cyber-cyan/15 p-4.5 rounded-xl space-y-2 backdrop-blur-md">
            <span className="font-mono text-[8px] text-cyber-cyan tracking-widest block uppercase">// NETWORK</span>
            <div className="flex items-center justify-between font-mono text-[9px] text-slate-300">
              <span>LATENCY:</span>
              <span className="text-cyber-emerald font-bold">2 ms</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[9px] text-slate-300">
              <span>BANDWIDTH:</span>
              <span className="text-cyber-cyan font-bold">10 Gbps</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer loading diagnostics metrics slider */}
      <footer className="relative z-10 w-full max-w-xl text-center space-y-6">
        <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono tracking-widest uppercase">
          <span className="flex items-center gap-2">
            <RefreshCw size={11} className="text-cyber-cyan animate-spin" />
            SYNCHRONIZING INTERFACE
          </span>
          <span className="font-black text-cyber-cyan text-base">{Math.floor(progress)}%</span>
        </div>

        {/* Elegant status messages slider */}
        <div className="h-6 flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={loadingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="text-xs font-black tracking-[0.35em] text-slate-350 uppercase font-display"
              style={{ textShadow: '0 0 10px rgba(0, 240, 255, 0.3)' }}
            >
              {loadingText}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Technical bottom micro bars */}
        <div className="flex justify-center gap-1.5 text-[8px] font-mono text-slate-500 tracking-widest uppercase mt-4">
          <span className="flex items-center gap-1">
            <Cpu size={10} className="text-cyber-cyan" /> QUANTUM CORE ARMED
          </span>
        </div>
      </footer>
    </div>
  );
}
