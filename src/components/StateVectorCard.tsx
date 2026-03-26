"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gauge,
  RotateCw,
  Hash,
  Activity,
  Clock,
  BarChart2,
  ChevronDown,
} from "lucide-react";
import type { StateVectorFeature } from "@/lib/content";

const ICON_MAP: Record<string, React.ElementType> = {
  gauge: Gauge,
  "rotate-cw": RotateCw,
  hash: Hash,
  activity: Activity,
  clock: Clock,
  "bar-chart-2": BarChart2,
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  biomechanical: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-400/20" },
  workload: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-400/20" },
  context: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-400/20" },
};

export default function StateVectorCard({
  feature,
  index,
}: {
  feature: StateVectorFeature;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const Icon = ICON_MAP[feature.icon] || Gauge;
  const colors = CATEGORY_COLORS[feature.category] || CATEGORY_COLORS.context;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full text-left rounded-xl border-2 ${
          expanded ? "border-brand-gold shadow-lg shadow-brand-gold/10" : `${colors.border} hover:border-brand-gold/40 hover:shadow-md hover:shadow-brand-gold/5`
        } bg-surface-elevated transition-all overflow-hidden`}
      >
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className={`p-2.5 rounded-lg ${colors.bg} shrink-0`}>
              <Icon className={`w-5 h-5 ${colors.text}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <code className="text-xs font-mono bg-surface-base text-white/50 px-2 py-0.5 rounded">
                  {feature.code_name}
                </code>
                <span className={`text-[10px] font-medium uppercase tracking-wider ${colors.text}`}>
                  {feature.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">
                {feature.display_name}
              </h3>
              <p className="text-sm text-white/50 mt-1">
                {feature.short_description}
              </p>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-white/30 transition-transform shrink-0 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 bg-surface-elevated rounded-b-xl border-2 border-t-0 border-brand-gold -mt-1 space-y-4">
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Full Description
                </h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  {feature.long_description}
                </p>
              </div>

              <div className="gold-left-accent bg-brand-gold/5 border border-brand-gold/20 rounded-lg p-4">
                <h4 className="text-sm font-bold text-white mb-1">
                  Why It Matters
                </h4>
                <p className="text-sm text-white/60">
                  {feature.why_it_matters}
                </p>
              </div>

              <div className="bg-surface-base rounded-lg p-4">
                <h4 className="text-xs font-mono text-white/40 mb-1">
                  Example
                </h4>
                <p className="text-sm text-brand-gold font-medium">
                  {feature.example}
                </p>
              </div>

              {/* Thresholds */}
              {feature.thresholds && (
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">
                    Threshold Zones
                  </h4>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-success/10 border border-success/30 rounded-lg p-3 text-center">
                      <div className="text-xs font-bold text-success">
                        {feature.thresholds.normal.label}
                      </div>
                      <div className="text-xs text-white/40 mt-0.5">
                        &le; {feature.thresholds.normal.max}
                      </div>
                    </div>
                    <div className="flex-1 bg-warning/10 border border-warning/30 rounded-lg p-3 text-center">
                      <div className="text-xs font-bold text-warning">
                        {feature.thresholds.elevated.label}
                      </div>
                      <div className="text-xs text-white/40 mt-0.5">
                        {feature.thresholds.elevated.min} - {feature.thresholds.elevated.max}
                      </div>
                    </div>
                    <div className="flex-1 bg-danger/10 border border-danger/30 rounded-lg p-3 text-center">
                      <div className="text-xs font-bold text-danger">
                        {feature.thresholds.high.label}
                      </div>
                      <div className="text-xs text-white/40 mt-0.5">
                        &gt; {feature.thresholds.high.min}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Limitation note */}
              {feature.limitation_note && (
                <div className="bg-warning/10 border border-warning/30 rounded-lg p-3">
                  <p className="text-xs text-white/60">
                    <strong className="text-warning">Note:</strong> {feature.limitation_note}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
