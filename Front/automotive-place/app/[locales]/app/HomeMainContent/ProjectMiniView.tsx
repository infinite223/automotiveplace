"use client";

import { TBasicProject } from "@/app/utils/types/project";
import { useEffect, useState } from "react";
import { ContentMiniNav } from "./ContentMiniNav";
import { ContentMiniFooter } from "./ContentMiniFooter";
import { IoIosArrowForward } from "react-icons/io";
import { iconSizes } from "@/app/utils/constants";
import Link from "next/link";
import AMPSlider from "@/app/components/shared/AMPSlider";
import { useLike } from "@/app/hooks/useLike";
import { ContentType, EngineParameter, ErrorStatus } from "@/app/utils/enums";
import { useDispatch } from "react-redux";
import { addNotification } from "@/lib/features/notifications/notificationsSlice";
import { CreateNotification } from "@/app/components/logger/NotificationHelper";
import { deleteProject } from "@/app/services/project";

export const ProjectMiniView = ({
  data,
  isUserContent = false,
  onDelete,
}: {
  data: TBasicProject;
  isUserContent: boolean;
  onDelete?: (id: string) => void;
}) => {
  const [isClient, setIsClient] = useState(false);
  const { currentIsLiked, currentLikesCount, handleClickLike } = useLike(
    data.likesCount,
    data.isLikedByAuthUser,
    data.id,
    ContentType.Project,
    data.tags
  );

  const dispatch = useDispatch();
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!data) {
    return null;
  }

  const handleLinkClick = () => {
    sessionStorage.setItem("lastClickedId", data.id);
  };

  const handleClickShare = () => {
    const newN = CreateNotification("Success", "Shared project");
    dispatch(addNotification(JSON.stringify(newN)));
  };

  const handleClickDelete = async () => {
    try {
      const res = await deleteProject(data.id);

      const newN = CreateNotification("Success", res.message);
      dispatch(addNotification(JSON.stringify(newN)));
      if (onDelete) onDelete(data.id);
    } catch (error: any) {
      console.log(error, "error");
      const newN = CreateNotification(ErrorStatus.Low, error);
      dispatch(addNotification(JSON.stringify(newN)));
    }
  };

  const statisticCurrentHp = data.hp
    ? data.hp + " (+" + (data.hp - data.engineStockHp) + ") "
    : data.engineStockHp;

  const statisticCurrentNm = data.nm
    ? data.nm + " (+" + (data.nm - data.engineStockNm) + ") "
    : data.engineStockNm;

  const currentStage =
    data.stageNumber !== 0 ? "STAGE " + data.stageNumber : "STOCK";

  const handleClickInterestingContent = () => {
    console.log("Add/remove content from intresting", data.id);
  };

  return (
    <>
      {isClient ? (
        <div className="flex flex-col w-full h-full gap-1">
          <ContentMiniNav
            isUserContent={isUserContent}
            createdAt={data.createdAt}
            handleClickInterestingContent={handleClickInterestingContent}
            handleClickShare={handleClickShare}
            handleClickDelete={handleClickDelete}
            title={
              data.carMake +
              " " +
              data.carModel +
              " " +
              data.engineNameAndCapacity
            }
            typeName="Projekt"
            author={data.author}
          />

          <div className="flex flex-col my-1 gap-2">
            <h2 className="text-md opacity-80 mx-3">{data.description}</h2>
            {data.images && <AMPSlider images={data.images} />}
            <div className="px-3 placeholder:py-1 flex items-center justify-left gap-1">
              <span>Etap modyfikacji:</span>
              <span className="font-semibold">{currentStage}</span>
            </div>
            <div
              className={`flex px-3 gap-5 w-full ${data.acc_0_100 && " justify-between"}`}
            >
              <StatisticMiniItem
                title="Moc"
                value={statisticCurrentHp}
                type={EngineParameter.PowerPs}
              />
              <StatisticMiniItem
                title="Moment obrotowy"
                value={statisticCurrentNm}
                type={EngineParameter.TorqueNm}
              />
              <StatisticMiniItem
                title="0-100km/h"
                value={data.acc_0_100}
                type="s"
              />
              <StatisticMiniItem
                title="100-200km/h"
                value={data.acc_100_200}
                type="s"
              />
            </div>
          </div>

          <ContentMiniFooter
            tags={data.tags}
            currentIsLiked={currentIsLiked}
            isUserContent={isUserContent}
            currentLikesCount={currentLikesCount}
            handleClickLike={handleClickLike}
            handleClickShare={handleClickShare}
            type={ContentType.Project}
            actions={
              <Link
                href={`./project/${data.id}`}
                onClick={handleLinkClick}
                className="flex font-semibold items-center text-sm cursor-pointer transition ease-in-out gap-2 border-amp-200/50 hover:border-amp-200/70 dark:border-amp-800/40 dark:hover:border-amp-800/70 border-0 rounded-sm pl-2 pr-1 py-1 opacity-80 hover:opacity-50"
              >
                Zobacz projekt
                <IoIosArrowForward size={iconSizes.base} />
              </Link>
            }
          />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

const StatisticMiniItem = ({
  title,
  value,
  type,
}: {
  title: string;
  value: string | number | null;
  type?: string;
}) => {
  if (value === null) {
    return;
  }

  return (
    <div className="flex flex-col">
      <div className="text-sm font-semibold">
        {value} {type}
      </div>
      <div className="text-xs text-amp-100/90 dark:text-amp-700/90 mt-[-2px]">
        {title}
      </div>
    </div>
  );
};
