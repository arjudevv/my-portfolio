'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const EffectComposer = dynamic(
  () => import('@react-three/postprocessing').then((m) => m.EffectComposer),
  { ssr: false }
);
const Bloom = dynamic(
  () => import('@react-three/postprocessing').then((m) => m.Bloom),
  { ssr: false }
);
const Vignette = dynamic(
  () => import('@react-three/postprocessing').then((m) => m.Vignette),
  { ssr: false }
);
const Noise = dynamic(
  () => import('@react-three/postprocessing').then((m) => m.Noise),
  { ssr: false }
);

export default function PostFX() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <Suspense fallback={null}>
      <EffectComposer>
        <Bloom intensity={isMobile ? 0.4 : 0.6} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
        <Vignette offset={0.3} darkness={0.6} />
        <Noise opacity={0.02} />
      </EffectComposer>
    </Suspense>
  );
}
