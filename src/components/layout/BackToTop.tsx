import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useState } from 'react';

export function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', v => setShow(v > 700));

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ y: -4 }}
        >
          <svg viewBox="0 0 56 56" className="tt-ring" aria-hidden>
            <circle cx="28" cy="28" r="25" className="tt-track" />
            <motion.circle cx="28" cy="28" r="25" className="tt-bar" style={{ pathLength: scrollYProgress }} />
          </svg>
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
