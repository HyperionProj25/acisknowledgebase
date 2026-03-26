"use client";

import { motion } from "framer-motion";
import { Lightbulb, Dog, Layers, Eye, MousePointer, Trophy } from "lucide-react";
import content from "@/lib/content";
import DataFlowPipeline from "@/components/DataFlowPipeline";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
  transition: { duration: 0.5 },
};

const TRIAD_ICONS = [Eye, MousePointer, Trophy];

export default function HowItWorksPage() {
  const { rl_explainer } = content;

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
              How It Works
            </h1>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              From raw pitch data to real-time pull recommendations, trace the complete
              Arm Care Intelligence System (ACIS) pipeline.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Data Flow Pipeline */}
      <section className="py-16 sm:py-20 bg-surface-card">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.h2
            {...fadeUp}
            className="text-2xl sm:text-3xl font-bold text-white text-center mb-3"
          >
            The Data Pipeline
          </motion.h2>
          <p className="text-white/40 text-center max-w-2xl mx-auto mb-12">
            Click any node to see details. Press &quot;Play All&quot; to watch data flow through the entire system.
          </p>
          <DataFlowPipeline />
        </div>
      </section>

      {/* RL Explainer */}
      <section className="py-16 sm:py-20 bg-surface-base">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.h2
            {...fadeUp}
            className="text-2xl sm:text-3xl font-bold text-white text-center mb-3"
          >
            Reinforcement Learning, Explained
          </motion.h2>
          <p className="text-white/40 text-center max-w-2xl mx-auto mb-10">
            The AI paradigm behind ACIS and why it matters for pitcher safety.
          </p>

          {/* ML vs RL comparison */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-3xl mx-auto bg-surface-card rounded-xl p-6 sm:p-8 flex gap-4 border border-surface-border-strong"
          >
            <div className="w-10 h-10 rounded-lg bg-brand-gold/10 ring-1 ring-brand-gold/30 flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5 text-brand-gold" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-2">How is RL different?</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                {rl_explainer.comparison}
              </p>
            </div>
          </motion.div>

          {/* Dog analogy */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto mt-5 gold-left-accent bg-brand-gold/5 border border-brand-gold/20 rounded-xl p-6 sm:p-8 flex gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-brand-gold/10 ring-1 ring-brand-gold/30 flex items-center justify-center shrink-0">
              <Dog className="w-5 h-5 text-brand-gold" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-brand-gold uppercase tracking-wider mb-2">The analogy</h3>
              <p className="text-white/60 leading-relaxed text-sm italic">
                {rl_explainer.analogy}
              </p>
            </div>
          </motion.div>

          {/* State / Action / Reward triad */}
          <div className="grid sm:grid-cols-3 gap-5 mt-14">
            {rl_explainer.triad.map((item, i) => {
              const TriadIcon = TRIAD_ICONS[i];
              return (
                <motion.div
                  key={item.concept}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="gold-top-accent bg-surface-card border border-surface-border-strong rounded-xl p-6 text-center hover:border-brand-gold/30 transition-all"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-brand-gold/10 ring-1 ring-brand-gold/25 mb-4">
                    <TriadIcon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.concept}
                  </h3>
                  <p className="text-sm text-white/50 mb-4 leading-relaxed">
                    {item.definition}
                  </p>
                  <div className="gold-left-accent bg-surface-elevated rounded-lg p-3 text-left">
                    <p className="text-[10px] font-mono text-white/30 mb-1 uppercase tracking-wider pl-3">
                      In ACIS
                    </p>
                    <p className="text-sm text-brand-gold font-medium pl-3">
                      {item.acis_mapping}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* PPO and Episodes/Timesteps */}
          <div className="grid md:grid-cols-2 gap-5 mt-14 max-w-4xl mx-auto">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="gold-top-accent bg-surface-elevated rounded-xl p-6 sm:p-8 border border-surface-border-strong"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-brand-gold/10 ring-1 ring-brand-gold/30 flex items-center justify-center">
                  <Layers className="w-[18px] h-[18px] text-brand-gold" />
                </div>
                <h3 className="font-bold text-lg text-white">PPO Algorithm</h3>
              </div>
              <p className="text-white/55 leading-relaxed text-sm">
                {rl_explainer.ppo}
              </p>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-surface-card border border-surface-border-strong rounded-xl p-6 sm:p-8"
            >
              <h3 className="font-bold text-lg text-white mb-4">
                Episodes & Timesteps
              </h3>
              <div className="space-y-3">
                <div className="bg-surface-elevated rounded-lg p-4 border border-surface-border">
                  <p className="text-[10px] font-mono text-brand-gold/60 mb-1.5 uppercase tracking-wider">
                    Episode
                  </p>
                  <p className="text-sm text-white/65 leading-relaxed">
                    {rl_explainer.episodes}
                  </p>
                </div>
                <div className="bg-surface-elevated rounded-lg p-4 border border-surface-border">
                  <p className="text-[10px] font-mono text-brand-gold/60 mb-1.5 uppercase tracking-wider">
                    Timestep
                  </p>
                  <p className="text-sm text-white/65 leading-relaxed">
                    {rl_explainer.timesteps}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
