"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import content from "@/lib/content";

function AnimatedDollar() {
  const [value, setValue] = useState(0);
  const target = 30;
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame: number;
    const duration = 2000;
    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return <span ref={ref}>${value}M</span>;
}

export default function Scene01_TheStakes() {
  const pills = [
    "12-18 months recovery",
    "$4B+ in annual MLB pitcher salaries",
    "Warning signs are visible in the data",
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-7xl sm:text-8xl lg:text-9xl font-bold font-mono tracking-tight text-brand-gold"
            animate={{
              textShadow: [
                "0 0 0px rgba(245,166,35,0)",
                "0 0 40px rgba(245,166,35,0.3)",
                "0 0 0px rgba(245,166,35,0)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <AnimatedDollar />
          </motion.p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-xl sm:text-2xl text-white/70 mt-4 font-medium"
        >
          The cost of one torn UCL
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="text-sm text-white/40 mt-2 max-w-md mx-auto"
        >
          {content.overview.problem.cost.split(".")[0]}.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {pills.map((pill, i) => (
            <motion.span
              key={pill}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.2, duration: 0.4 }}
              className="px-4 py-2 rounded-full border border-white/10 text-white/50 text-sm"
            >
              {pill}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
