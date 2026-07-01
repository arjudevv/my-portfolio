'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { achievements, timeline } from '@/content/achievements';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export default function AchievementsSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    gridRef.current.querySelectorAll('[data-achievement]').forEach((el) => {
      const target = parseInt(el.getAttribute('data-value') ?? '0', 10);
      const suffix = el.getAttribute('data-suffix') ?? '';
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
        onUpdate: () => {
          const display = target >= 1000 ? Math.round(obj.val).toLocaleString() : Math.round(obj.val);
          el.textContent = `${el.getAttribute('data-prefix') ?? ''}${display}${suffix}`;
        },
      });
    });
  }, []);

  return (
    <section id="achievements" data-section="achievements" className="section-padding relative" aria-labelledby="achievements-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-reveal>
        <p className="section-label mb-4">Achievements</p>
        <h2 id="achievements-heading" className="text-4xl md:text-6xl font-heading font-bold mb-16">
          Impact & <span className="gradient-text">Milestones</span>
        </h2>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((a) => (
            <div key={a.id} className="card-glass rounded-2xl p-8 text-center">
              <p
                className="text-4xl md:text-5xl font-heading font-bold gradient-text"
                data-achievement
                data-value={a.value}
                data-suffix={a.suffix ?? ''}
                data-prefix={a.prefix ?? ''}
              >
                0
              </p>
              <p className="text-sm text-muted mt-2">{a.label}</p>
            </div>
          ))}
        </div>

        <div className="relative overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max">
            {timeline.map((item, i) => (
              <div key={i} className="card-glass rounded-2xl p-6 w-64 shrink-0">
                <p className="text-accent font-mono text-sm mb-2">{item.year}</p>
                <h3 className="font-heading font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-muted">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
