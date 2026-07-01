'use client';

import { useState } from 'react';
import { Mail, FileDown } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { site } from '@/content/site';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('sending');

    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;

    setStatus('sent');
    setForm({ name: '', email: '', message: '' });
  };

  const links = [
    { href: site.linkedin, icon: FaLinkedin, label: 'LinkedIn' },
    { href: site.github, icon: FaGithub, label: 'GitHub' },
    { href: `mailto:${site.email}`, icon: Mail, label: 'Email' },
    { href: site.resume, icon: FileDown, label: 'Resume' },
  ];

  return (
    <section id="contact" data-section="contact" className="section-padding relative" aria-labelledby="contact-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-reveal>
        <p className="section-label mb-4">Contact</p>
        <h2 id="contact-heading" className="text-4xl md:text-6xl font-heading font-bold mb-16">
          Let&apos;s <span className="gradient-text">Connect</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <Card className="card-glass">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Input
                    id="name"
                    placeholder=" "
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    aria-label="Your name"
                  />
                  <label htmlFor="name" className="absolute left-4 top-3 text-muted text-sm pointer-events-none transition-all peer-focus:top-1 peer-focus:text-xs">
                    Name
                  </label>
                </div>
                <div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    aria-label="Your email"
                  />
                </div>
                <div>
                  <textarea
                    id="message"
                    placeholder="Your message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    aria-label="Your message"
                    className="flex w-full rounded-xl border border-glass bg-surface/50 px-4 py-3 text-white placeholder:text-muted backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary resize-none"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={status === 'sending'} data-magnetic>
                  {status === 'sent' ? 'Opening email client...' : status === 'sending' ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="flex flex-col justify-center space-y-8">
            <p className="text-body-lg text-muted">
              Open to senior Android roles, freelance projects, and collaborations on mobile and backend systems.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {links.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 card-glass rounded-xl p-4 hover:bg-white/5 transition-colors group"
                  data-magnetic
                >
                  <Icon className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
                  <span className="text-white font-medium">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
