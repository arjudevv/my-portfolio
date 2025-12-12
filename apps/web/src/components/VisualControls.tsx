'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { usePolish } from '@/context/PolishContext';

/**
 * Visual controls panel for adjusting polish effects
 * Includes toggles and sliders for fine-tuning
 */
export default function VisualControls() {
  const { settings, setPolishEnabled, setAudioReactive, setLowQualityMode, setBloomIntensity, setSheenStrength } = usePolish();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-indigo-500 text-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        aria-label="Toggle visual controls"
        aria-expanded={isOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      </motion.button>

      {/* Controls Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 z-50 w-80 bg-white dark:bg-zinc-800 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-700 p-4"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Visual Controls
              </h3>

              {/* Polish Effects Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Polish Effects
                </label>
                <button
                  onClick={() => setPolishEnabled(!settings.polishEnabled)}
                  className={`
                    relative w-12 h-6 rounded-full transition-colors
                    ${settings.polishEnabled ? 'bg-indigo-500' : 'bg-zinc-300 dark:bg-zinc-600'}
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                  `}
                  aria-label="Toggle polish effects"
                >
                  <span
                    className={`
                      absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform
                      ${settings.polishEnabled ? 'translate-x-6' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>

              {/* Audio Reactive Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Audio Reactive
                </label>
                <button
                  onClick={() => setAudioReactive(!settings.audioReactive)}
                  disabled={!settings.polishEnabled}
                  className={`
                    relative w-12 h-6 rounded-full transition-colors
                    ${settings.audioReactive && settings.polishEnabled
                      ? 'bg-indigo-500'
                      : 'bg-zinc-300 dark:bg-zinc-600'
                    }
                    ${!settings.polishEnabled ? 'opacity-50 cursor-not-allowed' : ''}
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                  `}
                  aria-label="Toggle audio reactive effects"
                >
                  <span
                    className={`
                      absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform
                      ${settings.audioReactive && settings.polishEnabled ? 'translate-x-6' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>

              {/* Low Quality Mode Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Low Quality Mode
                </label>
                <button
                  onClick={() => setLowQualityMode(!settings.lowQualityMode)}
                  className={`
                    relative w-12 h-6 rounded-full transition-colors
                    ${settings.lowQualityMode ? 'bg-indigo-500' : 'bg-zinc-300 dark:bg-zinc-600'}
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                  `}
                  aria-label="Toggle low quality mode"
                >
                  <span
                    className={`
                      absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform
                      ${settings.lowQualityMode ? 'translate-x-6' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>

              {/* Bloom Intensity Slider */}
              {settings.polishEnabled && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Bloom Intensity: {settings.bloomIntensity.toFixed(2)}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={settings.bloomIntensity}
                      onChange={(e) => setBloomIntensity(parseFloat(e.target.value))}
                      className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>

                  {/* Sheen Strength Slider */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Sheen Strength: {settings.sheenStrength.toFixed(2)}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={settings.sheenStrength}
                      onChange={(e) => setSheenStrength(parseFloat(e.target.value))}
                      className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
