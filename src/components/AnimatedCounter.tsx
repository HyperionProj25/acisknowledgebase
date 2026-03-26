"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  label: string;
}

export default function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Parse numeric part
    const numericMatch = value.match(/[\d.]+/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseFloat(numericMatch[0]);
    const prefix = value.slice(0, value.indexOf(numericMatch[0]));
    const suffix = value.slice(
      value.indexOf(numericMatch[0]) + numericMatch[0].length
    );
    const hasDecimal = numericMatch[0].includes(".");
    const decimalPlaces = hasDecimal
      ? numericMatch[0].split(".")[1].length
      : 0;

    const duration = 1500;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = targetNum * eased;

      if (hasDecimal) {
        setDisplayValue(`${prefix}${current.toFixed(decimalPlaces)}${suffix}`);
      } else {
        setDisplayValue(
          `${prefix}${Math.round(current).toLocaleString()}${suffix}`
        );
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="text-3xl sm:text-4xl font-bold text-brand-gold">
        {displayValue}
      </div>
      <div className="text-xs text-white/40 mt-1 uppercase tracking-wider font-medium">{label}</div>
    </motion.div>
  );
}
