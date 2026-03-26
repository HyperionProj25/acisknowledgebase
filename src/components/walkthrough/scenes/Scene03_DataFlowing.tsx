"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Database, Filter, Brain } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import content from "@/lib/content";

const NODES = [
  {
    icon: Database,
    label: "Statcast",
    stat: "7.75M pitches",
    description: content.data_flow.nodes[0].description,
  },
  {
    icon: Filter,
    label: "Processing",
    stat: "750K+ at-bats",
    description: content.data_flow.nodes[1].description,
  },
  {
    icon: Brain,
    label: "ACIS Agent",
    stat: "Trained model",
    description: content.data_flow.nodes[5].description,
  },
];

export default function Scene03_DataFlowing() {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-white text-center mb-3"
        >
          The Data Behind It
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/40 text-center text-sm mb-12"
        >
          10 seasons of MLB data trained this AI
        </motion.p>

        {/* Pipeline */}
        <div className="relative flex items-center justify-between">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-[15%] right-[15%] h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

          {/* Particles */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-gold"
              style={{ left: "15%" }}
              animate={{
                left: ["15%", "85%"],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}

          {/* Nodes */}
          {NODES.map((node, i) => {
            const Icon = node.icon;
            const isActive = activeNode === i;
            return (
              <motion.button
                key={node.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
                onClick={() => setActiveNode(isActive ? null : i)}
                className={`relative z-10 flex flex-col items-center gap-3 p-4 sm:p-6 rounded-xl border transition-colors cursor-pointer ${
                  isActive
                    ? "bg-brand-gold/10 border-brand-gold/50"
                    : "bg-surface-card border-white/10 hover:border-white/20"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${
                    isActive ? "bg-brand-gold/20" : "bg-surface-elevated"
                  }`}
                >
                  <Icon size={24} className={isActive ? "text-brand-gold" : "text-white/50"} />
                </div>
                <div className="text-center">
                  <p className={`font-semibold text-sm ${isActive ? "text-brand-gold" : "text-white"}`}>
                    {node.label}
                  </p>
                  <p className="text-xs font-mono text-white/30 mt-0.5">{node.stat}</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {activeNode !== null && (
            <motion.div
              initial={{ opacity: 0, y: 8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 8, height: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="overflow-hidden"
            >
              <div className="mt-8 p-5 bg-surface-card border border-white/10 rounded-xl">
                <p className="text-sm text-white/60 leading-relaxed">
                  {NODES[activeNode].description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-white/20 text-xs text-center mt-8 font-mono"
        >
          Click a node to learn more
        </motion.p>
      </div>
    </div>
  );
}
