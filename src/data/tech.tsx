import type { IconType } from 'react-icons';
import {
  SiPython, SiDjango, SiFastapi, SiReact, SiFlask, SiPostgresql, SiRedis, SiMongodb, SiJavascript,
  SiMysql, SiGit, SiPostman, SiLinux, SiPandas, SiNumpy, SiTailwindcss, SiHtml5, SiCss,
  SiJsonwebtokens, SiSqlalchemy, SiPydantic, SiGithub, SiSwagger,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { Zap, Network, Layers, Workflow, BellRing, Activity, Server, HardDrive, ShieldCheck, Webhook, PlugZap, Users, RefreshCcw } from 'lucide-react';

export interface Tech {
  icon: IconType | typeof Zap;
  color: string;
}

const AWS_ORANGE = '#ff9900';

/** Every technology shown on the site, with its brand logo and brand colour. */
export const TECH: Record<string, Tech> = {
  Python: { icon: SiPython, color: '#3776ab' },
  Django: { icon: SiDjango, color: '#44b78b' },
  'Django REST Framework': { icon: SiDjango, color: '#a30000' },
  FastAPI: { icon: SiFastapi, color: '#009688' },
  Flask: { icon: SiFlask, color: '#9ca3af' },
  React: { icon: SiReact, color: '#61dafb' },
  JavaScript: { icon: SiJavascript, color: '#f7df1e' },
  HTML5: { icon: SiHtml5, color: '#e34f26' },
  CSS3: { icon: SiCss, color: '#1572b6' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#38bdf8' },
  AWS: { icon: FaAws, color: AWS_ORANGE },
  Lambda: { icon: Zap, color: AWS_ORANGE },
  'API Gateway': { icon: Network, color: '#e7157b' },
  SQS: { icon: Layers, color: '#e7157b' },
  EventBridge: { icon: Workflow, color: '#e7157b' },
  SNS: { icon: BellRing, color: '#e7157b' },
  CloudWatch: { icon: Activity, color: '#e7157b' },
  S3: { icon: HardDrive, color: '#7aa116' },
  EC2: { icon: Server, color: AWS_ORANGE },
  PostgreSQL: { icon: SiPostgresql, color: '#4169e1' },
  MySQL: { icon: SiMysql, color: '#4479a1' },
  MongoDB: { icon: SiMongodb, color: '#47a248' },
  Redis: { icon: SiRedis, color: '#ff4438' },
  SQLAlchemy: { icon: SiSqlalchemy, color: '#d71f00' },
  Pydantic: { icon: SiPydantic, color: '#e92063' },
  'REST APIs': { icon: SiSwagger, color: '#85ea2d' },
  'JWT Auth': { icon: SiJsonwebtokens, color: '#fb015b' },
  RBAC: { icon: ShieldCheck, color: '#34d399' },
  Webhooks: { icon: Webhook, color: '#c084fc' },
  'Third-party APIs': { icon: PlugZap, color: '#facc15' },
  Git: { icon: SiGit, color: '#f05032' },
  GitHub: { icon: SiGithub, color: '#e5e7eb' },
  Postman: { icon: SiPostman, color: '#ff6c37' },
  Linux: { icon: SiLinux, color: '#fcc624' },
  Pandas: { icon: SiPandas, color: '#a78bfa' },
  NumPy: { icon: SiNumpy, color: '#4dabcf' },
  'Agile / Scrum': { icon: RefreshCcw, color: '#60a5fa' },
  'Team Collaboration': { icon: Users, color: '#22d3ee' },
};

/** Logos that cycle in the hero core and orbit around it. */
export const heroCycle = ['Python', 'Django', 'FastAPI', 'React', 'AWS', 'Flask', 'PostgreSQL', 'Redis', 'MongoDB', 'JavaScript', 'MySQL', 'Git'];
export const orbitInner = ['Python', 'React', 'AWS', 'Django'];
export const orbitOuter = ['FastAPI', 'PostgreSQL', 'Redis', 'MongoDB', 'Flask', 'Git'];
export const marquee = ['Python', 'Django', 'FastAPI', 'React', 'AWS', 'PostgreSQL', 'Redis', 'MongoDB', 'Flask', 'JavaScript', 'MySQL', 'Git', 'Postman', 'Linux', 'Pydantic', 'SQLAlchemy'];

export type Level = 'expert' | 'proficient' | 'familiar';

export interface SkillGroup {
  title: string;
  icon: 'server' | 'layout' | 'cloud' | 'database' | 'shield' | 'wrench';
  items: [string, Level][];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Backend',
    icon: 'server',
    items: [['Python', 'expert'], ['Django', 'expert'], ['Django REST Framework', 'expert'], ['FastAPI', 'expert'], ['Flask', 'expert'], ['SQLAlchemy', 'proficient'], ['Pydantic', 'proficient']],
  },
  {
    title: 'Frontend',
    icon: 'layout',
    items: [['React', 'proficient'], ['JavaScript', 'proficient'], ['HTML5', 'proficient'], ['CSS3', 'proficient'], ['Tailwind CSS', 'familiar']],
  },
  {
    title: 'AWS Cloud',
    icon: 'cloud',
    items: [['Lambda', 'expert'], ['API Gateway', 'expert'], ['SQS', 'proficient'], ['EventBridge', 'proficient'], ['SNS', 'proficient'], ['CloudWatch', 'proficient'], ['S3', 'proficient'], ['EC2', 'familiar']],
  },
  {
    title: 'Databases',
    icon: 'database',
    items: [['PostgreSQL', 'expert'], ['MySQL', 'expert'], ['MongoDB', 'proficient'], ['Redis', 'proficient']],
  },
  {
    title: 'APIs & Security',
    icon: 'shield',
    items: [['REST APIs', 'expert'], ['JWT Auth', 'expert'], ['Third-party APIs', 'expert'], ['RBAC', 'proficient'], ['Webhooks', 'proficient']],
  },
  {
    title: 'Tools & Data',
    icon: 'wrench',
    items: [['Git', 'expert'], ['Postman', 'expert'], ['Linux', 'proficient'], ['Pandas', 'proficient'], ['NumPy', 'familiar'], ['Agile / Scrum', 'proficient']],
  },
];
