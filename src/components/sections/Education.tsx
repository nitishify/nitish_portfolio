import { Award, CalendarDays, GraduationCap } from 'lucide-react';
import { education } from '../../data/profile';
import { Lottie } from '../ui/Lottie';
import { Reveal } from '../ui/Reveal';
import './Contact.css';

export function Education() {
  return (
    <section className="section edu-section" id="education">
      <div className="container">
        <Reveal className="edu glass">
          <div className="edu-icon"><GraduationCap size={34} strokeWidth={1.6} /></div>
          <div className="edu-main">
            <div className="eyebrow">Education</div>
            <h3>{education.degree}</h3>
            <p>{education.school}</p>
            <span className="edu-date"><CalendarDays size={14} /> {education.period}</span>
          </div>
          <Lottie name="graduation" className="edu-lottie" />
          <div className="edu-score">
            <Award size={22} />
            <b className="grad-text">{education.score}</b>
            <span>{education.scoreLabel}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
