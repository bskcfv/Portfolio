/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, memo, useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Download, 
  Code2, 
  Database, 
  Briefcase, 
  User, 
  Mail, 
  ChevronRight,
  Terminal as TerminalIcon,
  Award,
  Globe,
  MapPin,
  X
} from 'lucide-react';
import { cn } from './lib/utils';
import DonutASCII from './components/DonutASCII';

// --- Components & Translations ---

const APP_NAME = 'Portfolio CV';
const MagneticFilings = lazy(() => import('./components/MagneticFilings'));

const localAssets = {
  cv: new URL('../assets/Currículum Vitae CV Valderrama Cabezas Cristian Felipe.pdf', import.meta.url).href,
  certificadoProgramacionPrincipiante: new URL('../assets/certificadoProgramacionPrincipiante.jpg', import.meta.url).href,
  certificadoJavaPoo: new URL('../assets/certificadoJavaPoo.JPG', import.meta.url).href,
  certificadoGit: new URL('../assets/certificadoGIT.jpg', import.meta.url).href,
  certificadoDesarrolloPersonal: new URL('../assets/certificadoDesarrolloPersonal.jpg', import.meta.url).href,
  certificadoAnalisisDatos: new URL('../assets/certificadoAnalisisdeDatos.jpg', import.meta.url).href,
  badgeQueryOpt: new URL('../assets/badgeQueryOpt.png', import.meta.url).href,
  badgeCrud: new URL('../assets/badgeCrud.png', import.meta.url).href,
  badgeRelationalModel: new URL('../assets/badgeRelationalModel.png', import.meta.url).href,
  badgeBuildinGenAI: new URL('../assets/badgeBuildinGenAI.png', import.meta.url).href,
};

const SectionTitle = ({ children, icon: Icon }: { children: React.ReactNode, icon?: any }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex items-center gap-3 mb-12"
  >
    {Icon && <Icon className="text-violet-500 w-8 h-8" />}
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white flex items-center gap-2">
      <span className="text-violet-500 opacity-50">/</span>
      {children}
    </h2>
  </motion.div>
);

const TypingText = memo(function TypingText({ text }: { text: string }) {
  const [typingText, setTypingText] = useState('');

  useEffect(() => {
    setTypingText('');
    let index = 0;
    const interval = window.setInterval(() => {
      if (index <= text.length) {
        setTypingText(text.slice(0, index));
        index += 1;
      } else {
        window.clearInterval(interval);
      }
    }, 35);

    return () => window.clearInterval(interval);
  }, [text]);

  return (
    <>
      {typingText}
      <span className="cursor ml-1" />
    </>
  );
});

const MagneticFallback = () => (
  <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] flex items-center justify-center">
    <div className="w-[145px] h-[145px] sm:w-[185px] sm:h-[185px] rounded-full border-2 border-violet-500/30 bg-black/50 shadow-[0_0_25px_rgba(168,85,247,0.2)]" />
  </div>
);

