'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const blogPosts = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js 14',
    excerpt:
      'Learn how to build modern web applications with Next.js 14, including App Router, Server Components, and more.',
    date: '2024-01-15',
    tags: ['Next.js', 'React', 'Web Development'],
  },
  {
    slug: 'android-architecture-patterns',
    title: 'Android Architecture Patterns: MVVM Deep Dive',
    excerpt:
      'Exploring MVVM architecture pattern in Android development with ViewModel, LiveData, and Room database.',
    date: '2024-01-10',
    tags: ['Android', 'Architecture', 'MVVM'],
  },
  {
    slug: 'building-restful-apis',
    title: 'Building RESTful APIs with Node.js and Express',
    excerpt:
      'A comprehensive guide to building scalable REST APIs with proper error handling, authentication, and documentation.',
    date: '2024-01-05',
    tags: ['Backend', 'Node.js', 'API'],
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background pt-20 md:pt-32 pb-16 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-12 md:mb-16 max-w-3xl">
            <p className="section-label mb-4">Writing</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text mb-6">Blog</h1>
            <p className="text-xl text-muted">
              Thoughts, tutorials, and insights on web development, mobile apps, and backend systems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-white/12 bg-surface hover:border-white/30 transition-colors"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="p-6 md:p-8">
                    <div className="text-sm text-muted mb-3">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-text mb-3">{post.title}</h2>
                    <p className="text-muted mb-4 leading-relaxed">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 border border-white/15 text-muted text-xs">
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
