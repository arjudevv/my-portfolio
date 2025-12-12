'use client';

import { useEffect } from 'react';

/**
 * Client-side theme provider that ensures theme persists across all pages
 * This works alongside the blocking script in layout.tsx
 */
export default function ThemeProvider() {
  useEffect(() => {
    // Ensure theme is applied on every mount (client-side navigation)
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (prefersDark ? 'dark' : 'light');
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return null;
}
