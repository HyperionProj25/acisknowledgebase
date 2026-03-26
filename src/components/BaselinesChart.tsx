"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import content from "@/lib/content";

const BAR_COLORS = ["#4A5568", "#A0AEC0", "#F5A623"];

export default function BaselinesChart() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<HTMLElement>, { once: true, margin: "-50px" });
  const { baselines } = content.validation;
  const maxScore = 1.0;

  return (
    <div
      ref={ref}
      className="gold-top-accent bg-surface-elevated rounded-xl border-2 border-surface-border-strong p-6"
    >
      <h3 className="text-lg font-bold text-white mb-1">
        Baselines Comparison
      </h3>
      <p className="text-sm text-white/40 mb-8">
        Average reward score across validation episodes
      </p>

      <div className="space-y-6">
        {baselines.map((baseline, i) => (
          <div key={baseline.name}>
            <div className="flex justify-between items-baseline mb-2">
              <span className={`text-sm font-medium ${
                i === baselines.length - 1 ? "text-brand-gold font-bold" : "text-white/60"
              }`}>
                {baseline.name}
              </span>
              <span className={`text-lg font-bold font-mono ${
                i === baselines.length - 1 ? "text-brand-gold" : "text-white/60"
              }`}>
                {baseline.score.toFixed(3)}
              </span>
            </div>
            <div className="h-8 bg-surface-base rounded-lg overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${(baseline.score / maxScore) * 100}%` } : {}}
                transition={{
                  duration: 1,
                  delay: i * 0.2 + 0.3,
                  ease: "easeOut",
                }}
                className="h-full rounded-lg"
                style={{ backgroundColor: BAR_COLORS[i] }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
