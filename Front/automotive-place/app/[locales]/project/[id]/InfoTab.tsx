"use client";

import { AMPCarStatsItem } from "@/app/components/shared/AMPCarStatsItem";
import { TStage } from "@/app/utils/types/stage";
import { useTranslations } from "next-intl";
import PhotoGallery from "./PhotoGallery";

interface InfoTabProps {
  lastStage: TStage | undefined;
  images: string[] | undefined;
}

export default function InfoTab({ lastStage, images }: InfoTabProps) {
  const t = useTranslations();

  if (!lastStage) return null;
  const imageUrls = [
    "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e",

    "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
  ];
  return (
    <div className="flex flex-col w-full gap-4">
      <span className="mt-2">Parametry projektu</span>

      <div className="flex flex-wrap gap-2 w-full">
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
      <span className="mt-2">Zdjęcia</span>
      {images && <PhotoGallery images={images} />}
      {/* Zdjęcia */}
      {/* Gdzie mozna go spotkać */}
    </div>
  );
}
