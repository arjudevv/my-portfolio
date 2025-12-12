'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { href: 'https://github.com', label: 'GitHub', icon: 'GitHub' },
    { href: 'https://linkedin.com', label: 'LinkedIn', icon: 'LinkedIn' },
    { href: 'mailto:arjun@example.com', label: 'Email', icon: 'Email' },
  ];

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400">
            © {currentYear} Arjun. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors text-sm md:text-base"
              >
                {social.label}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

