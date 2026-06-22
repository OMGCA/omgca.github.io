'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Mode = 'online' | 'offline';
const STORAGE_KEY = 'preferred-mode';

function getCurrentMode(): Mode {
  try {
    const attr = document.documentElement.getAttribute('data-mode');
    if (attr === 'online' || attr === 'offline') return attr;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'online' || stored === 'offline') return stored;
  } catch (_) { /* localStorage may be unavailable */ }
  return 'online';
}

function applyMode(mode: Mode) {
  document.documentElement.setAttribute('data-mode', mode);
  try { localStorage.setItem(STORAGE_KEY, mode); } catch (_) { /* noop */ }
}

/**
 * Two-segment capsule toggle.
 * Uses CSS transitions for the sliding pill — no Motion dependency.
 * Clicks are handled via a native button with explicit event binding.
 */
export default function ModeToggle() {
  const [mode, setMode] = useState<Mode>('online');
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Initialise from DOM/localStorage on mount and sync the DOM
  useEffect(() => {
    const current = getCurrentMode();
    setMode(current);
    // Ensure the DOM attribute is in sync with the resolved mode
    applyMode(current);
  }, []);

  const toggleMode = useCallback(() => {
    setMode(prev => {
      const next: Mode = prev === 'online' ? 'offline' : 'online';
      applyMode(next);
      return next;
    });
  }, []);

  const isOnline = mode === 'online';

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleMode}
      className={`mode-capsule ${isOnline ? 'is-online' : 'is-offline'}`}
      aria-label={`Switch to ${isOnline ? 'offline (work)' : 'online (casual)'} mode`}
    >
      {/* Sliding accent background — positioned via CSS class toggle */}
      <span className="mode-capsule-slider" />

      {/* Casual segment */}
      <span className="mode-capsule-half mode-capsule-left">
        <svg
          className="mode-capsule-svg"
          width="15" height="15" viewBox="0 0 24 24"
          fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M12 3l2 7 7 2-7 2-2 7-2-7-7-2 7-2z" />
        </svg>
        <span className="mode-capsule-text">Casual</span>
      </span>

      {/* Work segment */}
      <span className="mode-capsule-half mode-capsule-right">
        <svg
          className="mode-capsule-svg"
          width="15" height="15" viewBox="0 0 24 24"
          fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
        <span className="mode-capsule-text">Work</span>
      </span>
    </button>
  );
}
