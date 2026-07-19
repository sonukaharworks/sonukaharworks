import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

interface FAQViewProps {
  theme: 'dark' | 'light';
}

export default function FAQView({ theme }: FAQViewProps) {
  const isDark = theme === 'dark';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Do you deliver complete source code and assets?',
      answer: 'Yes. All client deliverables include fully documented, clean, type-safe source code structured nicely in a private GitHub repository. You receive 100% full intellectual and commercial property rights upon final delivery.'
    },
    {
      question: 'Which framework structures do you specialize in?',
      answer: 'For mobile architectures, I specialize in native Android development utilizing Kotlin, Coroutines, and Jetpack Compose. For web systems, I specialize in React, Next.js, and Tailwind CSS. All backends utilize Node.js, Express, and Firebase.'
    },
    {
      question: 'How do we monitor active project progress?',
      answer: 'I establish clear, modular milestones. Clients are provided with access to live preview URLs and continuous staging deployments so you can audit, test, and approve features in real time as they are developed.'
    },
    {
      question: 'Are there any hidden costs or cloud setup fees?',
      answer: 'No. All services are quoted upfront. Any external hosting or third-party API licenses required for your custom system are detailed directly during our initial system scoping audit phase.'
    },
    {
      question: 'Do you configure production Play Store releases?',
      answer: 'Yes. I engineer production-ready AAB (Android App Bundle) packages, sign them with secure release certificates inside the Android Keystore, and provide complete assistance during Google Play Store submissions.'
    },
    {
      question: 'How do you guarantee security in your solutions?',
      answer: 'I configure secure Google Authentication, enforce proper data validation filters, and deploy rigid database security rules (like Firestore rules) to ensure your app and user data remains completely secure.'
    }
  ];

  return (
    <div className="space-y-16 pb-20 select-none text-left">
      {/* FAQ Header */}
      <section className="space-y-6 max-w-3xl relative">
        <div className={`absolute -top-12 -left-6 w-32 h-32 ${isDark ? 'bg-cyan-500/5' : 'bg-cyan-500/10'} rounded-full blur-2xl pointer-events-none`} />
        <span className={`font-mono text-xs ${isDark ? 'text-cyan-400' : 'text-cyan-600'} font-extrabold tracking-[0.4em] uppercase block`}>
          // FAQS
        </span>
        <h1 className={`font-display text-3xl sm:text-5xl font-black tracking-tight uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
          FREQUENTLY ASKED QUESTIONS
        </h1>
        <div className={`h-[2px] w-16 bg-gradient-to-r ${isDark ? 'from-cyan-500 to-blue-500' : 'from-cyan-600 to-blue-600'} mt-4 rounded-full`} />
        <p className={`font-sans ${isDark ? 'text-slate-400' : 'text-slate-650'} text-xs sm:text-sm leading-relaxed pt-2`}>
          Clear, concise answers addressing standard source-code distribution policies, active tech integrations, design conventions, and deployment timelines.
        </p>
      </section>

      {/* Accordion List */}
      <section className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isDark 
                  ? 'bg-white/[0.01] border-white/[0.06] hover:border-cyan-500/30'
                  : 'bg-white border-slate-200 hover:border-cyan-500/40 shadow-sm'
              }`}
            >
              {/* Question Trigger */}
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-4.5 pr-4">
                  <HelpCircle size={16} className={isOpen ? (isDark ? 'text-cyan-400' : 'text-cyan-600') : 'text-slate-400'} />
                  <span className={`font-display text-xs sm:text-sm font-black uppercase tracking-wide leading-snug ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {faq.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0"
                >
                  <ChevronDown size={16} className="text-slate-400" />
                </motion.div>
              </button>

              {/* Collapsible Answer */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className={`px-6 pb-6 pt-1 font-sans text-xs leading-relaxed ${
                      isDark ? 'text-slate-300 border-t border-white/[0.04]' : 'text-slate-650 border-t border-slate-100'
                    }`}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </section>
    </div>
  );
}
