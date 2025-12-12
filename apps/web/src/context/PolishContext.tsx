'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PolishSettings {
  polishEnabled: boolean;
  audioReactive: boolean;
  lowQualityMode: boolean;
  bloomIntensity: number;
  sheenStrength: number;
}

interface PolishContextType {
  settings: PolishSettings;
  setPolishEnabled: (enabled: boolean) => void;
  setAudioReactive: (enabled: boolean) => void;
  setLowQualityMode: (enabled: boolean) => void;
  setBloomIntensity: (intensity: number) => void;
  setSheenStrength: (strength: number) => void;
}

const defaultSettings: PolishSettings = {
  polishEnabled: false,
  audioReactive: false,
  lowQualityMode: false,
  bloomIntensity: 0.25,
  sheenStrength: 0.6,
};

const PolishContext = createContext<PolishContextType | undefined>(undefined);

export function PolishProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<PolishSettings>(defaultSettings);
  const [mounted, setMounted] = useState(false);

  // Check for prefers-reduced-motion and device memory on mount
  useEffect(() => {
    setMounted(true);
    
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check device memory (if available)
    const deviceMemory = (navigator as any).deviceMemory || 4;
    const shouldDisableByDefault = prefersReducedMotion || deviceMemory <= 2;

    // Load from localStorage
    const stored = localStorage.getItem('polish-settings');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSettings({
          ...defaultSettings,
          ...parsed,
          // Override if reduced motion is preferred
          polishEnabled: shouldDisableByDefault ? false : parsed.polishEnabled ?? defaultSettings.polishEnabled,
        });
      } catch {
        setSettings({
          ...defaultSettings,
          polishEnabled: shouldDisableByDefault ? false : defaultSettings.polishEnabled,
        });
      }
    } else {
      setSettings({
        ...defaultSettings,
        polishEnabled: shouldDisableByDefault ? false : defaultSettings.polishEnabled,
      });
    }
  }, []);

  // Persist to localStorage when settings change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('polish-settings', JSON.stringify(settings));
    }
  }, [settings, mounted]);

  const updateSettings = (updates: Partial<PolishSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const value: PolishContextType = {
    settings,
    setPolishEnabled: (enabled) => updateSettings({ polishEnabled: enabled }),
    setAudioReactive: (enabled) => updateSettings({ audioReactive: enabled }),
    setLowQualityMode: (enabled) => updateSettings({ lowQualityMode: enabled }),
    setBloomIntensity: (intensity) => updateSettings({ bloomIntensity: intensity }),
    setSheenStrength: (strength) => updateSettings({ sheenStrength: strength }),
  };

  return <PolishContext.Provider value={value}>{children}</PolishContext.Provider>;
}

export function usePolish() {
  const context = useContext(PolishContext);
  if (context === undefined) {
    throw new Error('usePolish must be used within a PolishProvider');
  }
  return context;
}
