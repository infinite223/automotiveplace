"use client";

import { AMPButton } from "@/app/components/shared/AMPButton";
import AMPSlider from "@/app/components/shared/AMPSlider";
import { getProjectImageSrcByFileId } from "@/app/utils/helpers/storageHelper";
import { TBasicVisualModification } from "@/app/utils/types/visualModification";
import { PiPaintBrush } from "react-icons/pi";

interface VisualModsTabProps {
  modifications: TBasicVisualModification[];
  isMyProject?: boolean;
}

export default function VisualModsTab({
  modifications,
  isMyProject,
}: VisualModsTabProps) {
  const hasModifications = modifications && modifications.length > 0;

  return (
    <div className="flex flex-col w-full py-4">
      <div className="mb-6 px-1">
        <h2 className="text-2xl font-bold text-white">Modyfikacje wizualne</h2>
        <p className="text-amp-800 text-sm">
          Zmiany stylistyczne, bodykity i detale poprawiające wygląd
        </p>
      </div>

      {!hasModifications ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-md bg-amp-50">
          <PiPaintBrush size={48} className="mb-4 opacity-20 text-white" />

          <p className="text-lg font-medium text-center px-4">
            Brak modyfikacji wizualnych
          </p>

          <p className="text-sm opacity-60 mb-6 text-center max-w-[320px]">
            Nie odnotowano jeszcze zmian stylistycznych, oklejania czy nowych
            felg
          </p>

          {isMyProject && (
            <AMPButton
              name="Dodaj pierwszą modyfikację"
              additionalTailwindCss="text-sm"
              onClick={() => console.log("Dodaj modyfikację")}
            />
          )}
        </div>
      ) : (
        <div className="overflow-x-auto custom-scrollbar">
          <div className="flex gap-6 min-w-max pb-6">
            {modifications.map((mod) => (
              <div
                key={mod.id}
                className="flex-shrink-0 w-[300px] bg-amp-900/50 dark:bg-amp-50 rounded-md overflow-hidden shadow-sm border border-amp-700/30 transition-all hover:border-amp-500/50"
              >
                <div className="w-full h-[200px] bg-black/20">
                  {mod.images && mod.images.length > 0 ? (
                    <AMPSlider
                      images={mod.images
                        .map((imgId) => getProjectImageSrcByFileId(imgId))
                        .filter((url): url is string => url !== null)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center opacity-30">
                      <PiPaintBrush size={32} />
                      <span className="text-xs mt-2">Brak zdjęć</span>
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-amp-500 tracking-widest mb-1">
                      {mod.modificationType}
                    </span>
                    <h3 className="font-bold text-lg text-white leading-tight uppercase">
                      {mod.name}
                    </h3>
                  </div>

                  {mod.description && (
                    <p className="text-sm text-amp-200 dark:text-amp-800/80 line-clamp-3 leading-relaxed">
                      {mod.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
