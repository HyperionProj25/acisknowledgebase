"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";
import ProgressBar from "./ProgressBar";
import SceneNavigation from "./SceneNavigation";
import SceneRenderer from "./SceneRenderer";

interface WalkthroughShellProps {
  sceneTitles: string[];
  children: (sceneIndex: number) => ReactNode;
}

export default function WalkthroughShell({ sceneTitles, children }: WalkthroughShellProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const totalScenes = sceneTitles.length;

  const goNext = useCallback(() => {
    setCurrentScene((prev) => {
      if (prev >= totalScenes - 1) return prev;
      setDirection(1);
      return prev + 1;
    });
  }, [totalScenes]);

  const goPrev = useCallback(() => {
    setCurrentScene((prev) => {
      if (prev <= 0) return prev;
      setDirection(-1);
      return prev - 1;
    });
  }, []);

  const jumpTo = useCallback(
    (index: number) => {
      setDirection(index > currentScene ? 1 : -1);
      setCurrentScene(index);
    },
    [currentScene]
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  return (
    <div className="relative">
      <ProgressBar
        currentScene={currentScene}
        totalScenes={totalScenes}
        sceneTitle={sceneTitles[currentScene]}
      />
      <div className="pt-8 pb-16">
        <SceneRenderer sceneKey={currentScene} direction={direction}>
          {children(currentScene)}
        </SceneRenderer>
      </div>
      <SceneNavigation
        currentScene={currentScene}
        totalScenes={totalScenes}
        onPrev={goPrev}
        onNext={goNext}
        onJump={jumpTo}
      />
    </div>
  );
}
