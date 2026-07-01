'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function runPreload() {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const skip = sessionStorage.getItem('intro-seen');

      if (reducedMotion || skip) {
        onComplete();
        return;
      }

      const assets = ['/assets/noise.png', '/models/face-model.glb'];
      let loaded = 0;
      const total = assets.length + 2;

      const tick = () => {
        if (cancelled) return;
        loaded++;
        setProgress(Math.min(100, Math.round((loaded / total) * 100)));
      };

      await new Promise((r) => setTimeout(r, 400));
      tick();

      await Promise.all(
        assets.map(
          (src) =>
            new Promise<void>((resolve) => {
              if (src.endsWith('.glb')) {
                fetch(src)
                  .then(() => {
                    tick();
                    resolve();
                  })
                  .catch(() => {
                    tick();
                    resolve();
                  });
              } else {
                const img = new Image();
                img.onload = () => {
                  tick();
                  resolve();
                };
                img.onerror = () => {
                  tick();
                  resolve();
                };
                img.src = src;
              }
            })
        )
      );

      tick();
      await new Promise((r) => setTimeout(r, 300));
      tick();

      if (cancelled) return;
      setProgress(100);
      await new Promise((r) => setTimeout(r, 400));
      setExiting(true);
      sessionStorage.setItem('intro-seen', 'true');

      await new Promise((r) => setTimeout(r, 800));
      if (!cancelled) onComplete();
    }

    void runPreload();

    return () => {
      cancelled = true;
    };
  }, [onComplete]);

  useEffect(() => {
    if (!exiting) return;
    gsap.to('.loader-content', { scale: 1.2, opacity: 0, duration: 0.6, ease: 'power2.in' });
  }, [exiting]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(91,140,255,0.3) 0%, transparent 70%)',
            }}
          />
          <div className="loader-content relative z-10 text-center">
            <motion.h1
              className="text-display font-heading font-bold gradient-text mb-8"
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              ARJUN
            </motion.h1>
            <div className="w-48 h-0.5 bg-white/10 rounded-full mx-auto overflow-hidden mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <p className="text-muted text-sm font-mono tabular-nums">{progress}%</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
