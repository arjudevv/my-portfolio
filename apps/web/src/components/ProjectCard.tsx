'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { useRipple } from '@/hooks/useRipple';

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  index: number;
}

export default function ProjectCard({
  title,
  description,
  techStack,
  githubUrl,
  liveUrl,
  index,
}: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const createRipple = useRipple();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: shouldReduceMotion ? 0 : 0.5, 
        delay: shouldReduceMotion ? 0 : index * 0.1 
      }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -5 }}
      className="bg-white dark:bg-zinc-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 md:p-8 border border-zinc-200 dark:border-zinc-700 relative overflow-hidden"
    >
      <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
        {title}
      </h3>
      <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-xs md:text-sm bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-4">
        {liveUrl && (
          <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.05 }} whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}>
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={createRipple}
              className="relative text-sm md:text-base font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded px-2 py-1"
              aria-label={`View live demo of ${title}`}
            >
              Live Demo →
            </Link>
          </motion.div>
        )}
        {githubUrl && (
          <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.05 }} whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}>
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={createRipple}
              className="relative text-sm md:text-base font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 rounded px-2 py-1"
              aria-label={`View ${title} on GitHub`}
            >
              GitHub →
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

