import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Send, IndianRupee, MessageSquare, User, Mail, Phone, Calendar } from 'lucide-react';
import { inquiryService } from '../services/inquiry';

interface HireViewProps {
  theme?: 'dark' | 'light';
}

export default function HireView({ theme }: HireViewProps) {
  const isDark = theme !== 'light';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Business Website (₹5,999)',
    budget: '₹5,999 - ₹9,999',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Prefill project type or budget if set by services or pricing cards in local storage
  useEffect(() => {
    try {
      const selectedType = localStorage.getItem('sk_selected_project_type');
      if (selectedType) {
        setFormData(prev => ({ ...prev, projectType: selectedType }));
        localStorage.removeItem('sk_selected_project_type');
      }
    } catch (e) {}
  }, []);

  const projectTypes = [
    'Website Basic (₹2,999)',
    'Business Website (₹5,999)',
    'Premium Website (₹9,999)',
    'Android App (₹6,999)',
    'Premium Android App (₹14,999)',
    'UI/UX Design & Branding',
    'Landing Page Ecosystem',
    'Custom Project / Enterprise'
  ];

  const budgetRanges = [
    '₹2,999 - ₹5,000',
    '₹5,000 - ₹10,000',
    '₹10,000 - ₹20,000',
    '₹20,000 - ₹50,000',
    '₹50,000+ (Custom Enterprise)'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please populate all required fields (*)');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const success = await inquiryService.createInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        projectType: formData.projectType,
        budget: formData.budget,
        message: formData.message
      });

      if (success) {
        window.location.hash = '#/thank-you';
      } else {
        setErrorMsg('Failed to log transmission. Please retry.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'A transmission error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 max-w-4xl mx-auto relative select-none text-left">
      {/* Background ambient light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full ambient-glow-blue opacity-20 pointer-events-none blur-3xl z-0" />

      {/* Header */}
      <section className="space-y-4 text-center relative z-10 max-w-2xl mx-auto">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${
          isDark 
            ? 'bg-white/[0.02] border-white/10 text-slate-400' 
            : 'bg-slate-100 border-slate-200 text-slate-600'
        }`}>
          <Sparkles size={11} className="text-blue-500" />
          <span className="font-mono text-[9px] font-bold tracking-widest uppercase">Project Proposal Suite</span>
        </div>

        <h1 className={`font-display text-3xl sm:text-5xl font-bold tracking-tight uppercase ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Hire Sonu Kahar
        </h1>
        <p className={`font-sans text-xs sm:text-sm leading-relaxed font-light ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Establish premium collaboration. Provide your digital specifications and budget below to submit your project directly into my control queue.
        </p>
      </section>

      {/* Main Interactive Form Card */}
      <section className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`rounded-3xl border p-6 sm:p-10 relative overflow-hidden shadow-xl ${
            isDark 
              ? 'bg-[#161920]/60 border-white/[0.06] shadow-[0_24px_50px_rgba(0,0,0,0.3)]' 
              : 'bg-white border-slate-200 shadow-[0_24px_40px_rgba(15,23,42,0.04)]'
          }`}
        >
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-mono text-red-400 uppercase">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className={`font-mono text-[9px] tracking-widest uppercase font-bold flex items-center gap-1.5 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <User size={10} className="text-blue-500" />
                  Your Name *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter full name" 
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full border rounded-xl py-3 px-4 text-xs font-sans focus:outline-none transition-all ${
                    isDark 
                      ? 'bg-slate-950/80 border-white/10 text-white focus:border-blue-500/50' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-600'
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label className={`font-mono text-[9px] tracking-widest uppercase font-bold flex items-center gap-1.5 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <Mail size={10} className="text-blue-500" />
                  Business Email *
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="example@domain.com" 
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`w-full border rounded-xl py-3 px-4 text-xs font-sans focus:outline-none transition-all ${
                    isDark 
                      ? 'bg-slate-950/80 border-white/10 text-white focus:border-blue-500/50' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-600'
                  }`}
                />
              </div>
            </div>

            {/* Row 2: Phone/WhatsApp and Project Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className={`font-mono text-[9px] tracking-widest uppercase font-bold flex items-center gap-1.5 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <Phone size={10} className="text-blue-500" />
                  WhatsApp / Contact Phone
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. +91 98765 43210" 
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className={`w-full border rounded-xl py-3 px-4 text-xs font-sans focus:outline-none transition-all ${
                    isDark 
                      ? 'bg-slate-950/80 border-white/10 text-white focus:border-blue-500/50' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-600'
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label className={`font-mono text-[9px] tracking-widest uppercase font-bold flex items-center gap-1.5 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <Calendar size={10} className="text-blue-500" />
                  Project Specification
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectType: e.target.value }))}
                  className={`w-full border rounded-xl py-3 px-4 text-xs font-mono focus:outline-none transition-all cursor-pointer ${
                    isDark 
                      ? 'bg-slate-950 border-white/10 text-slate-300 focus:border-blue-500/50' 
                      : 'bg-slate-50 border-slate-200 text-slate-700 focus:border-blue-600'
                  }`}
                >
                  {projectTypes.map((type) => (
                    <option key={type} value={type} className={isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-950'}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Estimated Budget */}
            <div className="space-y-1.5">
              <label className={`font-mono text-[9px] tracking-widest uppercase font-bold flex items-center gap-1.5 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                <IndianRupee size={10} className="text-blue-500" />
                Target Budget Scale
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {budgetRanges.map((range) => {
                  const isSelected = formData.budget === range;
                  return (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, budget: range }))}
                      className={`py-3 px-1 rounded-xl text-[10px] font-mono font-bold tracking-tight uppercase border transition-all text-center cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                          : isDark
                            ? 'bg-slate-950/60 border-white/5 text-slate-400 hover:text-white hover:bg-white/5'
                            : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-200'
                      }`}
                    >
                      {range.split(' ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 4: Project Requirements */}
            <div className="space-y-1.5">
              <label className={`font-mono text-[9px] tracking-widest uppercase font-bold flex items-center gap-1.5 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                <MessageSquare size={10} className="text-blue-500" />
                Project Description & Requirements *
              </label>
              <textarea 
                rows={4}
                required
                placeholder="Detail your requirements, core features, timeline expectations, and business goals..."
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className={`w-full border rounded-xl p-4 font-sans text-xs focus:outline-none transition-all resize-none ${
                  isDark 
                    ? 'bg-slate-950/80 border-white/10 text-white focus:border-blue-500/50' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-600'
                }`}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-mono text-[10px] tracking-widest uppercase font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-blue-500/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full" />
                  TRANSMITTING PROPOSAL...
                </>
              ) : (
                <>
                  <Send size={13} />
                  SUBMIT FORM TO CONTROL QUEUE
                </>
              )}
            </button>
          </form>
        </motion.div>
      </section>

      {/* Secure Infrastructure Footnote */}
      <section className={`border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 text-left ${
        isDark ? 'bg-slate-950/60 border-white/5' : 'bg-slate-100 border-slate-200'
      }`}>
        <Sparkles className="text-blue-500 shrink-0" size={18} />
        <p className={`font-sans text-xs font-light leading-normal ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          Need instant project advice? You can also direct dial or reach out via WhatsApp at the buttons located on the Contact directory page.
        </p>
      </section>
    </div>
  );
}
