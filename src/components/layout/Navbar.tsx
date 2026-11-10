import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Check, Moon, Palette, Sun } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { profile } from '../../data/profile';
import { THEMES, type Theme } from '../../hooks/useTheme';
import './layout.css';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];
const HELLOS = ['Say Namaste 🙏', 'Say Hello 👋', 'Say Hola 💃', 'Say Bonjour 🥐', 'Say Konnichiwa 🌸', 'Say Ciao 🍕'];

export function Navbar({ theme, onSetTheme }: { theme: Theme; onSetTheme: (t: Theme) => void }) {
  const [picker, setPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!picker) return;
    const onDown = (e: PointerEvent) => !pickerRef.current?.contains(e.target as Node) && setPicker(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPicker(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [picker]);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [hello, setHello] = useState(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      let cur = '';
      for (const l of LINKS) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = l.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setHello(h => (h + 1) % HELLOS.length), 2600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''} ${open ? 'open' : ''}`}>
      <div className="container nav-in">
        <a href="#hero" className="logo" onClick={() => setOpen(false)}>
          <span>{profile.brand}</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map(l => (
            <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'active' : ''}>
              {active === l.id && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
              <span>{l.label}</span>
            </a>
          ))}
        </nav>

        <a href="#contact" className="hello-btn">
          <AnimatePresence mode="wait">
            <motion.span key={hello} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} transition={{ duration: 0.25 }}>
              {HELLOS[hello]}
            </motion.span>
          </AnimatePresence>
        </a>

        <div className="theme-wrap" ref={pickerRef}>
          <button className="theme-toggle" onClick={() => setPicker(p => !p)} aria-label="Choose theme" aria-haspopup="menu" aria-expanded={picker}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'dark' ? <Moon size={18} /> : theme === 'light' ? <Sun size={18} /> : <Palette size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
          <AnimatePresence>
            {picker && (
              <motion.div
                className="theme-menu"
                role="menu"
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.18 }}
              >
                <p className="theme-menu-title">Theme</p>
                {THEMES.map(t => (
                  <button
                    key={t.id}
                    role="menuitemradio"
                    aria-checked={theme === t.id}
                    className={`theme-opt ${theme === t.id ? 'on' : ''}`}
                    onClick={() => { onSetTheme(t.id); setPicker(false); }}
                  >
                    <span className="theme-sw" style={{ background: `linear-gradient(135deg, ${t.swatch[1]}, ${t.swatch[2]})`, boxShadow: `inset 0 0 0 3px ${t.swatch[0]}` }} />
                    <span className="theme-name">{t.label}<small>{t.base}</small></span>
                    {theme === t.id && <Check size={15} />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button className="burger" onClick={() => setOpen(o => !o)} aria-label="Menu" aria-expanded={open}>
          <span />
        </button>
      </div>

      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-menu"
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
          >
            {LINKS.map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
              >
                <small>0{i + 1}</small>
                {l.label}
              </motion.a>
            ))}
            <motion.a className="btn btn-primary" href={`mailto:${profile.email}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              {profile.email}
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
