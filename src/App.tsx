import { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import AILoader from './components/AILoader';
import PremiumHome from './components/PremiumHome';
import CursorGlow from './components/CursorGlow';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [phase, setPhase] = useState<'welcome' | 'loading' | 'home'>('welcome');

  // Safe localStorage helper to prevent crashes in private/restricted environments
  const getLocalStorageItem = (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn('localStorage is blocked or unavailable:', e);
      return null;
    }
  };

  const setLocalStorageItem = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn('localStorage is blocked or unavailable:', e);
    }
  };

  const removeLocalStorageItem = (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('localStorage is blocked or unavailable:', e);
    }
  };

  // Always start on welcome screen as requested by the user
  useEffect(() => {
    setPhase('welcome');
  }, []);

  // Handle setting intro completed in localStorage when loader finishes
  const handleLoaderComplete = () => {
    setLocalStorageItem('sk_studio_intro_completed', 'true');
    setPhase('home');
  };

  // Callback to replay the intro from scratch (resets local state and starts welcome screen)
  const handleReplayIntro = () => {
    removeLocalStorageItem('sk_studio_intro_completed');
    setPhase('welcome');
  };

  // Dynamic canvas-drawn rotating favicon for Sonu Kahar Studio
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;
    const updateFavicon = () => {
      ctx.clearRect(0, 0, 32, 32);
      
      // Draw background cyber dark circle
      ctx.fillStyle = '#020309';
      ctx.beginPath();
      ctx.arc(16, 16, 15, 0, Math.PI * 2);
      ctx.fill();

      // Glowing outer cyber cyan ring
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Rotating inner brand star
      ctx.save();
      ctx.translate(16, 16);
      ctx.rotate((angle * Math.PI) / 180);
      
      // Draw 4-point futuristic star with gorgeous neon cyber pink feel
      ctx.fillStyle = '#ff007f';
      ctx.beginPath();
      ctx.moveTo(0, -9);
      ctx.lineTo(2.2, -2.2);
      ctx.lineTo(9, 0);
      ctx.lineTo(2.2, 2.2);
      ctx.lineTo(0, 9);
      ctx.lineTo(-2.2, 2.2);
      ctx.lineTo(-9, 0);
      ctx.lineTo(-2.2, -2.2);
      ctx.closePath();
      ctx.fill();
      
      // Core glowing cyan node
      ctx.fillStyle = '#00f0ff';
      ctx.beginPath();
      ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = canvas.toDataURL('image/png');
      angle = (angle + 12) % 360;
    };

    const intervalId = setInterval(updateFavicon, 250);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {phase === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <WelcomeScreen onEnter={() => setPhase('home')} />
          </motion.div>
        )}

        {phase === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            <AILoader onComplete={handleLoaderComplete} />
          </motion.div>
        )}

        {phase === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full h-full relative"
          >
            <CursorGlow />
            <PremiumHome onReplayIntro={handleReplayIntro} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
