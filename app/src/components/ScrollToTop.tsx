import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls window to top on every route change so users always see the top of the new page.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    // Also clear any hash so we don't jump to a fragment
    if (window.location.hash) {
      window.history.replaceState(null, '', pathname);
    }
  }, [pathname]);

  return null;
}
