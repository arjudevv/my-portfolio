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
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
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
                <div>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    aria-label="Your name"
                  />
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
                {status === 'error' && (
                  <p className="text-sm text-red-400" role="alert">{errorMessage}</p>
                )}
                {status === 'sent' && (
                  <p className="text-sm text-success" role="status">Message sent successfully!</p>
                )}
                <Button type="submit" size="lg" className="w-full" disabled={status === 'sending'} data-magnetic>
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
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
