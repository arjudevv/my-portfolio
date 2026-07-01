'use client';

import { PolishProvider } from '@/context/PolishContext';
import { LenisProvider } from '@/components/providers/LenisProvider';
import { SoundProvider } from '@/components/providers/SoundProvider';
import { CursorProvider } from '@/components/cursor/CursorProvider';
import NoiseOverlay from '@/components/NoiseOverlay';
import type { ReactNode } from 'react';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <PolishProvider>
      <LenisProvider>
        <SoundProvider>
          <CursorProvider>
            {children}
            <NoiseOverlay />
          </CursorProvider>
        </SoundProvider>
      </LenisProvider>
    </PolishProvider>
  );
}
