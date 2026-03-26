"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Zap, TrendingUp, DollarSign, AlertTriangle } from "lucide-react";
import content from "@/lib/content";
import AnimatedCounter from "@/components/AnimatedCounter";

function Section({ children, className = "", alt = false }: { children: React.ReactNode; className?: string; alt?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section
      ref={ref}
      className={`py-16 sm:py-20 ${alt ? "bg-surface-card" : "bg-surface-base"} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-[1200px] mx-auto px-4 sm:px-6"
      >
        {children}
      </motion.div>
    </section>
  );
}

export default function OverviewPage() {
  const { overview } = content;

  return (
    <>
      {/* Hero - PDF cover style with gold vertical lines */}
      <section className="relative bg-surface-base text-white py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 gold-lines-texture" />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-white.svg" alt="Baseline Analytics" className="h-10 sm:h-12 mx-auto mb-8 opacity-90" />
            <div className="gold-divider max-w-md mx-auto mb-8" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              {overview.headline}
            </h1>
            <p className="text-xl sm:text-2xl text-brand-gold font-medium mb-8">
              {overview.subheadline}
            </p>
            <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
              {overview.positioning}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Stats Bar - PDF style stat cards with gold top accent */}
      <section className="bg-surface-card border-t border-surface-border py-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {overview.key_stats.map((stat, i) => (
              <div key={i} className="gold-top-accent bg-surface-elevated rounded-lg p-5">
                <AnimatedCounter value={stat.value} label={stat.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two-Layer Architecture */}
      <Section>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-white text-center mb-4"
        >
          Two-Layer Architecture
        </motion.h2>
        <p className="text-white/50 text-center max-w-2xl mx-auto mb-12">
          ACIS operates across two complementary layers, each addressing a different time horizon of pitcher health.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {overview.layers.map((layer, i) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative rounded-xl border-2 p-6 sm:p-8 transition-all ${
                i === 1
                  ? "border-brand-gold/40 bg-brand-gold/5 shadow-lg shadow-brand-gold/5"
                  : "border-surface-border-strong bg-surface-card"
              }`}
            >
              {i === 1 && (
                <span className="absolute -top-3 left-6 px-3 py-0.5 bg-brand-gold text-surface-base text-xs font-bold rounded-full uppercase tracking-wide">
                  Current Focus
                </span>
              )}
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${i === 1 ? "bg-brand-gold/20" : "bg-surface-elevated"}`}>
                  {i === 0 ? (
                    <TrendingUp className="w-6 h-6 text-white/40" />
                  ) : (
                    <Zap className="w-6 h-6 text-brand-gold" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{layer.name}</h3>
                  <p className="text-white/60 leading-relaxed">{layer.description}</p>
                  <span className={`inline-block mt-3 text-xs font-medium px-2.5 py-1 rounded-full ${
                    i === 1
                      ? "bg-success/15 text-success"
                      : "bg-surface-elevated text-white/40"
                  }`}>
                    {layer.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* The Problem */}
      <Section alt>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {overview.problem.headline}
            </h2>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-surface-elevated rounded-xl p-6 border border-surface-border-strong flex gap-4"
            >
              <div className="p-3 rounded-lg bg-danger/10 h-fit">
                <DollarSign className="w-6 h-6 text-danger" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">The Financial Impact</h3>
                <p className="text-white/60">{overview.problem.cost}</p>
                <p className="text-sm text-white/40 mt-2">{overview.problem.annual_spend}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-surface-elevated rounded-xl p-6 border border-surface-border-strong flex gap-4"
            >
              <div className="p-3 rounded-lg bg-warning/10 h-fit">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">The Gap in Current Approaches</h3>
                <p className="text-white/60">{overview.problem.gap}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="gold-left-accent bg-surface-elevated rounded-xl p-6 border-2 border-brand-gold/30 flex gap-4"
            >
              <div className="p-3 rounded-lg bg-brand-gold/10 h-fit">
                <Shield className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">What ACIS Changes</h3>
                <p className="text-white/60">
                  Real-time, data-driven pull recommendations that learn from outcomes.
                  ACIS catches warning signs automatically and flags them as they happen,
                  turning reactive coaching into proactive injury prevention.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>
    </>
  );
}
