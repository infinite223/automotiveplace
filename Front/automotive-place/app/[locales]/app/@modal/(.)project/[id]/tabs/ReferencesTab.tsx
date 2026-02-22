"use client";

import { AMPButton } from "@/app/components/shared/AMPButton";
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
        <div className="flex flex-col items-center justify-center py-20  rounded-md bg-amp-50 border-amp-700">
          <LuMilestone size={48} className="mb-4 opacity-20" />

          <p className="text-lg font-medium text-center px-4">
            Brak odnotowanych wzmianek
          </p>

          <p className="text-sm opacity-60 mb-6 text-center max-w-[300px]">
            To miejsce na linki do artykułów, występy na eventach lub spotach
          </p>

          {isMyProject && (
            <AMPButton
              name="Dodaj pierwszą wzmiankę"
              additionalTailwindCss="text-sm"
              onClick={() => console.log("Dodaj wzmiankę")}
            />
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4"></div>
      )}
    </div>
  );
}
