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

      <div className="flex w-full my-4 gap-2">
        <div className="flex w-[30%] flex-col gap-2 h-min">
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

        <div className="flex w-[70%] gap-3">
          <div className="w-1/3 bg-amp-50 h-fit p-4">
            <span className="">Silnik</span>
            <div className="flex flex-col gap-1 text-sm opacity-85 mt-2">
              <div>
                Nazwa: <span>{engine.name}</span>
              </div>
              <div>
                Opis: <span>{engine.description}</span>
              </div>
              <div>
                Pojemność: <span>{engine.capacity}l</span>
              </div>
              <div>
                HP/NM{" "}
                <span>
                  {engine.stockHp}/{engine.stockNm}
                </span>
              </div>
              <div>
                Swapped: <span>{engine.swapped ? "tak" : "nie"}</span>
              </div>
            </div>
          </div>
          <div className="w-1/3 bg-amp-50 h-[200px] p-4">Skrzynia</div>
          <div className="w-1/3 bg-amp-50 h-[200px] p-4">Reszta</div>
        </div>
      </div>

      <span className="my-4 font-semibold">Zdjęcia</span>
      {images && <PhotoGallery images={images} />}
      {/* Zdjęcia */}
      {/* Gdzie mozna go spotkać */}
    </div>
  );
}
