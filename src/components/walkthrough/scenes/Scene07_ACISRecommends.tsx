"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import content from "@/lib/content";

export default function Scene07_ACISRecommends() {
  const { recommendation, outcome, pitcher } = content.walkthrough;
  const [showOutcome, setShowOutcome] = useState(false);
  const [showCounterfactual, setShowCounterfactual] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowOutcome(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const triggerLabels: Record<string, string> = {
    velo_drop: "Velocity",
    spin_drop: "Spin Rate",
    acwr: "Arm Stress (ACWR)",
  };

  const triggerValues: Record<string, string> = {
    velo_drop: "-2.8 mph",
    spin_drop: "-160 RPM",
    acwr: "1.35",
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl text-center">
        <AnimatePresence mode="wait">
          {!showCounterfactual ? (
            <motion.div key="pull" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* PULL recommendation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 200 }}
                className="inline-block"
              >
                <motion.p
                  className="text-6xl sm:text-7xl lg:text-8xl font-bold font-mono text-brand-gold"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(245,166,35,0)",
                      "0 0 60px rgba(245,166,35,0.4)",
                      "0 0 0px rgba(245,166,35,0)",
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                >
                  PULL
                </motion.p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white/50 text-sm mt-3 font-mono"
              >
                At-bat {recommendation.at_bat}, Top of the {recommendation.inning}th -- {pitcher.name}
              </motion.p>

              {/* Trigger signals */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap justify-center gap-3 mt-8"
              >
                {recommendation.trigger_features.map((feat) => (
                  <div
                    key={feat}
                    className="px-4 py-2 rounded-lg bg-danger/10 border border-danger/20"
                  >
                    <p className="text-xs text-white/40 font-mono">{triggerLabels[feat]}</p>
                    <p className="text-danger font-bold font-mono">{triggerValues[feat]}</p>
                  </div>
                ))}
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-white/40 text-sm mt-4"
              >
                {recommendation.explanation}
              </motion.p>

              {/* Outcome - delayed reveal */}
              <AnimatePresence>
                {showOutcome && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mt-10 p-5 rounded-xl bg-surface-card border border-white/10"
                  >
                    <p className="text-white/70 leading-relaxed">
                      <span className="text-white font-semibold">{outcome.days_later} days later</span>, {pitcher.name} was placed on the{" "}
                      <span className="text-danger font-semibold">{outcome.il_duration} Injured List</span>{" "}
                      with {outcome.il_reason}.
                    </p>
                    <p className="text-white/30 text-sm mt-3">
                      ACIS saw it coming. The signals were there.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Toggle */}
              {showOutcome && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => setShowCounterfactual(true)}
                  className="mt-6 text-sm text-white/30 hover:text-white/60 transition-colors underline decoration-white/10 underline-offset-4"
                >
                  What if ACIS said LEAVE IN?
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div key="leave" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.p
                className="text-6xl sm:text-7xl lg:text-8xl font-bold font-mono text-danger"
                animate={{
                  textShadow: [
                    "0 0 0px rgba(229,62,62,0)",
                    "0 0 60px rgba(229,62,62,0.4)",
                    "0 0 0px rgba(229,62,62,0)",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                LEAVE IN
              </motion.p>

              <p className="text-white/50 text-sm mt-3 font-mono">
                At-bat {recommendation.at_bat}, Top of the {recommendation.inning}th
              </p>

              <div className="mt-8 p-6 rounded-xl bg-danger/10 border border-danger/20">
                <p className="text-5xl font-bold font-mono text-danger">-4.0</p>
                <p className="text-white/50 text-sm mt-2">Missed injury signal. The worst possible outcome.</p>
                <p className="text-white/30 text-xs mt-3">
                  {pitcher.name} goes on the IL. The warning signs were ignored.
                </p>
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => setShowCounterfactual(false)}
                className="mt-6 text-sm text-white/30 hover:text-white/60 transition-colors underline decoration-white/10 underline-offset-4"
              >
                Back to PULL recommendation
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
