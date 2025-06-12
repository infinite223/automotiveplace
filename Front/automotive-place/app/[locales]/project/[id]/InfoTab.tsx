"use client";

import { AMPCarStatsItem } from "@/app/components/shared/AMPCarStatsItem";
import { TStage } from "@/app/utils/types/stage";
import { useTranslations } from "next-intl";
import PhotoGallery from "./PhotoGallery";

interface InfoTabProps {
  lastStage: TStage | undefined;
  images: string[] | undefined;
  description: string | undefined | null;
  name: string | undefined | null;
  engine: Engine;
  transmission: Transmission;
  globalInfo: GlobalInfo;
}

type Engine = {
  name: string;
  description?: string;
  capacity: number;
  swapped?: boolean;
  stockHp: number;
  stockNm: number;
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
  projectPrice: number;
  weightStock: number;
};

export default function InfoTab({
  lastStage,
  images,
  description,
  name,
  engine,
  transmission,
  globalInfo,
}: InfoTabProps) {
  const t = useTranslations();

  if (!lastStage) return null;

  return (
    <div className="flex flex-col w-full">
      {name && <span className="mt-2">{name}</span>}
      {description && (
        <span className="text-sm opacity-85 mt-1">{description}</span>
      )}

      <span className="mt-4 font-semibold">Parametry projektu</span>

      <div className="flex w-full max-md:flex-col my-4 gap-2">
        <div className="flex lg:w-[30%] flex-col gap-2 h-min mb-2">
          <AMPCarStatsItem
            typeValue={t("Core.Hp").toUpperCase()}
            value={lastStage.hp.toString()}
            title="Moc silnika"
          />
          <AMPCarStatsItem
            typeValue="NM"
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
            <div className="grid grid-cols-2 gap-y-2 text-sm mt-4">
              <div className="opacity-75 text-left">Nazwa:</div>
              <div className="opacity-85 font-medium text-right">
                {engine.name}
              </div>

              {engine.description && (
                <>
                  <div className="opacity-75 text-left">Opis:</div>
                  <div className="opacity-85 font-medium text-right">
                    {engine.description}
                  </div>
                </>
              )}

              <div className="opacity-75 text-left">Pojemność:</div>
              <div className="opacity-85 font-medium text-right">
                {engine.capacity}l
              </div>

              <div className="opacity-75 text-left">Moc/Moment obrotowy:</div>
              <div className="opacity-85 font-medium text-right">
                {engine.stockHp}HP/{engine.stockNm}NM
              </div>

              <div className="opacity-75 text-left">Swap:</div>
              <div className="opacity-85 font-medium text-right">
                {engine.swapped ? "tak" : "nie"}
              </div>
            </div>
          </div>

          <div className="bg-amp-50 h-fit p-4 rounded-sm shadow-md">
            <span className="text-lg font-semibold opacity-90">
              Skrzynia biegów
            </span>
            <div className="grid grid-cols-2 gap-y-2 text-sm mt-4">
              <div className="opacity-75 text-left">Nazwa:</div>
              <div className="opacity-85 font-medium text-right">
                {transmission.name}
              </div>

              <div className="opacity-75 text-left">Opis:</div>
              <div className="opacity-85 font-medium text-right">
                {transmission.description}
              </div>

              <div className="opacity-75 text-left">Ilość biegów:</div>
              <div className="opacity-85 font-medium text-right">
                {transmission.gears}
              </div>

              <div className="opacity-75 text-left">Typ:</div>
              <div className="opacity-85 font-medium text-right">
                {transmission.transmissionType}
              </div>

              <div className="opacity-75 text-left">Swap:</div>
              <div className="opacity-85 font-medium text-right">
                {transmission.wasSwapped}
              </div>
            </div>
          </div>

          <div className="bg-amp-50 h-fit p-4 rounded-sm shadow-md">
            <span className="text-lg font-semibold opacity-90">Reszta</span>
            <div className="grid grid-cols-2 gap-y-2 text-sm mt-4">
              <div className="opacity-75 text-left">Waga:</div>
              <div className="opacity-85 font-medium text-right">
                {globalInfo.weightStock}
              </div>

              <div className="opacity-75 text-left">Prędkość maksymalna:</div>
              <div className="opacity-85 font-medium text-right">
                {globalInfo.topSpeedStock}
              </div>

              <div className="opacity-75 text-left">Cena projektu:</div>
              <div className="opacity-85 font-medium text-right">
                {globalInfo.projectPrice}
              </div>
            </div>
          </div>
        </div>
      </div>

      <span className="my-4 font-semibold">Zdjęcia</span>
      {images && <PhotoGallery images={images} />}
      {/* Zdjęcia */}
      {/* Gdzie mozna go spotkać */}
    </div>
  );
}
