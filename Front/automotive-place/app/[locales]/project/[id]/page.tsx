"use client";

import { AMPButton } from "@/app/components/shared/AMPButton";
import { getProject } from "@/app/services/project";
import { iconSizes } from "@/app/utils/constants";
import { TBasicProject, TProject } from "@/app/utils/types/project";
import { RootState } from "@/lib/store";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { CgShare } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { TbMessageCircleUp } from "react-icons/tb";
import { useSelector } from "react-redux";
import {
  motion,
  AnimatePresence,
  useTransform,
  useScroll,
} from "framer-motion";
import InfoTab from "./tabs/InfoTab";
import StagesTab from "./tabs/StagesTab";
import ReferencesTab from "./tabs/ReferencesTab";
import { tabsConfig } from "./tabs/consts";
import { LoadingSpinner } from "@/app/components/loading/LoadingSpinner";
import { useLike } from "@/app/hooks/useLike";
import { ContentType } from "@/app/utils/enums";
import { TBasicTag } from "@/app/utils/types/tag";
import { useFetchData } from "@/app/hooks/useFetchData";
import { getCurrentStage } from "@/app/utils/helpers/stagesHelper";
import Image from "next/image";
import { RxDotsHorizontal } from "react-icons/rx";

export default function Project({ params }: { params: { id: string } }) {
  const contentData = useSelector(
    (state: RootState) => state.contentData.contentData
  );
  const [activeTab, setActiveTab] = useState("informacje");
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const height = useTransform(scrollY, [0, 200], ["200px", "0px"]);
  const opacity = useTransform(scrollY, [0, 150], [1, 0]);

  const [tempData, setTempData] = useState<TBasicProject | null>(null);
  const { data, loading, error } = useFetchData<TProject>(
    `project-${params.id}`,
    () => getProject(params.id)
  );

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <LoadingSpinner />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="flex w-full min-h-dvh bg-amp-900 dark:bg-amp-0 flex-col items-center gap-2 text-black dark:text-white">
      <div className="w-full pb-32 flex justify-center">
        <div className="max-w-screen-2xl w-full flex-col">
          <div
            className={`flex items-center justify-between sticky top-0 z-50 backdrop-blur-md bg-amp-900/80 dark:bg-amp-0/80 transition-all duration-300 ${
              scrolled ? "shadow-md py-0.5" : ""
            }`}
          >
            {/* <div className="p-4" onClick={() => router.back()}>
              <RiArrowLeftLine size={iconSizes.base} />
            </div> */}
            <motion.span
              className="text-xs font-semibold pl-4"
              initial={{ opacity: 1 }}
              animate={{ opacity: scrolled ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            >
              PROJECT
            </motion.span>

            <motion.span
              className="text-sm font-semibold absolute left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: scrolled ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {(displayData?.carMake || "") +
                " " +
                (displayData?.carModel || "")}
            </motion.span>
            <div className="p-3">
              <RxDotsHorizontal size={iconSizes.base} />
            </div>
          </div>

          <motion.div
            ref={imageRef}
            style={{ height, opacity }}
            className="relative w-full overflow-hidden"
          >
            {displayData?.images?.[0] && (
              <Image
                src={displayData.images?.[0]}
                className="object-cover"
                alt="car-image"
                fill
              />
            )}
          </motion.div>

          <nav className="flex flex-col justify-between w-full py-4 px-4">
            <header className="text-3xl font-semibold gap-1 flex flex-col flex-wrap">
              <div className="flex w-full items-start justify-between flex-col">
                <div className="flex flex-col w-full">
                  <div className="flex items-center gap-3">
                    <span>{displayData?.carMake}</span>
                  </div>
                  <div className="text-lg opacity-70">
                    <span>{displayData?.carModel}</span>
                    <span className=""> {lastStage?.name || "N/A"}</span>
                  </div>
                </div>
                <div className="flex flex-col mt-2">
                  <div className="text-medium mb-1">{data?.author?.name}</div>
                  <div className="text-sm opacity-70">
                    Opublikowany:{" "}
                    {moment(data?.createdAt, "YYYYMMDD").fromNow()}
                  </div>
                  {lastStage && (
                    <div className="text-sm opacity-70">
                      Modyfikowany:{" "}
                      {moment(lastStage?.createdAt, "YYYYMMDD").fromNow()}
                    </div>
                  )}
                </div>

                <div className="mt-4 gap-2 flex w-full justify-end flex-wrap-reverse">
                  <AMPButton
                    name="Nawiąż kontakt"
                    additionalTailwindCss="text-sm py-2 max-w-[300px] flex-1 w-full justify-center"
                    type="primary"
                    icon={<TbMessageCircleUp size={iconSizes.small} />}
                  />

                  {data && (
                    <LikeButton
                      id={data.id}
                      isLikedByAuthUser={data.isLikedByAuthUser}
                      likesCount={data.likesCount}
                      tags={data.tags || []}
                    />
                  )}

                  <AMPButton
                    additionalTailwindCss="text-sm py-2"
                    type="secondary"
                    icon={<CgShare size={iconSizes.small} />}
                  />
                </div>
              </div>
            </header>
          </nav>

          <nav className="flex w-full items-center gap-3 mt-3 border-b border-amp-700 dark:border-amp-200">
            {tabsConfig.map((tab) => (
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
                    className="absolute left-0 bottom-0 w-[75%] h-[2px] mx-3 bg-amp-500"
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
                    {data && (
                      <InfoTab
                        name={displayData.name}
                        location={data?.location}
                        engine={{
                          name: data.engineName || "",
                          capacity: data.engineCapacity || 0,
                          description: data.engineDescription || undefined,
                          swapped: data.engineWasSwapped || false,
                        }}
                        transmission={{
                          gears: data.transmissionGears || 0,
                          name: data.transmissionName || "",
                          transmissionType: data.transmissionType || 1,
                          wasSwapped: data.transmissionWasSwapped || false,
                        }}
                        globalInfo={{
                          projectPrice: data.projectPrice || undefined,
                          weightStock: data.weightStock || undefined,
                          topSpeedStock: data.topSpeedStock || undefined,
                        }}
                        description={displayData.description}
                        lastStage={lastStage}
                        images={displayData.images}
                      />
                    )}
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
                    {data && <StagesTab stages={data?.stages || []} />}
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

interface LikeButtonProps {
  likesCount: number;
  isLikedByAuthUser: boolean;
  id: string;
  tags: TBasicTag[];
}

const LikeButton = ({
  id,
  isLikedByAuthUser,
  likesCount,
  tags,
}: LikeButtonProps) => {
  const { currentLikesCount, handleClickLike } = useLike(
    likesCount,
    isLikedByAuthUser,
    id,
    ContentType.Project,
    tags
  );
  return (
    <AMPButton
      name={currentLikesCount.toString()}
      additionalTailwindCss="text-sm rounded-lg  py-2"
      type="secondary"
      icon={<FaHeart size={iconSizes.small - 2} />}
      onClick={handleClickLike}
    />
  );
};
