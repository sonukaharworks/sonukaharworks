import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, IndianRupee, Briefcase, MessageSquare, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { inquiryService } from '../services/inquiry';

interface ContactViewProps {
  theme?: 'dark' | 'light';
}

export default function ContactView({ theme }: ContactViewProps) {
  const isDark = theme !== 'light';
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Premium App',
    budget: '₹6,999',
    message: ''
  });

  // Load pre-selected product specifications if redirected from services/pricing
  React.useEffect(() => {
    try {
      const savedType = localStorage.getItem('sk_selected_project_type');
      const savedBudget = localStorage.getItem('sk_selected_project_budget');
      if (savedType) {
        setForm(prev => ({
          ...prev,
          projectType: savedType,
          budget: savedBudget || prev.budget
        }));
        // Clean up immediately so subsequent normal navigations are fresh
        localStorage.removeItem('sk_selected_project_type');
        localStorage.removeItem('sk_selected_project_budget');
      }
    } catch (e) {
      console.warn('LocalStorage blocked:', e);
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const projectTypes = [
    { value: 'Starter Website', label: 'Starter Website (₹1,499)', defaultBudget: '₹1,499' },
    { value: 'Business Website', label: 'Business Website (₹2,999)', defaultBudget: '₹2,999' },
    { value: 'Android App', label: 'Android App (Basic) (₹3,999)', defaultBudget: '₹3,999' },
    { value: 'Premium App', label: 'Premium App (₹6,999)', defaultBudget: '₹6,999' },
    { value: 'Custom Project', label: 'Custom Project', defaultBudget: 'Custom Budget' }
  ];

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    const matched = projectTypes.find(t => t.value === selected);
    setForm(prev => ({
      ...prev,
      projectType: selected,
      budget: matched ? matched.defaultBudget : 'Custom Budget'
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await inquiryService.createInquiry({
        name: form.name,
        email: form.email,
        phone: form.phone,
        projectType: form.projectType,
        budget: form.budget,
        message: form.message
      });

      if (result) {
        setSuccess(true);
        setForm({
          name: '',
          email: '',
          phone: '',
          projectType: 'Premium App',
          budget: '₹6,999',
          message: ''
        });
      } else {
        setError('Failed to transmit request. Please try again.');
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected transmission error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 select-none relative text-left space-y-12">
      
      {/* Background Soft Ambient Light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-purple-600/10 blur-[90px] pointer-events-none z-0" />

      {/* Header Description */}
      <section className="space-y-4 max-w-2xl relative z-10 text-left">
        <span className={`font-mono text-xs ${isDark ? 'text-blue-400' : 'text-blue-600'} font-extrabold tracking-[0.3em] uppercase block`}>
          ⚡ GET IN TOUCH
        </span>
        <h1 className={`font-display text-3xl sm:text-4xl font-black tracking-tight uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Request a Project
        </h1>
        <div className="h-[2px] w-16 bg-gradient-to-r from-blue-500 to-purple-500 mt-4 rounded-full" />
        <p className={`font-sans ${isDark ? 'text-slate-400' : 'text-slate-600'} text-xs sm:text-sm leading-relaxed pt-2`}>
          Have an idea or a specific business requirement? Submit your details directly to Sonu Kahar below.
        </p>
      </section>

      {/* Main Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-start">
        
        {/* Left Side: Professional Summary Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className={`rounded-2xl border p-6 space-y-5 ${
            isDark ? 'border-white/[0.06] bg-white/[0.01] backdrop-blur-[16px]' : 'bg-white border-slate-200'
          }`}>
            <h3 className={`font-display font-black text-xs uppercase tracking-widest flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-slate-800'
            }`}>
              <Sparkles size={14} className={`${isDark ? 'text-blue-400' : 'text-blue-600'} animate-pulse`} />
              Direct Communication
            </h3>
            <p className={`text-[11.5px] leading-relaxed font-sans font-light ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Submit your inquiry below. I will analyze your requirements and get back to you with a personalized proposal as soon as possible.
            </p>
            
            <div className="space-y-4 pt-3 font-mono text-[10px]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                  <Phone size={13} />
                </div>
                <div>
                  <span className="text-slate-500 block text-[8px] uppercase">WhatsApp Chat</span>
                  <a href="https://wa.me/918733979407" target="_blank" rel="noopener noreferrer" className={`hover:text-emerald-500 transition-colors uppercase font-bold ${
                    isDark ? 'text-white' : 'text-slate-800'
                  }`}>
                    Direct WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 shrink-0">
                  <IndianRupee size={13} />
                </div>
                <div>
                  <span className="text-slate-500 block text-[8px] uppercase">Transparent Pricing</span>
                  <span className={`uppercase font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Starts from ₹1,499/-</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`rounded-2xl border p-6 space-y-3.5 ${
            isDark ? 'border-white/[0.05] bg-gradient-to-br from-blue-500/5 to-purple-500/5' : 'bg-white border-slate-200'
          }`}>
            <h4 className={`font-display font-black text-[10px] tracking-wider uppercase ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
              ✨ The Luxury Standard
            </h4>
            <p className={`text-[10.5px] leading-relaxed font-sans font-light ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              All website and app frameworks are fully customized, featuring lightning-fast animations, secure databases, modern UI, and responsive performance.
            </p>
          </div>
        </div>

        {/* Right Side: Glassmorphism Inquiry Form */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`rounded-3xl border p-8 text-center space-y-6 shadow-xl ${
                  isDark ? 'border-blue-500/30 bg-white/[0.02] backdrop-blur-[24px]' : 'bg-white border-slate-200'
                }`}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-500">
                  <CheckCircle2 size={32} className="animate-bounce" />
                </div>
                
                <div className="space-y-2 text-center">
                  <h3 className={`font-display font-black text-lg uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    MESSAGE SENT SUCCESSFULLY
                  </h3>
                  <p className={`text-xs max-w-sm mx-auto leading-relaxed font-sans ${isDark ? 'text-slate-400' : 'text-slate-650'}`}>
                    Your inquiry has been sent successfully. I will analyze your requirements and reach out to you as soon as possible.
                  </p>
                </div>

                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2.5 rounded-full text-[9px] font-mono font-black tracking-widest uppercase bg-blue-600 text-white hover:bg-blue-500 transition-all cursor-pointer border border-blue-400/25"
                >
                  NEW REQUEST
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className={`rounded-3xl border p-6 sm:p-8 space-y-5 shadow-xl ${
                  isDark ? 'border-white/[0.06] bg-white/[0.02] backdrop-blur-[24px]' : 'bg-white border-slate-200'
                }`}
              >
                
                {/* Error Box */}
                {error && (
                  <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-[10px] font-mono text-red-500 uppercase leading-relaxed">
                    <AlertCircle size={14} className="shrink-0 mt-0.5 text-red-500" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Form Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1.5 text-left">
                    <label className={`font-mono text-[8.5px] font-bold uppercase tracking-widest block ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      Name <span className="text-blue-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={form.name}
                        onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                        className={`w-full border rounded-xl py-3 px-4 text-xs font-sans tracking-wide focus:outline-none transition-all ${
                          isDark 
                            ? 'bg-slate-950 border-white/[0.08] focus:border-blue-500/50 text-white placeholder:text-slate-600' 
                            : 'bg-slate-50 border-slate-200 focus:border-blue-500/50 text-slate-900 placeholder:text-slate-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5 text-left">
                    <label className={`font-mono text-[8.5px] font-bold uppercase tracking-widest block ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      Email Address <span className="text-blue-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                        className={`w-full border rounded-xl py-3 px-4 text-xs font-sans tracking-wide focus:outline-none transition-all ${
                          isDark 
                            ? 'bg-slate-950 border-white/[0.08] focus:border-blue-500/50 text-white placeholder:text-slate-600' 
                            : 'bg-slate-50 border-slate-200 focus:border-blue-500/50 text-slate-900 placeholder:text-slate-400'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone (Optional) */}
                  <div className="space-y-1.5 text-left">
                    <label className={`font-mono text-[8.5px] font-bold uppercase tracking-widest block ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="+91 98765-43210"
                        value={form.phone}
                        onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                        className={`w-full border rounded-xl py-3 px-4 text-xs font-sans tracking-wide focus:outline-none transition-all ${
                          isDark 
                            ? 'bg-slate-950 border-white/[0.08] focus:border-blue-500/50 text-white placeholder:text-slate-600' 
                            : 'bg-slate-50 border-slate-200 focus:border-blue-500/50 text-slate-900 placeholder:text-slate-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Project Type selector */}
                  <div className="space-y-1.5 text-left">
                    <label className={`font-mono text-[8.5px] font-bold uppercase tracking-widest block ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      Project Type
                    </label>
                    <div className="relative">
                      <select
                        value={form.projectType}
                        onChange={handleTypeChange}
                        className={`w-full border rounded-xl py-3 px-4 text-xs font-sans tracking-wide focus:outline-none transition-all cursor-pointer appearance-none ${
                          isDark 
                            ? 'bg-slate-950 border-white/[0.08] focus:border-blue-500/50 text-white' 
                            : 'bg-slate-50 border-slate-200 focus:border-blue-500/50 text-slate-900'
                        }`}
                      >
                        {projectTypes.map(type => (
                          <option key={type.value} value={type.value} className={isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                        <Briefcase size={12} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Budget input field */}
                <div className="space-y-1.5 text-left">
                  <label className={`font-mono text-[8.5px] font-bold uppercase tracking-widest block ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    Estimated Budget
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. ₹6,999"
                      value={form.budget}
                      onChange={(e) => setForm(prev => ({ ...prev, budget: e.target.value }))}
                      className={`w-full border rounded-xl py-3 px-4 text-xs font-sans tracking-wide focus:outline-none transition-all ${
                        isDark 
                          ? 'bg-slate-950 border-white/[0.08] focus:border-blue-500/50 text-white placeholder:text-slate-600' 
                          : 'bg-slate-50 border-slate-200 focus:border-blue-500/50 text-slate-900 placeholder:text-slate-400'
                      }`}
                    />
                  </div>
                </div>

                {/* Message text area */}
                <div className="space-y-1.5 text-left">
                  <label className={`font-mono text-[8.5px] font-bold uppercase tracking-widest block ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    Project Message / Description <span className="text-blue-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      rows={4}
                      required
                      placeholder="Outline your app or website specifications..."
                      value={form.message}
                      onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                      className={`w-full border rounded-xl py-3 px-4 text-xs font-sans tracking-wide focus:outline-none transition-all resize-none ${
                        isDark 
                          ? 'bg-slate-950 border-white/[0.08] focus:border-blue-500/50 text-white placeholder:text-slate-600' 
                          : 'bg-slate-50 border-slate-200 focus:border-blue-500/50 text-slate-900 placeholder:text-slate-400'
                      }`}
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full relative py-3.5 sm:py-4 rounded-xl text-[10px] font-mono font-black tracking-[0.2em] uppercase text-white overflow-hidden transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] disabled:opacity-50 cursor-pointer border border-purple-500/20 hover:border-purple-450 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        SENDING MESSAGE...
                      </span>
                    ) : (
                      <>
                        <Send size={12} className="text-white" />
                        SEND MESSAGE
                      </>
                    )}
                  </button>
                </div>

              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
