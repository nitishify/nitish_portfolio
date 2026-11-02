import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

/** Soft glow + ring that trail the mouse (desktop pointers only). */
export function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 140, damping: 20 });
  const sy = useSpring(y, { stiffness: 140, damping: 20 });
  const rx = useSpring(x, { stiffness: 500, damping: 35 });
  const ry = useSpring(y, { stiffness: 500, damping: 35 });
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHover(!!(e.target as Element).closest?.('a, button, [role="button"]'));
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div className="cursor-glow" style={{ x: sx, y: sy }} aria-hidden />
      <motion.div className={`cursor-ring ${hover ? 'hover' : ''}`} style={{ x: rx, y: ry }} aria-hidden />
    </>
  );
}
