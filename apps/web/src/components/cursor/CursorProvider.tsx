'use client';

import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useIsClient';

interface CursorContextType {
  position: { x: number; y: number };
}

const CursorContext = createContext<CursorContextType>({ position: { x: 0, y: 0 } });

export function useCursor() {
  return useContext(CursorContext);
}

function useIsTouchDevice() {
  return useSyncExternalStore(
    () => () => {},
    () => 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    () => false
  );
}

export function CursorProvider({ children }: { children: ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();
  const enabled = !reducedMotion && !isTouch;

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [enabled]);

  return (
    <CursorContext.Provider value={{ position }}>
      {children}
      {enabled && <CustomCursor />}
    </CursorContext.Provider>
  );
}

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const trail = useRef<{ x: number; y: number; alpha: number }[]>([]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      trail.current.push({ x: e.clientX, y: e.clientY, alpha: 1 });
      if (trail.current.length > 20) trail.current.shift();
    };
    window.addEventListener('mousemove', onMove);

    let raf: number;
    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.35;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.35;
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }

      const canvas = trailRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          trail.current.forEach((p, i) => {
            p.alpha *= 0.92;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2 * (i / trail.current.length), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(91, 140, 255, ${p.alpha * 0.5})`;
            ctx.fill();
          });
          trail.current = trail.current.filter((p) => p.alpha > 0.05);
        }
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const canvas = trailRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <canvas ref={trailRef} className="fixed inset-0 pointer-events-none z-[9998]" aria-hidden />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full border border-primary/50 pointer-events-none z-[9999] mix-blend-difference"
        aria-hidden
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-accent pointer-events-none z-[9999]"
        aria-hidden
      />
    </>
  );
}
