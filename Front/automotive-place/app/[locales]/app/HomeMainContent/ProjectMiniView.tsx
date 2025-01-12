"use client";

import { TBasicProject } from "@/app/utils/types/project";
import { useEffect, useState } from "react";
import { ContentMiniNav } from "./ContentMiniNav";
import { ContentMiniFooter } from "./ContentMiniFooter";
import { IoIosArrowForward } from "react-icons/io";
import { iconSizes } from "@/app/utils/constants";
import Link from "next/link";
import AMPSlider from "@/app/components/shared/AMPSlider";

const projectImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS68Gy62kKm-z60Pe_y32-kfkuaEmprwzvfKXfM_zhLiiC4ulIna5DlScrbubsjMtfzA9w&usqp=CAU";
const projectImage2 =
  "data:image/jpeg;base64,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";

const projectImage3 =
  "https://iwekcars.pl/wp-content/uploads/2024/04/DSC_6580-2-1024x684.jpg";

const projectImages = [projectImage, projectImage2, projectImage3];

export const ProjectMiniView = ({ data }: { data: TBasicProject }) => {
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

  return (
    <>
      {isClient ? (
        <div className="flex flex-col w-full h-full gap-1">
          <ContentMiniNav
            createdAt={data.createdAt}
            title={data.carMake + " " + data.carModel}
            typeName="Projekt"
            author={data.author}
          />

          <div className="flex justify-between my-1">
            <div className="flex flex-col gap-1">
              <StatisticMiniItem title="Etap modyfikacji" value="STAGE 1" />
              <StatisticMiniItem title="Moc" value={data.hp} type="HP" />
              <StatisticMiniItem
                title="Moment obrotowy"
                value={data.nm}
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
            <AMPSlider images={projectImages} width={300} height={200} />
          </div>

          <ContentMiniFooter
            tags={data.tags}
            isLikedByAuthUser={false}
            likesCount={12}
            type="Project"
            actions={
              <Link
                href={`../project/${data.id}`}
                onClick={handleLinkClick}
                className="flex font-semibold items-center text-sm cursor-pointer transition ease-in-out gap-2 border-amp-200/50 hover:border-amp-200/70 dark:border-amp-800/40 dark:hover:border-amp-800/70 border-0 rounded-sm pl-2 pr-1 py-1 hover:text-amp-500"
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
  value: string | number;
  type?: string;
}) => {
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
