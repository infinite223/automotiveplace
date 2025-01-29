"use client";

import { AMPCarStatsItem } from "@/app/components/shared/AMPCarStatsItem";
import useFetchData from "@/app/hooks/useFetchData";
import { getProject } from "@/app/services/project";
import { getCurrentStage } from "@/app/utils/helpers";
import { TBasicProject, TProject } from "@/app/utils/types/project";
import { RootState } from "@/lib/store";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Project({ params }: { params: { id: string } }) {
  const t = useTranslations();
  const contentData = useSelector(
    (state: RootState) => state.contentData.contentData
  );

  const [tempData, setTempData] = useState<TBasicProject | null>(null);
  const { data, loading, error } = useFetchData<TProject>(() =>
    getProject(params.id)
  );

  useEffect(() => {
    if (loading) {
      const content = contentData.find((item) => item.data.id === params.id);
      if (content?.data) {
        setTempData(content.data as TBasicProject);
      }
    }
  }, [loading, contentData, params.id]);

  const displayData = loading ? tempData : data;

  const lastStage =
    displayData && "stages" in displayData
      ? getCurrentStage(displayData as TProject)
      : undefined;

  if (loading && !tempData)
    return (
      <div className="flex w-full min-h-screen bg-black justify-center items-center text-white text-lg">
        Loading...
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="flex w-full min-h-screen bg-amp-900 dark:bg-amp-0 flex-col items-center gap-2 text-black dark:text-white">
      <div className="w-full bg-amp-700 dark:bg-amp-0 pb-32 flex justify-center">
        <div className="max-w-screen-2xl w-full h-[250px]">
          {displayData?.images?.[0] && (
            <img
              src={displayData.images?.[0]}
              className="w-full h-full object-cover rounded-b-lg blur-sm opacity-80"
              alt="car-image"
            />
          )}

          <nav className="flex flex-col gap-2 justify-between w-full top-[-60px] relative px-4">
            <h1 className="text-3xl font-semibold gap-2 flex items-center">
              {displayData?.images?.[0] && (
                <img
                  src={displayData.images?.[0]}
                  className="w-20 h-20 object-cover rounded-full mr-4"
                  alt="car-image"
                />
              )}
              <span>{displayData?.carMake}</span>
              <span>{displayData?.carModel}</span>
              <span className="">- {lastStage?.name || "N/A"}</span>
            </h1>

            {lastStage && (
              <div className="flex flex-wrap gap-4 w-full">
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
                  subTitle={"0-100km/h"}
                  value={lastStage.acc_0_100.toString()}
                  title="Przyśpieszenie"
                />
                <AMPCarStatsItem
                  typeValue="s"
                  subTitle={"100-200km/h"}
                  value={lastStage.acc_100_200.toString()}
                  title="Przyśpieszenie"
                />
                <AMPCarStatsItem
                  typeValue="s"
                  subTitle={"50-150km/h"}
                  value={lastStage.acc_50_150.toString()}
                  title="Przyśpieszenie"
                />
                {lastStage.sl_100_0 && (
                  <AMPCarStatsItem
                    typeValue="s"
                    subTitle={"100-0km/h"}
                    value={lastStage.sl_100_0.toString()}
                    title="Droga hamowania"
                  />
                )}
                {lastStage.sl_150_50 && (
                  <AMPCarStatsItem
                    typeValue="s"
                    subTitle={"150-50km/h"}
                    value={lastStage.sl_150_50.toString()}
                    title="Droga hamowania"
                  />
                )}
              </div>
            )}
          </nav>
        </div>
      </div>
    </main>
  );
}
