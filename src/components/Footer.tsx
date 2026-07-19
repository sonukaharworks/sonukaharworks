import { Facebook, Instagram, Linkedin, Github, Cpu, Heart, ChevronRight } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#facebook' },
    { name: 'Instagram', icon: Instagram, href: '#instagram' },
    { name: 'LinkedIn', icon: Linkedin, href: '#linkedin' },
    { name: 'GitHub', icon: Github, href: '#github' }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'FAQ', href: '#faq' }
  ];

  const servicesLinks = [
    { name: 'Android Apps', href: '#services' },
    { name: 'Web Dev', href: '#services' },
    { name: 'E-commerce Store', href: '#services' },
    { name: 'Custom Systems', href: '#services' },
    { name: 'UI/UX Prototypes', href: '#services' }
  ];

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 bg-slate-950 pt-20 pb-10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-cyber-primary/2 blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        
        {/* Col 1: About Brand */}
        <div className="md:col-span-5 flex flex-col items-start gap-6">
          
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="flex items-center gap-1.5 group"
          >
            <div className="flex flex-col">
              <span className="font-display text-sm font-black tracking-widest text-white uppercase">
                SK STUDIO
              </span>
              <span className="font-mono text-[9px] tracking-widest text-cyber-accent uppercase -mt-0.5 font-bold">
                SYSTEMS
              </span>
            </div>
          </a>

          <p className="font-sans text-xs text-slate-400 leading-relaxed font-light max-w-sm">
            SK Studio Labs is an elite, client-centric software engineering brand translating visionary product ideas into smart, lightning-fast native Android applications, SaaS dashboards, and immersive website user interfaces.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 hover:border-cyber-primary/40 text-slate-400 hover:text-cyber-primary hover:bg-cyber-primary/5 flex items-center justify-center transition-all cursor-pointer"
                  title={item.name}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="md:col-span-3 flex flex-col items-start gap-4">
          <h4 className="font-display text-[10px] tracking-widest uppercase text-white font-extrabold mb-2 border-b border-cyber-primary/20 pb-1.5 w-full">
            Quick_Links
          </h4>
          <ul className="flex flex-col gap-2.5 font-sans text-xs text-slate-400">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="flex items-center gap-1.5 hover:text-cyber-primary transition-colors cursor-pointer group"
                >
                  <ChevronRight size={10} className="text-slate-600 group-hover:text-cyber-primary group-hover:translate-x-0.5 transition-all" />
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Services List */}
        <div className="md:col-span-4 flex flex-col items-start gap-4">
          <h4 className="font-display text-[10px] tracking-widest uppercase text-white font-extrabold mb-2 border-b border-cyber-secondary/20 pb-1.5 w-full">
            Specialties
          </h4>
          <ul className="flex flex-col gap-2.5 font-sans text-xs text-slate-400">
            {servicesLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="flex items-center gap-1.5 hover:text-cyber-secondary transition-colors cursor-pointer group"
                >
                  <ChevronRight size={10} className="text-slate-600 group-hover:text-cyber-secondary group-hover:translate-x-0.5 transition-all" />
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Footer base metadata & Credits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[9px] text-slate-500">
        
        <span>
          © {new Date().getFullYear()} SK Studio. All rights reserved.
        </span>

        {/* Made with love credits strictly requested */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-white/5 px-3 py-1 rounded-full text-slate-400 font-semibold">
          <span>Made with</span>
          <Heart size={10} className="text-red-500 fill-current animate-pulse" />
          <span>by</span>
          <span className="text-cyber-primary font-bold">Sonu Kahar</span>
        </div>

      </div>
    </footer>
  );
}
