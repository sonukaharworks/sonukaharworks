import { useEffect, useState, useRef } from 'react';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ringRef = useRef<{ x: number; y: number }>({ x: -200, y: -200 });
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Disable on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const bindHoverEvents = () => {
      const elements = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
      elements.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    bindHoverEvents();
    const observer = new MutationObserver(bindHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    const updateLerpPosition = () => {
      const targetX = position.x;
      const targetY = position.y;

      const currentX = ringRef.current.x;
      const currentY = ringRef.current.y;

      const ease = isHovering ? 0.22 : 0.15;
      const nextX = currentX + (targetX - currentX) * ease;
      const nextY = currentY + (targetY - currentY) * ease;

      ringRef.current = { x: nextX, y: nextY };

      const ringElement = document.getElementById('custom-cursor-ring');
      if (ringElement) {
        ringElement.style.transform = `translate3d(${nextX}px, ${nextY}px, 0) translate(-50%, -50%) scale(${isHovering ? 1.4 : 1})`;
      }

      requestRef.current = requestAnimationFrame(updateLerpPosition);
    };

    requestRef.current = requestAnimationFrame(updateLerpPosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      observer.disconnect();
    };
  }, [position, isHovering, isVisible]);

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Light soft aurora ambient glow behind cursor */}
      <div
        id="cursor-glow-ambient"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 0.5 : 0,
        }}
        className="fixed pointer-events-none z-0 w-[350px] h-[350px] rounded-full transition-opacity duration-500 ease-out bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.08)_0%,rgba(255,0,127,0.03)_40%,transparent_70%)]"
      />

      {/* Elegant glass ring target tracer */}
      <div
        id="custom-cursor-ring"
        style={{
          opacity: isVisible ? 1 : 0,
        }}
        className="fixed pointer-events-none z-50 top-0 left-0 w-7 h-7 rounded-md border border-cyber-cyan bg-slate-950/40 backdrop-blur-[2px] shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center justify-center transition-opacity duration-300"
      >
        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isHovering ? 'bg-cyber-pink scale-125 shadow-[0_0_8px_#ff007f]' : 'bg-cyber-cyan'}`} />
      </div>
    </>
  );
}
