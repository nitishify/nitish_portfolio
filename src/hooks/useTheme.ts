import { useCallback, useEffect, useState } from 'react';

/** Each theme sits on a dark or light base (so light-mode overrides still apply) plus an optional accent palette. */
export const THEMES = [
  { id: 'dark', label: 'Midnight', base: 'dark', swatch: ['#06060c', '#3b82f6', '#22d3ee'] },
  { id: 'light', label: 'Daylight', base: 'light', swatch: ['#f6f8fc', '#2563eb', '#0891b2'] },
  { id: 'aurora', label: 'Aurora', base: 'dark', swatch: ['#08060f', '#8b5cf6', '#f472b6'] },
  { id: 'emerald', label: 'Emerald', base: 'dark', swatch: ['#040a08', '#10b981', '#2dd4bf'] },
  { id: 'sunset', label: 'Sunset', base: 'dark', swatch: ['#0c0706', '#f97316', '#fb7185'] },
  { id: 'sakura', label: 'Sakura', base: 'light', swatch: ['#fdf7fa', '#db2777', '#7c3aed'] },
  { id: 'lumiere', label: 'Lumière', base: 'light', swatch: ['#fffaf2', '#4f46e5', '#0d9488'] },
] as const;

export type Theme = (typeof THEMES)[number]['id'];
export type ThemeBase = 'dark' | 'light';

const isTheme = (t: string | null): t is Theme => THEMES.some(x => x.id === t);
export const themeInfo = (t: Theme) => THEMES.find(x => x.id === t)!;

function readStored(): Theme {
  try {
    const t = localStorage.getItem('theme');
    if (isTheme(t)) return t;
  } catch {
    /* storage blocked */
  }
  return 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readStored);

  useEffect(() => {
    const root = document.documentElement;
    const info = themeInfo(theme);
    root.dataset.theme = info.base;
    if (theme === 'dark' || theme === 'light') delete root.dataset.palette;
    else root.dataset.palette = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', info.swatch[0]);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* storage blocked */
    }
  }, [theme]);

  /** Quick dark/light flip, keeping a palette's own base when switching back. */
  const toggle = useCallback(() => setTheme(t => (themeInfo(t).base === 'dark' ? 'light' : 'dark')), []);
  return { theme, setTheme, toggle };
}