const translations = {
  es: {
    nav: {
      projects: 'Proyectos',
      about: 'Sobre mí',
      experience: 'Experiencia',
      certifications: 'Certificados',
      contact: 'Contacto',
    },
    sections: {
      projects: 'Proyectos Destacados',
      tech: 'Tecnologías',
      about: 'Sobre mí',
      certifications: 'Certificaciones & Badges',
      certSubtitle: 'Logros académicos y certificaciones técnicas',
      contact: 'Contacto',
    },
    hero: {
      roleText: "Backend Developer especializado en APIs & Bases de Datos",
      stack: "Spring Boot • Node.js • PostgreSQL • MongoDB",
      downloadCv: "Descargar CV"
    },
    projectsData: [
      { title: "Sync DBs", description: "Sistema de migración híbrido SQL/NoSQL con un motor de sincronización basado en Python.", stack: ["Node.js", "Python", "FastAPI", "PostgreSQL", "MongoDB"], link: "https://github.com/bskcfv/Sync_DBs" },
      { title: "Hotel Management API", featured: true, description: "Backend modular para operaciones de hoteles con seguridad JWT, validación Zod y reportes automatizados.", stack: ["Node.js", "Express", "PostgreSQL", "JWT", "Swagger"], link: "https://github.com/ProyectoDemet/Backend-DEMET" },
      { title: "Perrigry-S", description: "Plataforma de gestión con autenticación por reconocimiento facial, seguimiento de ventas y arquitectura dual SQL/NoSQL.", stack: ["Next.js", "PostgreSQL", "MongoDB", "JWT", "NeonDB"], link: "https://github.com/PerriGry/perrigry-s" },
      { title: "VectorShop", description: "Sistema de búsqueda semántica potenciado por IA que utiliza incrustaciones vectoriales (vector embeddings) para coincidencias basadas en el significado.", stack: ["Node.js", "MongoDB Atlas", "Vector Search", "HuggingFace"], link: "https://github.com/bskcfv/VectorShop" },
      { title: "Inventory System", description: "Plataforma eficiente de gestión de stock con autenticación JWT y capacidades CRUD completas.", stack: ["Next.js", "Node.js", "MongoDB", "JWT"], link: "https://github.com/bskcfv/InventarioBsk" },
      { title: "Gario", description: "Backend de finanzas personales para el seguimiento de ingresos y gastos con informes financieros automatizados.", stack: ["Node.js", "Express", "MySQL", "JWT"], link: "https://github.com/60GodlysecondsGroup/Gario_BackEnd" }
    ],
    experienceData: [
      { 
        date: "2026 - Actualidad", 
        role: "Backend Developer", 
        company: "NOBUGS", 
        description: ( <ul className="list-disc pl-4 space-y-1"> <li>Desarrollo y mantenimiento utilizando <strong>Spring Boot</strong> y <strong>Supabase</strong>.</li> <li>Refactorización de código, corrección de errores y nuevas funcionalidades.</li> <li>Uso de <strong>Flyway</strong>, despliegues en <strong>AWS</strong> y <strong>Arquitectura Hexagonal</strong>.</li> </ul> ) 
      },
      { 
        date: "Sep 2025 - Nov 2025", 
        role: "Mentor de Bases de Datos", 
        company: "Corporación Universitaria Minuto de Dios", 
        description: ( <p>Tutorías en <strong>MySQL</strong> y <strong>PostgreSQL</strong> enfocadas en modelado, normalización y optimización de consultas.</p> ) 
      },
      { 
        date: "2024 - Actualidad", 
        role: "Estudiante de Desarrollo de Software", 
        company: "Corporación Universitaria Minuto de Dios", 
        description: ( <p>Formación en desarrollo backend, diseño de DBs y APIs REST escalables.</p> ) 
      }
    ],
    about: {
      whoami: "Backend Developer enfocado en APIs, bases de datos y sistemas escalables. Mi objetivo es construir soluciones eficientes que resuelvan problemas reales mediante código limpio y arquitecturas robustas.",
      mindset: "Pensamiento analítico, aprendizaje constante y enfoque en resolución de problemas reales. Siempre buscando optimizar procesos y aprender nuevas herramientas del ecosistema backend.",
      education: "Tecnología en Desarrollo de Software — Corporación Universitaria Minuto de Dios (2024 - Actual)"
    },
    contact: {
      role: "Cristian Valderrama - Backend Developer",
      location: "Villavicencio, Colombia"
    },
    cert: {
      viewBadge: "Ver Insignia",
      viewCert: "Ver Certificación",
      loading: "Cargando Certificado..."
    }
  },
  en: {
    nav: {
      projects: 'Projects',
      about: 'About me',
      experience: 'Experience',
      certifications: 'Certifications',
      contact: 'Contact',
    },
    sections: {
      projects: 'Featured Projects',
      tech: 'Technologies',
      about: 'About me',
      certifications: 'Certifications & Badges',
      certSubtitle: 'Academic achievements and technical certifications',
      contact: 'Contact',
    },
    hero: {
      roleText: "Backend Developer specialized in APIs & Databases",
      stack: "Spring Boot • Node.js • PostgreSQL • MongoDB",
      downloadCv: "Download CV"
    },
    projectsData: [
      { title: "Sync DBs", description: "Hybrid SQL/NoSQL migration system with a Python-based synchronization engine.", stack: ["Node.js", "Python", "FastAPI", "PostgreSQL", "MongoDB"], link: "https://github.com/bskcfv/Sync_DBs" },
      { title: "Hotel Management API", featured: true, description: "Modular backend for hotel operations featuring JWT security, Zod validation, and automated reporting.", stack: ["Node.js", "Express", "PostgreSQL", "JWT", "Swagger"], link: "https://github.com/ProyectoDemet/Backend-DEMET" },
      { title: "Perrigry-S", description: "Management platform featuring facial recognition auth, sales tracking, and dual SQL/NoSQL architecture.", stack: ["Next.js", "PostgreSQL", "MongoDB", "JWT", "NeonDB"], link: "https://github.com/PerriGry/perrigry-s" },
      { title: "VectorShop", description: "AI-powered semantic search system using vector embeddings for meaning-based query matching.", stack: ["Node.js", "MongoDB Atlas", "Vector Search", "HuggingFace"], link: "https://github.com/bskcfv/VectorShop" },
      { title: "Inventory System", description: "Efficient stock management platform with JWT authentication and full CRUD capabilities.", stack: ["Next.js", "Node.js", "MongoDB", "JWT"], link: "https://github.com/bskcfv/InventarioBsk" },
      { title: "Gario", description: "Personal finance backend for tracking income and expenses with automated financial reporting.", stack: ["Node.js", "Express", "MySQL", "JWT"], link: "https://github.com/60GodlysecondsGroup/Gario_BackEnd" }
    ],
    experienceData: [
      { 
        date: "2026 - Present", 
        role: "Backend Developer", 
        company: "NOBUGS", 
        description: ( <ul className="list-disc pl-4 space-y-1"> <li>Backend development and maintenance using <strong>Spring Boot</strong> and <strong>Supabase</strong>.</li> <li>Code refactoring, bug fixes, and development of new features.</li> <li>Active use of <strong>Flyway</strong>, deployments on <strong>AWS</strong>, and <strong>Hexagonal Architecture</strong>.</li> </ul> ) 
      },
      { 
        date: "Sep 2025 - Nov 2025", 
        role: "Database Mentor", 
        company: "Corporación Universitaria Minuto de Dios", 
        description: ( <p>Academic tutoring in <strong>MySQL</strong> and <strong>PostgreSQL</strong> focused on data modeling, normalization, and query optimization.</p> ) 
      },
      { 
        date: "2024 - Present", 
        role: "Software Development Student", 
        company: "Corporación Universitaria Minuto de Dios", 
        description: ( <p>Academic training focused on backend development, robust database design, and scalable RESTful APIs.</p> ) 
      }
    ],
    about: {
      whoami: "Backend Developer focused on APIs, databases, and scalable systems. My goal is to build efficient solutions that solve real problems through clean code and robust architectures.",
      mindset: "Analytical thinking, continuous learning, and a focus on solving real-world problems. Always looking to optimize processes and learn new tools in the backend ecosystem.",
      education: "Software Development Technology — Corporación Universitaria Minuto de Dios (2024 - Present)"
    },
    contact: {
      role: "Cristian Valderrama - Backend Developer",
      location: "Villavicencio, Colombia"
    },
    cert: {
      viewBadge: "View Badge",
      viewCert: "View Certification",
      loading: "Loading Certificate..."
    }
  }
};

