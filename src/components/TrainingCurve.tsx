"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Label,
} from "recharts";
import content from "@/lib/content";

// Generate ~50 synthetic data points following the described pattern
function generateTrainingData() {
  const points: { step: number; reward: number }[] = [];
  const totalSteps = 500000;

  for (let i = 0; i <= 50; i++) {
    const step = Math.round((i / 50) * totalSteps);
    let reward: number;

    if (step <= 10000) {
      reward = 0.2 + (step / 10000) * 0.15 + (Math.random() - 0.5) * 0.05;
    } else if (step <= 50000) {
      const progress = (step - 10000) / 40000;
      reward = 0.35 + progress * 0.45 + (Math.random() - 0.5) * 0.08;
    } else if (step <= 100000) {
      const progress = (step - 50000) / 50000;
      reward = 0.8 + progress * 0.05 + (Math.random() - 0.5) * 0.1;
    } else {
      reward = 0.8 + Math.sin(step / 30000) * 0.1 + (Math.random() - 0.5) * 0.15;
    }

    points.push({
      step,
      reward: Math.max(0.1, Math.min(1.15, parseFloat(reward.toFixed(3)))),
    });
  }

  return points;
}

const data = generateTrainingData();
const annotations = content.training.reward_curve.annotations;

function formatStep(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return String(value);
}

export default function TrainingCurve() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showLine, setShowLine] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowLine(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <div ref={ref} className="gold-top-accent bg-surface-elevated rounded-xl border-2 border-surface-border-strong p-4 sm:p-6">
      <h3 className="text-lg font-bold text-white mb-1">
        Training Reward Curve
      </h3>
      <p className="text-sm text-white/40 mb-6">
        Average reward per episode over {formatStep(content.training.timesteps)} timesteps
      </p>

      <div className="h-[350px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis
              dataKey="step"
              tickFormatter={formatStep}
              stroke="rgba(255,255,255,0.3)"
              fontSize={12}
              fontFamily="var(--font-mono)"
            >
              <Label value="Timesteps" position="bottom" offset={0} style={{ fill: "rgba(255,255,255,0.3)", fontSize: 12 }} />
            </XAxis>
            <YAxis
              domain={[0, 1.2]}
              stroke="rgba(255,255,255,0.3)"
              fontSize={12}
              fontFamily="var(--font-mono)"
            >
              <Label value="Avg Reward" angle={-90} position="insideLeft" offset={10} style={{ fill: "rgba(255,255,255,0.3)", fontSize: 12 }} />
            </YAxis>
            <Tooltip
              contentStyle={{
                background: "#1E1E1E",
                border: "1px solid rgba(245, 166, 35, 0.3)",
                borderRadius: 8,
                color: "white",
                fontSize: 13,
                fontFamily: "var(--font-mono)",
              }}
              formatter={(value) => [Number(value).toFixed(3), "Reward"]}
              labelFormatter={(label) => `Step: ${formatStep(Number(label))}`}
            />
            {/* Annotation lines */}
            {annotations.map((ann) => (
              <ReferenceLine
                key={ann.step}
                x={ann.step}
                stroke="#F5A623"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                label={{
                  value: ann.label,
                  position: "top",
                  fill: "#F5A623",
                  fontSize: 11,
                  fontWeight: 600,
                }}
              />
            ))}
            {showLine && (
              <Line
                type="monotone"
                dataKey="reward"
                stroke="#F5A623"
                strokeWidth={2.5}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "#F5A623",
                  stroke: "#0D0D0D",
                  strokeWidth: 2,
                }}
                animationDuration={2000}
                animationEasing="ease-out"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
