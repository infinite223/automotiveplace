"use client";

import { AMPEmptyState } from "@/app/components/shared/AMPEmptyState";
import { LuMilestone } from "react-icons/lu";

interface ReferencesTabProps {
  isMyProject?: boolean;
}

export default function ReferencesTab({ isMyProject }: ReferencesTabProps) {
  const hasReferences = false;

  return (
    <div className="flex flex-col w-full">
      <h2 className="text-xl font-semibold mb-4 px-1">Wzmianki</h2>

      {!hasReferences ? (
        <AMPEmptyState
          icon={LuMilestone}
          title="Brak odnotowanych wzmianek"
          description="To miejsce na linki do artykułów, występy na eventach lub spotach"
          isMyProject={isMyProject}
          buttonLabel="Dodaj pierwszą wzmiankę"
          onButtonClick={() => console.log("Dodaj wzmiankę")}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4"></div>
      )}
    </div>
  );
}
