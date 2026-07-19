import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Smartphone, Laptop, Globe, Database, Activity, 
  AlertTriangle, Sparkles, User, Mail, Phone, MessageSquare, 
  Clock, ChevronRight, IndianRupee, Search, Trash2, X, ShieldCheck, LogOut, Key
} from 'lucide-react';
import { visitorLogService } from '../services/visitorLog';
import { inquiryService } from '../services/inquiry';
import { auth, isFirebaseConfigured } from '../firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

const AUTHORIZED_EMAIL = 'sonukahar2026@gmail.com';

interface OwnerWorkspaceProps {
  onClose: () => void;
}

export default function OwnerWorkspace({ onClose }: OwnerWorkspaceProps) {
  // Authentication states
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [demoEmail, setDemoEmail] = useState('');
  const [demoLoggedIn, setDemoLoggedIn] = useState(false);
  const [unauthorizedDomain, setUnauthorizedDomain] = useState<string | null>(null);

  // Data states
  const [logs, setLogs] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  
  // Navigation inside workspace
  type TabType = 'visitors' | 'messages' | 'projects' | 'analytics' | 'settings';
  const [activeTab, setActiveTab] = useState<TabType>('visitors');
  
  // Search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPage, setFilterPage] = useState('all');

  // Load state and auth updates
  useEffect(() => {
    setLoading(true);
    
    // Check bypass localStorage state
    try {
      const bypass = localStorage.getItem('sk_admin_bypass_logged_in') === 'true';
      if (bypass) {
        setDemoLoggedIn(true);
      }
    } catch (e) {}

    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        if (currentUser.email === AUTHORIZED_EMAIL) {
          setUser(currentUser);
          setAuthError(null);
        } else {
          setAuthError(`ACCESS DENIED: ${currentUser.email} is not authorized.`);
          setUser(null);
          signOut(auth).catch(console.error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Subscribe to real-time logs and inquiries when authenticated
  useEffect(() => {
    const isAuthed = (isFirebaseConfigured && user) || (!isFirebaseConfigured && demoLoggedIn);
    if (!isAuthed) return;

    // Subscribe to visitor logs
    const unsubLogs = visitorLogService.subscribeToLogs((fetched) => {
      setLogs(fetched);
    });

    // Subscribe to inquiries
    const unsubInquiries = inquiryService.subscribeToInquiries((fetched) => {
      setInquiries(fetched);
    });

    return () => {
      unsubLogs();
      unsubInquiries();
    };
  }, [user, demoLoggedIn]);

  // Authenticate using Google Account
  const handleGoogleSignIn = async () => {
    if (!isFirebaseConfigured || !auth) {
      setAuthError('Firebase Authentication is not configured in this preview environment.');
      return;
    }

    setLoading(true);
    setAuthError(null);
    setUnauthorizedDomain(null);

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const result = await signInWithPopup(auth, provider);
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
        setAuthError('Authentication popup was blocked! Click "Open in New Tab" or enable popups.');
      } else if (error?.code === 'auth/popup-closed-by-user') {
        setAuthError('Sign-in popup was closed before completing authentication. Please click sign-in again to authorize.');
      } else if (error?.code === 'auth/unauthorized-domain' || error?.message?.includes('unauthorized-domain')) {
        setUnauthorizedDomain(window.location.hostname);
        setAuthError('Firebase Authentication: Unauthorized domain error detected.');
      } else {
        setAuthError(error?.message || 'Google Authentication failed.');
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Sign out handler
  const handleSignOut = async () => {
    setLoading(true);
    try {
      localStorage.removeItem('sk_admin_bypass_logged_in');
      window.dispatchEvent(new Event('storage'));
    } catch (e) {}
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
      try {
        localStorage.setItem('sk_admin_bypass_logged_in', 'true');
        window.dispatchEvent(new Event('storage'));
      } catch (e) {}
    } else {
      setAuthError(`ACCESS DENIED: Unrecognized owner credentials.`);
      setDemoLoggedIn(false);
    }
  };

  // Clean visitor logs matching standard query
  const filteredLogs = logs.filter(log => {
    const text = searchTerm.toLowerCase();
    const matchesSearch = 
      log.browser.toLowerCase().includes(text) ||
      log.os.toLowerCase().includes(text) ||
      log.deviceType.toLowerCase().includes(text) ||
      log.pageVisited.toLowerCase().includes(text) ||
      (log.location && (
        log.location.city.toLowerCase().includes(text) ||
        log.location.country.toLowerCase().includes(text)
      ));

    const matchesPage = filterPage === 'all' || log.pageVisited === filterPage;
    return matchesSearch && matchesPage;
  });

  // Split inquiries into Projects (with budget/custom) and Messages (simple questions)
  const projectInquiries = inquiries.filter(inq => {
    const isProj = inq.projectType && inq.projectType !== 'Message Only';
    const text = searchTerm.toLowerCase();
    const matchesSearch = 
      inq.name.toLowerCase().includes(text) ||
      inq.email.toLowerCase().includes(text) ||
      inq.projectType.toLowerCase().includes(text) ||
      inq.message.toLowerCase().includes(text);
    return isProj && matchesSearch;
  });

  const messageInquiries = inquiries.filter(inq => {
    const isMsg = !inq.projectType || inq.projectType === 'Message Only' || inq.budget === 'None' || inq.budget === '';
    const text = searchTerm.toLowerCase();
    const matchesSearch = 
      inq.name.toLowerCase().includes(text) ||
      inq.email.toLowerCase().includes(text) ||
      inq.message.toLowerCase().includes(text);
    return isMsg && matchesSearch;
  });

  // Calculations for Visitor statistics
  const totalVisits = logs.length;
  const mobileVisits = logs.filter(l => l.deviceType && l.deviceType.toLowerCase().includes('mobile')).length;
  const desktopVisits = totalVisits - mobileVisits;
  
  const pageStats: { [key: string]: number } = {};
  logs.forEach(l => {
    if (l.pageVisited) pageStats[l.pageVisited] = (pageStats[l.pageVisited] || 0) + 1;
  });

  const osStats: { [key: string]: number } = {};
  logs.forEach(l => {
    if (l.os) osStats[l.os] = (osStats[l.os] || 0) + 1;
  });

  const browserStats: { [key: string]: number } = {};
  logs.forEach(l => {
    if (l.browser) browserStats[l.browser] = (browserStats[l.browser] || 0) + 1;
  });

  const getPercentage = (value: number, total: number) => {
    if (!total) return '0%';
    return `${Math.round((value / total) * 100)}%`;
  };

  const isAuthed = (isFirebaseConfigured && user) || (!isFirebaseConfigured && demoLoggedIn);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#03010b]/95 backdrop-blur-2xl flex flex-col items-center justify-start p-4 sm:p-6 md:p-8">
      
      {/* Background Soft Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 relative z-10 min-h-full pb-12">
        
        {/* ========================================================
            WORKSPACE HEADER
            ======================================================== */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/[0.06] pb-5 text-left">
          <div className="space-y-1 text-center sm:text-left">
            <span className="font-mono text-[9px] font-black tracking-[0.25em] text-blue-400 block uppercase animate-pulse">
              SECURE WORKSPACE
            </span>
            <span className="text-white font-black text-lg tracking-wider block uppercase">
              {isAuthed ? 'Welcome Back, Sonu' : 'OWNER IDENTITY GATE'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isAuthed && (
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-mono text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer"
                title="Disconnect from secure instance"
              >
                <LogOut size={12} />
                Disconnect
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.08] border border-white/[0.08] text-slate-400 hover:text-white transition-all cursor-pointer"
              title="Close Workspace Pane"
            >
              <X size={14} />
            </button>
          </div>
        </header>

        {/* ========================================================
            1. AUTH SHELL (VISITOR SIGN-IN GATE)
            ======================================================== */}
        <AnimatePresence mode="wait">
          {!isAuthed ? (
            <motion.div
              key="auth-gate"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="flex-grow flex items-center justify-center py-16"
            >
              <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-white/[0.01] backdrop-blur-md p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden text-center">
                
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400">
                  <Key size={24} className="animate-pulse" />
                </div>

                <div className="space-y-1">
                  <h2 className="font-display font-black text-base text-white uppercase tracking-wider">
                    AUTHORIZED ACCESS ONLY
                  </h2>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans max-w-xs mx-auto">
                    Verify ownership of your authorized Google account to unlock the secure Control Center.
                  </p>
                </div>

                {authError && (
                  <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-left text-[10px] font-mono text-red-400 uppercase leading-relaxed">
                    <AlertTriangle size={14} className="shrink-0 float-left mr-2.5 text-red-400" />
                    <span>{authError}</span>
                  </div>
                )}

                {loading ? (
                  <div className="py-6 flex flex-col items-center justify-center gap-3">
                    <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
                    <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest">VERIFYING KEYS...</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {isFirebaseConfigured ? (
                      <button
                        onClick={handleGoogleSignIn}
                        className="w-full py-3 rounded-xl font-mono text-[9.5px] font-black tracking-widest text-white bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] cursor-pointer transition-all uppercase border border-blue-400/20"
                      >
                        Sign in with Google Auth
                      </button>
                    ) : (
                      <form onSubmit={handleDemoSignIn} className="space-y-3 text-left">
                        <div className="space-y-1.5">
                          <label className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-widest block">
                            Bypass Email Key
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="administrator@domain.com"
                            value={demoEmail}
                            onChange={(e) => setDemoEmail(e.target.value)}
                            className="w-full bg-slate-950 border border-white/[0.08] focus:border-blue-500/50 rounded-xl py-3 px-4 text-xs font-sans tracking-wide text-white focus:outline-none transition-all placeholder:text-slate-600"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-3 rounded-xl font-mono text-[9.5px] font-black tracking-widest text-white bg-blue-600 hover:bg-blue-500 transition-all uppercase border border-blue-400/15"
                        >
                          ACCESS SECURE FALLBACK
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {unauthorizedDomain && (
                  <div className="text-left border-t border-white/5 pt-4 mt-2 space-y-1.5">
                    <span className="font-mono text-[8px] text-amber-400 uppercase tracking-widest block">Authorized Domains Notice:</span>
                    <p className="text-[9px] text-slate-500 font-sans leading-relaxed">
                      Please register this domain inside your Firebase Console under Auth Providers Authorized Domains list:
                    </p>
                    <div className="bg-slate-950 border border-white/5 rounded-lg p-2.5 flex items-center justify-between">
                      <code className="text-white font-bold text-[8.5px] select-all break-all">{unauthorizedDomain}</code>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            
            // ========================================================
            // 2. OWNER SECURE WORKSPACE CORE
            // ========================================================
            <motion.div
              key="workspace-core"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6 flex-grow py-4 flex flex-col text-left"
            >
              
              {/* Fallback Warning banner */}
              {!isFirebaseConfigured && (
                <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3 text-left">
                    <AlertTriangle className="text-amber-400 shrink-0 mt-0.5 animate-pulse" size={16} />
                    <div className="space-y-0.5">
                      <span className="font-mono font-black text-[9px] tracking-widest uppercase block text-amber-300">LOCAL MEMORY ACTIVE</span>
                      <p className="text-[10px] font-sans text-slate-400 leading-relaxed font-light">
                        Using persistent localStorage mock database. Connect production VITE_FIREBASE_* keys inside the project variables block to link live cloud runs.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTROLLERS */}
              <div className="flex flex-wrap justify-start border-b border-white/[0.06] pb-[1px] gap-1 sm:gap-2">
                {[
                  { id: 'visitors', label: `Visitor Requests (${logs.length})`, icon: <Database size={11} /> },
                  { id: 'messages', label: `Messages (${messageInquiries.length})`, icon: <MessageSquare size={11} /> },
                  { id: 'projects', label: `Project Requests (${projectInquiries.length})`, icon: <Sparkles size={11} /> },
                  { id: 'analytics', label: 'Analytics', icon: <Activity size={11} /> },
                  { id: 'settings', label: 'Settings', icon: <ShieldCheck size={11} /> }
                ].map((tb) => (
                  <button
                    key={tb.id}
                    onClick={() => { setActiveTab(tb.id as TabType); setSearchTerm(''); }}
                    className={`px-4 sm:px-5 py-3 cursor-pointer font-mono text-[9px] font-black tracking-widest uppercase transition-all duration-250 border-b-2 flex items-center gap-1.5 ${
                      activeTab === tb.id
                        ? 'border-blue-500 text-blue-400 bg-white/[0.01] font-extrabold'
                        : 'border-transparent text-slate-500 hover:text-slate-350'
                    }`}
                  >
                    {tb.icon}
                    {tb.label}
                  </button>
                ))}
              </div>

              {/* SEARCH FILTERS */}
              {activeTab !== 'analytics' && activeTab !== 'settings' && (
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between border-b border-white/[0.04] pb-4">
                  <div className="relative flex-grow max-w-md">
                    <Search size={11} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search parameters..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-950 border border-white/[0.08] focus:border-blue-500/50 rounded-xl py-2 pl-9 pr-4 text-xs font-sans text-white focus:outline-none placeholder:text-slate-600"
                    />
                  </div>

                  {activeTab === 'visitors' && (
                    <select
                      value={filterPage}
                      onChange={(e) => setFilterPage(e.target.value)}
                      className="bg-slate-950 border border-white/[0.08] focus:border-blue-500/50 rounded-xl py-2 px-3 text-xs font-mono text-slate-300 focus:outline-none cursor-pointer uppercase"
                    >
                      <option value="all">ALL SECTIONS</option>
                      <option value="home">HOME</option>
                      <option value="about">ABOUT</option>
                      <option value="services">SERVICES</option>
                      <option value="pricing">PRICING</option>
                      <option value="projects">PROJECTS</option>
                      <option value="portfolio">GALLERY</option>
                      <option value="contact">CONTACT</option>
                    </select>
                  )}
                </div>
              )}

              {/* ========================================================
                  TAB: VISITORS LOG STREAM
                  ======================================================== */}
              {activeTab === 'visitors' && (
                <div className="space-y-4">
                  <div className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-white/[0.01]">
                    
                    {/* Desktop table logs */}
                    <table className="w-full text-left font-mono text-[9px] border-collapse hidden md:table">
                      <thead>
                        <tr className="border-b border-white/[0.06] text-slate-500 uppercase tracking-wider h-9 bg-slate-950/50">
                          <th className="py-2.5 px-4">TIMESTAMP (UTC)</th>
                          <th className="py-2.5 px-4">SECTION VIEW</th>
                          <th className="py-2.5 px-4">PLATFORM ENGINE</th>
                          <th className="py-2.5 px-4">OPERATING SYSTEM</th>
                          <th className="py-2.5 px-4">DEVICE TYPE</th>
                          <th className="py-2.5 px-4">LOCATION METRIC</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.04]">
                        {filteredLogs.map((log, index) => (
                          <tr key={log.id || index} className="hover:bg-white/[0.01] transition-colors h-11">
                            <td className="py-3 px-4 text-slate-400">
                              {log.visitTime ? new Date(log.visitTime).toISOString().replace('T', ' ').slice(0, 19) : 'Timestamp Error'}
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 font-extrabold uppercase text-[8px] tracking-wide">
                                {log.pageVisited || 'UNKNOWN'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-white font-bold">{log.browser || 'Fallback Core'}</td>
                            <td className="py-3 px-4 text-slate-300">{log.os || 'Unknown OS'}</td>
                            <td className="py-3 px-4 text-slate-400">
                              <span className="inline-flex items-center gap-1">
                                {log.deviceType && log.deviceType.toLowerCase().includes('mobile') ? <Smartphone size={10} /> : <Laptop size={10} />}
                                {log.deviceType || 'Desktop Device'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              {log.location ? (
                                <span className="text-emerald-400 font-bold flex items-center gap-1">
                                  <MapPin size={9} /> {log.location.city}, {log.location.country}
                                </span>
                              ) : (
                                <span className="text-slate-600 uppercase tracking-wider text-[8px]">DENIED/MOCK</span>
                              )}
                            </td>
                          </tr>
                        ))}
                        {filteredLogs.length === 0 && (
                          <tr>
                            <td colSpan={6} className="text-center py-10 text-slate-500 uppercase tracking-widest font-mono">
                              No visitors requests recorded
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    {/* Mobile responsive blocks */}
                    <div className="md:hidden divide-y divide-white/[0.05]">
                      {filteredLogs.map((log, index) => (
                        <div key={log.id || index} className="p-4 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[8px] text-slate-500">
                              {log.visitTime ? new Date(log.visitTime).toISOString().replace('T', ' ').slice(0, 19) : ''}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/25 text-blue-400 font-black uppercase text-[8px]">
                              {log.pageVisited}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[8.5px] font-mono">
                            <div>
                              <span className="text-slate-500 block text-[7px] uppercase">Engine</span>
                              <span className="text-white font-bold">{log.browser}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block text-[7px] uppercase">OS</span>
                              <span className="text-slate-300">{log.os}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block text-[7px] uppercase">Device</span>
                              <span className="text-slate-400">{log.deviceType}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block text-[7px] uppercase">Location</span>
                              <span className="text-emerald-400 font-bold">{log.location ? `${log.location.city}, ${log.location.country}` : 'MOCK'}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      {filteredLogs.length === 0 && (
                        <div className="p-8 text-center text-slate-500 uppercase tracking-widest font-mono text-[9px]">
                          No visitors requests recorded
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )}

              {/* ========================================================
                  TAB: MESSAGES ONLY (SIMPLE INQUIRIES WITH NO BUDGET)
                  ======================================================== */}
              {activeTab === 'messages' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {messageInquiries.map((inq, idx) => (
                    <div 
                      key={inq.id || idx}
                      className="border border-white/[0.06] bg-white/[0.01] rounded-2xl p-5 space-y-4 shadow-md hover:border-blue-500/25 transition-all relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="font-display font-black text-sm text-white uppercase flex items-center gap-2">
                            <User size={13} className="text-slate-400" />
                            {inq.name}
                          </h4>
                          <p className="font-mono text-[9px] text-slate-400 flex items-center gap-1.5">
                            <Mail size={10} />
                            <a href={`mailto:${inq.email}`} className="hover:underline hover:text-white select-all">{inq.email}</a>
                          </p>
                          {inq.phone && (
                            <p className="font-mono text-[9px] text-slate-400 flex items-center gap-1.5">
                              <Phone size={10} />
                              <a href={`tel:${inq.phone}`} className="hover:underline hover:text-white select-all">{inq.phone}</a>
                            </p>
                          )}
                        </div>
                        <span className="px-2.5 py-0.5 font-mono text-[7px] font-bold tracking-widest uppercase bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full">
                          MESSAGE ONLY
                        </span>
                      </div>

                      <div className="bg-slate-950 border border-white/5 p-3 rounded-xl">
                        <span className="font-mono text-[7px] text-slate-500 uppercase tracking-widest block">Inquiry Message</span>
                        <p className="font-sans text-xs text-slate-300 leading-relaxed font-light whitespace-pre-wrap mt-1">
                          {inq.message}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-white/[0.04] pt-3 font-mono text-[8px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {inq.createdAt ? new Date(inq.createdAt).toLocaleString() : 'Pending'}
                        </span>
                        <a
                          href={`mailto:${inq.email}?subject=Regarding Your Message&body=Hi ${inq.name},`}
                          className="text-blue-400 hover:text-white bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-lg uppercase font-bold tracking-widest"
                        >
                          Reply Email
                        </a>
                      </div>
                    </div>
                  ))}
                  {messageInquiries.length === 0 && (
                    <div className="col-span-2 text-center py-16 text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                      No customer messages logged
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================
                  TAB: PROJECT REQUESTS (STRUCTURED WORK PROPOSALS)
                  ======================================================== */}
              {activeTab === 'projects' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {projectInquiries.map((inq, idx) => (
                    <div 
                      key={inq.id || idx}
                      className="border border-white/[0.06] bg-white/[0.01] rounded-2xl p-5 space-y-4 shadow-md hover:border-blue-500/30 transition-all relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />

                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="font-display font-black text-sm text-white uppercase group-hover:text-blue-400 transition-colors flex items-center gap-2">
                            <User size={13} className="text-slate-400" />
                            {inq.name}
                          </h4>
                          <p className="font-mono text-[9px] text-slate-400 flex items-center gap-1.5">
                            <Mail size={10} />
                            <a href={`mailto:${inq.email}`} className="hover:underline hover:text-white select-all">{inq.email}</a>
                          </p>
                          {inq.phone && (
                            <p className="font-mono text-[9px] text-slate-400 flex items-center gap-1.5">
                              <Phone size={10} />
                              <a href={`tel:${inq.phone}`} className="hover:underline hover:text-white select-all">{inq.phone}</a>
                            </p>
                          )}
                        </div>
                        <div className="text-right flex flex-col items-end gap-1 shrink-0">
                          <span className="px-2.5 py-0.5 font-mono text-[7px] font-bold tracking-widest uppercase bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-full">
                            {inq.projectType}
                          </span>
                          <span className="font-display font-black text-[11px] text-purple-400 tracking-tight mt-1">
                            {inq.budget}
                          </span>
                        </div>
                      </div>

                      <div className="bg-slate-950 border border-white/5 p-3 rounded-xl">
                        <span className="font-mono text-[7px] text-slate-500 uppercase tracking-widest block">Project specifications</span>
                        <p className="font-sans text-xs text-slate-300 leading-relaxed font-light whitespace-pre-wrap mt-1">
                          {inq.message}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-white/[0.04] pt-3 font-mono text-[8px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {inq.createdAt ? new Date(inq.createdAt).toLocaleString() : 'Pending'}
                        </span>
                        <a
                          href={`mailto:${inq.email}?subject=Regarding your request for ${inq.projectType}&body=Hi ${inq.name},`}
                          className="text-blue-400 hover:text-white bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-lg uppercase font-bold tracking-widest flex items-center gap-1"
                        >
                          Connect Client <ChevronRight size={10} />
                        </a>
                      </div>
                    </div>
                  ))}
                  {projectInquiries.length === 0 && (
                    <div className="col-span-2 text-center py-16 text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                      No project request templates registered
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================
                  TAB: ANALYTICS (VISUAL CHARTS & Footprints)
                  ======================================================== */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  
                  {/* Bento grids stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                    <div className="bg-slate-950/70 border border-white/[0.06] rounded-2xl p-4 flex items-center justify-between shadow-xl">
                      <div className="space-y-1">
                        <span className="text-[8.5px] font-mono tracking-widest text-slate-400 uppercase block">TOTAL LOGS</span>
                        <span className="text-2xl font-black text-blue-400 tracking-tight block font-display">{totalVisits}</span>
                        <span className="text-[7.5px] font-mono text-emerald-400 uppercase tracking-wider block">FIRESTORE ACTIVE</span>
                      </div>
                      <Database size={24} className="text-blue-500/20" />
                    </div>

                    <div className="bg-slate-950/70 border border-white/[0.06] rounded-2xl p-4 flex items-center justify-between shadow-xl">
                      <div className="space-y-1">
                        <span className="text-[8.5px] font-mono tracking-widest text-slate-400 uppercase block">MOBILE DEVICES</span>
                        <span className="text-2xl font-black text-purple-400 tracking-tight block font-display">{getPercentage(mobileVisits, totalVisits)}</span>
                        <span className="text-[7.5px] font-mono text-slate-500 uppercase tracking-wider block">{mobileVisits} Mobile Nodes</span>
                      </div>
                      <Smartphone size={24} className="text-purple-500/20" />
                    </div>

                    <div className="bg-slate-950/70 border border-white/[0.06] rounded-2xl p-4 sm:col-span-1 lg:col-span-2 flex flex-col justify-between shadow-xl gap-2">
                      <span className="text-[8.5px] font-mono tracking-widest text-slate-400 uppercase block">TOP POPULAR VIEWS</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {Object.entries(pageStats).slice(0, 4).map(([page, count]) => (
                          <div key={page} className="bg-white/[0.01] border border-white/[0.04] rounded-xl p-2 text-center">
                            <span className="text-[8px] font-mono text-blue-400 tracking-wider block uppercase truncate">{page}</span>
                            <span className="text-xs font-black text-white mt-1 block">{count}</span>
                          </div>
                        ))}
                        {Object.keys(pageStats).length === 0 && (
                          <div className="col-span-4 text-center text-[9px] font-mono text-slate-500 uppercase">No Data Logs</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* OS & Browser footprint ratios */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-950/70 border border-white/[0.06] rounded-2xl p-5 shadow-xl">
                      <h3 className="text-[10px] font-mono tracking-widest text-blue-400 uppercase font-bold border-b border-white/5 pb-2.5 mb-4 flex items-center gap-2">
                        <Laptop size={12} /> OS DISTRIBUTION RATIOS
                      </h3>
                      <div className="space-y-3.5">
                        {Object.entries(osStats).map(([os, count]) => (
                          <div key={os} className="space-y-1">
                            <div className="flex justify-between text-[9px] font-mono uppercase text-slate-300">
                              <span>{os}</span>
                              <span className="font-bold text-white">{count} ({getPercentage(count, totalVisits)})</span>
                            </div>
                            <div className="w-full bg-slate-900 rounded-full h-1">
                              <div className="bg-blue-500 h-full rounded-full" style={{ width: getPercentage(count, totalVisits) }} />
                            </div>
                          </div>
                        ))}
                        {Object.keys(osStats).length === 0 && (
                          <div className="text-center text-[9px] font-mono text-slate-500 uppercase">No Operating System metrics logged</div>
                        )}
                      </div>
                    </div>

                    <div className="bg-slate-950/70 border border-white/[0.06] rounded-2xl p-5 shadow-xl">
                      <h3 className="text-[10px] font-mono tracking-widest text-purple-400 uppercase font-bold border-b border-white/5 pb-2.5 mb-4 flex items-center gap-2">
                        <Globe size={12} /> USER AGENT PLATFORMS
                      </h3>
                      <div className="space-y-3.5">
                        {Object.entries(browserStats).map(([br, count]) => (
                          <div key={br} className="space-y-1">
                            <div className="flex justify-between text-[9px] font-mono uppercase text-slate-300">
                              <span>{br}</span>
                              <span className="font-bold text-white">{count} ({getPercentage(count, totalVisits)})</span>
                            </div>
                            <div className="w-full bg-slate-900 rounded-full h-1">
                              <div className="bg-purple-500 h-full rounded-full" style={{ width: getPercentage(count, totalVisits) }} />
                            </div>
                          </div>
                        ))}
                        {Object.keys(browserStats).length === 0 && (
                          <div className="text-center text-[9px] font-mono text-slate-500 uppercase">No browser engine parameters logged</div>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* ========================================================
                  TAB: SETTINGS (CUSTOM CODES AND METRICS)
                  ======================================================== */}
              {activeTab === 'settings' && (
                <div className="max-w-2xl space-y-6">
                  
                  {/* General settings card */}
                  <div className="bg-slate-950/70 border border-white/[0.06] rounded-2xl p-6 space-y-4">
                    <h3 className="font-display font-black text-sm text-white uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck size={16} className="text-blue-400" />
                      Workspace Operations
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
                      Customize control-plane permissions, clear storage fallbacks, or review sync statuses of the Firestore database.
                    </p>

                    <div className="border-t border-white/5 pt-4 space-y-3 font-mono text-[10px] text-slate-300">
                      <div className="flex justify-between items-center py-1">
                        <span>AUTHORIZED SECURE USER:</span>
                        <span className="text-white font-bold">{AUTHORIZED_EMAIL}</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span>FIRESTORE INTEGRATION STATUS:</span>
                        <span className={isFirebaseConfigured ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                          {isFirebaseConfigured ? 'CONNECTED' : 'LOCAL BYPASS ONLY'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Reset card option */}
                  <div className="bg-slate-950/70 border border-white/[0.06] rounded-2xl p-6 space-y-4">
                    <h3 className="font-display font-black text-sm text-red-400 uppercase tracking-wider flex items-center gap-2">
                      <AlertTriangle size={16} className="text-red-500" />
                      Danger Zone
                    </h3>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed font-light">
                      Performing these actions is irreversible and will delete stored metrics.
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          if (window.confirm('Clear all stored visitor logs and inquiries from local memory fallback?')) {
                            localStorage.removeItem('sk_visitor_logs');
                            localStorage.removeItem('sk_inquiries');
                            setLogs([]);
                            setInquiries([]);
                            alert('Stored elements successfully wiped.');
                          }
                        }}
                        className="px-5 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-mono text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer"
                      >
                        Wipe Local Fallback Cache
                      </button>
                    </div>
                  </div>

                </div>
              )}

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
