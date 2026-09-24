'use client';

import { useState } from 'react';
import { skills } from '@/content/skills';
import { cn } from '@/lib/utils';

const levelOpacity: Record<string, string> = {
  Expert: 'border-text text-text',
  Advanced: 'border-white/40 text-text',
  Intermediate: 'border-white/25 text-muted',
  Basic: 'border-white/15 text-muted',
};

export default function SkillsSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <section id="skills" data-section="skills" className="section-padding relative" aria-labelledby="skills-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-reveal>
        <p className="section-label mb-4">Skills</p>
        <h2 id="skills-heading" className="text-4xl md:text-6xl font-heading font-bold mb-16 text-text">
          Tech Universe
        </h2>

        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h3 className="text-sm uppercase tracking-[0.18em] text-muted mb-6">{category}</h3>
            <div className="flex flex-wrap gap-3">
              {skills
                .filter((s) => s.category === category)
                .map((skill) => {
                  const isHovered = hovered === skill.name;
                  return (
                    <button
                      key={skill.name}
                      className={cn(
                        'relative group border bg-surface px-5 py-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text',
                        levelOpacity[skill.level] ?? levelOpacity.Basic,
                        isHovered && 'border-text'
                      )}
                      onMouseEnter={() => setHovered(skill.name)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(skill.name)}
                      onBlur={() => setHovered(null)}
                      aria-label={`${skill.name} - ${skill.level}`}
                    >
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="block text-xs text-muted mt-1">{skill.level}</span>
                      {isHovered && skill.projects && skill.projects.length > 0 && (
                        <span className="absolute left-0 top-full mt-2 z-20 w-52 border border-white/12 bg-surface p-3 text-left text-xs text-muted pointer-events-none">
                          Projects: {skill.projects.join(', ')}
                        </span>
                      )}
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
