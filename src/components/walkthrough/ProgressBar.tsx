"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  currentScene: number;
  totalScenes: number;
  sceneTitle: string;
  /** Tailwind top-* class; lets pages with extra fixed chrome (e.g. the archive banner) push the bar down */
  topClass?: string;
}

export default function ProgressBar({
  currentScene,
  totalScenes,
  sceneTitle,
  topClass = "top-16",
}: ProgressBarProps) {
  const progress = ((currentScene + 1) / totalScenes) * 100;

  return (
    <div className={`fixed ${topClass} left-0 right-0 z-40`}>
      <div className="h-[3px] bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-light"
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        />
      </div>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <p className="text-[11px] font-mono text-white/30 mt-1.5 tracking-wide">
          {String(currentScene + 1).padStart(2, "0")} / {String(totalScenes).padStart(2, "0")}
          <span className="mx-2 text-white/15">--</span>
          {sceneTitle}
        </p>
      </div>
    </div>
  );
}
