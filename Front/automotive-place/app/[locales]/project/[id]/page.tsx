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
import { motion, AnimatePresence } from "framer-motion";
import InfoTab from "./InfoTab";
import StagesTab from "./StagesTab";
import ReferencesTab from "./ReferencesTab";

export default function Project({ params }: { params: { id: string } }) {
  const t = useTranslations();
  const contentData = useSelector(
    (state: RootState) => state.contentData.contentData
  );
  const [activeTab, setActiveTab] = useState("informacje");

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

  const lastStage = displayData
    ? getCurrentStage(displayData as TProject)
    : undefined;

  if (loading && !tempData)
    return (
      <div className="flex w-full min-h-screen bg-black justify-center items-center text-white text-lg">
        Loading...
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  const tabs = [
    { id: "informacje", label: "Informacje" },
    { id: "etapy", label: "Etapy modyfikacji" },
    { id: "wzmianki", label: "Wzmianki" },
  ];

  return (
    <main className="flex w-full min-h-dvh bg-amp-900 dark:bg-amp-0 flex-col items-center gap-2 text-black dark:text-white">
      <div className="w-full pb-32 flex justify-center">
        <div className="max-w-screen-2xl w-full">
          <div className="h-[250px] w-full">
            {displayData?.images?.[0] && (
              <img
                src={displayData.images?.[0]}
                className="w-full h-full object-cover blur-sm opacity-60"
                alt="car-image"
              />
            )}
          </div>

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
                    Ostatnia modyfikacja:
                    {moment(lastStage?.createdAt, "YYYYMMDD").fromNow()}
                  </div>
                )}

                <div>Ostatnia modyfikacja: 5 dni temu</div>
              </div>
            </header>
          </nav>

          <AMPSeparator />

          <nav className="flex gap-3 mt-5 border-b border-amp-700 dark:border-amp-200 relative">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 transition-all text-white ${
                  activeTab === tab.id ? "font-bold" : "opacity-60"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 bottom-0 w-full h-[2px] bg-amp-500"
                  />
                )}
              </button>
            ))}
          </nav>

          {displayData && (
            <div className="p-4 overflow-hidden">
              <AnimatePresence mode="wait">
                {activeTab === "informacje" && (
                  <motion.div
                    key="informacje"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <InfoTab
                      name={displayData.name}
                      location={data?.location}
                      engine={{
                        name: data?.engineName || "",
                        capacity: 2,
                        description: "",
                        swapped: false,
                      }}
                      transmission={{
                        gears: 6,
                        name: "ZF",
                        transmissionType: 1,
                        wasSwapped: true,
                      }}
                      globalInfo={{
                        projectPrice: 43500,
                        weightStock: 1559,
                        topSpeedStock: 260,
                      }}
                      description={displayData.description}
                      lastStage={lastStage}
                      images={displayData.images}
                    />
                  </motion.div>
                )}

                {activeTab === "etapy" && (
                  <motion.div
                    key="etapy"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <StagesTab />
                  </motion.div>
                )}

                {activeTab === "wzmianki" && (
                  <motion.div
                    key="wzmianki"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ReferencesTab />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Podobne projekty.... */}

          {/* Footer */}
        </div>
      </div>
    </main>
  );
}
