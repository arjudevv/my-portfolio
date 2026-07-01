'use client';

import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';

interface SoundContextType {
  muted: boolean;
  toggleMute: () => void;
  playHover: () => void;
  playTransition: () => void;
}

const SoundContext = createContext<SoundContextType>({
  muted: true,
  toggleMute: () => {},
  playHover: () => {},
  playTransition: () => {},
});

export function useSound() {
  return useContext(SoundContext);
}

function getInitialMuted(): boolean {
  if (typeof window === 'undefined') return true;
  const stored = localStorage.getItem('sound-muted');
  return stored !== null ? stored === 'true' : true;
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(getInitialMuted);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('sound-muted', String(muted));
  }, [muted, mounted]);

  const toggleMute = () => {
    setMuted((prev) => {
      const next = !prev;
      localStorage.setItem('sound-muted', String(next));
      return next;
    });
  };

  const playTone = (frequency: number, duration: number, volume = 0.05) => {
    if (muted || typeof window === 'undefined') return;
    if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
    const ctx = audioCtxRef.current;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  return (
    <SoundContext.Provider
      value={{
        muted,
        toggleMute,
        playHover: () => playTone(800, 0.05, 0.03),
        playTransition: () => playTone(400, 0.15, 0.02),
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}
