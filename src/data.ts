export interface Project {
  id: string;
  title: string;
  category: 'Android' | 'Web' | 'Security' | 'UI/UX';
  image: string;
  description: string;
  tech: string[];
  specs: string[];
  status: 'ONLINE' | 'ACTIVE' | 'ENCRYPTED' | 'STANDBY';
  demoUrl?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  metrics: string;
}

export interface Skill {
  name: string;
  level: number;
  iconName: string;
  classification: 'FRONTEND' | 'BACKEND' | 'MOBILE' | 'PLATFORM';
}

export const SERVICES: Service[] = [
  {
    id: 'android-dev',
    title: 'Android Development',
    description: 'Engineering bulletproof native Android applications utilizing Kotlin, Jetpack Compose, Coroutines, and MVVM clean architecture.',
    iconName: 'Smartphone',
    metrics: 'SDK 34 SECURED'
  },
  {
    id: 'web-dev',
    title: 'Website Development',
    description: 'High-speed modern React & Next.js systems engineered for search optimization, lighting fast loads, and custom interactive visualizers.',
    iconName: 'Globe',
    metrics: '99% LIGHTHOUSE'
  },
  {
    id: 'ai-solutions',
    title: 'AI Solutions',
    description: 'Architecting server-side model pipelines, multi-agent frameworks, semantic vector stores, and custom neural search tools.',
    iconName: 'Cpu',
    metrics: 'LLM GROUNDING'
  },
  {
    id: 'cyber-dashboards',
    title: 'Cyber Security Dashboards',
    description: 'Designing real-time threat detection consoles, activity monitors, live socket relays, and military-grade encryption systems.',
    iconName: 'Shield',
    metrics: 'AES-256 SYMMETRIC'
  },
  {
    id: 'business-sites',
    title: 'Business Websites',
    description: 'Transformative high-fidelity corporate assets focusing on responsive flow, luxury typography, and brand-aligned interaction designs.',
    iconName: 'Award',
    metrics: 'Enterprise SEO Ready'
  },
  {
    id: 'admin-panels',
    title: 'Admin Panels',
    description: 'Full-stack responsive governance dashboards, fine-grained access control nodes, system analytics, and bulk data loaders.',
    iconName: 'Layers',
    metrics: 'ROLE-BASED RBAC'
  },
  {
    id: 'api-integration',
    title: 'API Integration',
    description: 'Designing elegant RESTful & GraphQL endpoints, secure gateway proxies, custom rate limiters, and payload decoders.',
    iconName: 'Radio',
    metrics: 'LATENCY < 50MS'
  },
  {
    id: 'automation-systems',
    title: 'Automation Systems',
    description: 'Deploying reliable cron routines, background messaging queues, telemetry logging, and robust system health alerts.',
    iconName: 'Activity',
    metrics: 'CI/CD PIPELINE'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Curating futuristic, custom dark-mode design architectures, custom SVG components, layouts, and micro-interactions.',
    iconName: 'Palette',
    metrics: 'PIXEL PERFECT'
  },
  {
    id: 'full-stack-dev',
    title: 'Full Stack Development',
    description: 'Deploying end-to-end robust serverless and virtualized systems backed by Node.js, Express, and structured Cloud databases.',
    iconName: 'Database',
    metrics: 'DOCKER VIRTUALIZED'
  }
];

