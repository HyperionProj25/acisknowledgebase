"use client";

import WalkthroughShell from "@/components/walkthrough/WalkthroughShell";
import Scene01_TheStakes from "@/components/walkthrough/scenes/Scene01_TheStakes";
import Scene02_MeetThePitcher from "@/components/walkthrough/scenes/Scene02_MeetThePitcher";
import Scene03_DataFlowing from "@/components/walkthrough/scenes/Scene03_DataFlowing";
import Scene04_WhatACISSees from "@/components/walkthrough/scenes/Scene04_WhatACISSees";
import Scene05_TheDecision from "@/components/walkthrough/scenes/Scene05_TheDecision";
import Scene06_SignsOfTrouble from "@/components/walkthrough/scenes/Scene06_SignsOfTrouble";
import Scene07_ACISRecommends from "@/components/walkthrough/scenes/Scene07_ACISRecommends";
import Scene08_Proof from "@/components/walkthrough/scenes/Scene08_Proof";
import content from "@/lib/content";

const SCENES = [
  Scene01_TheStakes,
  Scene02_MeetThePitcher,
  Scene03_DataFlowing,
  Scene04_WhatACISSees,
  Scene05_TheDecision,
  Scene06_SignsOfTrouble,
  Scene07_ACISRecommends,
  Scene08_Proof,
];

export default function WalkthroughPage() {
  return (
    <WalkthroughShell sceneTitles={content.walkthrough.scene_titles}>
      {(sceneIndex) => {
        const Scene = SCENES[sceneIndex];
        return <Scene />;
      }}
    </WalkthroughShell>
  );
}
