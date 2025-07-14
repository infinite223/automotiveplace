"use client";

import { AMPCarStatsItem } from "@/app/components/shared/AMPCarStatsItem";
import { TStage } from "@/app/utils/types/stage";
import { useTranslations } from "next-intl";
import PhotoGallery from "../PhotoGallery";
import { TLocation } from "@/app/utils/types/project";

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
      {description && (
        <span className="text-sm opacity-85 mt-1">{description}</span>
      )}

      <span className="mt-4 font-semibold">Aktualne parametry projektu</span>

      <div className="flex w-full flex-col my-4 gap-2">
        <div className="flex w-full flex-wrap gap-2 h-min mb-2">
          <AMPCarStatsItem
            typeValue={t("Core.Hp").toUpperCase()}
            value={lastStage.hp.toString()}
            subTitle="Hamownia"
            title="Moc silnika"
          />
          <AMPCarStatsItem
            typeValue="NM"
            subTitle="Hamownia"
            value={lastStage.nm.toString()}
            title="Moment obrotowy"
          />
          <AMPCarStatsItem
            typeValue="s"
            subTitle="0-100km/h"
            value={lastStage.acc_0_100.toString()}
            title="Przyśpieszenie"
          />
          <AMPCarStatsItem
            typeValue="s"
            subTitle="100-200km/h"
            value={lastStage.acc_100_200.toString()}
            title="Przyśpieszenie"
          />
          <AMPCarStatsItem
            typeValue="s"
            subTitle="50-150km/h"
            value={lastStage.acc_50_150.toString()}
            title="Przyśpieszenie"
          />
          {lastStage.sl_100_0 && (
            <AMPCarStatsItem
              typeValue="s"
              subTitle="100-0km/h"
              value={lastStage.sl_100_0.toString()}
              title="Droga hamowania"
            />
          )}
          {lastStage.sl_150_50 && (
            <AMPCarStatsItem
              typeValue="s"
              subTitle="150-50km/h"
              value={lastStage.sl_150_50.toString()}
              title="Droga hamowania"
            />
          )}
        </div>

        <div className="grid grid-cols-1 w-full lg:grid-cols-3 gap-4">
          <div className="bg-amp-50 h-fit p-4 rounded-sm shadow-md">
            <span className="text-lg font-semibold opacity-90">Silnik</span>
            <div className="flex flex-col gap-1 text-sm mt-4">
              <div className="opacity-85">
                <span className="opacity-75">Nazwa: </span>
                <span className="font-medium">{engine.name}</span>
              </div>

              {engine.description && (
                <div className="opacity-85">
                  <span className="opacity-75">Opis: </span>
                  <span className="font-medium">{engine.description}</span>
                </div>
              )}

              <div className="opacity-85">
                <span className="opacity-75">Pojemność: </span>
                <span className="font-medium">{engine.capacity}l</span>
              </div>

              <div className="opacity-85">
                <span className="opacity-75">Swap: </span>
                <span className="font-medium">
                  {engine.swapped ? "tak" : "nie"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-amp-50 h-fit p-4 rounded-sm shadow-md">
            <span className="text-lg font-semibold opacity-90">
              Skrzynia biegów
            </span>
            <div className="flex flex-col gap-1 text-sm mt-4">
              <div className="opacity-85">
                <span className="opacity-75">Nazwa: </span>
                <span className="font-medium">{transmission.name}</span>
              </div>

              {transmission.description && (
                <div className="opacity-85">
                  <span className="opacity-75">Opis: </span>
                  <span className="font-medium">
                    {transmission.description}
                  </span>
                </div>
              )}

              <div className="opacity-85">
                <span className="opacity-75">Ilość biegów: </span>
                <span className="font-medium">{transmission.gears}</span>
              </div>

              <div className="opacity-85">
                <span className="opacity-75">Typ: </span>
                <span className="font-medium">
                  {transmission.transmissionType}
                </span>
              </div>

              <div className="opacity-85">
                <span className="opacity-75">Swap: </span>
                <span className="font-medium">
                  {transmission.wasSwapped ? "tak" : "nie"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-amp-50 h-fit p-4 rounded-sm shadow-md">
            <span className="text-lg font-semibold opacity-90">Reszta</span>
            <div className="flex flex-col gap-1 text-sm mt-4">
              {globalInfo.weightStock && (
                <div className="opacity-85">
                  <span className="opacity-75">Waga: </span>
                  <span className="font-medium">
                    {globalInfo.weightStock} kg
                  </span>
                </div>
              )}

              {globalInfo.topSpeedStock && (
                <div className="opacity-85">
                  <span className="opacity-75">Prędkość maksymalna: </span>
                  <span className="font-medium">
                    {globalInfo.topSpeedStock} km/h
                  </span>
                </div>
              )}

              {globalInfo.projectPrice && (
                <div className="opacity-85">
                  <span className="opacity-75">Cena projektu: </span>
                  <span className="font-medium">
                    {globalInfo.projectPrice} zł
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <span className="my-4 font-semibold">Zdjęcia</span>
      {images && <PhotoGallery images={images} />}
      {/* Zdjęcia */}
      {location && (
        <>
          <span className="my-4 font-semibold">Najczęściej widziany</span>

          <span>
            {" "}
            {location.name} {location.description}
          </span>
        </>
      )}
      {/* Gdzie mozna go spotkać */}
    </div>
  );
}
