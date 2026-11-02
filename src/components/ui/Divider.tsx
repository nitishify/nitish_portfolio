import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import './Divider.css';

/** Glowing line that draws in from the centre, with a light pulse travelling along it. */
export function Divider() {
  return (
    <div className="container divider" aria-hidden>
      <motion.span
        className="dv-line left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <span className="dv-pulse" />
      </motion.span>
      <motion.span
        className="dv-orb"
        initial={{ scale: 0, rotate: -90 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.3 }}
      >
        <Sparkles size={18} />
      </motion.span>
      <motion.span
        className="dv-line right"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <span className="dv-pulse" />
      </motion.span>
    </div>
  );
}
