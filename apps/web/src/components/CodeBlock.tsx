'use client';

import { motion } from 'framer-motion';

interface CodeBlockProps {
  language?: string;
  children: React.ReactNode;
}

export default function CodeBlock({ language, children }: CodeBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="my-6 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800"
    >
      {language && (
        <div className="bg-zinc-100 dark:bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800">
          {language}
        </div>
      )}
      <pre className="bg-zinc-900 dark:bg-zinc-950 p-4 overflow-x-auto">
        <code className="text-sm text-zinc-100 font-mono">{children}</code>
      </pre>
    </motion.div>
  );
}
