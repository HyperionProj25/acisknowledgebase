"use client";

import { motion } from "framer-motion";
import content from "@/lib/content";
import TrainingCurve from "@/components/TrainingCurve";
import ValidationCard from "@/components/ValidationCard";
import BaselinesChart from "@/components/BaselinesChart";

export default function ValidationPage() {
  const { validation, training } = content;

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
              Validation Results
            </h1>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Three criteria confirming that the Arm Care Intelligence System (ACIS) agent genuinely learned
              to distinguish at-risk pitchers. Trained on {training.training_split}, tested on {training.test_split}.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Training Curve */}
      <section className="py-12 sm:py-16 bg-surface-card">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <TrainingCurve />
          <div className="mt-4 gold-left-accent bg-surface-elevated rounded-xl border border-surface-border-strong p-5">
            <h4 className="text-sm font-bold text-white mb-1">Why 500K Steps?</h4>
            <p className="text-sm text-white/60">{training.why_500k}</p>
          </div>
        </div>
      </section>

      {/* Three Validation Criteria */}
      <section className="py-12 sm:py-16 bg-surface-base">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold text-white text-center mb-4"
          >
            Three Validation Criteria
          </motion.h2>
          <p className="text-white/50 text-center max-w-2xl mx-auto mb-10">
            All three criteria passed, confirming the agent learned meaningful patterns.
          </p>

          <div className="grid lg:grid-cols-3 gap-6">
            {validation.criteria.map((criterion, i) => (
              <ValidationCard key={criterion.id} criterion={criterion} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Baselines Comparison */}
      <section className="py-12 sm:py-16 bg-surface-card">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <BaselinesChart />
        </div>
      </section>
    </>
  );
}
