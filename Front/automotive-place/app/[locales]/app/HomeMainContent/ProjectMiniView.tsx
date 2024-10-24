"use client";

import { TProject } from "@/app/utils/types/project";
import { useEffect, useState } from "react";
import { ContentMiniNav } from "./ContentMiniNav";
import { ContentMiniFooter } from "./ContentMiniFooter";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { iconSizes } from "@/app/utils/constants";

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
            typeName="Projekt"
            author={data.author}
          />

          <div className="flex mt-1">
            <Image
              alt="project-image"
              src={projectImage}
              className="w-[55%]"
              width={200}
              height={200}
            />
            {/* main content, images, stages... */}
          </div>

          <div>{/* <ContentMiniFooter /> likes, tags...*/}</div>
          <ContentMiniFooter
            isLikedByAuthUser={false}
            likesCount={12}
            type="Project"
            actions={
              <div className="flex items-center text-xs cursor-pointer transition ease-in-out gap-2 bg-zinc-700/70 hover:bg-zinc-700 rounded-md pl-2 pr-1 py-1">
                Więcej informacji
                <IoIosArrowForward size={iconSizes.small} />
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
