"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import content from "@/lib/content";

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const duration = 1500;
    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * value);
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function Scene08_Proof() {
  const criteria = content.validation.criteria;
  const baselines = content.validation.baselines;

  const LINKS = [
    { label: "How It Works", href: "/how-it-works" },
    { label: "State Vector", href: "/state-vector" },
    { label: "Reward Function", href: "/reward-function" },
    { label: "Validation", href: "/validation" },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-bold text-white text-center mb-2"
        >
          It works. Here is the proof.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/40 text-center text-sm mb-10"
        >
          Validated on 750,000+ real MLB at-bats from 2024-2025 (data the model never saw)
        </motion.p>

        {/* Validation cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {criteria.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.15 }}
              className="p-5 rounded-xl bg-surface-card border border-white/5 gold-top-accent"
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-sm font-semibold text-white">{c.name}</p>
                <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-success" />
                </div>
              </div>

              {c.id === "reward_improvement" && (
                <div>
                  <p className="text-3xl font-bold font-mono text-brand-gold">
                    <AnimatedNumber value={c.percentage_change || 15.2} decimals={1} prefix="+" suffix="%" />
                  </p>
                  <p className="text-xs text-white/30 mt-1 font-mono">0.710 to 0.818</p>
                </div>
              )}

              {c.id === "pull_rate_differential" && (
                <div>
                  <p className="text-3xl font-bold font-mono text-brand-gold">
                    <AnimatedNumber value={c.differential_percent || 31} decimals={0} prefix="+" suffix="%" />
                  </p>
                  <p className="text-xs text-white/30 mt-1 font-mono">
                    {c.pre_injury_rate}% vs {c.healthy_rate}%
                  </p>
                </div>
              )}

              {c.id === "case_studies" && (
                <div>
                  <p className="text-3xl font-bold font-mono text-brand-gold">
                    <AnimatedNumber value={c.count || 5} decimals={0} />
                  </p>
                  <p className="text-xs text-white/30 mt-1 font-mono">MLB pitchers flagged</p>
                </div>
              )}

              <p className="text-xs text-white/40 mt-3 leading-relaxed">{c.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Baselines */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="p-5 rounded-xl bg-surface-card border border-white/5 mb-10"
        >
          <p className="text-xs uppercase tracking-wider text-white/30 font-mono mb-4">Baselines Comparison</p>
          <div className="space-y-3">
            {baselines.map((b) => (
              <div key={b.name} className="flex items-center gap-3">
                <p className="text-sm text-white/50 w-32 shrink-0 font-mono">{b.name}</p>
                <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(b.score / 1.0) * 100}%` }}
                    transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      b.name === "ACIS Agent" ? "bg-brand-gold" : "bg-white/15"
                    }`}
                  />
                </div>
                <p className={`text-sm font-mono font-bold w-12 text-right ${
                  b.name === "ACIS Agent" ? "text-brand-gold" : "text-white/30"
                }`}>
                  {b.score.toFixed(3)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center"
        >
          <p className="text-white/40 text-sm mb-4">Explore the full knowledge base</p>
          <div className="flex flex-wrap justify-center gap-3">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg border border-white/10 text-white/50 text-sm hover:text-brand-gold hover:border-brand-gold/30 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
