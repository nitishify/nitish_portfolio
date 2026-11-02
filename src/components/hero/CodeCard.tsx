import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LINES = [
  <><span className="k">@app</span>.<span className="f">get</span>(<span className="s">"/markets/{'{region}'}"</span>)</>,
  <><span className="k">async def</span> <span className="f">markets</span>(region: <span className="t">str</span>):</>,
  <>{'    '}data = <span className="k">await</span> redis.<span className="f">get</span>(region)</>,
  <>{'    '}<span className="k">return</span> data <span className="k">or await</span> <span className="f">fetch</span>(region)</>,
];

/** A tiny editor window that "types" a FastAPI endpoint line by line, then loops. */
export function CodeCard() {
  const [run, setRun] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRun(r => r + 1), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="code-card">
      <div className="cc-head">
        <i /><i /><i />
        <span>api/markets.py</span>
      </div>
      <pre key={run}>
        {LINES.map((line, n) => (
          <motion.div
            key={n}
            className="cc-line"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 0.9, delay: 0.3 + n * 0.85, ease: 'linear' }}
          >
            {line}
          </motion.div>
        ))}
      </pre>
    </div>
  );
}
