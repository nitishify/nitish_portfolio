import { useEffect, useState } from 'react';

/** Types each word, pauses, deletes it, then moves to the next one. */
export function useTypewriter(words: string[], { typeMs = 70, deleteMs = 35, holdMs = 1800, start = true } = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!start) return;
    const word = words[index % words.length];
    let delay = deleting ? deleteMs : typeMs;
    if (!deleting && text === word) delay = holdMs;
    if (deleting && text === '') delay = 250;

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === '') {
        setDeleting(false);
        setIndex(i => i + 1);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, words, typeMs, deleteMs, holdMs, start]);

  return text;
}
