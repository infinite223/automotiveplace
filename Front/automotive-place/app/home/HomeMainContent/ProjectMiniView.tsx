"use client";

import { TProject } from "@/app/utils/types/project";
import { useEffect, useState } from "react";
import { ContentMiniNav } from "./ContentMiniNav";
import { ContentMiniFooter } from "./ContentMiniFooter";
import { IoIosArrowForward } from "react-icons/io";

const projectImage =
  "https://cylindersi.pl/wp-content/uploads/2022/06/Dodge-Charger-Scat-Pack-sylwetka.jpg";

export const ProjectMiniView = ({ data }: { data: TProject }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!data) {
    return null;
  }

  return (
    <>
      {isClient ? (
        <div className="flex flex-col w-full h-full py-2 gap-1">
          <ContentMiniNav
            createdAt={data.createdAt}
            title={data.carMake + " " + data.carModel}
            type="Project"
            author={data.author}
          />

          <div className="flex mt-1">
            <img alt="project-image" src={projectImage} className="w-[55%]" />
            {/* main content, images, stages... */}
          </div>

          <div>{/* <ContentMiniFooter /> likes, tags...*/}</div>
          <ContentMiniFooter
            isLikedByAuthUser={false}
            likesCount={12}
            type="Project"
            actions={
              <div className="flex items-center text-[12px] cursor-pointer transition ease-in-out gap-2 bg-zinc-700/30 hover:bg-zinc-700 rounded-full px-3 py-1">
                Zobacz projekt
                <IoIosArrowForward size={15} />
              </div>
            }
          />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
