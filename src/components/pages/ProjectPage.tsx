import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Expand, Sparkle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { projects } from '../../data/projects';
import { ProjectCover } from '../sections/Projects';
import { TechIcon } from '../ui/TechIcon';
import './ProjectPage.css';

const iconName = (s: string) =>
  s === 'AWS Lambda' ? 'Lambda' : s === 'DRF' ? 'Django REST Framework' : s === 'JWT' ? 'JWT Auth' : s;

export function ProjectPage({ id }: { id: string }) {
  const index = projects.findIndex(p => p.id === id);
  const project = projects[index];
  const [zoom, setZoom] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const prev = document.title;
    if (project) document.title = `${project.title} | Nitish Raj`;
    return () => {
      document.title = prev;
    };
  }, [project]);

  useEffect(() => {
    if (zoom === null) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setZoom(null);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [zoom]);

  if (!project) {
    return (
      <section className="pp container">
        <a className="pp-back" href="/#work"><ArrowLeft size={16} /> All projects</a>
        <h1 className="pp-title">Project not found</h1>
        <p className="pp-short">This project doesn't exist. Head back to see everything I've built.</p>
      </section>
    );
  }

  const next = projects[(index + 1) % projects.length];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const gallery = project.gallery ?? [];

  return (
    <article className="pp" style={{ ['--a' as string]: project.accent }}>
      <div className="container">
        <a className="pp-back" href="/#work"><ArrowLeft size={16} /> All projects</a>

        <motion.header className="pp-hero" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="pp-hero-text">
            <div className="proj-meta">
              <span>{project.client}</span><i /><span>{project.domain}</span><i /><span>{project.year}</span>
            </div>
            <h1 className="pp-title">{project.title}</h1>
            <p className="pp-short">{project.short}</p>
            <div className="impact">
              {project.impact.map(t => <span key={t}><Sparkle size={12} /> {t}</span>)}
            </div>
            {project.liveUrl && (
              <a className="btn btn-primary pp-live" href={project.liveUrl} target="_blank" rel="noopener">
                Visit live site <ArrowUpRight size={16} />
              </a>
            )}
          </div>
          <div className="pp-hero-cover glass">
            <ProjectCover p={project} big />
          </div>
        </motion.header>

        <div className="pp-grid">
          <div className="pp-main">
            <section className="pp-block glass">
              <h2>Architecture</h2>
              <div className="flow">
                {project.flow.map((f, i) => (
                  <span key={f.label} className="flow-step">
                    <motion.span
                      className={`flow-node ${f.key ? 'key' : ''}`}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                    >
                      {f.label}
                    </motion.span>
                    {i < project.flow.length - 1 && <ArrowRight size={14} className="flow-arrow" />}
                  </span>
                ))}
              </div>
            </section>

            <section className="pp-block glass">
              <h2>What I built</h2>
              <ul className="checks">
                {project.points.map((pt, i) => (
                  <motion.li
                    key={pt}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <CheckCircle2 size={18} /> {pt}
                  </motion.li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="pp-side glass">
            <dl>
              <div><dt>Client</dt><dd>{project.client}</dd></div>
              <div><dt>Domain</dt><dd>{project.domain}</dd></div>
              <div><dt>Timeline</dt><dd>{project.year}</dd></div>
              {project.liveUrl && (
                <div>
                  <dt>Live</dt>
                  <dd><a href={project.liveUrl} target="_blank" rel="noopener">{new URL(project.liveUrl).host} <ArrowUpRight size={13} /></a></dd>
                </div>
              )}
            </dl>
            <h2>Tech stack</h2>
            <div className="proj-tags">
              {project.stack.map(s => (
                <span className="tag" key={s}><TechIcon name={iconName(s)} size={13} />{s}</span>
              ))}
            </div>
          </aside>
        </div>

        {gallery.length > 0 && (
          <section className="pp-gallery">
            <h2>Screens</h2>
            <div className={`pp-shots ${gallery.length === 1 ? 'one' : ''}`}>
              {gallery.map((g, i) => (
                <motion.figure
                  key={g.src}
                  className="pp-shot glass"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
                >
                  <button type="button" className="pp-shot-img" onClick={() => setZoom(i)} aria-label={`Enlarge: ${g.caption}`}>
                    <span className="pp-shot-bar"><i /><i /><i /></span>
                    <img src={g.src} alt={g.caption} loading="lazy" />
                    <span className="pp-zoom"><Expand size={16} /></span>
                  </button>
                  <figcaption>{g.caption}</figcaption>
                </motion.figure>
              ))}
            </div>
          </section>
        )}

        <nav className="pp-next" aria-label="More projects">
          <a href={`/projects/${prev.id}`} className="glass">
            <span><ArrowLeft size={14} /> Previous</span>
            <strong>{prev.title}</strong>
          </a>
          <a href={`/projects/${next.id}`} className="glass right">
            <span>Next <ArrowRight size={14} /></span>
            <strong>{next.title}</strong>
          </a>
        </nav>
      </div>

      <AnimatePresence>
        {zoom !== null && gallery[zoom] && (
          <motion.div className="pp-lightbox" onClick={() => setZoom(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="pp-lb-close" onClick={() => setZoom(null)} aria-label="Close"><X size={20} /></button>
            <motion.figure
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            >
              <img src={gallery[zoom].src} alt={gallery[zoom].caption} />
              <figcaption>{gallery[zoom].caption}</figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
