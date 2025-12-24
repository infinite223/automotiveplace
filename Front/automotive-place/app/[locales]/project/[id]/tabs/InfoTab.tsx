"use client";

import { TStage } from "@/app/utils/types/stage";
import { useTranslations } from "next-intl";
import PhotoGallery from "../PhotoGallery";
import { TLocation } from "@/app/utils/types/project";
import { PiEngineBold, PiInfo } from "react-icons/pi";
import { GiGearStickPattern } from "react-icons/gi";
import { iconSizes } from "@/app/utils/constants";
import { EngineParameter } from "@/app/utils/enums";

interface InfoTabProps {
  lastStage: TStage | undefined;
  images: string[] | undefined;
  description: string | undefined | null;
  name: string | undefined | null;
  engine: Engine;
  transmission: Transmission;
  globalInfo: GlobalInfo;
  location?: TLocation;
}

type Engine = {
  name: string;
  description?: string;
  capacity: number;
  swapped?: boolean;
};

type Transmission = {
  name: string;
  description?: string;
  wasSwapped?: boolean;
  gears: number;
  transmissionType: number;
};

type GlobalInfo = {
  topSpeedStock?: number;
  projectPrice?: number;
  weightStock?: number;
};

export default function InfoTab({
  lastStage,
  images,
  description,
  name,
  engine,
  transmission,
  globalInfo,
  location,
}: InfoTabProps) {
  const t = useTranslations();
  if (!lastStage) return null;

  return (
    <div className="flex flex-col w-full">
      {name && <span className="mt-2 font-semibold">{name}</span>}
      {description && <span className="text-sm mt-1">{description}</span>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-text-light dark:text-text-dark">
            Performance
          </h3>
          <div className="divide-y divide-amp-200 rounded-small bg-amp-900 dark:bg-amp-100 px-4 py-2 dark:divide-subtle-dark/20 dark:bg-surface-dark">
            <Item label="Moc silnika" value={`${lastStage.hp} hp`} />
            <Item label="Moment obrotowy" value={`${lastStage.nm} Nm`} />
            {lastStage.acc_0_100 && (
              <Item label="0–100 km/h" value={`${lastStage.acc_0_100}s`} />
            )}
            {lastStage.acc_100_200 && (
              <Item label="100–200 km/h" value={`${lastStage.acc_100_200}s`} />
            )}
            {lastStage.acc_50_150 && (
              <Item label="50–150 km/h" value={`${lastStage.acc_50_150}s`} />
            )}
            {lastStage.maxRPM && (
              <Item
                label={EngineParameter.MaxRPM}
                value={`${lastStage.maxRPM.toLocaleString()} rpm`}
              />
            )}
          </div>
        </div>

        {/* Silnik */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <PiEngineBold size={iconSizes.base} />
            <h3 className="text-lg font-bold text-text-light dark:text-text-dark">
              Silnik
            </h3>
          </div>
          <div className="divide-y divide-amp-200 rounded-small bg-amp-900 dark:bg-amp-100 px-4 py-2 dark:divide-subtle-dark/20 dark:bg-surface-dark">
            <Item label="Nazwa" value={engine.name} />
            {engine.description && (
              <Item label="Opis" value={engine.description} />
            )}
            <Item label="Pojemność" value={`${engine.capacity}L`} />
            <Item label="Swap" value={engine.swapped ? "Tak" : "Nie"} />
          </div>
        </div>

        {/* Skrzynia biegów */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <GiGearStickPattern size={iconSizes.base} />
            <h3 className="text-lg font-bold text-text-light dark:text-text-dark">
              Skrzynia biegów
            </h3>
          </div>
          <div className="divide-y divide-amp-200 rounded-small bg-amp-900 dark:bg-amp-100 px-4 py-2 dark:divide-subtle-dark/20 dark:bg-surface-dark">
            <Item label="Nazwa" value={transmission.name} />
            {transmission.description && (
              <Item label="Opis" value={transmission.description} />
            )}
            <Item label="Ilość biegów" value={`${transmission.gears}`} />
            <Item label="Typ" value={`${transmission.transmissionType}`} />
            <Item
              label="Swap"
              value={transmission.wasSwapped ? "Tak" : "Nie"}
            />
          </div>
        </div>

        {/* Reszta */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <PiInfo size={iconSizes.base} />
            <h3 className="text-lg font-bold text-text-light dark:text-text-dark">
              Reszta
            </h3>
          </div>
          <div className="divide-y divide-amp-200 rounded-small bg-amp-900 dark:bg-amp-100 px-4 py-2 dark:divide-subtle-dark/20 dark:bg-surface-dark">
            {globalInfo.weightStock && (
              <Item label="Waga" value={`${globalInfo.weightStock} kg`} />
            )}
            {globalInfo.topSpeedStock && (
              <Item
                label="Prędkość maksymalna"
                value={`${globalInfo.topSpeedStock} km/h`}
              />
            )}
            {globalInfo.projectPrice && (
              <Item
                label="Cena projektu"
                value={`~${globalInfo.projectPrice.toLocaleString()} zł`}
              />
            )}
          </div>
        </div>
      </div>

      <span className="my-6 text-lg font-bold">Zdjęcia</span>
      {images && <PhotoGallery images={images} />}

      {location && (
        <>
          <span className="my-4 font-semibold">Najczęściej widziany</span>
          <span>
            {location.name} {location.description}
          </span>
        </>
      )}
    </div>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-3">
      <p className="text-subtle-light dark:text-subtle-dark">{label}</p>
      <p className="font-medium text-right">{value}</p>
    </div>
  );
}
