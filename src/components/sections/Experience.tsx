import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { CalendarDays, ChevronRight, History, MapPin, Route, Timer } from 'lucide-react';
import { useRef } from 'react';
import { experience, type Job } from '../../data/experience';
import { SideArt } from '../ui/SideArt';
import { SectionHeading } from '../ui/SectionHeading';
import { TechIcon, techColor } from '../ui/TechIcon';
import './Experience.css';

/** Fills the empty half of each timeline row: big outlined year, duration, focus and floating logos. */
function YearPanel({ job }: { job: Job }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <motion.div ref={ref} className="tl-side" style={{ y }} aria-hidden>
      <motion.div
        className="tl-year"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {job.year}
      </motion.div>
      <div className="tl-side-meta">
        <span className={`tl-dur ${job.current ? 'now' : ''}`}>
          {job.current ? <span className="dot-live" /> : <Timer size={13} />} {job.duration}
        </span>
        <span className="tl-focus">{job.focus}</span>
      </div>
      <div className="tl-logos">
        {job.logos.map((l, i) => (
          <motion.span
            key={l}
            className="tl-logo"
            style={{ ['--c' as string]: techColor(l) }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <span className="tl-logo-in" style={{ animationDelay: `${i * -1.2}s` }}>
              <TechIcon name={l} size={22} />
            </span>
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <section className="section" id="experience">
      <SideArt left="growth" right="clock" />
      <div className="container">
        <SectionHeading
          icon={Route}
          eyebrow="Career"
          title="Experience"
          highlight="Journey"
          sub="From intern to full stack developer — 3.8+ years building production software."
          lottie="coding-boy"
        />

        <div className="timeline" ref={ref}>
          <div className="tl-track" />
          <motion.div className="tl-fill" style={{ scaleY: fill }} />

          {experience.map((job, i) => (
            <motion.article
              key={job.role + job.period}
              className={`tl-item ${i % 2 ? 'right' : 'left'}`}
              initial={{ opacity: 0, x: i % 2 ? 60 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className={`tl-node ${job.current ? 'current' : ''}`}>{job.short}</div>
              <YearPanel job={job} />
              <div className="tl-card glass">
                <div className="tl-top">
                  <span className="tl-date"><CalendarDays size={14} /> {job.period}</span>
                  {job.current && <span className="tl-now"><span className="dot-live" /> Current</span>}
                </div>
                <h3>{job.role}</h3>
                <div className="tl-co">
                  {job.company}
                  <span><MapPin size={13} /> {job.location}</span>
                </div>
                {job.note && <div className="tl-note"><History size={14} /> {job.note}</div>}
                <ul>
                  {job.points.map(p => <li key={p}><ChevronRight size={16} /> {p}</li>)}
                </ul>
                <div className="tl-stack">
                  {job.stack.map(s => (
                    <span className="tag" key={s}>
                      <TechIcon name={s === 'AWS Lambda' ? 'Lambda' : s === 'DRF' ? 'Django REST Framework' : s === 'JWT' ? 'JWT Auth' : s} size={13} />
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
