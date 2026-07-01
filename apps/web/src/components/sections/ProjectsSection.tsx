'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projects } from '@/content/projects';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Project } from '@/types/portfolio';

export default function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" data-section="projects" className="section-padding relative" aria-labelledby="projects-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-reveal>
        <p className="section-label mb-4">Projects</p>
        <h2 id="projects-heading" className="text-4xl md:text-6xl font-heading font-bold mb-16">
          Selected <span className="gradient-text">Work</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="card-glass group cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              onClick={() => setSelected(project)}
              onKeyDown={(e) => e.key === 'Enter' && setSelected(project)}
              tabIndex={0}
              role="button"
              aria-label={`View ${project.title} details`}
            >
              <CardContent className="p-0">
                <div className="h-48 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/10 rounded-t-2xl flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-[url('/project-images/aceneobank-1.svg')] bg-cover bg-center opacity-30 group-hover:opacity-50 transition-opacity" />
                  <span className="text-5xl relative z-10">
                    {project.tags[0] === 'Android' ? '📱' : project.tags[0] === 'Full Stack' ? '☁️' : '💬'}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-accent">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted text-sm line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tech.slice(0, 4).map((t) => (
                      <span key={t} className="text-xs text-muted">{t}</span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.title}</DialogTitle>
              </DialogHeader>
              <p className="text-muted">{selected.longDescription}</p>
              {selected.problem && (
                <div>
                  <h4 className="font-semibold text-white mb-1">Problem</h4>
                  <p className="text-sm text-muted">{selected.problem}</p>
                </div>
              )}
              {selected.solution && (
                <div>
                  <h4 className="font-semibold text-white mb-1">Solution</h4>
                  <p className="text-sm text-muted">{selected.solution}</p>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {selected.tech.map((t) => (
                  <span key={t} className="px-2 py-1 text-xs rounded-full glass">{t}</span>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                {selected.github && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={selected.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub className="w-4 h-4" /> GitHub
                    </a>
                  </Button>
                )}
                {selected.liveDemo && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={selected.liveDemo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" /> Demo
                    </a>
                  </Button>
                )}
                <Button size="sm" asChild>
                  <Link href={`/projects/${selected.id}`}>Full Case Study</Link>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
