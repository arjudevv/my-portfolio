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
        <h2 id="experience-heading" className="text-4xl md:text-6xl font-heading font-bold mb-16 text-text">
          My Journey
        </h2>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/15" aria-hidden />

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
                      'absolute left-4 top-6 w-3 h-3 rounded-full border transition-colors',
                      openIndex === index ? 'bg-text border-text' : 'bg-background border-muted'
                    )}
                    aria-hidden
                  />
                  <CollapsibleTrigger className="w-full text-left border border-white/12 bg-surface p-6 hover:border-white/25 transition-colors group">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-muted font-medium mb-1">{exp.period}</p>
                        <h3 className="text-xl font-heading font-semibold text-text">{exp.title}</h3>
                        <p className="text-secondary">{exp.company}</p>
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
                          <span className="text-text/50 mt-1.5 shrink-0">—</span>
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
