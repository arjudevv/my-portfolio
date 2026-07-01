'use client';

import { useSyncExternalStore } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useIsClient';

export default function NoiseOverlay() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted || prefersReducedMotion) return null;

  return (
    <div
      className="noise"
      style={{ opacity: 'var(--noise-opacity, 0.04)' }}
      aria-hidden="true"
    />
  );
}