const skillCategoryNames = {
  es: {
    "Lenguajes": "Lenguajes",
    "Frameworks": "Frameworks",
    "Bases de datos": "Bases de datos",
    "Ecosistema": "Ecosistema"
  },
  en: {
    "Lenguajes": "Languages",
    "Frameworks": "Frameworks",
    "Bases de datos": "Databases",
    "Ecosistema": "Ecosystem"
  }
};

const levelTranslations = {
  es: {
    "Intermediate": "Intermedio",
    "Advanced": "Avanzado",
    "Beginner": "Principiante"
  },
  en: {
    "Intermediate": "Intermediate",
    "Advanced": "Advanced",
    "Beginner": "Beginner"
  }
};

const Navbar = ({ lang, setLang }: { lang: 'es' | 'en', setLang: (l: 'es' | 'en') => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: lang === 'es' ? 'Proyectos' : 'Projects', href: '#projects' },
    { name: lang === 'es' ? 'Sobre mí' : 'About me', href: '#about' },
    { name: lang === 'es' ? 'Experiencia' : 'Experience', href: '#experience' },
    { name: lang === 'es' ? 'Certificados' : 'Certifications', href: '#certifications' },
    { name: lang === 'es' ? 'Contacto' : 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav className={cn(
         "fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300",
         scrolled ? "glass-morphism py-3" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="font-mono text-xl font-bold text-white group">
            <span className="text-violet-500">$</span> {APP_NAME}
          </a>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-gray-400 hover:text-violet-400 transition-colors"
              >
                {link.name}
              </a>
            ))}

            {/* Language Switcher Badge for Desktop */}
            <button 
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold text-gray-300 bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 rounded-md transition-all cursor-pointer select-none"
              title={lang === 'es' ? 'Switch context to English' : 'Cambiar contexto a Español'}
            >
              <Globe size={13} className="text-violet-500 animate-pulse" />
              <span>{lang === 'es' ? 'ES' : 'EN'}</span>
            </button>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold text-gray-300 bg-white/5 border border-white/10 rounded-md transition-all cursor-pointer select-none"
            >
              <Globe size={12} className="text-violet-500 animate-pulse" />
              <span>{lang === 'es' ? 'ES' : 'EN'}</span>
            </button>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-violet-400 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <TerminalIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-[#0d0d0d] flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: i * 0.1 } }}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-bold text-gray-300 hover:text-violet-500 transition-colors uppercase tracking-widest"
              >
                {link.name}
              </motion.a>
            ))}

            <button 
              onClick={() => {
                setLang(lang === 'es' ? 'en' : 'es');
                setIsOpen(false);
              }}
              className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-lg border border-violet-500/20 bg-violet-500/5 hover:bg-violet-500/15 text-sm font-mono text-gray-200 hover:text-white transition-colors cursor-pointer"
            >
              <Globe size={16} className="text-violet-500 animate-pulse" />
              <span>{lang === 'es' ? 'Switch to English (EN)' : 'Cambiar a Español (ES)'}</span>
            </button>

            <button 
              onClick={() => setIsOpen(false)}
              className="mt-4 p-4 bg-white/5 rounded-full text-violet-500 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const ProjectCard = memo(({ project, index, lang }: { project: any, index: number, lang: 'es' | 'en', key?: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="terminal-card group flex flex-col h-full bg-[#121212] overflow-hidden"
  >
    <div className="flex items-center justify-between mb-4">
      <span className="terminal-line">$ project_0{index + 1}</span>
      {project.featured && (
        <span className="text-[10px] uppercase tracking-widest bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded-full font-bold">
          {lang === 'es' ? 'Destacado' : 'Featured'}
        </span>
      )}
    </div>
    
    <h3 className="text-xl font-bold mb-3 group-hover:text-violet-400 transition-colors uppercase tracking-tight">
      {project.title}
    </h3>
    
    <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
      {project.description}
    </p>

    <div className="flex flex-wrap gap-2 mb-6">
      {project.stack.map((s: string) => (
        <span key={s} className="text-[10px] font-mono px-2 py-1 bg-violet-900/10 border border-violet-900/30 text-violet-300/80 rounded">
          {s}
        </span>
      ))}
    </div>

    <a 
      href={project.link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm font-mono text-violet-400 hover:text-white transition-colors mt-auto group/link"
    >
      <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
      {lang === 'es' ? 'Ver Código' : 'View Source'}
    </a>
  </motion.div>
));

