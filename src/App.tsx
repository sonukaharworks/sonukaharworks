import { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import AILoader from './components/AILoader';
import PremiumHome from './components/PremiumHome';
import CursorGlow from './components/CursorGlow';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [phase, setPhase] = useState<'welcome' | 'loading' | 'home'>(() => {
    try {
      return localStorage.getItem('sk_studio_intro_completed') === 'true' ? 'home' : 'welcome';
    } catch (e) {
      return 'welcome';
    }
  });

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

  // Handle setting intro completed in localStorage when loader finishes
  const handleLoaderComplete = () => {
    setLocalStorageItem('sk_studio_intro_completed', 'true');
    setPhase('home');
  };

  // Dynamic canvas-drawn elegant favicon for Sonu Kahar Studio
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateFavicon = () => {
      ctx.clearRect(0, 0, 32, 32);
      
      // Draw background premium charcoal circle
      ctx.fillStyle = '#0f1115';
      ctx.beginPath();
      ctx.arc(16, 16, 15, 0, Math.PI * 2);
      ctx.fill();

      // Clean, elegant blue brand stroke
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Simple elegant initials
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 13px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('SK', 16, 16);

      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = canvas.toDataURL('image/png');
    };

    updateFavicon();
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
            <WelcomeScreen onEnter={() => {
              setLocalStorageItem('sk_studio_intro_completed', 'true');
              setPhase('home');
            }} />
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
            <PremiumHome />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
