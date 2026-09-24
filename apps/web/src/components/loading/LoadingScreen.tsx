'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function runIntro() {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const skip = sessionStorage.getItem('intro-seen');

      if (reducedMotion || skip) {
        setVisible(false);
        return;
      }

      const steps = [20, 45, 70, 90, 100];
      for (const value of steps) {
        if (cancelled) return;
        await new Promise((r) => setTimeout(r, 180));
        setProgress(value);
      }

      await new Promise((r) => setTimeout(r, 280));
      sessionStorage.setItem('intro-seen', 'true');
      if (!cancelled) setVisible(false);
    }

    void runIntro();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleExitComplete = () => {
    document.body.style.overflow = '';
    onComplete();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative z-10 text-center">
            <motion.h1
              className="text-display font-heading font-bold text-text mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              ARJUN
            </motion.h1>
            <div className="w-48 h-px bg-white/15 mx-auto overflow-hidden mb-4">
              <motion.div
                className="h-full bg-text"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <p className="text-muted text-sm tabular-nums tracking-widest">{progress}%</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
