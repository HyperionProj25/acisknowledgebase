"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface SceneRendererProps {
  sceneKey: number;
  direction: 1 | -1;
  children: ReactNode;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
  }),
};

export default function SceneRenderer({ sceneKey, direction, children }: SceneRendererProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={sceneKey}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        className="min-h-[calc(100vh-64px)] flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
