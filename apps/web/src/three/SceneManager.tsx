'use client';

import { useSyncExternalStore } from 'react';
import { checkWebGLSupport } from '@/utils/webgl-check';
import { useIsClient } from '@/hooks/useIsClient';
import { useScene } from './SceneContext';
import dynamic from 'next/dynamic';
import { Suspense, useEffect } from 'react';

const Canvas = dynamic(() => import('@react-three/fiber').then((m) => m.Canvas), { ssr: false });
const SceneContent = dynamic(() => import('./SceneContent'), { ssr: false });

function useWebGLSupport() {
  const isClient = useIsClient();
  return useSyncExternalStore(
    () => () => {},
    () => (isClient ? checkWebGLSupport() : false),
    () => false
  );
}

interface SceneManagerProps {
  enabled?: boolean;
}

export default function SceneManager({ enabled = false }: SceneManagerProps) {
  const isClient = useIsClient();
  const hasWebGL = useWebGLSupport();
  const { setMouse } = useScene();

  useEffect(() => {
    if (!isClient || !enabled) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [isClient, enabled, setMouse]);

  if (!isClient || !enabled) {
    return <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-surface to-background" />;
  }

  if (!hasWebGL) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/20 via-secondary/10 to-background" />
    );
  }

  const isMobile = window.innerWidth < 768;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
