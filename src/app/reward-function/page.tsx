"use client";

import { motion } from "framer-motion";
import content from "@/lib/content";
import RewardExplorer from "@/components/RewardExplorer";

export default function RewardFunctionPage() {
  return (
    <>
      {/* Header */}
      <section className="relative bg-surface-base text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 gold-lines-texture" />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              The Reward Function
            </h1>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              The scoring system that shapes the Arm Care Intelligence System (ACIS) agent&apos;s personality.
              Adjust the sliders to see how different reward weights change behavior.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tuning History */}
      <section className="py-8 bg-surface-card border-b border-surface-border">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="gold-left-accent bg-surface-elevated rounded-xl border border-surface-border-strong p-5">
            <h3 className="text-sm font-bold text-white mb-2">Tuning History</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              {content.reward_function.tuning_history}
            </p>
          </div>
        </div>
      </section>

      {/* Reward Explorer */}
      <section className="py-12 sm:py-16 bg-surface-card">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <RewardExplorer />
        </div>
      </section>
    </>
  );
}
