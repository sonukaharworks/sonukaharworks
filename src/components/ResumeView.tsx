import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Download, FileText, ChevronRight, BookOpen, Layers, 
  Cpu, Code, Terminal, CheckCircle2, Shield, Calendar, Award
} from 'lucide-react';

export default function ResumeView() {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const simulateDownload = () => {
    if (downloading) return;
    setDownloading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloading(false);
            setProgress(0);
            // Simulate open file in new tab or trigger a real PDF fallback
            window.open('https://google.com', '_blank');
          }, 400);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const experienceGrid = [
    {
      title: 'Lead Full Stack & AI Architect',
      comp: 'SK STUDIO // PRESENT',
      desc: 'Orchestrating high-end React 19 architectures, server-side Cognitive AI pipelines, and secure PostgreSQL microservices.'
    },
    {
      title: 'Senior Software Engineer',
      comp: 'TECHVIBE INNOVATIONS // 2022 - 2024',
      desc: 'Engineered performant data structures, micro-frontend dashboards, and typesafe REST protocols with extreme focus on load speeds.'
    },
    {
      title: 'Native Android Specialist',
      comp: 'APEXMOBILE LTD // 2020 - 2022',
      desc: 'Formulated Kotlin algorithms for high-performance mobile clients. Integrated local SQLite caching layers via Room frameworks.'
    }
  ];

  const toolsStack = [
    { cat: 'Languages', items: ['TypeScript', 'JavaScript (ESNext)', 'Kotlin', 'SQL (Postgres)', 'HTML5/CSS3'] },
    { cat: 'Frameworks', items: ['React 19 & Vite', 'Express.js', 'Fastify', 'Jetpack Compose', 'Tailwind CSS'] },
    { cat: 'Databases', items: ['PostgreSQL', 'SQLite', 'Redis Cache', 'Drizzle ORM', 'Firebase Firestore'] },
    { cat: 'Tools & Cloud', items: ['Cognitive AI Engine', 'Docker Containers', 'WebSockets', 'Vercel / Cloud Run', 'Git & GitHub'] }
  ];

  return (
    <div className="space-y-24 max-w-5xl mx-auto">
      {/* Resume View Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4 max-w-xl text-left">
          <span className="font-mono text-xs text-cyan-400 font-bold tracking-[0.4em] uppercase block">// PORTABLE CV COCKPIT</span>
          <h1 className="font-sans text-3xl sm:text-5xl font-black tracking-tight uppercase text-white">
            INTERACTIVE RESUME
          </h1>
          <div className="h-[2px] w-16 bg-cyan-400 mt-4" />
          <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed pt-2">
            A secure digital summary of qualifications, tools, and technical paradigms compiled for executive evaluations.
          </p>
        </div>

        {/* Download Simulator Button */}
        <button
          onClick={simulateDownload}
          className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-600/10 hover:from-cyan-500/15 hover:to-purple-600/15 border border-cyan-400/35 hover:border-cyan-400 text-cyan-300 font-mono text-[10px] font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer overflow-hidden shadow-[0_0_20px_rgba(0,229,255,0.1)] hover:shadow-[0_0_30px_rgba(0,229,255,0.25)]"
        >
          {downloading ? (
            <div className="relative z-10 flex items-center gap-3">
              <span>DOWNLOADING {progress}%</span>
              <div className="w-12 h-1 bg-black/45 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-cyan-400" style={{ width: `${progress}%` }} />
              </div>
            </div>
          ) : (
            <span className="relative z-10 flex items-center gap-2">
              <Download size={12} className="group-hover:translate-y-0.5 transition-transform" />
              COMPILE PRINTABLE PDF
            </span>
          )}
        </button>
      </section>

      {/* Main Resume Sections Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
        {/* Left Column (Education & Experience) */}
        <div className="lg:col-span-7 space-y-12">
          {/* Work Exp */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-white/5 pb-3">
              <Layers className="text-cyan-400" size={18} />
              <h2 className="font-sans text-lg sm:text-xl font-black text-white uppercase tracking-wider">WORK HISTORY</h2>
            </div>

            <div className="space-y-8 pl-4 border-l border-white/5">
              {experienceGrid.map((exp, index) => (
                <div key={index} className="space-y-2 relative">
                  {/* node marker */}
                  <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="font-mono text-[8px] font-black text-cyan-400 tracking-wider block">{exp.comp}</span>
                  <h3 className="font-sans font-black text-white text-base sm:text-lg uppercase">{exp.title}</h3>
                  <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-white/5 pb-3">
              <BookOpen className="text-purple-400" size={18} />
              <h2 className="font-sans text-lg sm:text-xl font-black text-white uppercase tracking-wider">EDUCATION</h2>
            </div>

            <div className="space-y-6 pl-4 border-l border-white/5">
              <div className="space-y-2 relative">
                <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-purple-500" />
                <span className="font-mono text-[8px] font-black text-purple-400 tracking-wider block">STATE UNIVERSITY SYSTEMS // 2016 - 2020</span>
                <h3 className="font-sans font-black text-white text-base uppercase">BACHELOR OF SCIENCE IN COMPUTER SCIENCE</h3>
                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  Specialized curriculum focusing on Relational Database Designs, Advanced Algorithms, Computational Systems, and Data Structures.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Tools Stack & Principles) */}
        <div className="lg:col-span-5 space-y-12">
          {/* Tools & Tech Matrix */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-white/5 pb-3">
              <Cpu className="text-emerald-400" size={18} />
              <h2 className="font-sans text-lg sm:text-xl font-black text-white uppercase tracking-wider">TECH SPECS</h2>
            </div>

            <div className="space-y-6">
              {toolsStack.map((tech, index) => (
                <div key={index} className="space-y-2.5">
                  <h4 className="font-mono text-[9px] font-black text-slate-500 tracking-widest uppercase">{tech.cat}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {tech.items.map((item, itemIdx) => (
                      <span key={itemIdx} className="font-mono text-[9px] text-cyan-300 font-bold bg-cyan-500/10 border border-cyan-400/15 px-2.5 py-1 rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Secure Handshake Standards */}
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-pink-400">
              <Shield size={16} />
              <span className="font-mono text-[9px] font-black tracking-widest uppercase">CIPHER DEPLOYMENT ASSURANCE</span>
            </div>
            <p className="font-sans text-xs text-slate-400 leading-relaxed">
              Every system and component generated is subject to strict performance lint auditing. This ensures no memory-leak dependencies are compiled to the client.
            </p>
            <div className="flex items-center gap-2 font-mono text-[8px] text-slate-500">
              <CheckCircle2 className="text-emerald-400" size={12} />
              <span>STABILITY CONTRACT ASSURED // AES-256</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
