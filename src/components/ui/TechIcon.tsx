import { TECH } from '../../data/tech';

interface TechIconProps {
  name: string;
  size?: number;
  /** Use the brand colour (default) or inherit the current text colour. */
  brand?: boolean;
  /** Override the colour entirely. */
  color?: string;
}

export function TechIcon({ name, size = 16, brand = true, color }: TechIconProps) {
  const tech = TECH[name];
  if (!tech) return null;
  const Icon = tech.icon;
  return <Icon size={size} color={color ?? (brand ? tech.color : 'currentColor')} aria-hidden />;
}

export const techColor = (name: string) => TECH[name]?.color ?? '#60a5fa';
