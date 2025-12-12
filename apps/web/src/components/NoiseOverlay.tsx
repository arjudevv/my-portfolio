'use client';

import { useEffect, useState } from 'react';

/**
 * Global noise overlay component
 * Provides subtle texture overlay with CSS fallback
 */
export default function NoiseOverlay() {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Don't show if reduced motion is preferred
  if (!mounted || prefersReducedMotion) {
    return null;
  }

  return (
    <div
      className="noise"
      style={{
        opacity: 'var(--noise-opacity, 0.03)',
      }}
      aria-hidden="true"
    />
  );
}
