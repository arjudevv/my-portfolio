'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import FloatingOrbs from './HeroSceneShape';

// Lazy load drei components
const OrbitControls = dynamic(
  () => import('@react-three/drei').then((mod) => mod.OrbitControls),
  { ssr: false }
);
const Environment = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Environment),
  { ssr: false }
);

// Lazy load postprocessing
const EffectComposer = dynamic(
  () => import('@react-three/postprocessing').then((mod) => mod.EffectComposer),
  { ssr: false }
);
const Bloom = dynamic(
  () => import('@react-three/postprocessing').then((mod) => mod.Bloom),
  { ssr: false }
);
const ChromaticAberration = dynamic(
  () => import('@react-three/postprocessing').then((mod) => mod.ChromaticAberration),
  { ssr: false }
);
const Vignette = dynamic(
  () => import('@react-three/postprocessing').then((mod) => mod.Vignette),
  { ssr: false }
);
const Noise = dynamic(
  () => import('@react-three/postprocessing').then((mod) => mod.Noise),
  { ssr: false }
);
const SMAA = dynamic(
  () => import('@react-three/postprocessing').then((mod) => mod.SMAA),
  { ssr: false }
);

/**
 * Main scene content with postprocessing effects
 * Respects prefers-reduced-motion
 */
export default function Scene() {
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const shouldUsePostprocessing = !prefersReducedMotion;
  const bloomIntensity = 0.25;

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
      <FloatingOrbs />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={shouldUsePostprocessing}
        autoRotateSpeed={0.3}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
      />
      <Environment preset="night" />
      
      {/* Postprocessing effects */}
      {shouldUsePostprocessing && (
        <Suspense fallback={null}>
          <EffectComposer>
            {/* Anti-aliasing */}
            <SMAA />
            
            {/* Bloom effect */}
            <Bloom
              luminanceThreshold={0.4}
              luminanceSmoothing={0.9}
              intensity={0.4}
            />
            
            {/* Chromatic aberration */}
            <ChromaticAberration
              offset={[0.001, 0.002]}
            />
            
            {/* Vignette */}
            <Vignette
              eskil={false}
              offset={0.5}
              darkness={0.5}
            />
            
            {/* Film grain/noise */}
            <Noise opacity={0.02} />
          </EffectComposer>
        </Suspense>
      )}
    </>
  );
}
