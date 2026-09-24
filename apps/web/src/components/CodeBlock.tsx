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
      className="my-6 overflow-hidden border border-white/12"
    >
      {language && (
        <div className="bg-surface px-4 py-2 text-sm font-medium text-muted border-b border-white/12">
          {language}
        </div>
      )}
      <pre className="bg-background p-4 overflow-x-auto">
        <code className="text-sm text-text font-mono">{children}</code>
      </pre>
    </motion.div>
  );
}
