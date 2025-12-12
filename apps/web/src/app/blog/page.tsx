'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const blogPosts = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js 14',
    excerpt: 'Learn how to build modern web applications with Next.js 14, including App Router, Server Components, and more.',
    date: '2024-01-15',
    tags: ['Next.js', 'React', 'Web Development'],
  },
  {
    slug: 'android-architecture-patterns',
    title: 'Android Architecture Patterns: MVVM Deep Dive',
    excerpt: 'Exploring MVVM architecture pattern in Android development with ViewModel, LiveData, and Room database.',
    date: '2024-01-10',
    tags: ['Android', 'Architecture', 'MVVM'],
  },
  {
    slug: 'building-restful-apis',
    title: 'Building RESTful APIs with Node.js and Express',
    excerpt: 'A comprehensive guide to building scalable REST APIs with proper error handling, authentication, and documentation.',
    date: '2024-01-05',
    tags: ['Backend', 'Node.js', 'API'],
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-20 md:pt-32 pb-16 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
              Blog
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
              Thoughts, tutorials, and insights on web development, mobile apps, and backend systems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="p-6 md:p-8">
                    <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-3 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
