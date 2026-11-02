import { useInView } from 'framer-motion';
import { FlaskConical, Hammer, Heart, Rocket } from 'lucide-react';
import { useRef } from 'react';
import { TechIcon } from './TechIcon';
import './SideArt.css';

/*
 * Decorative graphics for the empty left/right margins of a section.
 * Pure SVG + CSS animation; each sticks to the viewport while its section scrolls past,
 * and animations pause while off-screen. Every design is themed to the section it sits in.
 */

export type ArtKind = 'orbit' | 'pulse' | 'cube' | 'terminal' | 'circuit' | 'pipeline' | 'growth' | 'clock' | 'bars' | 'hex' | 'radar' | 'plane';

/* About — a personal "universe" */
function Orbit() {
  return (
    <svg viewBox="0 0 100 100" className="art-orbit">
      <circle cx="50" cy="50" r="46" className="ao-ring dashed" />
      <circle cx="50" cy="50" r="32" className="ao-ring" />
      <circle cx="50" cy="50" r="18" className="ao-ring dashed slow" />
      <g className="ao-spin a"><circle cx="50" cy="4" r="3.2" className="ao-planet p1" /></g>
      <g className="ao-spin b"><circle cx="82" cy="50" r="2.6" className="ao-planet p2" /></g>
      <g className="ao-spin c"><circle cx="50" cy="32" r="2.2" className="ao-planet p3" /></g>
      <circle cx="50" cy="50" r="7" className="ao-core" />
    </svg>
  );
}

/* About — passion for code, as a heartbeat */
function Pulse() {
  return (
    <div className="art-card art-pulse">
      <div className="ap-heart">
        <span className="ap-ripple" />
        <span className="ap-ripple r2" />
        <Heart size={22} />
      </div>
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="ap-ecg">
        <path d="M0 20 H30 L36 8 L42 32 L48 4 L54 26 L58 20 H100" />
      </svg>
      <div className="ap-label"><b>passion</b><span>while(true)</span></div>
    </div>
  );
}

/* Projects — the stack that projects are built with */
const FACES = ['Python', 'React', 'AWS', 'Django', 'PostgreSQL', 'FastAPI'];
function Cube() {
  return (
    <div className="art-cube-wrap">
      <div className="art-cube">
        {FACES.map((f, i) => (
          <span key={f} className={`face f${i}`}><TechIcon name={f} size={30} /></span>
        ))}
      </div>
      <span className="cube-shadow" />
    </div>
  );
}

/* Projects — code being written */
const LOG = [
  ['k', 0.55], ['s', 0.8], ['f', 0.4], ['k', 0.7], ['ok', 0.5], ['s', 0.65], ['f', 0.85], ['k', 0.45], ['ok', 0.6], ['s', 0.75],
] as const;
function Terminal() {
  return (
    <div className="art-term">
      <div className="at-head"><i /><i /><i /></div>
      <div className="at-body">
        <div className="at-scroll">
          {[...LOG, ...LOG].map(([c, w], i) => <span key={i} className={`at-line ${c}`} style={{ width: `${w * 100}%` }} />)}
        </div>
      </div>
      <span className="at-caret" />
    </div>
  );
}

/* Process — designing the system */
const TRACES = ['M10 0 V40 H40 V90', 'M90 0 V30 H60 V70 H80 V120', 'M50 0 V20', 'M40 90 V140 H20 V200', 'M80 120 V160 H50 V200', 'M20 140 H5'];
function Circuit() {
  return (
    <svg viewBox="0 0 100 200" className="art-circuit">
      {TRACES.map((d, i) => (
        <g key={i}>
          <path d={d} className="ac-trace" />
          <path d={d} className="ac-pulse" style={{ animationDelay: `${i * -0.9}s` }} />
        </g>
      ))}
      {[[40, 90], [80, 120], [60, 70], [20, 140], [50, 20], [10, 40], [50, 160]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" className="ac-node" style={{ animationDelay: `${i * 0.4}s` }} />
      ))}
      <rect x="28" y="96" width="34" height="22" rx="4" className="ac-chip" />
      <text x="45" y="110" className="ac-chip-txt">API</text>
    </svg>
  );
}

/* Process — shipping it: a CI/CD pipeline */
const STAGES = [
  { icon: Hammer, label: 'Build' },
  { icon: FlaskConical, label: 'Test' },
  { icon: Rocket, label: 'Deploy' },
];
function Pipeline() {
  return (
    <div className="art-pipe">
      <div className="pp-track"><span className="pp-packet" /></div>
      {STAGES.map(({ icon: Icon, label }, i) => (
        <div key={label} className="pp-stage" style={{ animationDelay: `${i * 1}s` }}>
          <span className="pp-node"><Icon size={16} /></span>
          <span className="pp-label">{label}</span>
          <span className="pp-ok">✓</span>
        </div>
      ))}
    </div>
  );
}

