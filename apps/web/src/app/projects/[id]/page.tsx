import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/content/projects';

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="border border-white/12 bg-surface p-8 md:p-12 mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-text mb-4">{project.title}</h1>
          <p className="text-xl text-muted mb-6">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-sm border border-white/15 text-muted">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {project.problem && (
          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">Problem</h2>
            <p className="text-muted leading-relaxed">{project.problem}</p>
          </section>
        )}

        {project.solution && (
          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">Solution</h2>
            <p className="text-muted leading-relaxed">{project.solution}</p>
          </section>
        )}

        {project.architecture && (
          <section className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">Architecture</h2>
            <p className="text-muted leading-relaxed">{project.architecture}</p>
          </section>
        )}

        <section className="mb-10">
          <h2 className="text-2xl font-heading font-bold text-text mb-4">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="px-3 py-1 text-sm border border-white/15 text-muted">
                {t}
              </span>
            ))}
          </div>
        </section>

        <Link href="/#projects" className="text-text hover:text-muted transition-colors border-b border-text/40">
          ← Back to Projects
        </Link>
      </div>
    </div>
  );
}
