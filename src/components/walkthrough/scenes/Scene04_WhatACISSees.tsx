"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import content from "@/lib/content";

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  biomechanical: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
  workload: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20" },
  context: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
};

const INITIAL_VALUES: Record<string, { value: string; unit: string }> = {
  velo_drop_from_baseline: { value: "-0.8", unit: "mph" },
  spin_drop_from_baseline: { value: "-50", unit: "RPM" },
  pitch_count_so_far: { value: "55", unit: "pitches" },
  stress_accumulated: { value: "1.05", unit: "ratio" },
  inning: { value: "4", unit: "th" },
  score_diff: { value: "0", unit: "" },
};

function getGaugeColor(codeName: string, value: number): string {
  if (codeName === "stress_accumulated") {
    if (value >= 1.5) return "bg-danger";
    if (value >= 1.2) return "bg-warning";
    return "bg-success";
  }
  if (codeName === "velo_drop_from_baseline") {
    if (value <= -3.0) return "bg-danger";
    if (value <= -1.5) return "bg-warning";
    return "bg-success";
  }
  if (codeName === "spin_drop_from_baseline") {
    if (value <= -150) return "bg-danger";
    if (value <= -75) return "bg-warning";
    return "bg-success";
  }
  return "bg-brand-gold";
}

function getGaugePercent(codeName: string, value: number): number {
  if (codeName === "pitch_count_so_far") return Math.min((value / 120) * 100, 100);
  if (codeName === "stress_accumulated") return Math.min((value / 2.0) * 100, 100);
  if (codeName === "inning") return Math.min((value / 9) * 100, 100);
  if (codeName === "velo_drop_from_baseline") return Math.min((Math.abs(value) / 5) * 100, 100);
  if (codeName === "spin_drop_from_baseline") return Math.min((Math.abs(value) / 300) * 100, 100);
  return 50;
}

export default function Scene04_WhatACISSees() {
  const features = content.state_vector;
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-bold text-white text-center mb-2"
        >
          6 numbers. That&apos;s what ACIS sees right now.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/40 text-center text-sm mb-10"
        >
          Marcus Rivera, At-Bat 5, Top of the 4th
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => {
            const colors = CATEGORY_COLORS[feature.category] || CATEGORY_COLORS.context;
            const val = INITIAL_VALUES[feature.code_name];
            const numVal = parseFloat(val.value);
            const gaugePercent = getGaugePercent(feature.code_name, numVal);
            const gaugeColor = getGaugeColor(feature.code_name, numVal);
            const isExpanded = expanded === i;

            return (
              <motion.div
                key={feature.code_name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: isExpanded ? 1 : expanded !== null ? 0.4 : 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                onClick={() => setExpanded(isExpanded ? null : i)}
                className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                  isExpanded
                    ? `bg-surface-elevated ${colors.border}`
                    : "bg-surface-card border-white/5 hover:border-white/15"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className={`text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                      {feature.category}
                    </span>
                    <p className="text-white font-semibold text-sm mt-2">{feature.display_name}</p>
                  </div>
                  <p className="text-xl font-bold font-mono text-white">
                    {val.value}
                    <span className="text-xs text-white/30 ml-1">{val.unit}</span>
                  </p>
                </div>

                {/* Gauge bar */}
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${gaugePercent}%` }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${gaugeColor}`}
                  />
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-white/5">
                        <p className="text-xs text-white/50 leading-relaxed">{feature.short_description}</p>
                        <p className="text-xs text-white/30 mt-2 italic">{feature.why_it_matters}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-white/20 text-xs text-center mt-6 font-mono"
        >
          Click a card to learn more
        </motion.p>
      </div>
    </div>
  );
}
