'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { featuredProject } from '@/content/projects';
import { featuredProjectConfig } from '@/content/featured-project';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <PhoneFallback />,
});

function PhoneFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-48 h-96 rounded-[2rem] border-4 border-white/20 bg-surface shadow-glass relative overflow-hidden">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-white/20 rounded-full" />
        <div className="absolute inset-4 top-8 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
          <span className="text-4xl">📱</span>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProjectSection() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [splineError, setSplineError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      const screenIndex = Math.min(
        featuredProjectConfig.screens.length - 1,
        Math.floor(progress * featuredProjectConfig.screens.length)
      );
      setActiveScreen(screenIndex);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="featured"
      ref={sectionRef}
      data-section="featured"
      className="relative"
      style={{ minHeight: featuredProjectConfig.scrollHeight }}
      aria-labelledby="featured-heading"
    >
      <div className="sticky top-0 h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-reveal>
          <p className="section-label mb-4">Featured Project</p>
          <h2 id="featured-heading" className="text-4xl md:text-6xl font-heading font-bold mb-8">
            {featuredProject.title}
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-body-lg text-muted">{featuredProject.longDescription}</p>
              <div className="flex flex-wrap gap-2">
                {featuredProject.tech.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full text-sm glass">{t}</span>
                ))}
              </div>
              <div className="flex gap-3">
                {featuredProjectConfig.screens.map((screen, i) => (
                  <div
                    key={screen.id}
                    className="flex items-center gap-2"
                    style={{ opacity: activeScreen === i ? 1 : 0.4 }}
                  >
                    <div className="w-3 h-3 rounded-full" style={{ background: screen.color }} />
                    <span className="text-sm text-muted">{screen.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-[400px] md:h-[500px] relative" data-phone>
              {!splineError ? (
                <Spline
                  scene={featuredProjectConfig.splineSceneUrl}
                  className="w-full h-full"
                  onError={() => setSplineError(true)}
                />
              ) : (
                <PhoneFallback />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
