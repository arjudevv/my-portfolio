'use client';

import { useEffect } from 'react';

export default function ContactRedirect() {
  useEffect(() => {
    window.location.replace('/#contact');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-muted">
      Redirecting to Contact section...
    </div>
  );
}
