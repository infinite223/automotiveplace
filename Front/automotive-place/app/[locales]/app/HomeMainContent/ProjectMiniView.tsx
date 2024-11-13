"use client";

import { TBaseProject } from "@/app/utils/types/project";
import { useEffect, useState } from "react";
import { ContentMiniNav } from "./ContentMiniNav";
import { ContentMiniFooter } from "./ContentMiniFooter";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { iconSizes } from "@/app/utils/constants";
import Link from "next/link";

const projectImage = "https://picsum.photos/id/237/200/300";

export const ProjectMiniView = ({ data }: { data: TBaseProject }) => {
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
              className="w-[55%] max-h-[600px]"
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
              <Link
                href={`../project/${data.id}`}
                className="flex items-center text-sm cursor-pointer transition ease-in-out gap-2 border-zinc-700/70 hover:border-zinc-500 border-2 rounded-md pl-2 pr-1 py-1"
              >
                Więcej informacji
                <IoIosArrowForward size={iconSizes.small} />
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
