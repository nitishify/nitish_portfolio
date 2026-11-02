import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CheckCircle2, Rocket } from 'lucide-react';
import { heroCycle, orbitInner, orbitOuter } from '../../data/tech';
import { TechIcon, techColor } from '../ui/TechIcon';
import { CodeCard } from './CodeCard';
import './TechOrbit.css';

// Brand colours too pale to read on the white core disc.
const LIGHT_LOGOS = ['Flask', 'GitHub'];

function Ring({ items, radius, duration, reverse }: { items: string[]; radius: number; duration: number; reverse?: boolean }) {
  return (
    <div
      className="ring"
      style={{ width: radius * 2, height: radius * 2, animationDuration: `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
    >
      {items.map((name, i) => {
        const angle = (360 / items.length) * i;
        return (
          <div key={name} className="ring-slot" style={{ transform: `rotate(${angle}deg) translateX(${radius}px) rotate(${-angle}deg)` }}>
            <div
              className="ring-badge"
              style={{ animationDuration: `${duration}s`, animationDirection: reverse ? 'normal' : 'reverse', ['--c' as string]: techColor(name) }}
              title={name}
            >
              <TechIcon name={name} size={26} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function TechOrbit({ start }: { start: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(n => (n + 1) % heroCycle.length), 2200);
    return () => clearInterval(t);
  }, []);
  const name = heroCycle[i];

  return (
    <motion.div
      className="orbit-wrap"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={start ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.1, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="orbit-stage">
        {/* Decorative rings */}
        <svg className="orbit-lines" viewBox="0 0 520 520" aria-hidden>
          <defs>
            <linearGradient id="og" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#3b82f6" />
              <stop offset=".5" stopColor="#22d3ee" />
              <stop offset="1" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
          <circle cx="260" cy="260" r="245" className="ol-dash" />
          <circle cx="260" cy="260" r="200" className="ol-solid" />
          <circle cx="260" cy="260" r="130" className="ol-solid" />
          <circle cx="260" cy="260" r="200" className="ol-arc" />
          <circle cx="260" cy="260" r="130" className="ol-arc ol-arc-2" />
        </svg>

        <Ring items={orbitOuter} radius={200} duration={46} />
        <Ring items={orbitInner} radius={130} duration={30} reverse />

        {/* Core */}
        <div className="core" style={{ ['--c' as string]: techColor(name) }}>
          <span className="core-pulse" />
          <span className="core-pulse p2" />
          <span className="core-border" />
          <div className="core-disc">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={name}
                className="core-icon"
                initial={{ opacity: 0, scale: 0.3, rotate: -90, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.6, rotate: 45, filter: 'blur(8px)' }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              >
                <TechIcon name={name} size={72} color={LIGHT_LOGOS.includes(name) ? '#111827' : undefined} />
              </motion.div>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={name}
              className="core-label"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {name}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Floating cards */}
        <motion.div className="float-card status-card" animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="sc-icon"><Rocket size={18} /></div>
          <div>
            <b>Deployed to AWS Lambda</b>
            <span><CheckCircle2 size={13} /> 200 OK · 38 ms</span>
          </div>
          <svg className="spark" viewBox="0 0 80 28" aria-hidden>
            <path d="M0 22 L10 18 L20 20 L30 12 L40 15 L50 8 L60 11 L70 4 L80 6" />
          </svg>
        </motion.div>

        <motion.div className="float-card code-float" animate={{ y: [0, 12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
          <CodeCard />
        </motion.div>
      </div>
    </motion.div>
  );
}
