'use client';

import type { ReactNode } from 'react';
import { PolishProvider } from '@/context/PolishContext';
import { LenisProvider } from '@/components/providers/LenisProvider';
import { SoundProvider } from '@/components/providers/SoundProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <PolishProvider>
      <LenisProvider>
        <SoundProvider>{children}</SoundProvider>
      </LenisProvider>
    </PolishProvider>
  );
}
