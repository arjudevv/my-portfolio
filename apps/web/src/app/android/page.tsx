'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AndroidPage() {
  const features = [
    {
      title: 'FCM Notifications',
      description:
        'Implemented Firebase Cloud Messaging for real-time push notifications with custom notification channels, background message handling, and notification actions.',
    },
    {
      title: 'WorkManager Offline Sync',
      description:
        'Built robust offline-first architecture using WorkManager for background tasks, periodic sync, and data persistence when network is unavailable.',
    },
    {
      title: 'ViewModel + Repository',
      description:
        'Architected apps using MVVM pattern with ViewModel for UI state management and Repository pattern for data abstraction and caching.',
    },
    {
      title: 'Room Database',
      description:
        'Implemented local data persistence using Room database with migrations, type converters, and reactive data flows with Flow and LiveData.',
    },
    {
      title: 'Material Design 3',
      description:
        'Created modern UIs following Material Design 3 guidelines with dynamic colors, theming, and adaptive layouts.',
    },
    {
      title: 'Jetpack Compose',
      description:
        'Built declarative UIs with Jetpack Compose, implementing custom composables, state management, and smooth animations.',
    },
  ];

  const architecture = {
    presentation: ['Activity', 'Fragment', 'ViewModel', 'Compose UI'],
    domain: ['Use Cases', 'Repository Interface', 'Domain Models'],
    data: ['Repository Implementation', 'API Service', 'Room Database', 'Data Sources'],
  };

  return (
    <div className="min-h-screen bg-background pt-20 md:pt-32 pb-16 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-16 md:mb-20 max-w-3xl">
            <p className="section-label mb-4">Case Study</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text mb-6">
              Android Development
            </h1>
            <p className="text-xl text-muted">
              Building native Android applications with modern architecture patterns, offline-first
              design, and clear Material interfaces.
            </p>
          </div>

          <div className="mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-8 md:mb-12">
              Key Features &amp; Technologies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="border border-white/12 bg-surface p-6 md:p-8"
                >
                  <h3 className="text-xl font-heading font-bold text-text mb-3">{feature.title}</h3>
                  <p className="text-muted leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-8 md:mb-12">
              Architecture Pattern
            </h2>
            <div className="border border-white/12 bg-surface p-8 md:p-12 space-y-8">
              {Object.entries(architecture).map(([layer, components]) => (
                <div key={layer} className="border-t border-white/10 pt-6 first:border-0 first:pt-0">
                  <h3 className="text-lg font-heading font-semibold text-text mb-4 capitalize">
                    {layer} Layer
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {components.map((component) => (
                      <span
                        key={component}
                        className="px-4 py-2 border border-white/15 text-muted text-sm"
                      >
                        {component}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-8 md:mb-12">
              App Screenshots
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                <div
                  key={index}
                  className="relative aspect-[9/16] overflow-hidden border border-white/12 bg-surface flex items-center justify-center text-muted"
                >
                  <span className="text-xs tracking-widest uppercase">Screen {index}</span>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="border border-white/12 bg-surface p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">
                Try My Android Apps
              </h2>
              <p className="text-lg text-muted mb-8 max-w-2xl">
                Download APK files or check out the source code on GitHub
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-text text-background font-medium hover:bg-text/90 transition-colors">
                  Download APK (Coming Soon)
                </button>
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border border-white/20 text-text font-medium hover:border-white/40 transition-colors text-center"
                >
                  View on GitHub →
                </Link>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}