export const SKILLS: Skill[] = [
  { name: 'HTML', level: 98, iconName: 'Html', classification: 'FRONTEND' },
  { name: 'CSS', level: 95, iconName: 'Css', classification: 'FRONTEND' },
  { name: 'JavaScript', level: 97, iconName: 'Js', classification: 'FRONTEND' },
  { name: 'TypeScript', level: 96, iconName: 'Ts', classification: 'FRONTEND' },
  { name: 'React', level: 98, iconName: 'React', classification: 'FRONTEND' },
  { name: 'Tailwind CSS', level: 99, iconName: 'Tailwind', classification: 'FRONTEND' },
  { name: 'Node.js', level: 94, iconName: 'Node', classification: 'BACKEND' },
  { name: 'Express.js', level: 92, iconName: 'Express', classification: 'BACKEND' },
  { name: 'Firebase', level: 95, iconName: 'Firebase', classification: 'BACKEND' },
  { name: 'MongoDB', level: 90, iconName: 'Mongo', classification: 'BACKEND' },
  { name: 'Git', level: 95, iconName: 'Git', classification: 'PLATFORM' },
  { name: 'GitHub', level: 96, iconName: 'Github', classification: 'PLATFORM' },
  { name: 'Java', level: 93, iconName: 'Java', classification: 'MOBILE' },
  { name: 'Kotlin', level: 96, iconName: 'Kotlin', classification: 'MOBILE' },
  { name: 'Android Development', level: 98, iconName: 'Android', classification: 'MOBILE' },
  { name: 'REST APIs', level: 97, iconName: 'Api', classification: 'BACKEND' },
  { name: 'Responsive Design', level: 99, iconName: 'Responsive', classification: 'FRONTEND' },
  { name: 'Full Stack Engineering', level: 95, iconName: 'Stack', classification: 'PLATFORM' }
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Secure Android Suite',
    category: 'Android',
    image: 'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?auto=format&fit=crop&q=80&w=800',
    description: 'High-performance offline-first native Android app with biometrics encryption, background sync adapters, and military-grade encrypted storage SQLite layer.',
    tech: ['Kotlin', 'Coroutines', 'Room DB', 'Jetpack Compose', 'Biometrics API'],
    specs: ['99.9% Crash-Free Run', '0ms UI Latency', 'AES-256 Keystore Guard'],
    status: 'ONLINE'
  },
  {
    id: 'p2',
    title: 'Neural Assistant AI',
    category: 'UI/UX',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=800',
    description: 'Futuristic AI neural workspace integrating smart context vector embeddings, dynamic semantic maps, and responsive layout flows.',
    tech: ['React', 'TypeScript', 'Node.js', 'Vector DB', 'Framer Motion'],
    specs: ['Streaming Token Pipeline', 'Responsive 3D Viewport', 'Zero Lag State Control'],
    status: 'ACTIVE'
  },
  {
    id: 'p3',
    title: 'Cyber Security Dashboard',
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    description: 'Real-time server threat telemetry monitor visualizing live socket connections, scanning active node IPs, and generating dynamic risk indexes.',
    tech: ['React', 'D3.js', 'WebSockets', 'Tailwind', 'Express.js'],
    specs: ['Sub-10ms Payload Update', 'Secure Socket Guard', 'Adaptive Risk Alerts'],
    status: 'ONLINE'
  },
  {
    id: 'p4',
    title: 'E-Commerce Platform Pro',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    description: 'Luxury high-conversion commerce web system with microsecond page transitions, robust Stripe ledger integrations, and modular checkout gates.',
    tech: ['React', 'TypeScript', 'Stripe API', 'Tailwind CSS', 'Redux Toolkit'],
    specs: ['Dynamic Inventory Hooks', 'SEO Optimized Assets', 'Frictionless Checkout Flow'],
    status: 'ACTIVE'
  },
  {
    id: 'p5',
    title: 'Hospital Management Hub',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1504813184591-01552ff7c3d6?auto=format&fit=crop&q=80&w=800',
    description: 'Premium healthcare operating workspace containing secure HIPAA-compliant patient charting engines, scheduling matrix, and analytical charts.',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Express.js'],
    specs: ['Encrypted Health Records', 'Instant Dispatch Relays', 'Audit Trace Log Enabled'],
    status: 'ACTIVE'
  },
  {
    id: 'p6',
    title: 'School Management Console',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800',
    description: 'High-capacity academic operating portal linking dynamic grade calculators, class schedulers, parents notification systems, and system registries.',
    tech: ['React', 'TypeScript', 'Firebase Auth', 'Tailwind', 'Firestore'],
    specs: ['Real-time Grade Ticks', 'Automated Mail Server', 'Dynamic Course Schedulers'],
    status: 'ONLINE'
  },
  {
    id: 'p7',
    title: 'Restaurant Operations Core',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800',
    description: 'Sleek, gorgeous live kitchen ordering dashboard integrating custom thermal print routing and interactive drag-and-drop table layouts.',
    tech: ['React', 'Tailwind CSS', 'Node.js', 'Socket.io', 'Express'],
    specs: ['3ms State Distribution', 'Thermal Print Gateway', 'Responsive KDS Layout'],
    status: 'ACTIVE'
  },
  {
    id: 'p8',
    title: 'SaaS CRM Engine',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
    description: 'High-fidelity customer pipeline tracking system integrating dynamic kanban dealboards, smart interaction logging, and metrics summaries.',
    tech: ['React', 'TypeScript', 'Recharts', 'Tailwind', 'Node.js'],
    specs: ['Lead Attribution Engine', 'Interactive Sales Graphs', 'Multi-tenant Isolation'],
    status: 'ONLINE'
  },
  {
    id: 'p9',
    title: 'Smart Inventory System',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    description: 'Enterprise asset cataloging portal deploying live barcode decoders, threshold reorder triggers, and automated supplier invoicing routines.',
    tech: ['React', 'TypeScript', 'MongoDB', 'Express', 'Tailwind CSS'],
    specs: ['Automatic Stock Alerts', 'Live CSV Export API', 'Responsive Mobile Scan'],
    status: 'ACTIVE'
  },
  {
    id: 'p10',
    title: 'Quantum Finance Dashboard',
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=800',
    description: 'Highly detailed high-frequency telemetry system rendering crypto trading indexes, transaction ledgers, and secure encryption verifications.',
    tech: ['React', 'TypeScript', 'D3.js', 'Tailwind', 'WebSockets'],
    specs: ['Encrypted Asset Ledger', 'Real-time Ledger Node', 'Instant Volatility Alerts'],
    status: 'ONLINE'
  },
  {
    id: 'p11',
    title: 'Premium Developer Showroom',
    category: 'UI/UX',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
    description: 'Gorgeous portfolio experience presenting modular sub-views, high-end hover states, and smooth hardware-accelerated grid filters.',
    tech: ['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    specs: ['Fluid Navigation Engine', 'Holographic Visual Card', 'Optimized Resource Memory'],
    status: 'ACTIVE'
  },
  {
    id: 'p12',
    title: 'Governance Admin Panel',
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    description: 'Secure configuration workspace containing advanced server access keys, user log analytics, database health checkers, and deployment toggles.',
    tech: ['React', 'TypeScript', 'Tailwind', 'Express', 'JWT Auth'],
    specs: ['Fine-grained Role Shield', 'Database Health Poller', '2FA Token Protection'],
    status: 'ONLINE'
  },
  {
    id: 'p13',
    title: 'Secure Android Banking',
    category: 'Android',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&q=80&w=800',
    description: 'High-security mobile banking companion layout implementing advanced secure SSL pinning, device anti-tamper modules, and root detection protocols.',
    tech: ['Kotlin', 'Compose', 'Coroutines', 'Retrofit', 'SSL Pinning'],
    specs: ['Root Detection Shield', 'Biometrics Verification', 'Encrypted Payload Gateway'],
    status: 'ENCRYPTED'
  }
];
