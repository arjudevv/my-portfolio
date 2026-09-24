'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { sections } from '@/content/site';
import { useScrollTo } from '@/components/providers/LenisProvider';
import { useSound } from '@/components/providers/SoundProvider';
import { cn } from '@/lib/utils';

interface NavbarProps {
  visible?: boolean;
}

export default function Navbar({ visible = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const scrollTo = useScrollTo();
  const { muted, toggleMute } = useSound();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const navItems = sections.filter((s) => s.id !== 'hero');

  const handleNav = (id: string) => {
    scrollTo(`#${id}`);
    setMobileOpen(false);
  };

  if (!visible) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'border-b border-white/10 bg-background/90 backdrop-blur-md py-3' : 'bg-transparent py-5'
        )}
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={() => handleNav('hero')}
            className="text-xl font-heading font-bold text-text tracking-tight"
            data-magnetic
          >
            ARJUN
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleNav(id)}
                className={cn(
                  'px-3 py-2 text-sm transition-colors',
                  activeSection === id ? 'text-text border-b border-text' : 'text-muted hover:text-text'
                )}
                data-magnetic
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-2 text-muted hover:text-text transition-colors"
              aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="hidden sm:inline-flex px-4 py-2 text-sm font-medium bg-text text-background hover:bg-text/90 transition-colors"
              data-magnetic
            >
              Contact
            </button>
            <button
              className="lg:hidden p-2 text-text"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed inset-x-0 top-16 z-40 border border-white/12 bg-background mx-4 p-4 lg:hidden"
          >
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleNav(id)}
                className="block w-full text-left px-4 py-3 text-text hover:bg-white/5"
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
