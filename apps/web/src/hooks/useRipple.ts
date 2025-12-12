'use client';

import { useCallback, useRef } from 'react';

/**
 * Hook for creating ripple effects on button clicks
 * Returns a handler that creates a ripple animation
 */
export function useRipple() {
  const rippleRef = useRef<HTMLSpanElement | null>(null);

  const createRipple = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');

    // Remove ripple after animation
    const removeRipple = () => {
      ripple.removeEventListener('animationend', removeRipple);
      ripple.remove();
    };

    ripple.addEventListener('animationend', removeRipple);
    button.appendChild(ripple);
  }, []);

  return createRipple;
}
