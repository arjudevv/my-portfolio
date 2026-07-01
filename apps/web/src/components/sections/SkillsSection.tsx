'use client';

import { useState } from 'react';
import { skills } from '@/content/skills';
import { cn } from '@/lib/utils';

const levelColors: Record<string, string> = {
  Expert: 'from-success to-accent',
  Advanced: 'from-primary to-secondary',
  Intermediate: 'from-secondary to-accent',
  Basic: 'from-muted to-muted',
};

export default function SkillsSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <section id="skills" data-section="skills" className="section-padding relative overflow-hidden" aria-labelledby="skills-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-reveal>
        <p className="section-label mb-4">Skills</p>
        <h2 id="skills-heading" className="text-4xl md:text-6xl font-heading font-bold mb-16">
          Tech <span className="gradient-text">Universe</span>
        </h2>

        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h3 className="text-lg font-heading text-muted mb-6">{category}</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {skills
                .filter((s) => s.category === category)
                .map((skill, i) => {
                  const angle = (i / skills.filter((s) => s.category === category).length) * Math.PI * 2;
                  const isHovered = hovered === skill.name;
                  return (
                    <button
                      key={skill.name}
                      className={cn(
                        'relative group rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-primary',
                        isHovered ? 'scale-110 z-10' : 'scale-100'
                      )}
                      style={{
                        transform: `translate(${Math.cos(angle) * 4}px, ${Math.sin(angle) * 4}px)`,
                      }}
                      onMouseEnter={() => setHovered(skill.name)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(skill.name)}
                      onBlur={() => setHovered(null)}
                      aria-label={`${skill.name} - ${skill.level}`}
                    >
                      <div
                        className={cn(
                          'w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold text-center p-2 bg-gradient-to-br shadow-glass border border-white/10 transition-all',
                          levelColors[skill.level] ?? levelColors.Basic,
                          isHovered && 'shadow-lg shadow-primary/40'
                        )}
                      >
                        {skill.name}
                      </div>
                      {isHovered && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 card-glass rounded-xl p-3 text-left z-20 pointer-events-none">
                          <p className="font-semibold text-white">{skill.name}</p>
                          <p className="text-xs text-accent">{skill.level}</p>
                          {skill.projects && skill.projects.length > 0 && (
                            <p className="text-xs text-muted mt-1">Projects: {skill.projects.join(', ')}</p>
                          )}
                        </div>
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
