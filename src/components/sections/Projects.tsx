import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, BotMessageSquare, BriefcaseBusiness, CandlestickChart, FileStack, GraduationCap, PhoneCall, Plane, Sparkle } from 'lucide-react';
import { useState } from 'react';
import { projectFilters, projects, type Project } from '../../data/projects';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { TechIcon } from '../ui/TechIcon';
import './Projects.css';

export const PROJECT_ICONS = { chart: CandlestickChart, bot: BotMessageSquare, plane: Plane, grad: GraduationCap, phone: PhoneCall, briefcase: FileStack };

/** Illustrated project cover; screenshots live in the gallery on each project's own page. */
export function ProjectCover({ p, big }: { p: Project; big?: boolean }) {
  const Icon = PROJECT_ICONS[p.icon];
  return (
    <div className={`cover ${big ? 'big' : ''}`} style={{ ['--a' as string]: p.accent }}>
      <div className="cover-grid" />
      <div className="cover-blob" />
      <svg className="cover-wave" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden>
        <path d="M0 90 C 60 40, 100 110, 160 70 S 260 20, 320 60 S 380 40, 400 30" />
        <path d="M0 100 C 70 70, 120 120, 190 90 S 290 50, 400 70" className="w2" />
      </svg>
      <div className="cover-icon">
        <span className="ci-ring" />
        <Icon strokeWidth={1.5} />
      </div>
      {p.liveUrl && <span className="live-badge"><span className="dot-live" /> Live</span>}
      <div className="cover-chips">
        {p.stack.slice(0, 3).map(s => (
          <span key={s}><TechIcon name={s === 'AWS Lambda' ? 'AWS' : s === 'DRF' ? 'Django' : s} size={14} />{s}</span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <motion.a
      layout
      href={`/projects/${p.id}`}
      className="proj glass"
      aria-label={`${p.title}: open case study`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -6 }}
      onPointerMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
      }}
      style={{ ['--a' as string]: p.accent }}
    >
      <span className="proj-spot" />
      <ProjectCover p={p} />
      <div className="proj-body">
        <div className="proj-meta">
          <span>{p.client}</span>
          <i />
          <span>{p.domain}</span>
          <i />
          <span>{p.year}</span>
        </div>
        <h3>{p.title}</h3>
        <p>{p.short}</p>
        <div className="impact">
          {p.impact.map(t => <span key={t}><Sparkle size={12} /> {t}</span>)}
        </div>
        <div className="proj-foot">
          <div className="proj-tags">
            {p.stack.slice(0, 4).map(s => <span className="tag" key={s}>{s}</span>)}
            {p.stack.length > 4 && <span className="tag">+{p.stack.length - 4}</span>}
          </div>
          <span className="proj-open">Case study <ArrowUpRight size={16} /></span>
        </div>
      </div>
    </motion.a>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]['id']>('all');
  const shown = projects.filter(p => filter === 'all' || p.tags.includes(filter));

  return (
    <section className="section" id="work">
      <div className="container">
        <SectionHeading
          icon={BriefcaseBusiness}
          eyebrow="Portfolio"
          title="Projects I've"
          highlight="Built & Shipped"
          sub="Real products delivered for clients across telecom, accounting, fintech, travel and education. Open any project for the full case study."
          lottie="web-dev"
        />

        <Reveal className="filters">
          {projectFilters.map(f => (
            <button key={f.id} className={filter === f.id ? 'on' : ''} onClick={() => setFilter(f.id)}>
              {filter === f.id && <motion.span layoutId="filter-pill" className="filter-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span>{f.label}</span>
            </button>
          ))}
        </Reveal>

        <motion.div layout className="projects">
          <AnimatePresence initial={false}>
            {shown.map(p => <ProjectCard key={p.id} p={p} />)}
          </AnimatePresence>
        </motion.div>
      </div>

    </section>
  );
}
