'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

// --- Types & Context ---

type Mode = 'online' | 'offline';

interface ModeContextValue {
  mode: Mode;
  toggleMode: () => void;
}

const ModeContext = createContext<ModeContextValue | null>(null);

const STORAGE_KEY = 'preferred-mode';

function getInitialMode(): Mode {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'online' || stored === 'offline') return stored;
  }
  return 'online';
}

export function useMode(): ModeContextValue {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error('useMode must be used within ModeProvider');
  return ctx;
}

// --- Provider (includes the toggle button) ---

interface Props {
  children: React.ReactNode;
}

export default function ModeProvider({ children }: Props) {
  const [mode, setMode] = useState<Mode>(getInitialMode);

  // Apply data-mode immediately on mount and keep in sync
  useEffect(() => {
    document.documentElement.setAttribute('data-mode', getInitialMode());
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode);
  }, [mode]);

  const toggleMode = useCallback(() => {
    setMode(prev => {
      const next: Mode = prev === 'online' ? 'offline' : 'online';
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
}
