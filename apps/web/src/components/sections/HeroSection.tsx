'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown } from 'lucide-react';
import { site } from '@/content/site';
import { Button } from '@/components/ui/button';
import { useScrollTo } from '@/components/providers/LenisProvider';
import { useRipple } from '@/hooks/useRipple';

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollTo = useScrollTo();
  const createRipple = useRipple();

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !titleRef.current) return;

    const chars = titleRef.current.querySelectorAll('[data-char]');
    gsap.fromTo(
      chars,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        delay: 2.8,
        ease: 'power3.out',
      }
    );
  }, []);

  const name = site.name.toUpperCase();

  return (
    <section
      id="hero"
      data-section="hero"
      className="relative min-h-screen flex items-center section-padding"
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-reveal>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <p className="section-label">Portfolio 2026</p>
            <h1 id="hero-heading" ref={titleRef} className="text-display font-heading font-bold">
              {name.split('').map((char, i) => (
                <span key={i} data-char className="inline-block opacity-0">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>
            <p className="text-2xl md:text-3xl font-heading text-muted">
              <span className="gradient-text font-semibold">{site.role}</span>
            </p>
            <p className="text-body-lg text-muted max-w-xl">{site.tagline}</p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="relative overflow-hidden"
                data-magnetic
                onClick={(e) => {
                  createRipple(e);
                  scrollTo('#projects');
                }}
              >
                View Projects
              </Button>
              <Button
                variant="outline"
                size="lg"
                data-magnetic
                onClick={(e) => {
                  createRipple(e);
                  scrollTo('#contact');
                }}
              >
                Get In Touch
              </Button>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-glow" />
              <div className="absolute inset-8 rounded-full border border-glass glass animate-float" />
              <div className="absolute inset-16 rounded-full border border-primary/30 glass" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-heading font-bold gradient-text">A</span>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => scrollTo('#about')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted hover:text-white transition-colors"
          aria-label="Scroll to about section"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