/* Experience — career growth */
function Growth() {
  return (
    <svg viewBox="0 0 100 120" className="art-growth">
      <line x1="4" y1="112" x2="96" y2="112" className="ag-axis" />
      {[30, 46, 62, 84].map((h, i) => (
        <rect key={i} x={10 + i * 21} y={112 - h} width="14" height={h} rx="3" className="ag-bar" style={{ animationDelay: `${i * 0.25}s` }} />
      ))}
      <path d="M8 86 L31 70 L52 54 L73 30 L92 10" className="ag-trend" />
      <path d="M84 8 L93 9 L91 18" className="ag-arrow" />
      <text x="10" y="108" className="ag-year">'22</text>
      <text x="73" y="108" className="ag-year">'26</text>
    </svg>
  );
}

/* Experience — years of experience ticking by */
function Clock() {
  return (
    <svg viewBox="0 0 100 100" className="art-clock">
      <circle cx="50" cy="50" r="46" className="ak-face" />
      <circle cx="50" cy="50" r="46" className="ak-progress" />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1="50" y1="8" x2="50" y2={i % 3 === 0 ? 16 : 12} className="ak-tick" transform={`rotate(${i * 30} 50 50)`} />
      ))}
      <line x1="50" y1="50" x2="50" y2="28" className="ak-hand hour" />
      <line x1="50" y1="50" x2="50" y2="18" className="ak-hand min" />
      <line x1="50" y1="56" x2="50" y2="14" className="ak-hand sec" />
      <circle cx="50" cy="50" r="3.5" className="ak-pin" />
      <text x="50" y="74" className="ak-txt">3.8+ yrs</text>
    </svg>
  );
}

/* Skills — live performance */
function Bars() {
  return (
    <div className="art-card art-bars">
      <div className="ab-head"><span className="dot-live" /> req/s</div>
      <div className="ab-cols">
        {[0.6, 0.9, 0.4, 0.75, 0.5, 0.85].map((h, i) => (
          <span key={i} style={{ ['--h' as string]: h, animationDelay: `${i * -0.35}s` }} />
        ))}
      </div>
      <svg viewBox="0 0 100 30" className="ab-line" preserveAspectRatio="none">
        <path d="M0 22 L15 18 L30 24 L45 10 L60 14 L75 6 L90 12 L100 8" />
      </svg>
    </div>
  );
}

/* Skills — a honeycomb skill matrix */
const HEX = 'M50 0 L93 25 L93 75 L50 100 L7 75 L7 25 Z';
function Hex() {
  const cells: [number, number][] = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < (r % 2 ? 2 : 3); c++) cells.push([r, c]);
  return (
    <svg viewBox="0 0 100 150" className="art-hex">
      {cells.map(([r, c], i) => {
        const x = (r % 2 ? 22 : 6) + c * 32;
        const y = 4 + r * 28;
        return (
          <path
            key={i}
            d={HEX}
            transform={`translate(${x} ${y}) scale(0.28)`}
            className="ah-cell"
            style={{ animationDelay: `${((i * 7) % 11) * 0.35}s` }}
          />
        );
      })}
    </svg>
  );
}

/* Contact — scanning for opportunities */
function Radar() {
  return (
    <div className="art-radar">
      <div className="ar-sweep" />
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" />
        <circle cx="50" cy="50" r="32" />
        <circle cx="50" cy="50" r="16" />
        <path d="M50 2 V98 M2 50 H98" />
      </svg>
      <span className="ar-blip" style={{ left: '68%', top: '30%' }} />
      <span className="ar-blip" style={{ left: '28%', top: '62%', animationDelay: '-1.2s' }} />
      <span className="ar-blip" style={{ left: '58%', top: '74%', animationDelay: '-2.1s' }} />
    </div>
  );
}

/* Contact — a message on its way */
const FLIGHT = 'M10 150 C 10 90, 90 110, 80 60 S 20 20, 60 6';
function Plane() {
  return (
    <svg viewBox="0 0 100 160" className="art-plane">
      <path d={FLIGHT} className="apl-trail" />
      <g>
        <path d="M-9 -6 L11 0 L-9 6 L-5 0 Z M-5 0 L11 0" className="apl-plane" />
        <animateMotion dur="5s" repeatCount="indefinite" rotate="auto" path={FLIGHT} />
      </g>
      <g className="apl-mail" transform="translate(4 140)">
        <rect width="22" height="15" rx="2" />
        <path d="M0 1 L11 9 L22 1" />
      </g>
    </svg>
  );
}

const ART: Record<ArtKind, () => JSX.Element> = {
  orbit: Orbit, pulse: Pulse, cube: Cube, terminal: Terminal, circuit: Circuit, pipeline: Pipeline,
  growth: Growth, clock: Clock, bars: Bars, hex: Hex, radar: Radar, plane: Plane,
};

function Rail({ kind, side }: { kind: ArtKind; side: 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { margin: '100px' });
  const Art = ART[kind];
  return (
    <div ref={ref} className={`side-rail ${side} ${on ? 'on' : ''}`} aria-hidden>
      <div className="side-art">
        <Art />
      </div>
    </div>
  );
}

export function SideArt({ left, right }: { left: ArtKind; right: ArtKind }) {
  return (
    <>
      <Rail kind={left} side="left" />
      <Rail kind={right} side="right" />
    </>
  );
}
