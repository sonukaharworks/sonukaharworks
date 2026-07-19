import React from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquare, Quote, Sparkles } from 'lucide-react';

interface TestimonialsViewProps {
  theme: 'dark' | 'light';
}

export default function TestimonialsView({ theme }: TestimonialsViewProps) {
  const isDark = theme === 'dark';

  const reviews = [
    {
      name: 'Anjali Sharma',
      role: 'Founder',
      company: 'IndieVibe Organics',
      text: 'Sonu built an exceptional Android companion app with high-performance biometric logins and real-time Firestore synchronization. The UX is smooth as silk, and the local SQLite caching ensures offline stability.',
      project: 'Android Mobile Suite',
      rating: 5,
      metrics: '40% App Engagement Increase'
    },
    {
      name: 'Rohan Mehta',
      role: 'CTO',
      company: 'Zenith Tech Labs',
      text: 'The premium dark-themed portfolio and client data dashboard Sonu engineered for our operations is a work of art. Lighthouse scores are at a solid 99% with blazing-fast page transitions.',
      project: 'React Operations Hub',
      rating: 5,
      metrics: '99% Lighthouse Score'
    },
    {
      name: 'Emily Davis',
      role: 'Product Director',
      company: 'Veloce Logistics',
      text: 'Working with Sonu on our internal bulk invoicing system was seamless. Outstanding attention to detail, modular TypeScript codes, and zero redundant state re-renders.',
      project: 'Custom CRM Node',
      rating: 5,
      metrics: '3x Faster Invoicing Cycle'
    },
    {
      name: 'Vikram Malhotra',
      role: 'Managing Director',
      company: 'Apex Trading Corp',
      text: 'The restaurant table layout editor Sonu designed has completely transformed our daily kitchen operations. Outstanding responsiveness across both desktop and mobile layouts.',
      project: 'KDS Table Relays',
      rating: 5,
      metrics: 'Sub-5ms orders relay time'
    }
  ];

  return (
    <div className="space-y-16 pb-20 select-none text-left">
      {/* Testimonials Header */}
      <section className="space-y-6 max-w-3xl relative">
        <div className={`absolute -top-12 -left-6 w-32 h-32 ${isDark ? 'bg-blue-500/5' : 'bg-blue-500/10'} rounded-full blur-2xl pointer-events-none`} />
        <span className={`font-mono text-xs ${isDark ? 'text-blue-400' : 'text-blue-600'} font-extrabold tracking-[0.4em] uppercase block`}>
          // REAL CLIENT REVIEWS
        </span>
        <h1 className={`font-display text-3xl sm:text-5xl font-black tracking-tight uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
          REVIEWS & TESTIMONIALS
        </h1>
        <div className={`h-[2px] w-16 bg-gradient-to-r ${isDark ? 'from-blue-500 to-purple-500' : 'from-blue-600 to-indigo-600'} mt-4 rounded-full`} />
        <p className={`font-sans ${isDark ? 'text-slate-400' : 'text-slate-650'} text-xs sm:text-sm leading-relaxed pt-2`}>
          Verified reviews from real clients highlighting the visual execution, modern code conventions, and rapid performance of our custom software solutions.
        </p>
      </section>

      {/* Grid Layout of Glass Reviews */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((rev, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative p-6 sm:p-8 rounded-2xl border flex flex-col justify-between transition-all duration-300 ${
              isDark 
                ? 'bg-white/[0.01] border-white/[0.06] hover:border-blue-500/30 hover:bg-white/[0.02] shadow-[0_12px_40px_rgba(0,0,0,0.5)]'
                : 'bg-white border-slate-200 hover:border-blue-500/40 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] shadow-sm'
            }`}
          >
            {/* Ambient Background Circle */}
            <div className={`absolute top-0 right-0 w-24 h-24 ${isDark ? 'bg-gradient-to-br from-blue-500/5 to-purple-500/5' : 'bg-gradient-to-br from-blue-500/5 to-indigo-500/5'} rounded-full pointer-events-none`} />

            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className={`font-display text-base font-black uppercase tracking-wide ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {rev.name}
                  </h3>
                  <p className={`text-[10px] font-mono tracking-wider font-semibold uppercase ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    {rev.role} &middot; <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>{rev.company}</span>
                  </p>
                </div>
                <Quote size={24} className={isDark ? 'text-white/[0.05]' : 'text-slate-100'} />
              </div>

              {/* Rating stars */}
              <div className="flex items-center gap-1">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className={`font-sans text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                "{rev.text}"
              </p>
            </div>

            {/* Verification label footer */}
            <div className={`flex items-center justify-between border-t mt-6 pt-4 text-[9px] font-mono uppercase font-bold ${
              isDark ? 'border-white/[0.05] text-slate-500' : 'border-slate-100 text-slate-550'
            }`}>
              <div className="flex items-center gap-1.5">
                <Sparkles size={10} className={isDark ? 'text-purple-400' : 'text-purple-600'} />
                <span>PROJECT: {rev.project}</span>
              </div>
              <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>{rev.metrics}</span>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
