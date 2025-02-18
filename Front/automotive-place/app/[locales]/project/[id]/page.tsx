"use client";

import { AMPButton } from "@/app/components/shared/AMPButton";
import { AMPCarStatsItem } from "@/app/components/shared/AMPCarStatsItem";
import { AMPSeparator } from "@/app/components/shared/AMPSeparator";
import useFetchData from "@/app/hooks/useFetchData";
import { getProject } from "@/app/services/project";
import { iconSizes } from "@/app/utils/constants";
import { getCurrentStage } from "@/app/utils/helpers";
import { TBasicProject, TProject } from "@/app/utils/types/project";
import { RootState } from "@/lib/store";
import moment from "moment";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { CgShare } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { TbMessageCircleUp } from "react-icons/tb";
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
              className="w-full h-full object-cover blur-sm opacity-60"
              alt="car-image"
            />
          )}

          <nav className="flex flex-col justify-between w-full top-[0px] relative py-4 px-4">
            <header className="text-3xl font-semibold gap-1 flex flex-col flex-wrap">
              {/* {displayData?.images?.[0] && (
                <img
                  src={displayData.images?.[0]}
                  className="w-20 h-20 object-cover rounded-full mr-4"
                  alt="car-image"
                />
              )} */}
              <div className="flex w-full items-start justify-between">
                <div className="flex flex-col w-full">
                  <div>
                    <span>{displayData?.carMake}</span>
                    <span>{displayData?.carModel}</span>
                    <span className="">- {lastStage?.name || "N/A"}</span>
                  </div>
                  <div className="text-medium opacity-85">2,5k polubień</div>
                </div>
                <div className="gap-2 flex w-full justify-end flex-wrap">
                  <AMPButton
                    name="Udostępnij"
                    additionalTailwindCss="text-sm"
                    type="none"
                    icon={<CgShare size={iconSizes.small} />}
                  />
                  <AMPButton
                    name="Nawiąz kontakt"
                    additionalTailwindCss="text-sm "
                    type="secondary"
                    icon={<TbMessageCircleUp size={iconSizes.small} />}
                  />
                  <AMPButton
                    name="Polub projekt"
                    additionalTailwindCss="text-sm"
                    type="secondary"
                    icon={<FaHeart size={iconSizes.small - 2} />}
                  />
                </div>
              </div>
              <div className="flex items-center gap-x-4 text-xs opacity-65 flex-wrap">
                <div>
                  Projekt dodany przez: {data?.author?.name}{" "}
                  {moment(data?.createdAt, "YYYYMMDD").fromNow()}
                </div>
                {lastStage && (
                  <div>
                    Ostatnia modyfikacja: {lastStage?.createdAt?.toDateString()}
                  </div>
                )}

                <div>Ostatnia modyfikacja: 5 dni temu</div>
              </div>
            </header>

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

          <AMPSeparator />

          <div className="flex gap-3 mx-4 mt-5">
            <div>
              Informacje
              {/* Wszystkie informacje o mocy, o przyśpieszeniach, przyrostach, opis, linki, zdjęcia, */}
            </div>
            <div>
              Etapy modyfikacji
              {/* dokładne opisy etapów modyfikacji, jakie zmiany, zdjęcia (wykres, jaka firma itp */}
            </div>
            <div>
              Wzmianki
              {/* To gdzie mona zobaczyć  projekt,tzn eventy, spoty na których był , problemy*/}
            </div>
          </div>

          {/* Podobne projekty.... */}

          {/* Footer */}
        </div>
      </div>
    </main>
  );
}
