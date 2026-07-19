import React from 'react';
import { motion } from 'motion/react';
import { Star, Shield, Activity, Sparkles, CheckCircle2 } from 'lucide-react';

interface PricingViewProps {
  theme: 'dark' | 'light';
  onSelectPackage: (name: string, price: string) => void;
}

export default function PricingView({ theme, onSelectPackage }: PricingViewProps) {
  const isDark = theme === 'dark';

  const pricingPackages = [
    {
      name: 'Starter Website',
      price: '₹1,499',
      badge: 'Starter Tier',
      features: [
        'Responsive Design Layout',
        'Optimized Page Weights',
        'Secure Static Contact Form',
        'Basic On-Page SEO Routing'
      ],
      btnText: 'GET STARTED',
      recommended: false
    },
    {
      name: 'Business Website',
      price: '₹2,999',
      badge: 'Pro Tier',
      features: [
        'Luxury Visual Custom UI',
        'Multi-Page Static Layouts',
        'Complete Assets Optimized',
        'Contact Form with Relay Logs',
        'Blazing Fast Performance'
      ],
      btnText: 'ORDER NOW',
      recommended: false
    },
    {
      name: 'Basic Android App',
      badge: 'Mobile Core',
      price: '₹3,999',
      features: [
        'Modern Native XML/Compose UI',
        'Secure Firebase Auth Sync',
        'Full APK Compilation Bundle',
        'Responsive Phone Screens'
      ],
      btnText: 'BUILD MY APP',
      recommended: false
    },
    {
      name: 'Premium App Suite',
      price: '₹6,999',
      badge: 'Most Popular',
      features: [
        'Resilient Custom Design',
        'Cloud Database (Firestore)',
        'Local SQLite (Room) Caching',
        'Owner Workspace Integration',
        'AES-256 Storage Keystores',
        'Performance Audited Runs'
      ],
      btnText: 'START PROJECT',
      recommended: true // ⭐ RECOMMENDED
    },
    {
      name: 'Bespoke Custom Project',
      price: 'Contact Me',
      badge: 'Enterprise Scoping',
      features: [
        'Bespoke Cloud Networks',
        'Secure Administrative Portals',
        'High-capacity CRM Systems',
        'Automatic Telegram/Mail Logs',
        'Direct Priority Support Line'
      ],
      btnText: 'CONTACT NOW',
      recommended: false
    }
  ];

  return (
    <div className="space-y-16 pb-20 select-none text-left">
      {/* Pricing Header */}
      <section className="space-y-6 max-w-3xl relative">
        <div className={`absolute -top-12 -left-6 w-32 h-32 ${isDark ? 'bg-indigo-500/5' : 'bg-indigo-500/10'} rounded-full blur-2xl pointer-events-none`} />
        <span className={`font-mono text-xs ${isDark ? 'text-indigo-400' : 'text-indigo-600'} font-extrabold tracking-[0.4em] uppercase block`}>
          // SYSTEM INVESTMENT BLUEPRINTS
        </span>
        <h1 className={`font-display text-3xl sm:text-5xl font-black tracking-tight uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
          TRANSPARENT TIER PRICING
        </h1>
        <div className={`h-[2px] w-16 bg-gradient-to-r ${isDark ? 'from-indigo-500 to-blue-500' : 'from-indigo-600 to-blue-600'} mt-4 rounded-full`} />
        <p className={`font-sans ${isDark ? 'text-slate-400' : 'text-slate-650'} text-xs sm:text-sm leading-relaxed pt-2`}>
          No hidden fees or unexpected configurations. Select a specialized pre-compiled blueprint tier below to instantly prepare inquiry details.
        </p>
      </section>

      {/* Pricing Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {pricingPackages.map((pkg, index) => (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={`relative overflow-hidden rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 ${
              isDark 
                ? 'bg-white/[0.01] border-white/[0.06] hover:border-indigo-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.6)]'
                : 'bg-white border-slate-200 hover:border-indigo-500/40 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] shadow-sm'
            } ${
              pkg.recommended && isDark ? 'border-indigo-500/35 bg-gradient-to-b from-indigo-950/10 to-purple-950/5' : ''
            } ${
              pkg.recommended && !isDark ? 'border-indigo-400 bg-indigo-50/20' : ''
            }`}
          >
            {/* Soft Ambient Background Light */}
            <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-blue-600/5 to-purple-600/5' : 'from-blue-600/[0.02] to-indigo-600/[0.02]'} pointer-events-none`} />

            {/* Title & Badge */}
            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between min-h-[22px]">
                {pkg.recommended ? (
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[8px] font-black tracking-wider ${
                    isDark ? 'bg-indigo-500/25 border border-indigo-500/30 text-indigo-300' : 'bg-indigo-600 text-white'
                  }`}>
                    ⭐ RECOMMENDED
                  </span>
                ) : (
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-widest ${
                    isDark ? 'bg-white/5 border border-white/10 text-slate-400' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {pkg.badge}
                  </span>
                )}
              </div>

              <h3 className={`font-display text-sm font-black uppercase tracking-wide ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {pkg.name}
              </h3>

              <div className="pt-2">
                <span className={`font-display text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {pkg.price}
                </span>
              </div>
            </div>

            {/* Features list */}
            <ul className={`relative z-10 space-y-2.5 text-left text-[11.5px] font-sans font-light py-5 border-t border-b my-4 flex-grow ${
              isDark ? 'border-white/[0.04] text-slate-350' : 'border-slate-100 text-slate-600'
            }`}>
              {pkg.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <CheckCircle2 size={11} className={`shrink-0 mt-1 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            {/* Click to open details */}
            <div className="relative z-10 pt-2">
              <button
                onClick={() => onSelectPackage(pkg.name, pkg.price)}
                className={`w-full py-3 rounded-xl font-mono text-[9px] font-black tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  pkg.recommended
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] border border-indigo-500/30'
                    : isDark 
                      ? 'bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 hover:bg-indigo-500/10 text-slate-300 hover:text-white'
                      : 'bg-slate-100 border border-slate-200/50 hover:border-indigo-500/40 hover:bg-indigo-50 text-slate-700 hover:text-indigo-900'
                }`}
              >
                {pkg.btnText}
              </button>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
