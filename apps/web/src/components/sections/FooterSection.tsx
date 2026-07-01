'use client';

import { Mail, Heart } from 'lucide-react';
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
    <footer className="relative border-t border-glass overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-gradient-shift" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="text-2xl font-heading font-bold gradient-text mb-2">{site.name}</p>
            <p className="text-muted text-sm">{site.role}</p>
          </div>

          <div className="flex items-center gap-4">
            {social.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass hover:bg-primary/20 hover:shadow-lg hover:shadow-primary/20 transition-all"
                aria-label={label}
                data-magnetic
              >
                <Icon className="w-5 h-5 text-white" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-glass flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
          <p className="flex items-center gap-1">
            © {year} {site.name}. Crafted with <Heart className="w-3 h-3 text-primary inline" aria-hidden /> in India
          </p>
          <svg viewBox="0 0 200 40" className="h-8 opacity-40" aria-hidden>
            <path
              d="M10 30 Q50 5 100 25 T190 20"
              fill="none"
              stroke="url(#sig-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="sig-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5B8CFF" />
                <stop offset="100%" stopColor="#00E5FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </footer>
  );
}
