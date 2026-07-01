'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sections } from '@/content/site';
import type { SceneId } from '@/types/portfolio';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const sectionSceneMap: Record<string, SceneId> = {
  hero: 'hero',
  about: 'about',
  experience: 'experience',
  skills: 'skills',
  featured: 'featured',
  projects: 'projects',
  galaxy: 'galaxy',
  achievements: 'hero',
  testimonials: 'hero',
  contact: 'contact',
};

export function initScrollStory(
  onSceneChange: (scene: SceneId) => void,
  onSectionEnter?: (id: string) => void
) {
  sections.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => {
        const scene = sectionSceneMap[id] ?? 'hero';
        onSceneChange(scene);
        onSectionEnter?.(id);
      },
      onEnterBack: () => {
        const scene = sectionSceneMap[id] ?? 'hero';
        onSceneChange(scene);
        onSectionEnter?.(id);
      },
    });

    if (id === 'hero') return;

    const content = el.querySelector('[data-reveal]');
    if (content) {
      gsap.fromTo(
        content,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    }
  });

  const featured = document.getElementById('featured');
  if (featured) {
    const phone = featured.querySelector('[data-phone]');
    if (phone) {
      gsap.to(phone, {
        rotateY: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: featured,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
    }
  }

  ScrollTrigger.refresh();
}

export function useScrollStory(
  onSceneChange: (scene: SceneId) => void,
  onSectionEnter?: (id: string) => void,
  enabled = false
) {
  useEffect(() => {
    if (!enabled) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const frame = requestAnimationFrame(() => {
      initScrollStory(onSceneChange, onSectionEnter);
    });

    return () => {
      cancelAnimationFrame(frame);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [enabled, onSceneChange, onSectionEnter]);
}
