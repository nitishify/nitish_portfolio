import type { LucideIcon } from 'lucide-react';
import { Lottie } from './Lottie';
import { Reveal } from './Reveal';
import './ui.css';

interface SectionHeadingProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  highlight: string;
  sub?: string;
  /** Optional Lottie illustration (file name in public/lottie) shown beside the heading. */
  lottie?: string;
}

export function SectionHeading({ icon: Icon, eyebrow, title, highlight, sub, lottie }: SectionHeadingProps) {
  return (
    <Reveal className={`sec-head ${lottie ? 'has-art' : ''}`}>
      <div className="sec-head-main">
        <div className="sec-head-row">
          <div className="sec-icon">
            <span className="sec-icon-glow" />
            <Icon strokeWidth={1.6} />
          </div>
          <div>
            <div className="eyebrow">{eyebrow}</div>
            <h2 className="sec-title">
              {title} <span className="grad-text">{highlight}</span>
            </h2>
          </div>
        </div>
        {sub && <p className="sec-sub">{sub}</p>}
      </div>
      {lottie && <Lottie name={lottie} className="sec-lottie" />}
    </Reveal>
  );
}
