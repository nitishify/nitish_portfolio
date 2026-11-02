import { useInView, useReducedMotion } from 'framer-motion';
import { lazy, Suspense, useRef, type CSSProperties } from 'react';

const LottiePlayer = lazy(() => import('./LottiePlayer'));

interface LottieProps {
  /** File name in public/lottie, without extension. */
  name: string;
  loop?: boolean;
  speed?: number;
  className?: string;
  style?: CSSProperties;
  label?: string;
}

/** Plays a .lottie animation from public/lottie, loading it only once it scrolls near the viewport. */
export function Lottie({ name, loop = true, speed = 1, className, style, label }: LottieProps) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { once: true, margin: '200px' });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className={className} style={style} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {near && (
        <Suspense fallback={null}>
          <LottiePlayer src={`/lottie/${name}.lottie`} autoplay={!reduce} loop={loop && !reduce} speed={speed} />
        </Suspense>
      )}
    </div>
  );
}
