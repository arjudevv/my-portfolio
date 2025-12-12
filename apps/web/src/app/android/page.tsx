'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function AndroidPage() {
  const features = [
    {
      title: 'FCM Notifications',
      description: 'Implemented Firebase Cloud Messaging for real-time push notifications with custom notification channels, background message handling, and notification actions.',
      icon: '📱',
    },
    {
      title: 'WorkManager Offline Sync',
      description: 'Built robust offline-first architecture using WorkManager for background tasks, periodic sync, and data persistence when network is unavailable.',
      icon: '🔄',
    },
    {
      title: 'ViewModel + Repository',
      description: 'Architected apps using MVVM pattern with ViewModel for UI state management and Repository pattern for data abstraction and caching.',
      icon: '🏗️',
    },
    {
      title: 'Room Database',
      description: 'Implemented local data persistence using Room database with migrations, type converters, and reactive data flows with Flow and LiveData.',
      icon: '💾',
    },
    {
      title: 'Material Design 3',
      description: 'Created beautiful, modern UIs following Material Design 3 guidelines with dynamic colors, theming, and adaptive layouts.',
      icon: '🎨',
    },
    {
      title: 'Jetpack Compose',
      description: 'Built declarative UIs with Jetpack Compose, implementing custom composables, state management, and smooth animations.',
      icon: '⚡',
    },
  ];

  const architecture = {
    presentation: ['Activity', 'Fragment', 'ViewModel', 'Compose UI'],
    domain: ['Use Cases', 'Repository Interface', 'Domain Models'],
    data: ['Repository Implementation', 'API Service', 'Room Database', 'Data Sources'],
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-20 md:pt-32 pb-16 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Hero Section */}
          <div className="text-center mb-16 md:mb-20">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-50 mb-6"
            >
              Android Development
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto"
            >
              Building native Android applications with modern architecture patterns,
              offline-first design, and beautiful Material Design interfaces.
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 md:mb-12 text-center">
              Key Features & Technologies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Architecture Diagram */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 md:mb-12 text-center">
              Architecture Pattern
            </h2>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-2xl p-8 md:p-12 border border-indigo-200 dark:border-indigo-800">
              <div className="space-y-8">
                {Object.entries(architecture).map(([layer, components], layerIndex) => (
                  <motion.div
                    key={layer}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: layerIndex * 0.1 }}
                    className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-indigo-200 dark:border-indigo-700"
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 capitalize">
                      {layer} Layer
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {components.map((component) => (
                        <span
                          key={component}
                          className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium"
                        >
                          {component}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Screenshots Grid */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 md:mb-12 text-center">
              App Screenshots
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="relative aspect-[9/16] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900"
                >
                  <div className="w-full h-full flex items-center justify-center text-zinc-400 dark:text-zinc-600">
                    <span className="text-xs">Screenshot {index}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Download APK Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl p-8 md:p-12 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Try My Android Apps
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Download APK files or check out the source code on GitHub
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-medium hover:bg-white/90 transition-colors">
                  Download APK (Coming Soon)
                </button>
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/30 transition-colors"
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
