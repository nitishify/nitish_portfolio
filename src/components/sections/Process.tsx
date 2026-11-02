import { motion, useScroll, useSpring } from 'framer-motion';
import { Activity, Code2, DraftingCompass, SearchCode, Workflow, type LucideIcon } from 'lucide-react';
import { useRef } from 'react';
import { SideArt } from '../ui/SideArt';
import { SectionHeading } from '../ui/SectionHeading';
import './Process.css';

const STEPS: { icon: LucideIcon; title: string; text: string; tags: string[] }[] = [
  {
    icon: SearchCode,
    title: 'Discover',
    text: 'Understand the problem, the users and the constraints before writing a line of code.',
    tags: ['Requirements', 'Edge cases'],
  },
  {
    icon: DraftingCompass,
    title: 'Design',
    text: 'Model the data and design clean, documented REST APIs that are easy to build on.',
    tags: ['Schema', 'API contracts'],
  },
  {
    icon: Code2,
    title: 'Build',
    text: 'Ship features end-to-end with Django, FastAPI and React — reviewed, tested and secure.',
    tags: ['Full stack', 'JWT · RBAC'],
  },
  {
    icon: Activity,
    title: 'Ship & Monitor',
    text: 'Deploy on AWS, add structured logging and alerts, then iterate on real usage.',
    tags: ['AWS', 'CloudWatch'],
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <section className="section" id="process">
      <SideArt left="circuit" right="pipeline" />
      <div className="container">
        <SectionHeading
          icon={Workflow}
          eyebrow="Process"
          title="How I"
          highlight="Build"
          sub="A simple, repeatable way of turning an idea into reliable software in production."
        />

        <div className="proc" ref={ref}>
          <div className="proc-track" aria-hidden>
            <motion.div className="proc-fill" style={{ ['--p' as string]: fill }} />
          </div>

          {STEPS.map((s, i) => (
            <motion.article
              key={s.title}
              className="proc-step"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className="proc-node">
                <span className="proc-ring" />
                <s.icon size={26} strokeWidth={1.7} />
              </div>
              <div className="proc-card glass">
                <span className="proc-num">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <div className="proc-tags">
                  {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
