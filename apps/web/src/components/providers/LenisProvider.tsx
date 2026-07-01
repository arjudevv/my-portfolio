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

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          instance.scrollTo(value, { immediate: true });
        }
        return instance.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    instance.on('scroll', ScrollTrigger.update);

    const onRefresh = () => instance.resize();
    ScrollTrigger.addEventListener('refresh', onRefresh);

    const onTick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    lenisRef.current = instance;
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener('refresh', onRefresh);
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
