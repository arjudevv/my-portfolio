'use client';

import { useEffect } from 'react';

export default function AboutRedirect() {
  useEffect(() => {
    window.location.replace('/#about');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-muted">
      Redirecting to About section...
    </div>
  );
}
