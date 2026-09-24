'use client';

import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { site } from '@/content/site';

export default function FooterSection() {
  const year = new Date().getFullYear();

  const social = [
    { href: site.linkedin, icon: FaLinkedin, label: 'LinkedIn' },
    { href: site.github, icon: FaGithub, label: 'GitHub' },
    { href: `mailto:${site.email}`, icon: Mail, label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-white/12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="text-2xl font-heading font-bold text-text mb-2">{site.name}</p>
            <p className="text-muted text-sm">{site.role}</p>
          </div>

          <div className="flex items-center gap-3">
            {social.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-white/15 hover:border-white/40 transition-colors"
                aria-label={label}
                data-magnetic
              >
                <Icon className="w-5 h-5 text-text" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/12 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
          <p>
            © {year} {site.name}. Built in India.
          </p>
          <p className="tracking-[0.2em] uppercase text-xs">Simple · Focused · Clear</p>
        </div>
      </div>
    </footer>
  );
}
