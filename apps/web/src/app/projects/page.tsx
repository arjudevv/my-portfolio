'use client';

import { useEffect } from 'react';

export default function ProjectsRedirect() {
  useEffect(() => {
    window.location.replace('/#projects');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-muted">
      Redirecting to Projects section...
    </div>
  );
}
