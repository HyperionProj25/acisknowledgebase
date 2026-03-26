"use client";

import { motion } from "framer-motion";
import {
  AlertCircle,
  UserX,
  WifiOff,
  Sliders,
  Calculator,
  ShieldOff,
  ArrowRight,
  Rocket,
} from "lucide-react";
import content from "@/lib/content";

const ICON_MAP: Record<string, React.ElementType> = {
  "alert-circle": AlertCircle,
  "user-x": UserX,
  "wifi-off": WifiOff,
  sliders: Sliders,
  calculator: Calculator,
  "shield-off": ShieldOff,
};

const SEVERITY_STYLES: Record<string, { bg: string; text: string; border: string; label: string }> = {
  high: { bg: "bg-danger/15", text: "text-danger", border: "border-danger/30", label: "High Impact" },
  medium: { bg: "bg-warning/15", text: "text-warning", border: "border-warning/30", label: "Medium Impact" },
  low: { bg: "bg-white/5", text: "text-white/40", border: "border-surface-border-strong", label: "Low Impact" },
};

export default function LimitationsPage() {
  const { limitations, roadmap } = content;

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
              Limitations & Roadmap
            </h1>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Honest assessment of what the Arm Care Intelligence System (ACIS) proof-of-concept
              can and cannot do, plus the path forward.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Known Limitations */}
      <section className="py-12 sm:py-16 bg-surface-card">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold text-white text-center mb-10"
          >
            Known Limitations
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {limitations.map((lim, i) => {
              const Icon = ICON_MAP[lim.icon] || AlertCircle;
              const severity = SEVERITY_STYLES[lim.severity] || SEVERITY_STYLES.medium;
              return (
                <motion.div
                  key={lim.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`bg-surface-elevated rounded-xl border-2 ${severity.border} p-5`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${severity.bg} shrink-0`}>
                      <Icon className={`w-5 h-5 ${severity.text}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-white text-sm">
                          {lim.title}
                        </h3>
                      </div>
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${severity.bg} ${severity.text} mb-2`}>
                        {severity.label}
                      </span>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {lim.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-12 sm:py-16 bg-surface-base">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              What&apos;s Next
            </h2>
            <p className="text-white/50">The roadmap from proof-of-concept to production.</p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-brand-gold/20" />

            <div className="space-y-8">
              {roadmap.map((item, i) => (
                <motion.div
                  key={item.milestone}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative flex gap-4 pl-2"
                >
                  {/* Timeline dot */}
                  <div className="relative z-10 w-9 h-9 rounded-full bg-brand-gold/10 border-2 border-brand-gold flex items-center justify-center shrink-0">
                    {i === roadmap.length - 1 ? (
                      <Rocket className="w-4 h-4 text-brand-gold" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-brand-gold" />
                    )}
                  </div>
                  <div className="bg-surface-card rounded-xl border border-surface-border-strong p-5 flex-1 hover:border-brand-gold/40 hover:shadow-lg hover:shadow-brand-gold/5 transition-all">
                    <h3 className="font-bold text-white mb-1">
                      {item.milestone}
                    </h3>
                    <p className="text-sm text-white/60">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
