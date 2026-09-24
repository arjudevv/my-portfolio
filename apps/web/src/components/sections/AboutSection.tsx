'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { site } from '@/content/site';
import { stats } from '@/content/achievements';
import { skills } from '@/content/skills';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  enabled?: boolean;
}

export default function AboutSection({ enabled = false }: AboutSectionProps) {
  const countersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !countersRef.current) return;
    const els = countersRef.current.querySelectorAll('[data-count]');
    const triggers = Array.from(els).map((el) => {
      const target = parseInt(el.getAttribute('data-count') ?? '0', 10);
      const obj = { val: 0 };
      const tween = gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate: () => {
          el.textContent = Math.round(obj.val).toLocaleString() + (el.getAttribute('data-suffix') ?? '');
        },
      });
      return tween.scrollTrigger;
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((trigger) => trigger?.kill());
    };
  }, [enabled]);

  const topSkills = skills.slice(0, 8);

  return (
    <section id="about" data-section="about" className="section-padding relative" aria-labelledby="about-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-reveal>
        <p className="section-label mb-4">About</p>
        <h2 id="about-heading" className="text-4xl md:text-6xl font-heading font-bold mb-12 text-text">
          Crafting Digital Experiences
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="border border-white/12 bg-surface p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 border border-white/20 flex items-center justify-center text-xl font-heading font-bold text-text">
                A
              </div>
              <div>
                <h3 className="text-xl font-heading font-semibold text-text">{site.name}</h3>
                <p className="text-muted">{site.role}</p>
              </div>
            </div>
            {site.about.map((p, i) => (
              <p key={i} className="text-body-lg text-muted leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <div className="space-y-8">
            <div ref={countersRef} className="grid grid-cols-2 gap-4">
              {[
                { label: 'Years', count: stats.yearsExperience, suffix: '+' },
                { label: 'Apps', count: stats.appsShipped, suffix: '+' },
                { label: 'Users', count: stats.usersReached, suffix: '+' },
                { label: 'Certs', count: stats.certifications, suffix: '' },
              ].map((s) => (
                <div key={s.label} className="border border-white/12 bg-surface p-6 text-center">
                  <p className="text-3xl font-heading font-bold text-text" data-count={s.count} data-suffix={s.suffix}>
                    0
                  </p>
                  <p className="text-sm text-muted mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {topSkills.map((skill) => (
                <span
                  key={skill.name}
                  className="px-3 py-1.5 text-sm border border-white/15 text-muted"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
