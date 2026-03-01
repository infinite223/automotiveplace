"use client";

import { useState } from "react";
import { TStage } from "@/app/utils/types/stage";
import { TBasicVisualModification } from "@/app/utils/types/visualModification";
import StagesTab from "./StagesTab";
import VisualModsTab from "./VisualModsTab";

interface ModificationsTabProps {
  stages: TStage[];
  visualModifications: TBasicVisualModification[];
  isMyProject?: boolean;
}

export default function ModificationsTab({
  stages,
  visualModifications,
  isMyProject,
}: ModificationsTabProps) {
  const [activeSubTab, setActiveSubTab] = useState<"stages" | "visual">(
    "stages",
  );

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center gap-8 border-b border-amp-700/30 mb-2 px-1">
        <button
          onClick={() => setActiveSubTab("stages")}
          className={`pb-3 text-sm font-semibold  transition-all relative ${
            activeSubTab === "stages"
              ? "text-white"
              : "text-amp-800 hover:text-amp-400"
          }`}
        >
          Etapy modyfikacji
          {activeSubTab === "stages" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amp-500" />
          )}
        </button>
        <button
          onClick={() => setActiveSubTab("visual")}
          className={`pb-3 text-sm font-semibold transition-all relative ${
            activeSubTab === "visual"
              ? "text-white"
              : "text-amp-800 hover:text-amp-400"
          }`}
        >
          Modyfikacje wizualne
          {activeSubTab === "visual" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amp-500" />
          )}
        </button>
      </div>

      <div className="py-2">
        {activeSubTab === "stages" ? (
          <StagesTab stages={stages} />
        ) : (
          <VisualModsTab
            modifications={visualModifications}
            isMyProject={isMyProject}
          />
        )}
      </div>
    </div>
  );
}
