"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, GitCompare, Users, CheckCircle } from "lucide-react";
import type { ValidationCriterion } from "@/lib/content";

const ICON_MAP: Record<string, React.ElementType> = {
  reward_improvement: TrendingUp,
  pull_rate_differential: GitCompare,
  case_studies: Users,
};

function AnimatedNumber({ target, decimals = 0, suffix = "", prefix = "" }: {
  target: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as React.RefObject<HTMLElement>, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const start = performance.now();

    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}{value.toFixed(decimals)}{suffix}
    </span>
  );
}

export default function ValidationCard({
  criterion,
  index,
}: {
  criterion: ValidationCriterion;
  index: number;
}) {
  const Icon = ICON_MAP[criterion.id] || CheckCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="gold-top-accent bg-surface-card rounded-xl border-2 border-surface-border-strong p-6 hover:border-brand-gold/40 hover:shadow-lg hover:shadow-brand-gold/5 transition-all"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-brand-gold/10">
          <Icon className="w-5 h-5 text-brand-gold" />
        </div>
        <div>
          <h3 className="font-bold text-white">{criterion.name}</h3>
          <p className="text-xs text-white/40">{criterion.description}</p>
        </div>
        <CheckCircle className="w-5 h-5 text-success ml-auto shrink-0" />
      </div>

      {/* Criterion-specific visualization */}
      {criterion.id === "reward_improvement" && (
        <div className="space-y-3">
          <div className="flex items-end gap-3">
            <div className="text-3xl font-bold text-white font-mono">
              <AnimatedNumber target={criterion.late_value!} decimals={3} />
            </div>
            <div className="text-sm text-success font-bold mb-1">
              +<AnimatedNumber target={criterion.percentage_change!} decimals={1} suffix="%" />
            </div>
          </div>
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-white/40">
              <span>Early: {criterion.early_value}</span>
              <span>Late: {criterion.late_value}</span>
            </div>
            <div className="h-3 bg-surface-base rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${((criterion.late_value! - 0) / 1.0) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-brand-gold to-brand-gold-dark rounded-full"
              />
            </div>
          </div>
        </div>
      )}

      {criterion.id === "pull_rate_differential" && (
        <div className="space-y-3">
          <div className="flex items-end gap-3">
            <div className="text-3xl font-bold text-white font-mono">
              +<AnimatedNumber target={criterion.differential_percent!} decimals={0} suffix="%" />
            </div>
            <div className="text-sm text-white/40 mb-1">differential</div>
          </div>
          {/* Two bars */}
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/50">Pre-injury pull rate</span>
                <span className="font-mono font-bold text-danger">{criterion.pre_injury_rate}%</span>
              </div>
              <div className="h-3 bg-surface-base rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(criterion.pre_injury_rate! / 10) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="h-full bg-danger rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/50">Healthy pull rate</span>
                <span className="font-mono font-bold text-success">{criterion.healthy_rate}%</span>
              </div>
              <div className="h-3 bg-surface-base rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(criterion.healthy_rate! / 10) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                  className="h-full bg-success rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {criterion.id === "case_studies" && (
        <div className="space-y-3">
          <div className="flex items-end gap-3">
            <div className="text-5xl font-bold text-white font-mono">
              <AnimatedNumber target={criterion.count!} decimals={0} />
            </div>
            <div className="text-sm text-white/40 mb-2">MLB pitchers correctly flagged</div>
          </div>
          {criterion.examples && (
            <div className="flex gap-2 flex-wrap">
              {criterion.examples.map((name) => (
                <span
                  key={name}
                  className="text-xs font-medium bg-brand-gold/10 text-brand-gold px-2.5 py-1 rounded-full"
                >
                  {name}
                </span>
              ))}
              <span className="text-xs text-white/30 px-2.5 py-1">
                + {criterion.count! - (criterion.examples?.length || 0)} more
              </span>
            </div>
          )}
        </div>
      )}

      <p className="text-sm text-white/50 mt-4 pt-4 border-t border-surface-border leading-relaxed">
        {criterion.explanation}
      </p>
    </motion.div>
  );
}
