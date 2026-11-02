import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { profile } from '../../data/profile';
import type { Theme } from '../../hooks/useTheme';
import './layout.css';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];
const HELLOS = ['Say Namaste 🙏', 'Say Hello 👋', 'Say Hola 💃', 'Say Bonjour 🥐', 'Say Konnichiwa 🌸', 'Say Ciao 🍕'];

export function Navbar({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
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

        <button className="theme-toggle" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </motion.span>
          </AnimatePresence>
        </button>

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
