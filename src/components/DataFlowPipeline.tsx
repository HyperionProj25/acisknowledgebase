"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Filter,
  Table,
  PlayCircle,
  Brain,
  Box,
  Monitor,
  Play,
  X,
  ChevronDown,
} from "lucide-react";
import content from "@/lib/content";

const ICON_MAP: Record<string, React.ElementType> = {
  database: Database,
  filter: Filter,
  table: Table,
  "play-circle": PlayCircle,
  brain: Brain,
  box: Box,
  monitor: Monitor,
};

export default function DataFlowPipeline() {
  const { nodes } = content.data_flow;
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [animatedNodes, setAnimatedNodes] = useState<Set<string>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);

  const playSequence = useCallback(async () => {
    setIsPlaying(true);
    setActiveNode(null);
    setAnimatedNodes(new Set());

    for (let i = 0; i < nodes.length; i++) {
      await new Promise((r) => setTimeout(r, 600));
      setAnimatedNodes((prev) => new Set([...prev, nodes[i].id]));
      await new Promise((r) => setTimeout(r, 200));
    }

    await new Promise((r) => setTimeout(r, 500));
    setIsPlaying(false);
  }, [nodes]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedNodes(new Set(nodes.map((n) => n.id)));
    }, 300);
    return () => clearTimeout(timer);
  }, [nodes]);

  return (
    <div>
      {/* Play All button */}
      <div className="flex justify-center mb-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={playSequence}
          disabled={isPlaying}
          className="flex items-center gap-2.5 px-7 py-3 bg-brand-gold text-surface-base text-sm font-bold rounded-full shadow-lg shadow-brand-gold/20 hover:bg-brand-gold-light transition-colors disabled:opacity-50"
        >
          <Play className="w-4 h-4" />
          {isPlaying ? "Playing..." : "Play All"}
        </motion.button>
      </div>

      {/* Desktop horizontal pipeline */}
      <div className="hidden lg:block">
        {/* Connecting line behind nodes */}
        <div className="relative">
          <div className="absolute top-[38px] left-[65px] right-[65px] h-px bg-gradient-to-r from-brand-gold/0 via-brand-gold/30 to-brand-gold/0" />

          <div className="relative grid grid-cols-7 gap-3">
            {nodes.map((node, i) => {
              const Icon = ICON_MAP[node.icon] || Box;
              const isActive = activeNode === node.id;
              const isAnimated = animatedNodes.has(node.id);
              return (
                <motion.button
                  key={node.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={
                    isAnimated
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0.25, y: 12 }
                  }
                  transition={{
                    type: "spring",
                    damping: 22,
                    stiffness: 280,
                    delay: isAnimated ? i * 0.05 : 0,
                  }}
                  onClick={() =>
                    setActiveNode(isActive ? null : node.id)
                  }
                  className={`relative flex flex-col items-center pt-3 pb-4 px-2 rounded-xl border cursor-pointer transition-all group ${
                    isActive
                      ? "border-brand-gold bg-brand-gold/10 shadow-lg shadow-brand-gold/15"
                      : "border-surface-border-strong bg-surface-elevated hover:border-brand-gold/40 hover:bg-brand-gold/5"
                  } ${activeNode && !isActive ? "opacity-30" : ""}`}
                >
                  {/* Step number */}
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-surface-base border border-brand-gold/50 flex items-center justify-center">
                    <span className="text-[9px] font-bold text-brand-gold font-mono">{i + 1}</span>
                  </div>

                  {/* Icon */}
                  <div className={`relative w-[52px] h-[52px] rounded-xl flex items-center justify-center mb-3 transition-all ${
                    isActive
                      ? "bg-brand-gold/15 ring-1 ring-brand-gold/40"
                      : "bg-surface-base group-hover:bg-brand-gold/10"
                  }`}>
                    <Icon className={`w-6 h-6 transition-colors ${
                      isActive ? "text-brand-gold" : "text-white/50 group-hover:text-brand-gold/70"
                    }`} />
                  </div>

                  <span className={`text-xs font-bold text-center leading-tight transition-colors ${
                    isActive ? "text-brand-gold" : "text-white/80"
                  }`}>
                    {node.label}
                  </span>
                  <span className="text-[10px] text-white/30 mt-1 text-center font-mono leading-tight">
                    {node.detail_label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile vertical pipeline */}
      <div className="lg:hidden relative">
        {/* Vertical connecting line */}
        <div className="absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-brand-gold/30 via-brand-gold/20 to-brand-gold/30" />

        <div className="space-y-2">
          {nodes.map((node, i) => {
            const Icon = ICON_MAP[node.icon] || Box;
            const isActive = activeNode === node.id;
            const isAnimated = animatedNodes.has(node.id);
            return (
              <motion.button
                key={node.id}
                initial={{ opacity: 0, x: -12 }}
                animate={
                  isAnimated
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0.25, x: -12 }
                }
                transition={{
                  type: "spring",
                  damping: 22,
                  stiffness: 280,
                }}
                onClick={() =>
                  setActiveNode(isActive ? null : node.id)
                }
                className={`relative w-full flex items-center gap-4 p-3.5 pl-14 rounded-xl border text-left transition-all ${
                  isActive
                    ? "border-brand-gold bg-brand-gold/10"
                    : "border-surface-border-strong bg-surface-elevated hover:border-brand-gold/40"
                } ${activeNode && !isActive ? "opacity-30" : ""}`}
              >
                {/* Step dot on the line */}
                <div className={`absolute left-[19px] w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-all ${
                  isActive
                    ? "border-brand-gold bg-brand-gold/20"
                    : "border-white/20 bg-surface-base"
                }`}>
                  <span className="text-[8px] font-bold text-brand-gold font-mono">{i + 1}</span>
                </div>

                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  isActive ? "bg-brand-gold/15" : "bg-surface-base"
                }`}>
                  <Icon className={`w-[18px] h-[18px] ${isActive ? "text-brand-gold" : "text-white/50"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`text-sm font-bold block ${isActive ? "text-brand-gold" : "text-white/80"}`}>
                    {node.label}
                  </span>
                  <span className="text-[11px] text-white/30 font-mono">
                    {node.detail_label}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-white/20 transition-transform shrink-0 ${
                    isActive ? "rotate-180 text-brand-gold/50" : ""
                  }`}
                />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Expanded detail panel */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0, y: 8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 8, height: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="mt-5 overflow-hidden"
          >
            {nodes
              .filter((n) => n.id === activeNode)
              .map((node) => {
                const nodeIndex = nodes.findIndex((n) => n.id === node.id);
                const Icon = ICON_MAP[node.icon] || Box;
                return (
                  <div
                    key={node.id}
                    className="gold-left-accent bg-surface-elevated rounded-xl border border-brand-gold/20 p-6 sm:p-8 relative"
                  >
                    <button
                      onClick={() => setActiveNode(null)}
                      className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <X className="w-4 h-4 text-white/40" />
                    </button>
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-xl bg-brand-gold/10 ring-1 ring-brand-gold/30 flex items-center justify-center shrink-0">
                        <Icon className="w-7 h-7 text-brand-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[10px] font-bold text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">
                            Step {nodeIndex + 1}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          {node.label}
                        </h3>
                        <p className="text-sm text-white/35 font-mono mt-0.5">
                          {node.detail_label}
                          {node.volume && ` | ${node.volume}`}
                          {node.years && ` | ${node.years}`}
                        </p>
                        <p className="text-white/60 mt-3 leading-relaxed">
                          {node.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
