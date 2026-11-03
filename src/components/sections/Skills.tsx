import { motion } from 'framer-motion';
import { Cloud, Database, LayoutTemplate, Server, ShieldCheck, Wrench, Cpu } from 'lucide-react';
import { skillGroups, type Level } from '../../data/tech';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { TechIcon, techColor } from '../ui/TechIcon';
import './Skills.css';

const GROUP_ICONS = { server: Server, layout: LayoutTemplate, cloud: Cloud, database: Database, shield: ShieldCheck, wrench: Wrench };
const LEVELS: { id: Level; label: string; bars: number }[] = [
  { id: 'expert', label: 'Expert', bars: 3 },
  { id: 'proficient', label: 'Proficient', bars: 2 },
  { id: 'familiar', label: 'Familiar', bars: 1 },
];
const barsFor = (l: Level) => LEVELS.find(x => x.id === l)!.bars;

export function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeading
          icon={Cpu}
          eyebrow="Toolkit"
          title="Tools &"
          highlight="Technologies"
          sub="The stack I use to design, build and ship production software."
          lottie="dev-skills"
        />

        <Reveal className="legend">
          {LEVELS.map(l => (
            <span key={l.id}>
              <span className="lv-bars">{[1, 2, 3].map(b => <i key={b} className={b <= l.bars ? 'on' : ''} />)}</span>
              {l.label}
            </span>
          ))}
        </Reveal>

        <div className="skills">
          {skillGroups.map((g, gi) => {
            const Icon = GROUP_ICONS[g.icon];
            return (
              <motion.div
                key={g.title}
                className="skill-card glass"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: (gi % 3) * 0.08 }}
              >
                <div className="sk-head">
                  <div className="sk-icon"><Icon size={22} strokeWidth={1.7} /></div>
                  <div>
                    <h3>{g.title}</h3>
                    <small>{g.items.length} technologies</small>
                  </div>
                </div>
                <div className="sk-list">
                  {g.items.map(([name, level], i) => (
                    <motion.div
                      key={name}
                      className="sk-item"
                      style={{ ['--c' as string]: techColor(name) }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.04 }}
                      whileHover={{ y: -3 }}
                    >
                      <span className="sk-logo"><TechIcon name={name} size={20} /></span>
                      <span className="sk-name">{name}</span>
                      <span className="lv-bars" title={level}>
                        {[1, 2, 3].map(b => <i key={b} className={b <= barsFor(level) ? 'on' : ''} />)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
