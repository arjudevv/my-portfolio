'use client';

import { useEffect } from 'react';

/**
 * Client-side theme provider that forces dark mode
 */
export default function ThemeProvider() {
  useEffect(() => {
    // Always force dark mode
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  return null;
}
