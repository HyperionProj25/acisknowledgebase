"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { Play, Pause } from "lucide-react";
import content from "@/lib/content";

const progression = content.walkthrough.at_bat_progression;

const FEATURES = [
  { key: "velo_drop" as const, label: "Velocity Drop", unit: "mph", format: (v: number) => v.toFixed(1) },
  { key: "spin_drop" as const, label: "Spin Rate Drop", unit: "RPM", format: (v: number) => String(Math.round(v)) },
  { key: "pitch_count" as const, label: "Pitch Count", unit: "pitches", format: (v: number) => String(v) },
  { key: "acwr" as const, label: "Arm Stress", unit: "ACWR", format: (v: number) => v.toFixed(2) },
  { key: "inning" as const, label: "Inning", unit: "", format: (v: number) => String(v) },
  { key: "score_diff" as const, label: "Score Diff", unit: "", format: (v: number) => (v >= 0 ? `+${v}` : String(v)) },
];

function getValues(atBat: typeof progression[0]) {
  return {
    velo_drop: atBat.velo_drop,
    spin_drop: atBat.spin_drop,
    pitch_count: atBat.pitch_count,
    acwr: atBat.acwr,
    inning: atBat.inning,
    score_diff: atBat.score_diff,
  };
}

function getSeverity(key: string, value: number): "green" | "yellow" | "red" {
  if (key === "velo_drop") {
    if (value <= -3.0) return "red";
    if (value <= -1.5) return "yellow";
    return "green";
  }
  if (key === "spin_drop") {
    if (value <= -150) return "red";
    if (value <= -75) return "yellow";
    return "green";
  }
  if (key === "acwr") {
    if (value >= 1.5) return "red";
    if (value >= 1.2) return "yellow";
    return "green";
  }
  if (key === "pitch_count") {
    if (value >= 100) return "red";
    if (value >= 80) return "yellow";
    return "green";
  }
  return "green";
}

const SEVERITY_COLORS = {
  green: { bar: "bg-success", text: "text-success", glow: "" },
  yellow: { bar: "bg-warning", text: "text-warning", glow: "" },
  red: { bar: "bg-danger", text: "text-danger", glow: "shadow-[0_0_12px_rgba(229,62,62,0.3)]" },
};

function getGaugePercent(key: string, value: number): number {
  if (key === "pitch_count") return Math.min((value / 120) * 100, 100);
  if (key === "acwr") return Math.min((value / 2.0) * 100, 100);
  if (key === "inning") return Math.min((value / 9) * 100, 100);
  if (key === "velo_drop") return Math.min((Math.abs(value) / 5) * 100, 100);
  if (key === "spin_drop") return Math.min((Math.abs(value) / 300) * 100, 100);
  if (key === "score_diff") return 50 + value * 10;
  return 50;
}

export default function Scene06_SignsOfTrouble() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const play = useCallback(() => {
    setPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setPlaying(false);
  }, []);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setCurrentIdx((prev) => {
          if (prev >= progression.length - 1) {
            setPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing]);

  const atBat = progression[currentIdx];
  const values = getValues(atBat);

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-bold text-white text-center mb-2"
        >
          Watch what happens as the game progresses.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/40 text-center text-sm mb-8"
        >
          Marcus Rivera, At-Bat {atBat.at_bat} -- Inning {atBat.inning}
        </motion.p>

        {/* Gauge grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {FEATURES.map((feat) => {
            const val = values[feat.key];
            const severity = getSeverity(feat.key, val);
            const colors = SEVERITY_COLORS[severity];
            const percent = getGaugePercent(feat.key, val);

            return (
              <div
                key={feat.key}
                className={`p-3 sm:p-4 rounded-xl bg-surface-card border border-white/5 transition-all ${colors.glow}`}
              >
                <p className="text-[10px] uppercase tracking-wider text-white/30 font-mono mb-1">
                  {feat.label}
                </p>
                <motion.p
                  key={`${feat.key}-${currentIdx}`}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  className={`text-xl sm:text-2xl font-bold font-mono ${colors.text}`}
                >
                  {feat.format(val)}
                  <span className="text-xs text-white/20 ml-1">{feat.unit}</span>
                </motion.p>
                <div className="h-1 rounded-full bg-white/5 mt-2 overflow-hidden">
                  <motion.div
                    animate={{ width: `${percent}%` }}
                    transition={{ type: "spring", damping: 20, stiffness: 200 }}
                    className={`h-full rounded-full ${colors.bar}`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline scrubber */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-surface-card border border-white/5 rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={playing ? pause : play}
              className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-surface-base hover:bg-brand-gold-light transition-colors shrink-0"
            >
              {playing ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
            </button>
            <input
              type="range"
              min={0}
              max={progression.length - 1}
              value={currentIdx}
              onChange={(e) => {
                setPlaying(false);
                setCurrentIdx(Number(e.target.value));
              }}
              className="flex-1 accent-brand-gold"
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-white/20 px-1">
            {progression.map((ab) => (
              <span
                key={ab.at_bat}
                className={currentIdx === ab.at_bat - 1 ? "text-brand-gold font-bold" : ""}
              >
                {ab.at_bat}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
