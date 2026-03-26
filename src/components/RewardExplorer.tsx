"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Info } from "lucide-react";
import content from "@/lib/content";

const { reward_function } = content;
const defaultValues: Record<string, number> = {};
reward_function.values.forEach((v) => {
  defaultValues[v.id] = v.reward;
});

const SCENARIO_DESCRIPTIONS = [
  "Healthy pitcher, left in through 7 innings",
  "Pitcher goes on IL 10 days later, was left in",
  "Agent pulls pitcher in 5th, velocity collapsed in 7th",
  "Agent pulls pitcher in 4th, pitcher was fine",
];

const SCENARIO_KEYS = [
  "leave_healthy",
  "leave_injury",
  "pull_collapse",
  "pull_false_alarm",
];

function getPersonalityScore(values: Record<string, number>): number {
  const injuryPenalty = Math.abs(values.leave_injury || 0);
  const falseAlarmCost = Math.abs(values.pull_false_alarm || 0);
  const pullReward = values.pull_collapse || 0;
  const ambiguous = values.pull_il_no_collapse || 0;

  const aggressiveness =
    (injuryPenalty * 8 + pullReward * 15 + ambiguous * 10) /
    (falseAlarmCost * 15 + (values.leave_healthy || 1) * 5 + 1);

  return Math.min(100, Math.max(0, (aggressiveness / 5) * 50));
}

function getPersonalityLabel(score: number): string {
  if (score < 20) return "Ultra Conservative";
  if (score < 40) return "Conservative";
  if (score < 60) return "Balanced";
  if (score < 80) return "Aggressive";
  return "Ultra Aggressive";
}

function getPersonalityColor(score: number): string {
  if (score < 20) return "#3B82F6";
  if (score < 40) return "#60A5FA";
  if (score < 60) return "#F5A623";
  if (score < 80) return "#F97316";
  return "#E53E3E";
}

export default function RewardExplorer() {
  const [values, setValues] = useState<Record<string, number>>({ ...defaultValues });

  const handleSliderChange = useCallback((id: string, value: number) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  }, []);

  const loadPreset = useCallback((presetKey: string) => {
    const preset = reward_function.presets[presetKey];
    if (preset) setValues({ ...preset.values });
  }, []);

  const resetDefaults = useCallback(() => {
    setValues({ ...defaultValues });
  }, []);

  const personalityScore = useMemo(() => getPersonalityScore(values), [values]);
  const personalityLabel = useMemo(() => getPersonalityLabel(personalityScore), [personalityScore]);
  const personalityColor = useMemo(() => getPersonalityColor(personalityScore), [personalityScore]);

  return (
    <div className="space-y-8">
      {/* Main panel: sliders + gauge */}
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left: Sliders */}
        <div className="lg:col-span-3 space-y-5">
          {reward_function.values.map((rv) => (
            <div key={rv.id} className="bg-surface-elevated rounded-xl border border-surface-border-strong p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white">
                    {rv.situation}
                  </h3>
                  <p className="text-xs text-white/40 mt-0.5">
                    {rv.category} - {rv.rationale}
                  </p>
                </div>
                <span
                  className={`text-xl font-bold font-mono ml-4 tabular-nums ${
                    values[rv.id] > 0
                      ? "text-success"
                      : values[rv.id] < 0
                      ? "text-danger"
                      : "text-white/40"
                  }`}
                >
                  {values[rv.id] > 0 ? "+" : ""}
                  {values[rv.id].toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min={rv.slider_min}
                max={rv.slider_max}
                step={rv.slider_step}
                value={values[rv.id]}
                onChange={(e) =>
                  handleSliderChange(rv.id, parseFloat(e.target.value))
                }
                className="w-full"
                style={{
                  background: `linear-gradient(to right, ${
                    rv.slider_min < 0 ? "#E53E3E" : "#38A169"
                  } 0%, ${rv.slider_max > 0 ? "#38A169" : "#E53E3E"} 100%)`,
                }}
              />
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-white/30 font-mono">
                  {rv.slider_min}
                </span>
                <span className="text-[10px] text-white/30 font-mono">
                  {rv.slider_max}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Personality Gauge */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface-elevated rounded-xl border-2 border-surface-border-strong p-6 sticky top-24">
            <h3 className="text-lg font-bold text-white text-center mb-6">
              Agent Personality
            </h3>

            {/* Gauge */}
            <div className="relative mb-6">
              <div className="h-4 rounded-full bg-gradient-to-r from-blue-400 via-brand-gold to-danger overflow-hidden">
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-3 border-surface-base shadow-lg"
                  style={{
                    backgroundColor: personalityColor,
                    left: `calc(${personalityScore}% - 12px)`,
                  }}
                  animate={{
                    left: `calc(${personalityScore}% - 12px)`,
                  }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[10px] text-white/30 font-medium">
                  Conservative
                </span>
                <span className="text-[10px] text-white/30 font-medium">
                  Aggressive
                </span>
              </div>
            </div>

            <motion.div
              className="text-center py-4 rounded-xl"
              style={{ backgroundColor: `${personalityColor}15` }}
              animate={{ backgroundColor: `${personalityColor}15` }}
            >
              <motion.p
                className="text-2xl font-bold"
                style={{ color: personalityColor }}
                animate={{ color: personalityColor }}
              >
                {personalityLabel}
              </motion.p>
            </motion.div>

            {/* Presets */}
            <div className="mt-6">
              <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">
                Presets
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(reward_function.presets).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => loadPreset(key)}
                    className="px-3 py-2 text-xs font-medium rounded-lg border border-surface-border-strong hover:border-brand-gold hover:bg-brand-gold/5 text-white/70 transition-all"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <button
                onClick={resetDefaults}
                className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border border-surface-border-strong hover:border-white/30 text-white/40 transition-all"
              >
                <RotateCcw className="w-3 h-3" />
                Reset to Default
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Outcome Simulation Cards */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">
          Outcome Simulation
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SCENARIO_DESCRIPTIONS.map((desc, i) => {
            const reward = values[SCENARIO_KEYS[i]] || 0;
            const isPositive = reward > 0;
            const isNegative = reward < 0;
            return (
              <motion.div
                key={i}
                layout
                className={`rounded-xl border-2 p-5 transition-all ${
                  isPositive
                    ? "border-success/30 bg-success/5"
                    : isNegative
                    ? "border-danger/30 bg-danger/5"
                    : "border-surface-border-strong bg-surface-elevated"
                }`}
              >
                <p className="text-sm text-white/60 mb-4 leading-relaxed min-h-[3rem]">
                  {desc}
                </p>
                <motion.div
                  className={`text-3xl font-bold font-mono ${
                    isPositive
                      ? "text-success"
                      : isNegative
                      ? "text-danger"
                      : "text-white/30"
                  }`}
                  key={reward}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 400 }}
                >
                  {isPositive ? "+" : ""}
                  {reward.toFixed(1)}
                </motion.div>
                <p className="text-xs text-white/30 mt-1">reward points</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Key Insight Callout */}
      <div className="gold-left-accent bg-brand-gold/5 border-2 border-brand-gold/20 rounded-xl p-6 sm:p-8 flex gap-4">
        <div className="p-2 rounded-lg bg-brand-gold/10 h-fit shrink-0">
          <Info className="w-5 h-5 text-brand-gold" />
        </div>
        <div>
          <h3 className="font-bold text-white mb-2">Key Insight</h3>
          <p className="text-white/60 leading-relaxed">
            {reward_function.key_insight}
          </p>
        </div>
      </div>
    </div>
  );
}
