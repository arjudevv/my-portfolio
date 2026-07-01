'use client';

import { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import type { SceneId } from '@/types/portfolio';

interface SceneContextType {
  activeScene: SceneId;
  setActiveScene: Dispatch<SetStateAction<SceneId>>;
  mouse: { x: number; y: number };
  setMouse: Dispatch<SetStateAction<{ x: number; y: number }>>;
}

const SceneContext = createContext<SceneContextType>({
  activeScene: 'hero',
  setActiveScene: () => {},
  mouse: { x: 0, y: 0 },
  setMouse: () => {},
});

export function useScene() {
  return useContext(SceneContext);
}

export function SceneProvider({ children }: { children: ReactNode }) {
  const [activeScene, setActiveScene] = useState<SceneId>('hero');
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  return (
    <SceneContext.Provider value={{ activeScene, setActiveScene, mouse, setMouse }}>
      {children}
    </SceneContext.Provider>
  );
}
