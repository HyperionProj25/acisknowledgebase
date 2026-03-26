"use client";

import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import content from "@/lib/content";
import StateVectorCard from "@/components/StateVectorCard";

export default function StateVectorPage() {
  const { state_vector, outcome_labels } = content;

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
              The State Vector
            </h1>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Six numbers that describe a pitcher&apos;s current situation at every at-bat.
              This is what the Arm Care Intelligence System (ACIS) agent &quot;sees&quot; when making decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-16 sm:py-20 bg-surface-card">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-5">
            {state_vector.map((feature, i) => (
              <StateVectorCard key={feature.code_name} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Outcome Labels */}
      <section className="py-16 sm:py-20 bg-surface-base">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold text-white text-center mb-4"
          >
            Outcome Labels
          </motion.h2>
          <p className="text-white/50 text-center max-w-2xl mx-auto mb-10">
            Two boolean labels are attached to each at-bat row. These are the ground-truth signals
            that the reward function uses to score the agent&apos;s decisions.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {outcome_labels.map((label, i) => (
              <motion.div
                key={label.code_name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-surface-card border-2 border-surface-border-strong rounded-xl p-6 hover:border-brand-gold/40 hover:shadow-lg hover:shadow-brand-gold/5 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-brand-gold" />
                  <code className="text-sm font-mono font-bold text-brand-gold">
                    {label.code_name}
                  </code>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {label.display_name}
                </h3>
                <span className="inline-block text-xs font-mono bg-surface-elevated text-white/40 px-2 py-0.5 rounded mb-3">
                  {label.type}
                </span>
                <p className="text-sm text-white/60 leading-relaxed">
                  {label.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
