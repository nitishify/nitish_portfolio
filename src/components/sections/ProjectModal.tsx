import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import { useEffect } from 'react';
import type { Project } from '../../data/projects';
import { TechIcon } from '../ui/TechIcon';
import { ProjectCover } from './Projects';

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="modal-bg" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <button className="modal-close" onClick={onClose} aria-label="Close"><X size={20} /></button>
            <ProjectCover p={project} big />
            <div className="modal-body">
              <div className="proj-meta">
                <span>{project.client}</span><i /><span>{project.domain}</span><i /><span>{project.year}</span>
              </div>
              <h3>{project.title}</h3>
              <p className="modal-desc">{project.short}</p>

              <h4>Architecture</h4>
              <div className="flow">
                {project.flow.map((f, i) => (
                  <span key={f.label} className="flow-step">
                    <motion.span
                      className={`flow-node ${f.key ? 'key' : ''}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.08 }}
                    >
                      {f.label}
                    </motion.span>
                    {i < project.flow.length - 1 && <ArrowRight size={14} className="flow-arrow" />}
                  </span>
                ))}
              </div>

              <h4>What I built</h4>
              <ul className="checks">
                {project.points.map((pt, i) => (
                  <motion.li key={pt} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.05 }}>
                    <CheckCircle2 size={18} /> {pt}
                  </motion.li>
                ))}
              </ul>

              <h4>Tech stack</h4>
              <div className="proj-tags">
                {project.stack.map(s => (
                  <span className="tag" key={s}>
                    <TechIcon name={s === 'AWS Lambda' ? 'Lambda' : s === 'DRF' ? 'Django REST Framework' : s === 'JWT' ? 'JWT Auth' : s} size={13} />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
