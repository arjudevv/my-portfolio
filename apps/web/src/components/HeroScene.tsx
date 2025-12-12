'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { checkWebGLSupport } from '@/utils/webgl-check';

// Lazy load Three.js components
const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
);

const Scene = dynamic(() => import('@/components/HeroSceneContent'), { ssr: false });

/**
 * Hero scene component with WebGL support detection
 * Includes accessibility features and fallbacks
 */
export default function HeroScene() {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    setHasWebGL(checkWebGLSupport());
  }, []);

  useEffect(() => {
    if (!containerRef.current || !isMounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [isMounted]);

  // During SSR and initial render, show a gradient background
  if (!isMounted || hasWebGL === null) {
    return (
      <div
        ref={containerRef}
        className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
        aria-label="Loading hero scene"
      />
    );
  }

  if (!hasWebGL) {
    return (
      <div
        className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center"
        role="img"
        aria-label="Hero scene gradient background"
      >
        <div className="text-white text-center p-8">
          <p className="text-lg">WebGL not supported</p>
          <p className="text-sm mt-2">Please use a modern browser</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0">
      {isVisible ? (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          aria-hidden={!isInteractive}
          role={isInteractive ? 'img' : undefined}
          aria-label={isInteractive ? 'Interactive 3D hero scene' : undefined}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
          role="img"
          aria-label="Hero scene gradient background"
        />
      )}

      {/* Textual description for screen readers */}
      <div className="sr-only">
        <p>
          Interactive 3D scene featuring floating orbs with distortion effects and dynamic lighting.
          The scene includes post-processing effects such as bloom, chromatic aberration, and vignette.
        </p>
      </div>
    </div>
  );
}
