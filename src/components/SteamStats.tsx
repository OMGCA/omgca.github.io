'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface SteamSummary {
  totalSpend: string;
  totalGames: number;
  gamesPlayed: number;
  gamesPlayedPct: number;
  totalPlaytime: string;
}

interface SteamData {
  steamId: string;
  profileUrl: string;
  steamDbUrl: string;
  summary: SteamSummary;
}

const FALLBACK: SteamData = {
  steamId: '',
  profileUrl: '',
  steamDbUrl: '',
  summary: {
    totalSpend: '—',
    totalGames: 0,
    gamesPlayed: 0,
    gamesPlayedPct: 0,
    totalPlaytime: '—'
  }
};

function StatItem({ label, value, delay }: { label: string; value: string | number; delay: number }) {
  return (
    <motion.div
      className="steam-stat"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <span className="steam-stat-value">{value}</span>
      <span className="steam-stat-label">{label}</span>
    </motion.div>
  );
}

export default function SteamStats() {
  const [data, setData] = useState<SteamData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/steam-data.json')
      .then(res => res.json())
      .then(d => setData(d as SteamData))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="steam-summary surface">
        <p className="steam-loading">Loading Steam stats…</p>
      </div>
    );
  }

  if (!data?.summary) {
    return (
      <div className="steam-summary surface">
        <p>Steam stats unavailable.</p>
      </div>
    );
  }

  const { summary, steamDbUrl, profileUrl } = data;

  return (
    <div className="steam-summary surface">
      {/* Stats grid */}
      <div className="steam-stats-grid">
        <StatItem label="Games owned" value={summary.totalGames} delay={0} />
        <StatItem label="Games played" value={`${summary.gamesPlayed} (${summary.gamesPlayedPct}%)`} delay={0.05} />
        <StatItem label="Total playtime" value={summary.totalPlaytime} delay={0.1} />
        <StatItem label="Total spend" value={summary.totalSpend} delay={0.15} />
      </div>

      {/* Completion bar */}
      <div className="steam-completion">
        <div className="steam-completion-header">
          <span className="steam-completion-label">Completion</span>
          <span className="steam-completion-pct">{summary.gamesPlayedPct}%</span>
        </div>
        <div className="steam-completion-track">
          <motion.div
            className="steam-completion-fill"
            initial={{ width: 0 }}
            animate={{ width: `${summary.gamesPlayedPct}%` }}
            transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Links */}
      <div className="steam-links">
        <a href={steamDbUrl} target="_blank" rel="noopener noreferrer" className="steam-link">
          SteamDB Profile &rarr;
        </a>
        <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="steam-link steam-link-muted">
          Steam Community &rarr;
        </a>
      </div>
    </div>
  );
}
