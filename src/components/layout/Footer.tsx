import { motion } from 'framer-motion';
import { ArrowUp, ArrowUpRight, Clock, Download, Heart, Mail, MapPin, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { profile } from '../../data/profile';
import { Lottie } from '../ui/Lottie';
import { Magnetic } from '../ui/Magnetic';
import { TechIcon } from '../ui/TechIcon';
import './Footer.css';

const NAV = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];
const BUILT_WITH = ['React', 'Python', 'AWS'];

/**
 * Giant brand wordmark that sits half-hidden below the footer's bottom edge.
 * On hover the letters rise up from the bottom in a left-to-right wave to reveal the whole word.
 */
function Wordmark() {
  const letters = profile.brand.split('');
  return (
    <motion.div
      className="f-wordmark"
      aria-hidden
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      variants={{ show: { transition: { staggerChildren: 0.07 } } }}
    >
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          className="wm-letter"
          style={{ ['--i' as string]: i }}
          variants={{
            hidden: { y: '70%', opacity: 0, rotate: 10 },
            show: { y: '0%', opacity: 1, rotate: 0, transition: { type: 'spring', stiffness: 170, damping: 13 } },
          }}
        >
          <span className="wm-in">{ch}</span>
        </motion.span>
      ))}
    </motion.div>
  );
}

// Deterministic "random" layout so particles don't jump between renders.
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  left: (i * 37) % 100,
  size: 2 + ((i * 7) % 5),
  delay: -((i * 13) % 12),
  duration: 9 + ((i * 5) % 8),
  hue: ['#60a5fa', '#22d3ee', '#a78bfa'][i % 3],
}));

const HEADLINE = 'Got a role or an idea?'.split(' ');

function useIstTime() {
  const fmt = () => new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true });
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export function Footer() {
  const time = useIstTime();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-glow" aria-hidden />
      <div className="f-particles" aria-hidden>
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              background: p.hue,
              boxShadow: `0 0 ${p.size * 3}px ${p.hue}`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="container">
        {/* CTA band */}
        <motion.div
          className="f-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div>
            <span className="f-pill"><span className="dot-live" /> Available for new roles</span>
            {/* The heading triggers the reveal: the words start clipped inside their masks,
                so they can never be "in view" themselves. */}
            <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}>
              {HEADLINE.map((w, i) => (
                <span key={i} className="f-word-mask">
                  <motion.span
                    className="f-word"
                    variants={{
                      hidden: { y: '110%' },
                      show: { y: '0%', transition: { duration: 0.7, delay: 0.1 + i * 0.07, ease: [0.2, 0.9, 0.2, 1] } },
                    }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
              <br />
              <motion.span
                className="shimmer-text f-cta-line2"
                variants={{
                  hidden: { opacity: 0, filter: 'blur(8px)' },
                  show: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.9, delay: 0.55 } },
                }}
              >
                Let's build it together.
              </motion.span>
            </motion.h2>
          </div>
          <Lottie name="rocket" className="f-rocket" />
          <div className="f-cta-actions">
            <Magnetic>
              <a className="btn btn-primary" href={`mailto:${profile.email}`}><Mail /> Say hello</a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-ghost" href={profile.resume} download={profile.resumeFileName}><Download /> Résumé</a>
            </Magnetic>
          </div>
        </motion.div>

        {/* Columns */}
        <div className="f-grid">
          <div className="f-brand">
            <a href="#hero" className="logo"><span>{profile.brand}</span></a>
            <p>
              {profile.firstName} {profile.lastName} — {profile.title} building fast, secure products with Python, Django,
              FastAPI, React and AWS.
            </p>
            <div className="f-social">
              <a className="icon-btn s-gh" href={profile.github} target="_blank" rel="noopener" aria-label="GitHub"><FaGithub /></a>
              <a className="icon-btn s-in" href={profile.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a className="icon-btn s-mail" href={`mailto:${profile.email}`} aria-label="Email"><Mail /></a>
            </div>
          </div>

          <nav className="f-col" aria-label="Footer">
            <h4>Navigate</h4>
            {NAV.map(n => (
              <a key={n.href} href={n.href} className="f-link">{n.label}<ArrowUpRight size={14} /></a>
            ))}
          </nav>

          <div className="f-col">
            <h4>Contact</h4>
            <a className="f-info" href={`mailto:${profile.email}`}><Mail size={16} />{profile.email}</a>
            <a className="f-info" href={profile.phoneHref}><Phone size={16} />{profile.phone}</a>
            <span className="f-info"><MapPin size={16} />{profile.location}</span>
            <span className="f-info"><Clock size={16} />{time} IST · usually replies in a day</span>
          </div>

          <div className="f-col">
            <h4>Profiles</h4>
            <a className="f-link" href={profile.linkedin} target="_blank" rel="noopener">LinkedIn<ArrowUpRight size={14} /></a>
            <a className="f-link" href={profile.github} target="_blank" rel="noopener">GitHub<ArrowUpRight size={14} /></a>
            <a className="f-link" href={profile.resume} download={profile.resumeFileName}>Download résumé<ArrowUpRight size={14} /></a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="f-bottom">
          <span>© {year} {profile.firstName} {profile.lastName}. All rights reserved.</span>
          <span className="f-built">
            Crafted with <Heart size={13} className="heart" /> using
            {BUILT_WITH.map(t => <span key={t} className="f-tech" title={t}><TechIcon name={t} size={14} /></span>)}
          </span>
          <button className="f-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top <ArrowUp size={15} />
          </button>
        </div>
      </div>

      {/* Giant wordmark */}
      <Wordmark />
    </footer>
  );
}
