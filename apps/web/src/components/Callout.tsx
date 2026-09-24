'use client';

import { motion } from 'framer-motion';

interface CalloutProps {
  type?: 'info' | 'warning' | 'error' | 'success';
  children: React.ReactNode;
}

export default function Callout({ type = 'info', children }: CalloutProps) {
  const styles = {
    info: 'bg-surface border-white/20 text-muted',
    warning: 'bg-surface border-white/30 text-text',
    error: 'bg-surface border-white/40 text-text',
    success: 'bg-surface border-white/25 text-muted',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`border p-4 my-6 ${styles[type]}`}
    >
      {children}
    </motion.div>
  );
}
