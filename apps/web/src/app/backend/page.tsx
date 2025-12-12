'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BackendPage() {
  const technologies = [
    {
      category: 'Runtime & Frameworks',
      items: ['Node.js', 'Express.js', 'Fastify', 'NestJS', 'TypeScript'],
    },
    {
      category: 'Authentication & Security',
      items: ['JWT', 'OAuth 2.0', 'Passport.js', 'bcrypt', 'Rate Limiting'],
    },
    {
      category: 'Databases',
      items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'TypeORM'],
    },
    {
      category: 'DevOps & Infrastructure',
      items: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Nginx'],
    },
    {
      category: 'Message Queues',
      items: ['Bull', 'RabbitMQ', 'Redis Queue', 'Background Workers'],
    },
    {
      category: 'API & Communication',
      items: ['REST APIs', 'GraphQL', 'WebSockets', 'gRPC', 'OpenAPI'],
    },
  ];

  const features = [
    {
      title: 'JWT Authentication',
      description: 'Implemented secure authentication flows with JWT tokens, refresh tokens, and role-based access control (RBAC).',
      icon: '🔐',
    },
    {
      title: 'Database Design',
      description: 'Designed and optimized database schemas with proper indexing, relationships, and migrations for PostgreSQL and MongoDB.',
      icon: '🗄️',
    },
    {
      title: 'Docker & CI/CD',
      description: 'Containerized applications with Docker, set up automated CI/CD pipelines with GitHub Actions, and deployed to cloud platforms.',
      icon: '🐳',
    },
    {
      title: 'API Rate Limiting',
      description: 'Implemented rate limiting middleware to protect APIs from abuse, using Redis for distributed rate limiting.',
      icon: '⚡',
    },
    {
      title: 'Queue Workers',
      description: 'Built background job processing systems using Bull queues for email sending, image processing, and data synchronization.',
      icon: '📬',
    },
    {
      title: 'Microservices',
      description: 'Architected scalable microservices with service discovery, API gateways, and inter-service communication.',
      icon: '🏗️',
    },
  ];

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
              Backend & Server Development
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto"
            >
              Building scalable, secure, and performant backend systems with modern
              technologies and best practices.
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 md:mb-12 text-center">
              Core Capabilities
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

          {/* Technologies */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 md:mb-12 text-center">
              Technology Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                    {tech.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tech.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Architecture Diagram */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 md:mb-12 text-center">
              System Architecture
            </h2>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-2xl p-8 md:p-12 border border-indigo-200 dark:border-indigo-800">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-indigo-200 dark:border-indigo-700"
                >
                  <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                    API Gateway / Load Balancer
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Nginx / AWS ALB → Rate Limiting → Authentication
                  </p>
                </motion.div>
                <div className="flex justify-center">
                  <div className="w-1 h-12 bg-indigo-300 dark:bg-indigo-700"></div>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-indigo-200 dark:border-indigo-700"
                >
                  <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                    Application Services
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded p-3">
                      <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                        REST API (Express/Fastify)
                      </p>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded p-3">
                      <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                        WebSocket Server
                      </p>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded p-3">
                      <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                        Background Workers
                      </p>
                    </div>
                  </div>
                </motion.div>
                <div className="flex justify-center">
                  <div className="w-1 h-12 bg-indigo-300 dark:bg-indigo-700"></div>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-indigo-200 dark:border-indigo-700"
                >
                  <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                    Data Layer
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded p-3">
                      <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                        PostgreSQL
                      </p>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded p-3">
                      <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                        MongoDB
                      </p>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded p-3">
                      <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                        Redis Cache
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Repositories */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl p-8 md:p-12 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Explore My Backend Projects
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Check out my open-source backend projects and API implementations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-medium hover:bg-white/90 transition-colors"
                >
                  View on GitHub →
                </Link>
                <Link
                  href="/api-docs"
                  className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/30 transition-colors"
                >
                  API Documentation →
                </Link>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}
