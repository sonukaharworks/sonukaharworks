export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'core' | 'infra' | 'design';
}

export interface ChooseUsItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'Android' | 'Web' | 'UI/UX';
  tech: string[];
  description: string;
  image: string; // We can use elegant SVG paths or gradient banners as premium visuals
  demoUrl?: string;
  githubUrl?: string;
}

export interface SkillItem {
  name: string;
  percentage: number;
  colorClass: string;
}

export interface StatItem {
  number: number;
  suffix: string;
  label: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarSeed: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
