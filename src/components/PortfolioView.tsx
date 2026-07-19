import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, ArrowUpRight, Sparkles, X } from 'lucide-react';
import { PROJECTS } from '../data';

export default function PortfolioView() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'Android' | 'Web' | 'Security' | 'UI/UX'>('all');
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const filteredItems = activeCategory === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(item => item.category === activeCategory);

  return (
    <div className="space-y-36 pb-20 select-none text-left">
      {/* Portfolio Header */}
      <section className="space-y-6 max-w-3xl relative">
        <div className="absolute -top-12 -left-6 w-32 h-32 bg-cyber-pink/5 rounded-full blur-2xl pointer-events-none" />
        <span className="font-display text-xs text-cyber-cyan font-extrabold tracking-[0.4em] uppercase block">// SECURITY EVIDENCE MATRIX</span>
        <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight uppercase text-white">
          VISUAL GALLERY
        </h1>
        <div className="h-[2px] w-16 bg-gradient-to-r from-cyber-cyan to-cyber-pink mt-4 rounded-full" />
        <p className="font-sans text-slate-400 text-sm sm:text-base leading-relaxed pt-2">
          An interactive, decrypted repository showcasing modular visual layout components, mockups, and live operational captures.
        </p>
      </section>

      {/* Dynamic Filters & Grid */}
      <section className="space-y-12">
        <div className="flex justify-start sm:justify-center border-b border-cyber-cyan/10 pb-4 overflow-x-auto">
          <div className="flex gap-4 font-mono text-[9px] font-black tracking-widest uppercase">
            {[
              { id: 'all', label: 'ALL DECRYPTS' },
              { id: 'Web', label: 'WEB FRONTENDS' },
              { id: 'Android', label: 'ANDROID CORES' },
              { id: 'Security', label: 'SECURITY CORES' },
              { id: 'UI/UX', label: 'UI/UX SCHEMAS' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`pb-2.5 px-3 transition-all cursor-pointer relative ${
                  activeCategory === cat.id 
                    ? 'text-cyber-cyan font-extrabold' 
                    : 'text-slate-500 hover:text-slate-350'
                }`}
              >
                {cat.label}
                {activeCategory === cat.id && (
                  <motion.div 
                    layoutId="portfolioActiveBorder"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink rounded-full shadow-[0_0_8px_#00f0ff]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="group relative overflow-hidden rounded-xl bg-slate-950 border border-cyber-cyan/15 aspect-[1.1] cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.03)] hover:border-cyber-cyan/40"
                onClick={() => setActiveImage(item.image)}
              >
                {/* Background Image */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-85 transition-transform duration-750 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />

                {/* Laser scan effect on card hover */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-cyber-cyan opacity-0 group-hover:opacity-100 group-hover:animate-bounce pointer-events-none" />

                {/* Cyber Hover Panel */}
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex flex-col justify-between p-6">
                  {/* Top category label */}
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[8px] font-black tracking-widest text-cyber-cyan bg-slate-950 px-2.5 py-1 rounded uppercase border border-cyber-cyan/20">
                      {item.category}
                    </span>
                    <Sparkles size={14} className="text-cyber-cyan animate-pulse" />
                  </div>

                  {/* Bottom Text */}
                  <div className="space-y-2 text-left">
                    <h3 className="font-display text-base font-black text-white uppercase tracking-wide">
                      {item.title}
                    </h3>
                    <p className="font-sans text-[11px] text-slate-300 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-1.5 font-mono text-[8px] font-black tracking-widest text-cyber-cyan uppercase pt-2">
                      <span>OPEN SPECIFICATE WINDOW</span>
                      <ArrowUpRight size={10} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ scale: 0.97 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.97 }}
              className="relative max-w-4xl max-h-[85vh] w-full rounded-xl overflow-hidden border border-cyber-cyan/35 bg-slate-950"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-slate-950/90 rounded-full text-slate-400 border border-cyber-cyan/35 hover:text-white transition-all cursor-pointer"
              >
                <X size={15} />
              </button>
              <img 
                src={activeImage} 
                alt="Fullscreen View" 
                className="w-full h-auto max-h-[85vh] object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
