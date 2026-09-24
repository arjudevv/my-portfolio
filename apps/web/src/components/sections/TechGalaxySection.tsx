'use client';

import { useState } from 'react';
import { skills } from '@/content/skills';
import { cn } from '@/lib/utils';

export default function TechGalaxySection() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedSkill = skills.find((s) => s.name === selected);
  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <section id="galaxy" data-section="galaxy" className="section-padding relative" aria-labelledby="galaxy-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-reveal>
        <p className="section-label mb-4">Tech Stack</p>
        <h2 id="galaxy-heading" className="text-4xl md:text-6xl font-heading font-bold mb-6 text-text">
          Connected Technologies
        </h2>
        <p className="text-muted mb-12 max-w-xl">
          A plain view of the tools and platforms used across projects.
        </p>

        <div className="space-y-10">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-sm uppercase tracking-[0.18em] text-muted mb-4">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills
                  .filter((s) => s.category === category)
                  .map((skill) => (
                    <button
                      key={skill.name}
                      type="button"
                      onClick={() => setSelected(selected === skill.name ? null : skill.name)}
                      className={cn(
                        'px-4 py-2 text-sm border transition-colors',
                        selected === skill.name
                          ? 'border-text bg-text text-background'
                          : 'border-white/15 text-muted hover:text-text hover:border-white/30'
                      )}
                    >
                      {skill.name}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {selectedSkill && (
          <div className="mt-10 border border-white/12 bg-surface p-6 max-w-md">
            <p className="font-heading font-semibold text-text text-lg">{selectedSkill.name}</p>
            <p className="text-sm text-muted mt-1">
              {selectedSkill.level} · {selectedSkill.category}
            </p>
            {selectedSkill.projects && (
              <p className="text-sm text-muted mt-3">Used in: {selectedSkill.projects.join(', ')}</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
