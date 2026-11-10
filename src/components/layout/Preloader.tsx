import { motion, type Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { profile } from '../../data/profile';
import './Preloader.css';

const DURATION = 2200;
const R = 86; // progress ring radius (viewBox 200)
const C = 2 * Math.PI * R;
const COLUMNS = 5;
const STATUS = ['Booting up…', 'Loading projects…', 'Compiling experience…', 'Deploying portfolio…', 'Ready ✓'];

const shell: Variants = {
  exit: { transition: { when: 'afterChildren' } },
};
const content: Variants = {
  exit: { opacity: 0, scale: 0.92, filter: 'blur(6px)', transition: { duration: 0.35 } },
};
const column: Variants = {
  exit: (i: number) => ({ y: '-100%', transition: { duration: 0.75, delay: 0.25 + i * 0.07, ease: [0.76, 0, 0.24, 1] } }),
};

/** Intro: photo with a filling progress ring, name reveal and counter, then a staggered curtain lift. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  const [photoOk, setPhotoOk] = useState(true);

  useEffect(() => {
    // Timer-based (not rAF) so it still finishes in background tabs.
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / DURATION);
      setN(Math.round(100 * (1 - Math.pow(1 - p, 2.4))));
      if (p >= 1) clearInterval(id);
    }, 30);
    const finish = setTimeout(onDone, DURATION + 350);
    return () => {
      clearInterval(id);
      clearTimeout(finish);
    };
  }, [onDone]);

  const status = STATUS[Math.min(STATUS.length - 1, Math.floor((n / 100) * (STATUS.length - 1) + 0.0001))];
  const angle = (n / 100) * 360;
  const name = `${profile.firstName} ${profile.lastName}`;

  return (
    <motion.div className="pl" variants={shell} exit="exit" role="status" aria-label={`Loading ${n}%`}>
      {/* Curtain columns (the lift reveals the site) */}
      <div className="pl-cols" aria-hidden>
        {Array.from({ length: COLUMNS }, (_, i) => (
          <motion.span key={i} className="pl-col" custom={i} variants={column} />
        ))}
      </div>

      <motion.div className="pl-content" variants={content}>
        <div className="pl-aurora" aria-hidden />

        <div className="pl-avatar">
          <span className="pl-halo" aria-hidden />
          <svg viewBox="0 0 200 200" className="pl-ring" aria-hidden>
            <defs>
              <linearGradient id="plRing" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" style={{ stopColor: 'var(--blue)' }} />
                <stop offset=".55" style={{ stopColor: 'var(--cyan)' }} />
                <stop offset="1" style={{ stopColor: 'var(--a3)' }} />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r={R} className="pl-track" />
            <circle
              cx="100" cy="100" r={R}
              className="pl-progress"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - n / 100)}
            />
            {/* Glowing dot riding the leading edge of the progress */}
            <g transform={`rotate(${angle - 90} 100 100)`}>
              <circle cx={100 + R} cy="100" r="5" className="pl-dot" />
            </g>
          </svg>
          <div className="pl-photo" style={{ ['--p' as string]: n / 100 }}>
            {photoOk ? (
              <img src={profile.photo} alt="" onError={() => setPhotoOk(false)} />
            ) : (
              <span className="pl-mono">NR</span>
            )}
          </div>
        </div>

        <h1 className="pl-name" aria-label={name}>
          {name.split('').map((ch, i) => (
            <span key={i} className="pl-char-mask">
              <motion.span
                className="pl-char"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.7, delay: 0.25 + i * 0.045, ease: [0.2, 0.9, 0.2, 1] }}
              >
                {ch === ' ' ? ' ' : ch}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p className="pl-role" initial={{ opacity: 0, letterSpacing: '0.6em' }} animate={{ opacity: 1, letterSpacing: '0.28em' }} transition={{ duration: 1, delay: 0.7 }}>
          {profile.title}
        </motion.p>

        <div className="pl-foot">
          <span className="pl-status">{status}</span>
          <span className="pl-count">{n.toString().padStart(3, '0')}<small>%</small></span>
        </div>
        <div className="pl-bar"><span style={{ width: `${n}%` }} /></div>
      </motion.div>
    </motion.div>
  );
}
