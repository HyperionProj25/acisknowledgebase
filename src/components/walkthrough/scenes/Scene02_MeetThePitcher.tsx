"use client";

import { motion } from "framer-motion";
import content from "@/lib/content";

export default function Scene02_MeetThePitcher() {
  const { pitcher } = content.walkthrough;

  const stats = [
    { label: "AVG Velo", value: `${pitcher.season_velo} mph`, desc: "Average fastball speed this season" },
    { label: "AVG Spin", value: `${pitcher.season_spin.toLocaleString()} RPM`, desc: "Average spin rate this season" },
    { label: "ERA", value: pitcher.era.toFixed(2), desc: "Earned Run Average - runs allowed per 9 innings" },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Scoreboard */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <div className="flex items-center gap-6 px-6 py-3 rounded-lg bg-surface-elevated border border-white/5 font-mono text-sm">
            <div className="text-center">
              <p className="text-brand-gold font-bold text-lg">{pitcher.team}</p>
              <p className="text-white text-2xl font-bold">{pitcher.game_score.home}</p>
            </div>
            <div className="text-white/30 text-xs">
              <p>Top {pitcher.inning_start}th</p>
              <p className="text-white/15 mt-0.5">vs</p>
            </div>
            <div className="text-center">
              <p className="text-white/50 font-bold text-lg">{pitcher.opponent}</p>
              <p className="text-white text-2xl font-bold">{pitcher.game_score.away}</p>
            </div>
          </div>
        </motion.div>

        {/* Pitcher card */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.3 }}
          className="bg-surface-card border border-white/10 rounded-2xl p-6 sm:p-8"
        >
          <div className="flex items-start gap-6">
            {/* Pitcher silhouette */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-surface-elevated border border-white/10 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-16 sm:h-16 text-brand-gold/60">
                <circle cx="32" cy="18" r="10" fill="currentColor" opacity="0.6" />
                <path
                  d="M16 58 C16 42 24 34 32 34 C40 34 48 42 48 58"
                  fill="currentColor"
                  opacity="0.4"
                />
                <path
                  d="M38 38 L52 24"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.8"
                />
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-2xl sm:text-3xl font-bold text-white"
              >
                {pitcher.name}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-white/40 text-sm font-mono mt-1"
              >
                {pitcher.team} Starting Pitcher
                <span className="mx-2 text-white/15">|</span>
                {pitcher.date}
              </motion.p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.12 }}
                    className="group relative"
                  >
                    <p className="text-[11px] uppercase tracking-wider text-white/30 font-mono">
                      {stat.label}
                    </p>
                    <p className="text-lg sm:text-xl font-bold font-mono text-white mt-0.5">
                      {stat.value}
                    </p>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-0 mb-2 px-3 py-1.5 bg-surface-elevated border border-white/10 rounded-lg text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      {stat.desc}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="text-white/30 text-sm mt-6 pt-4 border-t border-white/5 italic"
          >
            Tuesday night, NL East rivalry. Rivera is dealing. But something is about to change.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
