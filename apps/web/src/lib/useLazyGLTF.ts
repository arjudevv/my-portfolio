'use client';

import { useEffect, useState, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import type { GLTF } from 'three-stdlib';

/**
 * Hook for lazy-loading GLTF models with IntersectionObserver
 * Only loads the model when it becomes visible in the viewport
 */
export function useLazyGLTF(path: string, draco?: boolean | string) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Check if IntersectionObserver is supported
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Fallback: load immediately if IntersectionObserver is not supported
      setShouldLoad(true);
      return;
    }

    // Create observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            // Disconnect after first intersection
            if (observerRef.current && elementRef.current) {
              observerRef.current.unobserve(elementRef.current);
            }
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    // Observe the element if it exists
    if (elementRef.current) {
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Load GLTF when shouldLoad is true
  const gltf = shouldLoad ? useGLTF(path, draco) : null;

  useEffect(() => {
    if (shouldLoad && !gltf) {
      setIsLoading(true);
    } else if (gltf) {
      setIsLoading(false);
    }
  }, [shouldLoad, gltf]);

  return {
    gltf: gltf as GLTF | null,
    isLoading,
    error,
    elementRef, // Attach this ref to the element you want to observe
  };
}

/**
 * Preload a GLTF model (useful for critical models)
 */
export function preloadGLTF(path: string, draco?: boolean | string) {
  if (typeof window !== 'undefined') {
    import('@react-three/drei').then(({ useGLTF }) => {
      // This will trigger the loader
      useGLTF.preload(path, draco);
    });
  }
}
