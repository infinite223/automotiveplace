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
  "https://www.autocentrum.pl/YWNoLTEudjYvDTpnag57ImxVbnskFnQxJwMpeyYUK3o4Cj4nLBo3eHheLm0jF2hifQx-bH1NaWArC3gyIEA_ZWEJIyYhWDQiPRstOiJYLz5jAi03LVhoeSQfK3Y4";

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
