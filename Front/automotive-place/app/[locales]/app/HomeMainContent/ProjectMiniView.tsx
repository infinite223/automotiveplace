"use client";

import { TBasicProject } from "@/app/utils/types/project";
import { useEffect, useState } from "react";
import { ContentMiniNav } from "./ContentMiniNav";
import { ContentMiniFooter } from "./ContentMiniFooter";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { iconSizes } from "@/app/utils/constants";
import Link from "next/link";

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
    console.log("handleLinkClick", data.id);
    sessionStorage.setItem("lastClickedId", data.id);
  };

  return (
    <>
      {isClient ? (
        <div
          className="flex flex-col w-full h-full gap-1"
          id={`content-${data.id}`}
        >
          <ContentMiniNav
            createdAt={data.createdAt}
            title={data.carMake + " " + data.carModel}
            typeName="Projekt"
            author={data.author}
          />

          <div className="flex mt-1 justify-between">
            <Image
              alt="project-image"
              src={projectImage}
              className="w-[55%] max-h-[600px]"
              width={200}
              height={200}
            />
            <div className="flex flex-col gap-2 text-right">
              <div>STAGE 1</div>
              <div>450 HP</div>
              <div>550 NM</div>
              <div>5s 0-100km/h</div>
              <div>13s 100-200km/h</div>
            </div>
            {/* main content, images, stages... */}
          </div>
          {/* <div className="flex items-center w-full">
            {}
          </div> */}
          <div>{/* <ContentMiniFooter /> likes, tags...*/}</div>
          <ContentMiniFooter
            isLikedByAuthUser={false}
            likesCount={12}
            type="Project"
            actions={
              <Link
                href={`../project/${data.id}`}
                onClick={handleLinkClick}
                className="flex font-semibold items-center text-sm cursor-pointer transition ease-in-out gap-2 border-amp-200/50 hover:border-amp-200/70 dark:border-amp-800/40 dark:hover:border-amp-800/70 border-0 rounded-sm pl-2 pr-1 py-1"
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
