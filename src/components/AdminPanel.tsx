import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  Unlock, 
  ShieldAlert, 
  CheckCircle2, 
  X, 
  LogOut, 
  Globe, 
  Clock, 
  Laptop, 
  Smartphone, 
  Search, 
  Filter, 
  Database, 
  AlertTriangle, 
  Compass, 
  FileText,
  RefreshCw,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import { auth, googleProvider, isFirebaseConfigured } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { visitorLogService, VisitorLog } from '../services/visitorLog';

interface AdminPanelProps {
  onClose: () => void;
}

const AUTHORIZED_EMAIL = 'sonukahar2026@gmail.com';

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [unauthorizedDomain, setUnauthorizedDomain] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<VisitorLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPage, setFilterPage] = useState('all');
  const [filterDevice, setFilterDevice] = useState('all');
  
  // Local bypass state (for local testing/fallback when Firebase isn't configured in preview)
  const [isDemoMode, setIsDemoMode] = useState(!isFirebaseConfigured);
  const [demoEmail, setDemoEmail] = useState('');
  const [demoLoggedIn, setDemoLoggedIn] = useState(false);

  // Monitor Auth State
  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        if (currentUser.email === AUTHORIZED_EMAIL) {
          setUser(currentUser);
          setAuthError(null);
        } else {
          // Access Denied and Sign Out
          setAuthError(`ACCESS DENIED: ${currentUser.email} is not authorized.`);
          setUser(null);
          try {
            await signOut(auth);
          } catch (e) {
            console.error('Sign out error:', e);
          }
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Monitor Real-Time Visitor Logs
  useEffect(() => {
    // Only fetch logs if successfully logged in as the authorized user
    if ((isFirebaseConfigured && user) || (!isFirebaseConfigured && demoLoggedIn)) {
      const unsubscribe = visitorLogService.subscribeToLogs((updatedLogs) => {
        setLogs(updatedLogs);
      });
      return () => unsubscribe();
    }
  }, [user, demoLoggedIn]);

  // Google Authentication handler
  const handleGoogleSignIn = async () => {
    if (!isFirebaseConfigured || !auth || !googleProvider) {
      setAuthError('Firebase is not configured yet. Set VITE_FIREBASE_* variables to enable Google Auth.');
      return;
    }

    setLoading(true);
    setAuthError(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const signedInUser = result.user;
      
      if (signedInUser.email !== AUTHORIZED_EMAIL) {
        setAuthError(`ACCESS DENIED: ${signedInUser.email} is not authorized.`);
        setUser(null);
        await signOut(auth);
      } else {
        setUser(signedInUser);
      }
    } catch (error: any) {
      console.error('Google sign in error:', error);
      if (error?.code === 'auth/popup-blocked') {
        setAuthError('Authentication popup was blocked! Please click the "Open in New Tab" button at the top right of your browser, or allow popups for this site.');
      } else if (error?.code === 'auth/unauthorized-domain' || error?.message?.includes('auth/unauthorized-domain') || error?.message?.includes('unauthorized-domain')) {
        setUnauthorizedDomain(window.location.hostname);
        setAuthError('Firebase Authentication: Unauthorized domain error detected.');
      } else {
        setAuthError(error?.message || 'Google Authentication failed. Please try again.');
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Sign out handler
  const handleSignOut = async () => {
    setLoading(true);
    if (isFirebaseConfigured && auth) {
      try {
        await signOut(auth);
        setUser(null);
      } catch (e) {
        console.error(e);
      }
    } else {
      setDemoLoggedIn(false);
    }
    setLoading(false);
  };

  // Demo sign in handler (LocalStorage fallback)
  const handleDemoSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (demoEmail.trim().toLowerCase() === AUTHORIZED_EMAIL) {
      setDemoLoggedIn(true);
      setAuthError(null);
    } else {
      setAuthError(`ACCESS DENIED: Only ${AUTHORIZED_EMAIL} is authorized.`);
      setDemoLoggedIn(false);
    }
  };

  // Filter logs logic
  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.browser.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.os.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.deviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.location && (
        log.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.location.country.toLowerCase().includes(searchTerm.toLowerCase())
      ));

    const matchesPage = filterPage === 'all' || log.pageVisited === filterPage;
    const matchesDevice = filterDevice === 'all' || 
      (filterDevice === 'Mobile Node' && log.deviceType === 'Mobile Node') ||
      (filterDevice === 'Desktop Terminal' && log.deviceType === 'Desktop Terminal');

    return matchesSearch && matchesPage && matchesDevice;
  });

  // Calculate statistics from current logs
  const totalVisits = logs.length;
  const mobileVisits = logs.filter(l => l.deviceType === 'Mobile Node').length;
  const desktopVisits = logs.filter(l => l.deviceType === 'Desktop Terminal').length;
  
  // Page distribution
  const pageStats: { [key: string]: number } = {};
  logs.forEach(l => {
    pageStats[l.pageVisited] = (pageStats[l.pageVisited] || 0) + 1;
  });

  // Browser distribution
  const browserStats: { [key: string]: number } = {};
  logs.forEach(l => {
    browserStats[l.browser] = (browserStats[l.browser] || 0) + 1;
  });

  // OS distribution
  const osStats: { [key: string]: number } = {};
  logs.forEach(l => {
    osStats[l.os] = (osStats[l.os] || 0) + 1;
  });

  const getPercentage = (value: number, total: number) => {
    if (!total) return '0%';
    return `${Math.round((value / total) * 100)}%`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#020309]/98 backdrop-blur-2xl flex flex-col overflow-y-auto selection:bg-cyber-cyan/35 selection:text-white font-display text-white">
      
      {/* Background scanlines and grid */}
      <div className="absolute inset-0 cyber-grid opacity-[0.08] pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-full h-[3px] bg-cyber-cyan/40 shadow-[0_0_15px_rgba(0,240,255,0.8)] animate-[scanLine_4s_linear_infinite] z-0 pointer-events-none" />

      {/* Header Bar */}
      <div className="sticky top-0 bg-slate-950/90 backdrop-blur-md border-b border-cyber-cyan/20 px-6 py-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-1 rounded bg-cyber-pink/20 blur animate-pulse" />
            <div className="w-9 h-9 border border-cyber-pink/50 rounded flex items-center justify-center bg-slate-950 text-cyber-pink relative z-10 font-bold text-xs tracking-wider">
              SK
            </div>
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-cyber-pink block uppercase font-bold animate-pulse">ADMIN PORTAL</span>
            <span className="text-white font-black text-xs tracking-widest block uppercase">
              {((isFirebaseConfigured && user) || (!isFirebaseConfigured && demoLoggedIn)) ? 'DECRYPTED CONSOLE' : 'RESTRICTED SYSTEM'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {((isFirebaseConfigured && user) || (!isFirebaseConfigured && demoLoggedIn)) && (
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-slate-400 hover:text-cyber-pink border border-slate-800 hover:border-cyber-pink/30 bg-slate-950 px-3.5 py-1.5 rounded-lg text-[8.5px] font-mono font-black tracking-widest uppercase cursor-pointer transition-all duration-300"
            >
              <LogOut size={11} />
              LOGOUT
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:border-white/30 border border-transparent rounded-lg bg-slate-900/50 cursor-pointer transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-8 relative z-10 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          
          {/* 1. AUTH SCREEN (NOT LOGGED IN) */}
          {!((isFirebaseConfigured && user) || (!isFirebaseConfigured && demoLoggedIn)) && (
            <motion.div
              key="auth"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="max-w-md w-full mx-auto"
            >
              <div className="bg-slate-950/80 border border-cyber-cyan/25 rounded-2xl p-6 sm:p-8 text-center space-y-6 relative overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.1)]">
                
                {/* Visual Lock Accent */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-4 rounded-full bg-cyber-cyan/10 blur animate-ping" />
                    <div className="w-16 h-16 rounded-full border-2 border-cyber-cyan/50 bg-slate-950 flex items-center justify-center text-cyber-cyan shadow-[0_0_20px_rgba(0,240,255,0.25)] relative z-10">
                      <Lock size={26} className="animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-sm font-black tracking-[0.4em] text-white uppercase">SONU KAHAR</h2>
                  <p className="text-[8.5px] font-mono text-cyber-pink font-extrabold tracking-widest uppercase">
                    LIVE VISITOR PERSISTENCE ENGINE
                  </p>
                  <p className="text-[10px] font-mono text-slate-400 uppercase max-w-xs mx-auto leading-relaxed pt-2">
                    Access is strictly guarded. Please authenticate with your registered Google administrative credentials.
                  </p>
                </div>

                {/* Info block for fallback testing */}
                {!isFirebaseConfigured && (
                  <div className="bg-cyber-pink/5 border border-cyber-pink/20 rounded-xl p-3 text-left space-y-1.5">
                    <span className="text-[8.5px] font-mono text-cyber-pink font-black tracking-widest uppercase block">
                      ⚠️ LOCAL PREVIEW MODE
                    </span>
                    <p className="text-[8px] font-mono text-slate-400 uppercase leading-relaxed">
                      To connect real Firestore & Google Auth, supply Firebase keys inside your environment variables. Enter your authorized email below to bypass and inspect.
                    </p>
                  </div>
                )}

                {/* Authentication controls */}
                <div className="space-y-3 pt-2">
                  {isFirebaseConfigured ? (
                    <button
                      onClick={handleGoogleSignIn}
                      disabled={loading}
                      className="w-full py-3.5 rounded-xl text-[9px] font-black tracking-[0.2em] uppercase bg-white text-black hover:bg-cyber-cyan hover:text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <RefreshCw size={12} className="animate-spin" />
                      ) : (
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          />
                        </svg>
                      )}
                      {loading ? 'SYNCHRONIZING...' : 'GOOGLE SIGN IN'}
                    </button>
                  ) : (
                    <form onSubmit={handleDemoSignIn} className="space-y-3">
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="sonukahar2026@gmail.com"
                          value={demoEmail}
                          onChange={(e) => setDemoEmail(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 text-xs font-mono tracking-wider focus:border-cyber-pink focus:outline-none placeholder-slate-650"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl text-[9px] font-black tracking-[0.2em] uppercase bg-cyber-pink text-white hover:bg-cyber-pink/80 hover:shadow-[0_0_20px_rgba(255,0,127,0.3)] transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer border border-cyber-pink/25"
                      >
                        BYPASS LOGIN
                      </button>
                    </form>
                  )}
                </div>

                {/* Error Banner */}
                {authError && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-cyber-pink/15 border border-cyber-pink/40 text-cyber-pink rounded-xl p-3.5 text-left text-[9px] font-mono leading-relaxed uppercase tracking-wider flex flex-col items-start gap-2 w-full"
                  >
                    <div className="flex items-start gap-2.5 w-full">
                      <ShieldAlert size={14} className="shrink-0 text-cyber-pink animate-pulse mt-0.5" />
                      <div>
                        <span className="font-bold block text-red-400">SECURITY BLOCK ACTIVE</span>
                        {authError}
                      </div>
                    </div>
                    {unauthorizedDomain && (
                      <div className="mt-3 pt-3 border-t border-cyber-pink/20 w-full text-slate-350 space-y-2">
                        <span className="font-bold text-cyber-cyan block text-[9.5px]">HOW TO RESOLVE THIS ERROR:</span>
                        <p className="text-[8px] leading-relaxed">
                          Firebase requires you to explicitly authorize your web domain before allowing sign-ins.
                        </p>
                        <ol className="list-decimal list-inside text-[8px] space-y-1 pl-1">
                          <li>Go to the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-cyber-cyan underline hover:text-white">Firebase Console</a>.</li>
                          <li>Open your project and navigate to <span className="text-white">Authentication &rarr; Settings &rarr; Authorized Domains</span>.</li>
                          <li>Click <span className="text-white">"Add domain"</span> and paste your current host:</li>
                        </ol>
                        <div className="bg-slate-950 p-2 rounded border border-cyber-pink/30 flex items-center justify-between gap-2 w-full">
                          <code className="text-white font-bold select-all text-[8.5px] tracking-wide break-all">{unauthorizedDomain}</code>
                          <span className="text-[7px] text-cyber-cyan uppercase font-bold animate-pulse shrink-0">Click to Select & Copy</span>
                        </div>
                        <p className="text-[7.5px] leading-relaxed text-slate-500 italic">
                          Wait a minute after saving in Firebase before trying to sign in again.
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Connection helper */}
                {isFirebaseConfigured && (
                  <p className="text-[7.5px] font-mono text-slate-550 uppercase tracking-widest text-center">
                    Note: If popups are blocked, please open the app in a new tab using the top-right button.
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* 2. ADMIN DASHBOARD (SUCCESSFULLY AUTHENTICATED) */}
          {((isFirebaseConfigured && user) || (!isFirebaseConfigured && demoLoggedIn)) && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 flex-grow py-4"
            >
              
              {/* Notification Banner about Demo mode */}
              {!isFirebaseConfigured && (
                <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/10 to-transparent border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="text-amber-400 shrink-0 mt-0.5" size={16} />
                    <div className="space-y-0.5">
                      <span className="font-display font-black text-[10px] tracking-widest uppercase block text-amber-300">DEMO CONSOLE FALLBACK ACTIVATED</span>
                      <p className="text-[9px] font-mono text-slate-400 uppercase leading-relaxed">
                        Data shown below resides in your browser cache because VITE_FIREBASE_* keys are not configured. To enable full Firebase Firestore integration, set environment keys inside AI Studio!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* BENTO STATS CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Total Visits Card */}
                <div className="bg-slate-950/70 border border-cyber-cyan/15 rounded-2xl p-4.5 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-cyber-cyan/35 transition-all">
                  <div className="space-y-1.5">
                    <span className="text-[8.5px] font-mono tracking-widest text-slate-400 uppercase block">TOTAL VISITS</span>
                    <span className="text-2xl font-black text-cyber-cyan tracking-tight block font-display">{totalVisits}</span>
                    <span className="text-[7.5px] font-mono text-cyber-emerald uppercase tracking-wider block">REALTIME FIRESTORE ACTIVE</span>
                  </div>
                  <Database size={24} className="text-cyber-cyan/40" />
                </div>

                {/* Desktop vs Mobile Card */}
                <div className="bg-slate-950/70 border border-cyber-cyan/15 rounded-2xl p-4.5 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-cyber-cyan/35 transition-all">
                  <div className="space-y-1.5">
                    <span className="text-[8.5px] font-mono tracking-widest text-slate-400 uppercase block">DEVICE SENSORS</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-white font-display">{desktopVisits}</span>
                      <span className="text-[8.5px] font-mono text-slate-400 uppercase">Desk</span>
                      <span className="text-slate-700">|</span>
                      <span className="text-lg font-bold text-cyber-pink font-display">{mobileVisits}</span>
                      <span className="text-[8.5px] font-mono text-slate-400 uppercase">Mob</span>
                    </div>
                    <div className="w-24 bg-slate-900 rounded-full h-1 overflow-hidden flex">
                      <div className="bg-cyber-cyan h-full" style={{ width: getPercentage(desktopVisits, totalVisits) }} />
                      <div className="bg-cyber-pink h-full" style={{ width: getPercentage(mobileVisits, totalVisits) }} />
                    </div>
                  </div>
                  <Smartphone size={24} className="text-cyber-pink/40" />
                </div>

                {/* Popular Pages Card */}
                <div className="bg-slate-950/70 border border-cyber-cyan/15 rounded-2xl p-4.5 sm:col-span-1 lg:col-span-2 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-cyber-cyan/35 transition-all gap-3">
                  <span className="text-[8.5px] font-mono tracking-widest text-slate-400 uppercase block">MOST VIEWED PORTFOLIO SECTIONS</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {Object.entries(pageStats).slice(0, 4).map(([page, count]) => (
                      <div key={page} className="bg-slate-900/50 border border-white/5 rounded-lg p-2 text-center">
                        <span className="text-[8px] font-mono text-cyber-cyan tracking-wider block uppercase truncate">{page}</span>
                        <span className="text-xs font-black text-white mt-1 block">{count}</span>
                      </div>
                    ))}
                    {Object.keys(pageStats).length === 0 && (
                      <div className="col-span-4 text-center text-[9px] font-mono text-slate-500 uppercase">No Pages Recorded</div>
                    )}
                  </div>
                </div>
              </div>

              {/* GRAPHS AND CHARTS ROW */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* OS Breakdown */}
                <div className="bg-slate-950/70 border border-cyber-cyan/15 rounded-2xl p-5 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
                  <h3 className="text-[9.5px] font-mono tracking-widest text-cyber-cyan uppercase font-bold border-b border-white/5 pb-2.5 mb-3 flex items-center gap-2">
                    <Laptop size={12} /> OS DISTRIBUTION
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(osStats).map(([os, count]) => (
                      <div key={os} className="space-y-1">
                        <div className="flex justify-between text-[9px] font-mono uppercase text-slate-350">
                          <span>{os}</span>
                          <span className="font-bold text-white">{count} ({getPercentage(count, totalVisits)})</span>
                        </div>
                        <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-gradient-to-r from-cyber-cyan to-cyber-purple h-full rounded-full" style={{ width: getPercentage(count, totalVisits) }} />
                        </div>
                      </div>
                    ))}
                    {Object.keys(osStats).length === 0 && (
                      <p className="text-[9px] font-mono text-slate-500 uppercase text-center py-4">No OS Metrics</p>
                    )}
                  </div>
                </div>

                {/* Browser Breakdown */}
                <div className="bg-slate-950/70 border border-cyber-cyan/15 rounded-2xl p-5 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
                  <h3 className="text-[9.5px] font-mono tracking-widest text-cyber-pink uppercase font-bold border-b border-white/5 pb-2.5 mb-3 flex items-center gap-2">
                    <Globe size={12} /> BROWSER METRICS
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(browserStats).map(([browser, count]) => (
                      <div key={browser} className="space-y-1">
                        <div className="flex justify-between text-[9px] font-mono uppercase text-slate-350">
                          <span>{browser}</span>
                          <span className="font-bold text-white">{count} ({getPercentage(count, totalVisits)})</span>
                        </div>
                        <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-gradient-to-r from-cyber-pink to-cyber-purple h-full rounded-full" style={{ width: getPercentage(count, totalVisits) }} />
                        </div>
                      </div>
                    ))}
                    {Object.keys(browserStats).length === 0 && (
                      <p className="text-[9px] font-mono text-slate-500 uppercase text-center py-4">No Browser Metrics</p>
                    )}
                  </div>
                </div>
              </div>

              {/* DETAILED LOGS GRID */}
              <div className="bg-slate-950/70 border border-cyber-cyan/15 rounded-2xl p-5 shadow-[0_4px_30px_rgba(0,0,0,0.6)] flex flex-col">
                
                {/* Search & Filter Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-4">
                  <h3 className="text-[10px] font-mono tracking-[0.2em] text-white uppercase font-bold flex items-center gap-2">
                    <FileText size={13} className="text-cyber-cyan" /> DECRYPTED VISIT TIMELINE ({filteredLogs.length})
                  </h3>
                  
                  {/* Search and drop downs */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Search Field */}
                    <div className="relative">
                      <Search size={11} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        placeholder="SEARCH METRICS..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-slate-900 border border-white/10 rounded-lg text-[9.5px] font-mono py-1.5 pl-8 pr-3.5 focus:border-cyber-cyan focus:outline-none w-44 uppercase placeholder-slate-650"
                      />
                    </div>

                    {/* Filter Page */}
                    <select
                      value={filterPage}
                      onChange={(e) => setFilterPage(e.target.value)}
                      className="bg-slate-900 border border-white/10 rounded-lg text-[9px] font-mono py-1.5 px-3.5 focus:border-cyber-cyan focus:outline-none cursor-pointer uppercase text-slate-350"
                    >
                      <option value="all">ALL PAGES</option>
                      <option value="home">MAIN (HOME)</option>
                      <option value="about">SPECS (ABOUT)</option>
                      <option value="services">SERVICES</option>
                      <option value="skills">STACK (SKILLS)</option>
                      <option value="projects">REPOS (PROJECTS)</option>
                      <option value="portfolio">GALLERY</option>
                      <option value="experience">CHRONICLE</option>
                      <option value="contact">CHANNEL (CONTACT)</option>
                    </select>

                    {/* Filter Device */}
                    <select
                      value={filterDevice}
                      onChange={(e) => setFilterDevice(e.target.value)}
                      className="bg-slate-900 border border-white/10 rounded-lg text-[9px] font-mono py-1.5 px-3.5 focus:border-cyber-cyan focus:outline-none cursor-pointer uppercase text-slate-350"
                    >
                      <option value="all">ALL NODES</option>
                      <option value="Desktop Terminal">DESKTOP TERMINAL</option>
                      <option value="Mobile Node">MOBILE NODE</option>
                    </select>
                  </div>
                </div>

                {/* Table for Large Screens / Flex blocks for Mobile */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-[9px] border-collapse hidden md:table">
                    <thead>
                      <tr className="border-b border-white/5 text-slate-450 uppercase tracking-wider h-9">
                        <th className="font-semibold py-2">VISIT TIME</th>
                        <th className="font-semibold py-2">SECTION</th>
                        <th className="font-semibold py-2">BROWSER</th>
                        <th className="font-semibold py-2">OS</th>
                        <th className="font-semibold py-2">DEVICE</th>
                        <th className="font-semibold py-2">LOCATION (GPS GRANTED)</th>
                        <th className="font-semibold py-2 text-right">TZ & LANG</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredLogs.map((log, index) => (
                        <tr key={log.id || index} className="hover:bg-white/2 transition-colors h-10">
                          <td className="py-2.5 text-slate-400">
                            {new Date(log.visitTime).toLocaleString('en-US', { hour12: false })}
                          </td>
                          <td className="py-2.5">
                            <span className="px-2 py-0.5 rounded bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan font-black uppercase text-[8.5px]">
                              {log.pageVisited}
                            </span>
                          </td>
                          <td className="py-2.5 text-white font-bold">{log.browser}</td>
                          <td className="py-2.5 text-slate-300">{log.os}</td>
                          <td className="py-2.5 text-slate-350 flex items-center gap-1 mt-1.5">
                            {log.deviceType === 'Mobile Node' ? <Smartphone size={10} className="text-cyber-pink" /> : <Laptop size={10} className="text-cyber-cyan" />}
                            {log.deviceType}
                          </td>
                          <td className="py-2.5">
                            {log.location ? (
                              <div className="flex items-center gap-1 text-cyber-emerald font-bold">
                                <MapPin size={9} className="text-cyber-emerald shrink-0" />
                                <span className="truncate max-w-[150px]">{log.location.city}, {log.location.country}</span>
                                {log.location.lat && (
                                  <span className="text-[7.5px] text-slate-500 font-normal">
                                    ({log.location.lat.toFixed(2)}, {log.location.lng?.toFixed(2)})
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-slate-550 uppercase tracking-wider">REFUSED / SECURE</span>
                            )}
                          </td>
                          <td className="py-2.5 text-right text-slate-450 uppercase">
                            {log.timeZone.split('/')[1] || log.timeZone} | {log.language.toUpperCase()}
                          </td>
                        </tr>
                      ))}
                      {filteredLogs.length === 0 && (
                        <tr>
                          <td colSpan={7} className="text-center py-8 text-slate-500 uppercase tracking-widest font-bold">
                            No logs found matching specified queries
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {/* Responsive block logs for mobile devices */}
                  <div className="md:hidden space-y-3">
                    {filteredLogs.map((log, index) => (
                      <div key={log.id || index} className="bg-slate-900/40 border border-white/5 rounded-xl p-3.5 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] text-slate-500 font-mono">
                            {new Date(log.visitTime).toLocaleString('en-US', { hour12: false })}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-cyber-cyan/10 border border-cyber-cyan/25 text-cyber-cyan font-black uppercase text-[8px]">
                            {log.pageVisited}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-y-1.5 text-[8.5px] font-mono uppercase">
                          <div>
                            <span className="text-slate-500 block text-[7.5px]">BROWSER</span>
                            <span className="text-white font-bold">{log.browser}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[7.5px]">OPERATING SYSTEM</span>
                            <span className="text-slate-350">{log.os}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[7.5px]">NODE CLASS</span>
                            <span className="text-slate-350 flex items-center gap-1">
                              {log.deviceType === 'Mobile Node' ? <Smartphone size={9} className="text-cyber-pink" /> : <Laptop size={9} className="text-cyber-cyan" />}
                              {log.deviceType}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[7.5px]">LANGUAGE & TZ</span>
                            <span className="text-slate-450">{log.language.toUpperCase()} | {log.timeZone.split('/')[1] || 'UTC'}</span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-white/5 text-[8.5px]">
                          <span className="text-slate-500 block text-[7.5px] mb-0.5 uppercase">GEOLOCATION DATA</span>
                          {log.location ? (
                            <div className="flex items-center gap-1.5 text-cyber-emerald font-bold">
                              <MapPin size={9} className="text-cyber-emerald shrink-0" />
                              <span>{log.location.city}, {log.location.country}</span>
                            </div>
                          ) : (
                            <span className="text-slate-550 uppercase tracking-widest font-black">REFUSED / SECURE</span>
                          )}
                        </div>
                      </div>
                    ))}
                    {filteredLogs.length === 0 && (
                      <div className="text-center py-6 text-slate-500 uppercase tracking-widest font-bold">
                        No logs match queries
                      </div>
                    )}
                  </div>

                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
