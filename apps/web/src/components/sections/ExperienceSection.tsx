'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { experience } from '@/content/experience';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

export default function ExperienceSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="experience" data-section="experience" className="section-padding relative" aria-labelledby="experience-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-reveal>
        <p className="section-label mb-4">Experience</p>
        <h2 id="experience-heading" className="text-4xl md:text-6xl font-heading font-bold mb-16">
          My <span className="gradient-text">Journey</span>
        </h2>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent" aria-hidden />

          <div className="space-y-6">
            {experience.map((exp, index) => (
              <Collapsible
                key={index}
                open={openIndex === index}
                onOpenChange={(open) => setOpenIndex(open ? index : -1)}
              >
                <div className="relative pl-16">
                  <div
                    className={cn(
                      'absolute left-4 top-6 w-4 h-4 rounded-full border-2 transition-colors',
                      openIndex === index ? 'bg-primary border-primary shadow-lg shadow-primary/50' : 'bg-surface border-muted'
                    )}
                    aria-hidden
                  />
                  <CollapsibleTrigger className="w-full text-left card-glass rounded-2xl p-6 hover:bg-white/5 transition-colors group">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-accent font-medium mb-1">{exp.period}</p>
                        <h3 className="text-xl font-heading font-semibold text-white">{exp.title}</h3>
                        <p className="text-primary">{exp.company}</p>
                      </div>
                      <ChevronDown
                        className={cn(
                          'w-5 h-5 text-muted transition-transform shrink-0 mt-1',
                          openIndex === index && 'rotate-180'
                        )}
                      />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <ul className="mt-4 ml-2 space-y-3 text-muted">
                      {exp.achievements.map((a, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-accent mt-1.5 shrink-0">▸</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
