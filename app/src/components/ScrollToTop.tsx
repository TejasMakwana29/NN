import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls window to top on every route change, 
 * but preserves the browser's native scroll position on page refresh.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();
  const isInitialRender = useRef(true);

  useEffect(() => {
    // Prevent scrolling to top on the very first load (page refresh)
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    
    // Also clear any hash so we don't jump to a fragment
    if (window.location.hash) {
      window.history.replaceState(null, '', pathname);
    }
  }, [pathname]);

  return null;
}