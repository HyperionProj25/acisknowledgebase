"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Choice = "pull" | "leave" | null;

const MATRIX = [
  { action: "LEAVE IN", outcome: "Pitcher OK", reward: "+1.0", color: "text-success", bg: "bg-success/10", border: "border-success/20" },
  { action: "LEAVE IN", outcome: "Pitcher Injured", reward: "-4.0", color: "text-danger", bg: "bg-danger/10", border: "border-danger/20", pulse: true },
  { action: "PULL", outcome: "Pitcher OK", reward: "-0.1", color: "text-warning", bg: "bg-warning/10", border: "border-warning/20" },
  { action: "PULL", outcome: "Pitcher Injured", reward: "+0.5", color: "text-success", bg: "bg-success/10", border: "border-success/20" },
];

const EXPLANATIONS: Record<string, string> = {
  pull: "If you pull and the pitcher was fine, minor cost (-0.1). If you pull and he would have been injured, good catch (+0.5). Pulling is the safer bet.",
  leave: "If you leave him in and he is fine, great (+1.0). But if you leave him in and he gets injured, that is the worst outcome (-4.0). A massive asymmetry.",
};

export default function Scene05_TheDecision() {
  const [choice, setChoice] = useState<Choice>(null);

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-bold text-white text-center mb-3"
        >
          Every at-bat, ACIS makes one choice.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/40 text-center text-sm mb-10"
        >
          And the stakes are not symmetric.
        </motion.p>

        {/* Two buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-6 mb-10"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setChoice(choice === "pull" ? null : "pull")}
            className={`px-8 py-4 rounded-xl text-lg font-bold border-2 transition-colors ${
              choice === "pull"
                ? "bg-brand-gold border-brand-gold text-surface-base"
                : "bg-transparent border-brand-gold/50 text-brand-gold hover:border-brand-gold"
            }`}
          >
            PULL
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setChoice(choice === "leave" ? null : "leave")}
            className={`px-8 py-4 rounded-xl text-lg font-bold border-2 transition-colors ${
              choice === "leave"
                ? "bg-white border-white text-surface-base"
                : "bg-transparent border-white/30 text-white/70 hover:border-white/60"
            }`}
          >
            LEAVE IN
          </motion.button>
        </motion.div>

        {/* Outcome matrix */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-3"
        >
          {/* Headers */}
          <div className="col-span-2 grid grid-cols-2 gap-3 mb-1">
            <p className="text-xs font-mono text-white/30 text-center uppercase tracking-wider">Pitcher OK</p>
            <p className="text-xs font-mono text-white/30 text-center uppercase tracking-wider">Pitcher Injured</p>
          </div>

          {/* LEAVE IN row */}
          <div className="col-span-2 grid grid-cols-2 gap-3">
            <div className="relative">
              <p className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full text-[10px] font-mono text-white/20 uppercase tracking-wider hidden sm:block" style={{ writingMode: "vertical-rl", transform: "translateX(-100%) translateY(-50%) rotate(180deg)" }}>
                Leave In
              </p>
              <div
                className={`p-4 rounded-lg border text-center transition-opacity ${MATRIX[0].bg} ${MATRIX[0].border} ${
                  choice === "pull" ? "opacity-30" : ""
                }`}
              >
                <p className={`text-2xl font-bold font-mono ${MATRIX[0].color}`}>{MATRIX[0].reward}</p>
                <p className="text-xs text-white/40 mt-1">Correct call</p>
              </div>
            </div>
            <div
              className={`p-4 rounded-lg border text-center transition-opacity ${MATRIX[1].bg} ${MATRIX[1].border} ${
                choice === "pull" ? "opacity-30" : ""
              }`}
            >
              <motion.p
                className={`text-2xl font-bold font-mono ${MATRIX[1].color}`}
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {MATRIX[1].reward}
              </motion.p>
              <p className="text-xs text-white/40 mt-1">Missed injury</p>
            </div>
          </div>

          {/* PULL row */}
          <div className="col-span-2 grid grid-cols-2 gap-3">
            <div
              className={`p-4 rounded-lg border text-center transition-opacity ${MATRIX[2].bg} ${MATRIX[2].border} ${
                choice === "leave" ? "opacity-30" : ""
              }`}
            >
              <p className={`text-2xl font-bold font-mono ${MATRIX[2].color}`}>{MATRIX[2].reward}</p>
              <p className="text-xs text-white/40 mt-1">False alarm</p>
            </div>
            <div
              className={`p-4 rounded-lg border text-center transition-opacity ${MATRIX[3].bg} ${MATRIX[3].border} ${
                choice === "leave" ? "opacity-30" : ""
              }`}
            >
              <p className={`text-2xl font-bold font-mono ${MATRIX[3].color}`}>{MATRIX[3].reward}</p>
              <p className="text-xs text-white/40 mt-1">Good catch</p>
            </div>
          </div>
        </motion.div>

        {/* Explanation */}
        <AnimatePresence mode="wait">
          {choice && (
            <motion.div
              key={choice}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mt-6 p-4 rounded-lg bg-surface-elevated border border-white/5"
            >
              <p className="text-sm text-white/60 leading-relaxed">{EXPLANATIONS[choice]}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
