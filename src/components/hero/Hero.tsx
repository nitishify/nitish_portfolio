import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Download, Mail, MapPin, Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { profile, heroStats } from '../../data/profile';
import { marquee } from '../../data/tech';
import { useTypewriter } from '../../hooks/useTypewriter';
import { CountUp } from '../ui/CountUp';
import { Magnetic } from '../ui/Magnetic';
import { TechIcon } from '../ui/TechIcon';
import { ParticleField } from './ParticleField';
import { TechOrbit } from './TechOrbit';
import './Hero.css';

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } },
};
const letter: Variants = {
  hidden: { y: '110%', rotate: 8 },
  show: { y: '0%', rotate: 0, transition: { duration: 0.9, ease: [0.2, 0.9, 0.2, 1] } },
};

function SplitWord({ word }: { word: string }) {
  return (
    <motion.span className="split" variants={{ show: { transition: { staggerChildren: 0.05 } } }}>
      {word.split('').map((ch, i) => (
        <span className="split-mask" key={i}>
          <motion.span className="split-char" variants={letter}>{ch}</motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function Hero({ start }: { start: boolean }) {
  const role = useTypewriter(profile.roles, { start });

  return (
    <section className="hero" id="hero" onPointerMove={e => {
      const t = e.currentTarget;
      t.style.setProperty('--mx', `${e.clientX}px`);
      t.style.setProperty('--my', `${e.clientY - t.getBoundingClientRect().top}px`);
    }}>
      {/* Background layers */}
      <div className="hero-bg" aria-hidden>
        <div className="aurora a1" />
        <div className="aurora a2" />
        <div className="aurora a3" />
        <div className="hero-grid" />
        <ParticleField className="hero-particles" />
        <div className="hero-spot" />
        <div className="hero-fade" />
      </div>

      <div className="container hero-in">
        <motion.div className="hero-copy" variants={stagger} initial="hidden" animate={start ? 'show' : 'hidden'}>
          <motion.div variants={rise} className="avail">
            <span className="dot-live" />
            Available for opportunities
            <span className="avail-sep" />
            <MapPin size={14} /> {profile.location}
          </motion.div>

          <motion.p variants={rise} className="hello">
            <Sparkles size={18} /> Hi there, I'm
          </motion.p>

          <motion.h1 className="hero-name" variants={stagger}>
            <SplitWord word={profile.firstName} />{' '}
            <span className="split-mask">
              <motion.span className="split-char shimmer-text last-name" variants={letter}>{profile.lastName}</motion.span>
            </span>
          </motion.h1>

          <motion.div variants={rise} className="role">
            <span className="role-prefix">&lt;</span>
            <span className="role-text">{role}</span>
            <span className="caret" />
            <span className="role-prefix">/&gt;</span>
          </motion.div>

          <motion.p variants={rise} className="hero-lead">
            I build <strong>scalable web apps</strong>, <strong>REST APIs</strong> and <strong>serverless AWS systems</strong> —
            from real-time trading platforms to booking engines — with <strong>Python, Django, FastAPI &amp; React</strong>.
          </motion.p>

          <motion.div variants={rise} className="hero-cta">
            <Magnetic>
              <a href="#work" className="btn btn-primary">View My Work <ArrowRight /></a>
            </Magnetic>
            <Magnetic>
              <a href={profile.resume} className="btn btn-ghost" download={profile.resumeFileName}>
                <Download /> Download CV
              </a>
            </Magnetic>
          </motion.div>

          <motion.div variants={rise} className="hero-foot">
            <div className="socials">
              <a className="icon-btn" href={profile.github} target="_blank" rel="noopener" aria-label="GitHub"><FaGithub /></a>
              <a className="icon-btn" href={profile.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a className="icon-btn" href={`mailto:${profile.email}`} aria-label="Email"><Mail /></a>
            </div>
            <div className="hero-stats">
              {heroStats.map(s => (
                <div key={s.label} className="hs">
                  <CountUp className="grad-text" value={s.value} decimals={s.decimals} suffix={s.suffix} />
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <TechOrbit start={start} />
      </div>

      <motion.a
        href="#about"
        className="scroll-cue"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={start ? { opacity: 1 } : {}}
        transition={{ delay: 1.6 }}
      >
        <span className="mouse"><span className="wheel" /></span>
        Scroll
      </motion.a>

      <div className="tech-marquee" aria-hidden>
        <div className="tm-track">
          {[...marquee, ...marquee].map((n, i) => (
            <span className="tm-item" key={i}>
              <TechIcon name={n} size={22} />
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
