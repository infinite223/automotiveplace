"use client";

import { TBasicProject } from "@/app/utils/types/project";
import { useEffect, useState } from "react";
import { ContentMiniNav } from "./ContentMiniNav";
import { ContentMiniFooter } from "./ContentMiniFooter";
import { IoIosArrowForward } from "react-icons/io";
import { iconSizes } from "@/app/utils/constants";
import Link from "next/link";
import AMPSlider from "@/app/components/shared/AMPSlider";

export const ProjectMiniView = ({
  data,
  isUserContent = false,
}: {
  data: TBasicProject;
  isUserContent: boolean;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!data) {
    return null;
  }
  const handleLinkClick = () => {
    sessionStorage.setItem("lastClickedId", data.id);
  };

  const statisticCurrentHp = data.hp
    ? data.hp + " (+" + (data.hp - data.engineStockHp) + ") "
    : data.engineStockHp;

  const statisticCurrentNm = data.nm
    ? data.nm + " (+" + (data.nm - data.engineStockNm) + ") "
    : data.engineStockNm;

  return (
    <>
      {isClient ? (
        <div className="flex flex-col w-full h-full gap-1">
          <ContentMiniNav
            isUserContent={isUserContent}
            createdAt={data.createdAt}
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
            <h2 className="text-md opacity-80">{data.description}</h2>
            {data.images && <AMPSlider images={data.images} />}

            <div
              className={`flex gap-5 w-full ${data.acc_0_100 && " justify-between"}`}
            >
              <StatisticMiniItem title="Etap modyfikacji" value="STAGE 1" />
              <StatisticMiniItem
                title="Moc"
                value={statisticCurrentHp}
                type="HP"
              />
              <StatisticMiniItem
                title="Moment obrotowy"
                value={statisticCurrentNm}
                type="NM"
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
            contentId={data.id}
            isLikedByAuthUser={data.isLikedByAuthUser}
            likesCount={data.likesCount}
            type="Project"
            actions={
              <Link
                href={`../project/${data.id}`}
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
