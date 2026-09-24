import Link from 'next/link';
import { featuredProject } from '@/content/projects';
import { featuredProjectConfig } from '@/content/featured-project';
import { Button } from '@/components/ui/button';

export default function FeaturedProjectSection() {
  return (
    <section
      id="featured"
      data-section="featured"
      className="section-padding relative"
      aria-labelledby="featured-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-reveal>
        <p className="section-label mb-4">Featured Project</p>
        <h2 id="featured-heading" className="text-4xl md:text-6xl font-heading font-bold mb-10 text-text">
          {featuredProject.title}
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start border-t border-white/10 pt-10">
          <div className="space-y-6">
            <p className="text-body-lg text-muted">{featuredProject.longDescription}</p>
            <div className="flex flex-wrap gap-2">
              {featuredProject.tech.map((t) => (
                <span key={t} className="px-3 py-1 text-sm border border-white/15 text-muted">
                  {t}
                </span>
              ))}
            </div>
            <ul className="space-y-3">
              {featuredProjectConfig.screens.map((screen) => (
                <li key={screen.id} className="flex items-center gap-3 text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-text/70" aria-hidden />
                  <span className="text-sm tracking-wide">{screen.label}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild>
                <Link href={`/projects/${featuredProject.id}`}>Full Case Study</Link>
              </Button>
              {featuredProject.github && (
                <Button variant="outline" asChild>
                  <a href={featuredProject.github} target="_blank" rel="noopener noreferrer">
                    Source
                  </a>
                </Button>
              )}
            </div>
          </div>

          <div className="border border-white/12 bg-surface p-8 md:p-10 min-h-[280px] flex flex-col justify-between">
            <div>
              <p className="section-label mb-4">Highlight</p>
              <p className="text-xl md:text-2xl font-heading text-text leading-snug">
                {featuredProject.description}
              </p>
            </div>
            <p className="text-sm text-muted mt-8 border-t border-white/10 pt-6">
              {featuredProject.tags.join(' · ')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
