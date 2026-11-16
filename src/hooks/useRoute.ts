import { useEffect, useState } from 'react';

/**
 * Tiny client-side router: the home page at "/" and one page per project at "/projects/:id".
 * Internal links (href starting with "/") are handled here, so moving between pages never reloads
 * the app. Vercel rewrites /projects/* to index.html (see vercel.json) for direct visits.
 */
export function navigate(to: string) {
  const url = new URL(to, window.location.origin);
  if (url.pathname + url.hash === window.location.pathname + window.location.hash) return;
  window.history.pushState({}, '', url.pathname + url.hash);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function scrollToHash(hash: string) {
  if (!hash) {
    window.scrollTo({ top: 0 });
    return;
  }
  // Wait for the new page to render before looking for the section.
  requestAnimationFrame(() =>
    setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60),
  );
}

export function useRoute() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => {
      setPath(window.location.pathname);
      scrollToHash(window.location.hash);
    };
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest('a');
      const href = a?.getAttribute('href');
      if (!a || !href || !href.startsWith('/') || a.target === '_blank' || a.hasAttribute('download')) return;
      if (href.endsWith('.pdf')) return;
      e.preventDefault();
      navigate(href);
    };
    window.addEventListener('popstate', onPop);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('popstate', onPop);
      document.removeEventListener('click', onClick);
    };
  }, []);

  const match = path.match(/^\/projects\/([\w-]+)\/?$/);
  return { path, projectId: match ? match[1] : null };
}
