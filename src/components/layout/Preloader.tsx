import { motion, type Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { profile } from '../../data/profile';
import './Preloader.css';

const DURATION = 1900;
const R = 92; // progress ring radius (viewBox 200)
const C = 2 * Math.PI * R;
const EASE = [0.76, 0, 0.24, 1] as const;

const panel: Variants = {
  exit: { y: '-100%', transition: { duration: 0.85, delay: 0.2, ease: EASE } },
};
const content: Variants = {
  exit: { opacity: 0, y: -24, transition: { duration: 0.4, ease: EASE } },
};

/** Intro: calm, editorial — photo inside a thin progress ring, name and role, a hairline progress bar; then the panel lifts away. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  const [photoOk, setPhotoOk] = useState(true);

  useEffect(() => {
    // Timer-based (not rAF) so it still finishes in background tabs.
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / DURATION);
      setN(Math.round(100 * (1 - Math.pow(1 - p, 2.2))));
      if (p >= 1) clearInterval(id);
    }, 30);
    const finish = setTimeout(onDone, DURATION + 300);
    return () => {
      clearInterval(id);
      clearTimeout(finish);
    };
  }, [onDone]);

  const name = `${profile.firstName} ${profile.lastName}`;
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] as const },
  });

  return (
    <motion.div className="pl" variants={panel} exit="exit" role="status" aria-label={`Loading ${n}%`}>
      <motion.div className="pl-inner" variants={content}>
        {/* Corner details */}
        <motion.div className="pl-corner pl-tl" {...fade(0.1)}>
          <span className="pl-brand">Nitishify</span>
        </motion.div>
        <motion.div className="pl-corner pl-tr" {...fade(0.15)}>
          Portfolio · {new Date().getFullYear()}
        </motion.div>

        {/* Centre */}
        <div className="pl-center">
          <motion.div
            className="pl-avatar"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <svg viewBox="0 0 200 200" className="pl-ring" aria-hidden>
              <circle cx="100" cy="100" r={R} className="pl-track" />
              <circle cx="100" cy="100" r={R} className="pl-progress" strokeDasharray={C} strokeDashoffset={C * (1 - n / 100)} />
            </svg>
            <div className="pl-photo">
              {photoOk ? <img src={profile.photo} alt="" onError={() => setPhotoOk(false)} /> : <span className="pl-mono">NR</span>}
            </div>
          </motion.div>

          <h1 className="pl-name" aria-label={name}>
            <span className="pl-mask">
              <motion.span
                className="pl-line"
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.2, 0.9, 0.2, 1] }}
              >
                {profile.firstName} <em>{profile.lastName}</em>
              </motion.span>
            </span>
          </h1>

          <motion.p className="pl-role" {...fade(0.55)}>
            {profile.title}
          </motion.p>
          <motion.p className="pl-stack" {...fade(0.7)}>
            Python · Django · FastAPI · React · AWS
          </motion.p>
        </div>

        {/* Bottom: location + counter over a hairline bar */}
        <motion.div className="pl-bottom" {...fade(0.3)}>
          <span className="pl-loc">{profile.location}</span>
          <span className="pl-count">
            {n}
            <small>%</small>
          </span>
        </motion.div>
        <div className="pl-bar" aria-hidden>
          <span style={{ transform: `scaleX(${n / 100})` }} />
        </div>
      </motion.div>
    </motion.div>
  );
}