const ExperienceItem = memo(({ exp, index }: { exp: any, index: number, key?: any }) => (
  <div className="relative pl-8 pb-12 last:pb-0 border-l border-violet-900/30 ml-4 group">
    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-violet-500 rounded-full group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_var(--color-violet-glow)]" />
    
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-[#121212]/50 p-6 rounded-lg border border-violet-900/10 group-hover:border-violet-500/20 transition-all duration-300"
    >
      <span className="text-xs font-mono text-violet-500 mb-2 block">{exp.date}</span>
      <h3 className="text-xl font-bold text-white mb-1 uppercase tracking-tight">{exp.role}</h3>
      <p className="text-violet-400 text-sm mb-4 font-medium uppercase tracking-wider">{exp.company}</p>
      <div className="text-gray-400 text-sm leading-relaxed space-y-2">
        {exp.description}
      </div>
    </motion.div>
  </div>
));

const SkillCard = memo(({ category, items, showLevels = true, lang }: { category: string, items: any[], showLevels?: boolean, lang: 'es' | 'en', key?: any }) => {
  const displayCategory = skillCategoryNames[lang][category as keyof typeof skillCategoryNames['en']] || category;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="terminal-card border-l-4 border-l-violet-500"
    >
      <h3 className="text-sm font-mono text-violet-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
         <div className="w-1.5 h-1.5 bg-violet-500 rounded-full" />
         {displayCategory}
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {items.map((skill) => {
          const displayLevel = skill.level ? (levelTranslations[lang][skill.level as keyof typeof levelTranslations['en']] || skill.level) : '';
          return (
            <div key={skill.name} className="flex items-center gap-4 group">
              <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 group-hover:border-violet-500/40 transition-colors p-2 shrink-0">
                {skill.iconComponent ? (
                  <skill.iconComponent size={24} className="group-hover:scale-110 transition-transform" />
                ) : (
                  <img src={skill.icon} alt={skill.name} loading="lazy" decoding="async" className="w-6 h-6 object-contain" />
                )}
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-200">{skill.name}</span>
                  {showLevels && skill.level && <span className="text-[10px] font-mono text-violet-500">{displayLevel}</span>}
                </div>
                {showLevels && skill.level && (
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ scaleX: 0 }}
                       whileInView={{ scaleX: skill.level === 'Advanced' ? 0.75 : skill.level === 'Intermediate' ? 0.65 : 0.35 }}
                       transition={{ duration: 1, delay: 0.2 }}
                       className="h-full origin-left bg-violet-600 shadow-[0_0_8px_var(--color-violet-glow)]" 
                     />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
});

const CertCard = memo(({ cert, onClick, lang }: { cert: any, onClick: () => void, lang: 'es' | 'en', key?: any }) => (
  <motion.div
    whileHover={{ y: -5 }}
    onClick={onClick}
    className="bg-[#121212] border border-violet-900/20 p-5 rounded-lg cursor-pointer hover:border-violet-500/50 transition-all duration-300 flex flex-col group h-full"
  >
    <div className="flex items-center justify-between mb-3 text-violet-500">
      <Award className="w-5 h-5 opacity-50" />
      <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest">{cert.date}</span>
    </div>
    <h3 className="text-white font-bold mb-1 group-hover:text-violet-400 transition-colors uppercase tracking-tight text-sm md:text-base">{cert.title}</h3>
    <p className="text-gray-500 text-xs mb-4">{cert.issuer}</p>
    <button className="text-[10px] font-mono text-violet-400/70 group-hover:text-violet-400 flex items-center gap-2 uppercase tracking-widest mt-auto">
      <ChevronRight className="w-3 h-3" />
      {cert.type === 'badge' ? (lang === 'es' ? 'Ver Insignia' : 'View Badge') : (lang === 'es' ? 'Ver Certificado' : 'View Certification')}
    </button>
  </motion.div>
));

const NeonIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
    <path d="M120.316 43.14a4.01 4.01 0 0 0-4.004-3.14H82.02l22.684-33.14a4 4 0 0 0-5.836-5.14l-64 80a4 4 0 0 0 3.12 6.54h34.292L50.28 119.14a4 4 0 0 0 6.64 3.72l64-80z" fill="#00E599"/>
  </svg>
);

export default function App() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [selectedCert, setSelectedCert] = useState<any>(null);
  const [showMagneticFilings, setShowMagneticFilings] = useState(false);
  const magneticContainerRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];

  useEffect(() => {
    const container = magneticContainerRef.current;
    if (!container || showMagneticFilings) return;

    if (!('IntersectionObserver' in window)) {
      setShowMagneticFilings(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowMagneticFilings(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [showMagneticFilings]);

  const handleDownloadCV = useCallback(() => {
    const a = document.createElement("a");
    a.href = localAssets.cv;
    a.download = "Currículum Vitae CV Valderrama Cabezas Cristian Felipe.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, []);

  const experience = {
    es: [
      { 
        date: "2026 - Actualidad", 
        role: "Backend Developer", 
        company: "NOBUGS", 
        description: ( <ul className="list-disc pl-4 space-y-1"> <li>Desarrollo y mantenimiento utilizando <strong>Spring Boot</strong> y <strong>Supabase</strong>.</li> <li>Refactorización de código, corrección de errores y nuevas funcionalidades.</li> <li>Uso de <strong>Flyway</strong>, despliegues en <strong>AWS</strong> y <strong>Arquitectura Hexagonal</strong>.</li> </ul> ) 
      },
      { 
        date: "Sep 2025 - Nov 2025", 
        role: "Mentor de Bases de Datos", 
        company: "Corporación Universitaria Minuto de Dios", 
        description: ( <p>Tutorías en <strong>MySQL</strong> y <strong>PostgreSQL</strong> enfocadas en modelado, normalización y optimización de consultas.</p> ) 
      },
      { 
        date: "2024 - Actualidad", 
        role: "Estudiante de Desarrollo de Software", 
        company: "Corporación Universitaria Minuto de Dios", 
        description: ( <p>Formación en desarrollo backend, diseño de DBs y APIs REST escalables.</p> ) 
      }
    ],
    en: [
      { 
        date: "2026 - Present", 
        role: "Backend Developer", 
        company: "NOBUGS", 
        description: ( <ul className="list-disc pl-4 space-y-1"> <li>Backend development and maintenance using <strong>Spring Boot</strong> and <strong>Supabase</strong>.</li> <li>Code refactoring, bug fixes, and development of new features.</li> <li>Deployments on <strong>AWS</strong>, <strong>Flyway</strong> migration scripts, and <strong>Hexagonal Architecture</strong>.</li> </ul> ) 
      },
      { 
        date: "Sep 2025 - Nov 2025", 
        role: "Database Mentor", 
        company: "Corporación Universitaria Minuto de Dios", 
        description: ( <p>Academic tutoring in <strong>MySQL</strong> and <strong>PostgreSQL</strong> focused on data modeling, normalization, and query optimization.</p> ) 
      },
      { 
        date: "2024 - Present", 
        role: "Software Development Student", 
        company: "Corporación Universitaria Minuto de Dios", 
        description: ( <p>Academic training focused on backend development, robust database design, and scalable RESTful APIs.</p> ) 
      }
    ]
  };

  const skillGroups = [
    { category: "Lenguajes", items: [ { name: "JavaScript", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" }, { name: "Java", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-plain.svg" }, { name: "Python", level: "Beginner", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" } ] },
    { category: "Frameworks", items: [ { name: "Node.js", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" }, { name: "Spring Boot", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" }, { name: "NextJs", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-plain.svg" }, { name: "FastAPI", level: "Beginner", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" } ] },
    { category: "Bases de datos", items: [ { name: "MySQL", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg" }, { name: "PostgreSQL", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" }, { name: "MongoDB", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-plain-wordmark.svg" } ] },
    { category: "Ecosistema", showLevels: false, items: [ 
        { name: "SupaBase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" }, 
        { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" }, 
        { name: "VsCode", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
        { name: "Intellij", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg" },
        { name: "Neon", iconComponent: NeonIcon },
        { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" }, 
      ] 
    }
  ];

  const certifications = {
    es: [
      { title: "Programación G9", issuer: "Alura Latam", date: "Sep 2025", image: localAssets.certificadoProgramacionPrincipiante },
      { title: "Programación Java POO", issuer: "Alura Latam", date: "Feb 2026", image: localAssets.certificadoJavaPoo },
      { title: "Git & GitHub", issuer: "Crehana", date: "Abr 2025", image: localAssets.certificadoGit },
      { title: "Desarrollo Personal", issuer: "Alura", date: "Sep 2025", image: localAssets.certificadoDesarrolloPersonal },
      { title: "Análisis de Datos", issuer: "SENA", date: "Oct 2025", image: localAssets.certificadoAnalisisDatos },
      { title: "Query Optimization", issuer: "MongoDB University", date: "Insignia", type: 'badge', image: localAssets.badgeQueryOpt },
      { title: "CRUD Operations", issuer: "MongoDB University", date: "Insignia", type: 'badge', image: localAssets.badgeCrud },
      { title: "Relational → Document", issuer: "MongoDB University", date: "Insignia", type: 'badge', image: localAssets.badgeRelationalModel },
      { title: "Building GenAI Apps", issuer: "MongoDB University", date: "Insignia", type: 'badge', image: localAssets.badgeBuildinGenAI },
    ],
    en: [
      { title: "Programming Basics G9", issuer: "Alura Latam", date: "Sep 2025", image: localAssets.certificadoProgramacionPrincipiante },
      { title: "OOP Java Programming", issuer: "Alura Latam", date: "Feb 2026", image: localAssets.certificadoJavaPoo },
      { title: "Git & GitHub Mastery", issuer: "Crehana", date: "Apr 2025", image: localAssets.certificadoGit },
      { title: "Personal Development", issuer: "Alura", date: "Sep 2025", image: localAssets.certificadoDesarrolloPersonal },
      { title: "Data Analysis", issuer: "SENA", date: "Oct 2025", image: localAssets.certificadoAnalisisDatos },
      { title: "Query Optimization", issuer: "MongoDB University", date: "Badge", type: 'badge', image: localAssets.badgeQueryOpt },
      { title: "CRUD Operations", issuer: "MongoDB University", date: "Badge", type: 'badge', image: localAssets.badgeCrud },
      { title: "Relational → Document", issuer: "MongoDB University", date: "Badge", type: 'badge', image: localAssets.badgeRelationalModel },
      { title: "Building GenAI Apps", issuer: "MongoDB University", date: "Badge", type: 'badge', image: localAssets.badgeBuildinGenAI },
    ]
  };

  return (
    <div className="min-h-screen selection:bg-violet-500/30">
      <Navbar lang={lang} setLang={setLang} />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden pt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start text-left"
          >
            <div className="space-y-4 mb-8">
              <p className="terminal-line text-lg">$ whoami</p>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white">
                <span className="text-violet-500/50 mr-2 opacity-50">{'>'}</span>
                Cristian Valderrama
              </h1>
              
              <div className="space-y-2 mb-12">
                <p className="terminal-line">$ role</p>
                <div className="text-lg md:text-2xl font-mono text-gray-400 font-medium min-h-[4rem] md:min-h-0">
                  <TypingText text={t.hero.roleText} />
                </div>
              </div>

              <div className="space-y-2">
                <p className="terminal-line">$ stack</p>
                <p className="text-sm font-mono text-violet-400 uppercase tracking-widest bg-violet-500/5 py-1 rounded inline-block px-2">
                  {t.hero.stack}
                </p>
              </div>
            </div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1 }}
               className="flex flex-wrap gap-4 mt-12"
            >
              <a href="https://github.com/bskcfv" target="_blank" className="btn bg-violet-600 hover:bg-violet-700 text-white flex items-center gap-2 shadow-[0_0_20px_var(--color-violet-glow)]">
                <Github size={18} /> GitHub
              </a>
              <a href="https://linkedin.com/in/crisheads" target="_blank" className="btn bg-white/10 hover:bg-white/20 text-white flex items-center gap-2 backdrop-blur-sm border border-white/10 text-sm md:text-base">
                <Linkedin size={18} /> LinkedIn
              </a>
              <button onClick={handleDownloadCV} className="btn btn-outline flex items-center gap-2 group text-sm md:text-base">
                <Download size={18} className="group-hover:translate-y-1 transition-transform" /> {t.hero.downloadCv}
              </button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center h-[300px] md:h-[500px] relative overflow-visible"
          >
            <DonutASCII />
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="content-visibility-auto py-24 px-6 max-w-7xl mx-auto">
        <SectionTitle icon={Code2}>{t.sections.projects}</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.projectsData.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} lang={lang} />
          ))}
        </div>
      </section>

      {/* Experience & Skills */}
      <section className="content-visibility-auto py-24 px-6 bg-[#0a0a0a]/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div id="experience">
            <SectionTitle icon={Briefcase}>{t.sections.experience}</SectionTitle>
            <div className="pl-4">
              {experience[lang].map((exp, i) => (
                <ExperienceItem key={i} exp={exp} index={i} />
              ))}
            </div>
          </div>

          <div id="skills">
            <SectionTitle icon={Database}>{t.sections.tech}</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillGroups.map((group) => (
                <SkillCard key={group.category} {...group} lang={lang} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="content-visibility-auto py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <SectionTitle icon={User}>{t.sections.about}</SectionTitle>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#121212] p-8 rounded-lg border border-violet-900/20 hover:border-violet-500/30 transition-colors"
            >
              <p className="terminal-line font-bold mb-4">$ whoami</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t.about.whoami}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#121212] p-8 rounded-lg border border-violet-900/20 hover:border-violet-500/30 transition-colors"
            >
              <p className="terminal-line font-bold mb-4">$ mindset</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t.about.mindset}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#121212] p-8 rounded-lg border border-violet-900/20 hover:border-violet-500/30 transition-colors"
            >
              <p className="terminal-line font-bold mb-4">$ education</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t.about.education}
              </p>
            </motion.div>
          </div>

          <motion.div 
            ref={magneticContainerRef}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center p-4"
          >
            {showMagneticFilings ? (
              <Suspense fallback={<MagneticFallback />}>
                <MagneticFilings />
              </Suspense>
            ) : (
              <MagneticFallback />
            )}
          </motion.div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="content-visibility-auto py-24 px-6 max-w-7xl mx-auto">
        <SectionTitle icon={Award}>{t.sections.certifications}</SectionTitle>
        <p className="text-gray-500 mb-12 -mt-8 font-mono text-xs uppercase tracking-widest">{t.sections.certSubtitle}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications[lang].map((cert, i) => (
            <CertCard key={i} cert={cert} onClick={() => setSelectedCert(cert)} lang={lang} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="content-visibility-auto py-24 px-6 max-w-4xl mx-auto">
        <SectionTitle icon={Mail}>{t.sections.contact}</SectionTitle>
        <div className="terminal-card bg-[#0d0d0d] border-violet-500/20 text-left relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-full h-8 bg-white/5 flex items-center px-4 gap-2 border-b border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              <span className="text-[10px] text-gray-500 font-mono ml-2 uppercase tracking-widest">cristian-terminal</span>
           </div>
           
           <div className="mt-12 space-y-6 font-mono text-sm sm:text-base p-2">
              <div>
                 <p className="text-violet-500 mb-1"><span className="text-violet-400/50">$</span> whoami</p>
                 <p className="text-gray-300 ml-4">{t.contact.role}</p>
              </div>
              <div>
                 <p className="text-violet-500 mb-1"><span className="text-violet-400/50">$</span> location</p>
                 <p className="text-gray-300 ml-4 flex items-center gap-2">
                    <MapPin size={16} className="text-violet-500" /> {t.contact.location}
                 </p>
              </div>
              <div>
                 <p className="text-violet-500 mb-1"><span className="text-violet-400/50">$</span> contact --email</p>
                 <a href="mailto:cristian.vcabezas@hotmail.com" className="text-violet-400 ml-4 hover:underline transition-all break-all">
                     cristian.vcabezas@hotmail.com
                 </a>
              </div>
              <div>
                 <p className="text-violet-500 mb-1"><span className="text-violet-400/50">$</span> socials --list</p>
                 <div className="ml-4 flex gap-4 text-gray-400">
                    <a href="https://github.com/bskcfv" target="_blank" className="hover:text-violet-400 transition-colors uppercase tracking-widest text-xs">GitHub</a>
                    <span className="opacity-20">|</span>
                    <a href="https://linkedin.com/in/crisheads" target="_blank" className="hover:text-violet-400 transition-colors uppercase tracking-widest text-xs">LinkedIn</a>
                 </div>
              </div>
              <div className="pt-4 flex items-center gap-2">
                 <span className="text-violet-500">$</span>
                 <span className="w-2 h-5 bg-violet-500 animate-pulse" />
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-[10px] uppercase tracking-[0.4em]">
        &copy; 2026 Cristian Valderrama • {lang === 'es' ? 'Edición Terminal' : 'Terminal Edition'} • v1.0.4
      </footer>

      {/* Cert Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#121212] border border-violet-500/30 p-2 md:p-4 rounded-xl max-w-4xl w-full relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedCert(null)} 
                className="absolute top-2 right-2 text-gray-500 hover:text-white z-20 bg-black/50 p-2 rounded-full"
              >
                <X size={24} />
              </button>
              
              <div className="flex flex-col items-center text-center p-2">
                <h2 className="text-lg md:text-2xl font-bold text-white mb-1 uppercase tracking-tight line-clamp-1">{selectedCert.title}</h2>
                <p className="text-violet-400 font-medium mb-4 uppercase tracking-[0.2em] text-[10px] md:text-xs">{selectedCert.issuer}</p>
                <div className="relative w-full max-h-[70vh] bg-black/20 rounded-lg border border-white/5 overflow-hidden flex items-center justify-center">
                  <img 
                    src={selectedCert.image} 
                    alt={selectedCert.title} 
                    loading="eager"
                    decoding="async"
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = lang === 'es' ? 'https://placehold.co/600x400/121212/8b5cf6?text=Cargando+Certificado...' : 'https://placehold.co/600x400/121212/8b5cf6?text=Loading+Certificate...';
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
