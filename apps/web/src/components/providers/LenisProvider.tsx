'use client';

import { createContext, useContext, useEffect, useRef, useSyncExternalStore, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/hooks/useIsClient';

interface LenisContextType {
  getLenis: () => Lenis | null;
  reducedMotion: boolean;
}

const LenisContext = createContext<LenisContextType>({
  getLenis: () => null,
  reducedMotion: false,
});

export function useLenisContext() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    if (!mounted || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    instance.on('scroll', ScrollTrigger.update);

    const onTick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    lenisRef.current = instance;

    return () => {
      gsap.ticker.remove(onTick);
      instance.destroy();
      lenisRef.current = null;
    };
  }, [mounted, reducedMotion]);

  return (
    <LenisContext.Provider
      value={{
        getLenis: () => lenisRef.current,
        reducedMotion,
      }}
    >
      {children}
    </LenisContext.Provider>
  );
}

export function useScrollTo() {
  const { getLenis } = useLenisContext();

  return (target: string | number) => {
    const lenis = getLenis();
    if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el && lenis) {
        lenis.scrollTo(el as HTMLElement, { offset: -80 });
      } else if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (lenis) {
      lenis.scrollTo(target);
    }
  };
}
