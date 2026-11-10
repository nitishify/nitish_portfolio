import { AnimatePresence, MotionConfig } from 'framer-motion';
import { useCallback, useState } from 'react';
import { Hero } from './components/hero/Hero';
import { BackToTop } from './components/layout/BackToTop';
import { CursorGlow } from './components/layout/CursorGlow';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { Preloader } from './components/layout/Preloader';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Education } from './components/sections/Education';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Process } from './components/sections/Process';
import { Skills } from './components/sections/Skills';
import { Divider } from './components/ui/Divider';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const done = useCallback(() => setLoading(false), []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Preloader key="pre" onDone={done} />}</AnimatePresence>

      <div className="page-bg" aria-hidden>
        <span className="blob b1" />
        <span className="blob b2" />
      </div>
      <div className="noise" aria-hidden />
      <CursorGlow />

      <Navbar theme={theme} onSetTheme={setTheme} />
      <main className="main">
        <Hero start={!loading} />
        <About />
        <Projects />
        <Process />
        <Experience />
        <Skills />
        <Divider />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  );
}
