'use client';

import { createContext, useContext, useState, useEffect, useSyncExternalStore, type ReactNode } from 'react';

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

function getInitialSettings(): PolishSettings {
  if (typeof window === 'undefined') return defaultSettings;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const shouldDisableByDefault = prefersReducedMotion || deviceMemory <= 2;
  const stored = localStorage.getItem('polish-settings');
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as Partial<PolishSettings>;
      return {
        ...defaultSettings,
        ...parsed,
        polishEnabled: shouldDisableByDefault ? false : (parsed.polishEnabled ?? defaultSettings.polishEnabled),
      };
    } catch {
      return { ...defaultSettings, polishEnabled: !shouldDisableByDefault };
    }
  }
  return { ...defaultSettings, polishEnabled: !shouldDisableByDefault };
}

export function PolishProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<PolishSettings>(() =>
    typeof window !== 'undefined' ? getInitialSettings() : defaultSettings
  );
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    if (mounted) localStorage.setItem('polish-settings', JSON.stringify(settings));
  }, [settings, mounted]);

  const update = (partial: Partial<PolishSettings>) =>
    setSettings((prev) => ({ ...prev, ...partial }));

  return (
    <PolishContext.Provider
      value={{
        settings,
        setPolishEnabled: (enabled) => update({ polishEnabled: enabled }),
        setAudioReactive: (enabled) => update({ audioReactive: enabled }),
        setLowQualityMode: (enabled) => update({ lowQualityMode: enabled }),
        setBloomIntensity: (intensity) => update({ bloomIntensity: intensity }),
        setSheenStrength: (strength) => update({ sheenStrength: strength }),
      }}
    >
      {children}
    </PolishContext.Provider>
  );
}

export function usePolish() {
  const context = useContext(PolishContext);
  if (!context) throw new Error('usePolish must be used within PolishProvider');
  return context;
}
