"use client";

import React, { useEffect, useState } from "react";
import { TContentData } from "../../../utils/types";
import { isTProject } from "../../../utils/types/project";
import { ProjectMiniView } from "./ProjectMiniView";
import { isTPost } from "@/app/utils/types/post";
import { PostMiniView } from "./PostMiniView";
import { ProblemMiniView } from "./ProblemMiniView";
import { isTProblem } from "@/app/utils/types/problem";
import { isTSpot } from "@/app/utils/types/spot";
import { SpotMiniView } from "./SpotMiniView";
import { CarItemMiniView } from "./CarItemMiniView";
import { isTCarItem } from "@/app/utils/types/carItem";
import { getMainContentDataForUser } from "@/app/services/content";
import { LoadingMiniView } from "./LoadingMiniView";

export const HomeMainContent = () => {
  const [_content, setContent] = useState<TContentData[] | []>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await getMainContentDataForUser();
      setContent(res.data);
      setLoading(false);
    };

    getData();
  }, []);
  // mr-[140px] max-lg:mr-0 max-2xl:mr-[80px] max-xl:mr-[75px]
  return (
    <div className="flex w-full items-center lg:pr-[150px] h-full max-h-screen custom-scrollbar overflow-y-auto flex-col scroll-smooth">
      <div className="flex flex-col text-[12px] w-full lg:w-[550px]">
        {!isLoading &&
          _content.map((content) => {
            return (
              <div
                key={content.data.id}
                className="flex w-full border-amp-300/30 dark:border-amp-700/30 border-b-[1px] border-t-0 items-center justify-center"
              >
                <ContentSelect content={content} />
              </div>
            );
          })}

        {isLoading && (
          <>
            <LoadingMiniView />
            <LoadingMiniView />
            <LoadingMiniView />
            <LoadingMiniView />
            <LoadingMiniView />
          </>
        )}
      </div>
    </div>
  );
};

export const ContentSelect = ({
  content: { data, type },
}: {
  content: TContentData;
}) => {
  const errorText = " data is not valid";
  switch (type) {
    case "Project":
      const contentDataIsProject = isTProject(data);

      if (contentDataIsProject) {
        return <ProjectMiniView data={data} />;
      }

      console.error(type, errorText);
      return null;
    case "Problem":
      const contentDataIsProblem = isTProblem(data);

      if (contentDataIsProblem) {
        return <ProblemMiniView data={data} />;
      }

      console.error(type, errorText);
      return null;
    case "Post":
      const contentDataIsPost = isTPost(data);

      if (contentDataIsPost) {
        return <PostMiniView data={data} />;
      }

      console.error(type, errorText);
      return null;
    case "Spot":
      const contentDataIsSpot = isTSpot(data);

      if (contentDataIsSpot) {
        return <SpotMiniView data={data} />;
      }

      console.error(type, errorText);
      return null;
    case "CarItem":
      const contentDataIsCarItem = isTCarItem(data);

      if (contentDataIsCarItem) {
        return <CarItemMiniView data={data} />;
      }

      console.error(type, errorText);
      return null;
    default:
      return null;
  }
};
