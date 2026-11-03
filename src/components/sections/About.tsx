import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, BadgeCheck, Download, Rocket, UserRound } from 'lucide-react';
import { useState } from 'react';
import { aboutStats, profile } from '../../data/profile';
import { CountUp } from '../ui/CountUp';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { TechIcon } from '../ui/TechIcon';
import './About.css';

function PhotoCard() {
  const [failed, setFailed] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 150, damping: 18 });

  return (
    <Reveal className="photo-wrap">
      <motion.div
        className="photo-card"
        style={{ rotateX: rx, rotateY: ry }}
        onPointerMove={e => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
      >
        <div className="photo-glow" />
        <div className={`photo-frame ${failed ? 'no-photo' : ''}`}>
          {!failed && <img src={profile.photo} alt={`${profile.firstName} ${profile.lastName} — ${profile.title}`} onError={() => setFailed(true)} />}
          {failed && <span className="photo-fallback">NR</span>}
          <div className="photo-shine" />
        </div>

        <div className="pf pf-1">
          <span className="pf-num grad-text">3.8+</span>
          <span className="pf-txt">Years building<br />production apps</span>
        </div>
        <div className="pf pf-2">
          <span className="dot-live" /> Open to work
        </div>
        <div className="pf pf-3">
          <TechIcon name="Python" size={18} />
          <TechIcon name="Django" size={18} />
          <TechIcon name="React" size={18} />
          <TechIcon name="AWS" size={20} />
          <span>Full Stack</span>
        </div>
      </motion.div>
    </Reveal>
  );
}

export function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHeading icon={UserRound} eyebrow="About me" title="Turning Ideas Into" highlight="Scalable Products" lottie="space-dev" />

        <div className="about-grid">
          <PhotoCard />

          <Reveal className="about-text" delay={0.1}>
            <p>
              I'm a <strong>Full Stack Developer</strong> who loves owning a feature from the first database table to the last
              pixel. I design <strong>clean REST APIs</strong>, model data that scales, and connect it to fast, responsive interfaces.
            </p>
            <p>
              Over the last <strong>3.8+ years</strong> I've built <strong>serverless trading systems on AWS</strong> that stream real-time
              market data, <strong>broker-integrated trading bots</strong>, flight &amp; hotel booking engines and edtech platforms — using{' '}
              <strong>Python, Django, FastAPI, Flask, React, PostgreSQL, MongoDB and Redis</strong>.
            </p>
            <p>
              Today I'm back at <strong>Rirabh</strong>, where my career began — now in a broader <strong>full stack role</strong>. I care
              about performance, security and code the next developer will thank me for.
            </p>

            <ul className="about-points">
              {['API-first architecture', 'Serverless & event-driven AWS', 'Performance & security', 'End-to-end ownership'].map(t => (
                <li key={t}><BadgeCheck size={18} /> {t}</li>
              ))}
            </ul>

            <div className="about-actions">
              <a href={profile.resume} className="btn btn-primary" download={profile.resumeFileName}><Download /> Download Résumé</a>
              <a href="#contact" className="btn btn-ghost">Let's Talk <ArrowRight /></a>
            </div>
          </Reveal>
        </div>

        <div className="stats-row">
          {(['career', 'engineering'] as const).map((group, gi) => (
            <Reveal key={group} delay={gi * 0.1} className="stat-group">
              <h4>{group === 'career' ? <><Rocket size={14} /> Career</> : <><BadgeCheck size={14} /> Engineering</>}</h4>
              <div className="stats">
                {aboutStats[group].map(s => (
                  <div key={s.label} className="stat glass">
                    <CountUp className="grad-text stat-num" value={s.value} decimals={'decimals' in s ? s.decimals : 0} suffix={'suffix' in s ? s.suffix : ''} />
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
