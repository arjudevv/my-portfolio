'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { checkWebGLSupport } from '@/utils/webgl-check';
import HeroFaceModel from './HeroFaceModel';

// Lazy load Three.js components
const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
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

/**
 * 3D Scene wrapper for About page face model
 * Includes fallback for non-WebGL devices
 */
export default function AboutFaceScene() {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    setHasWebGL(checkWebGLSupport());
  }, []);

  // During SSR and initial render, show a placeholder
  if (!isMounted || hasWebGL === null) {
    return (
      <div
        ref={containerRef}
        className="w-full h-full min-h-[400px] rounded-lg flex items-center justify-center"
        aria-label="Loading 3D face model"
      >
        <div className="text-zinc-600 dark:text-zinc-400 text-sm">Loading...</div>
      </div>
    );
  }

  if (!hasWebGL) {
    return (
      <div
        className="w-full h-full min-h-[400px] rounded-lg flex items-center justify-center"
        role="img"
        aria-label="3D face model placeholder"
      >
        <div className="text-center p-8">
          <p className="text-zinc-700 dark:text-zinc-300 text-sm">
            WebGL not supported
          </p>
          <p className="text-zinc-500 dark:text-zinc-500 text-xs mt-2">
            Please use a modern browser
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[400px] relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas
        camera={{ position: [0, -0.7, 1.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        className="w-full h-full"
        aria-hidden="false"
        role="img"
        aria-label="3D animated face model"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.9} />
          <pointLight position={[2, 2, 2]} intensity={1.2} />
          <pointLight position={[-2, -2, -2]} intensity={0.6} color="#00ffff" />
          <pointLight position={[0, 3, 1]} intensity={0.8} color="#ff00ff" />
          <HeroFaceModel
            modelPath="/models/face-model.glb"
            scale={2.5}
            position={[0, -1.2, 0]}
            enableRotation={true}
            enableFloating={true}
            rotationSpeed={0.001}
            floatingIntensity={0.05}
            floatingSpeed={0.6}
            hovered={hovered}
            frontViewOnly={true}
          />
          
          {/* Post-processing effects */}
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.3}
              luminanceSmoothing={0.9}
              intensity={hovered ? 1.2 : 0.6}
            />
            <ChromaticAberration
              offset={hovered ? [0.003, 0.003] : [0.001, 0.001]}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
