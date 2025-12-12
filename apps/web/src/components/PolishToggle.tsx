'use client';

import { motion } from 'framer-motion';
import { usePolish } from '@/context/PolishContext';

/**
 * Toggle component for enabling/disabling visual polish effects
 * Includes keyboard accessibility and aria labels
 */
export default function PolishToggle() {
  const { settings, setPolishEnabled } = usePolish();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setPolishEnabled(!settings.polishEnabled)}
      className={`
        relative flex items-center gap-2 px-3 py-2 rounded-lg
        transition-colors duration-200
        ${settings.polishEnabled
          ? 'bg-indigo-500 text-white'
          : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
        }
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        dark:focus:ring-offset-zinc-900
      `}
      aria-label={settings.polishEnabled ? 'Disable visual polish effects' : 'Enable visual polish effects'}
      aria-pressed={settings.polishEnabled}
    >
      <span className="text-sm font-medium">Polish</span>
      <span className="text-xs">{settings.polishEnabled ? 'On' : 'Off'}</span>
    </motion.button>
  );
}
