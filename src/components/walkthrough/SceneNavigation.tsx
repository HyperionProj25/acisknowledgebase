"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface SceneNavigationProps {
  currentScene: number;
  totalScenes: number;
  onPrev: () => void;
  onNext: () => void;
  onJump: (index: number) => void;
}

export default function SceneNavigation({
  currentScene,
  totalScenes,
  onPrev,
  onNext,
  onJump,
}: SceneNavigationProps) {
  const isFirst = currentScene === 0;
  const isLast = currentScene === totalScenes - 1;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface-base/90 backdrop-blur-sm border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Prev button */}
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors disabled:opacity-20 disabled:cursor-not-allowed shrink-0"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Scene dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalScenes }).map((_, i) => (
            <button
              key={i}
              onClick={() => onJump(i)}
              className="p-0.5"
              aria-label={`Go to scene ${i + 1}`}
            >
              <motion.div
                animate={{
                  width: i === currentScene ? 10 : 6,
                  height: i === currentScene ? 10 : 6,
                  backgroundColor: i === currentScene ? "#F5A623" : "rgba(255,255,255,0.2)",
                }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="rounded-full"
              />
            </button>
          ))}
        </div>

        {/* Next button or CTA */}
        {isLast ? (
          <Link
            href="/how-it-works"
            className="h-10 px-4 rounded-full bg-brand-gold text-surface-base text-sm font-semibold flex items-center gap-1.5 hover:bg-brand-gold-light transition-colors shrink-0"
          >
            Explore
            <ChevronRight size={16} />
          </Link>
        ) : (
          <button
            onClick={onNext}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors shrink-0"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
