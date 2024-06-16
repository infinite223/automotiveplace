"use client";

import React from "react";
import { TContentData } from "../../utils/types";
import { isTProject } from "../../utils/types/project";
import { ProjectMiniView } from "./ProjectMiniView";
import { isTPost } from "@/app/utils/types/post";
import { PostMiniView } from "./PostMiniView";
import { ProblemMiniView } from "./ProblemMiniView";
import { isTProblem } from "@/app/utils/types/problem";
import { isTSpot } from "@/app/utils/types/spot";
import { SpotMiniView } from "./SpotMiniView";
import { CarItemMiniView } from "./CarItemMiniView";
import { isTCarItem } from "@/app/utils/types/carItem";

export const HomeMainContent = ({
  contentData,
}: {
  contentData: TContentData[];
}) => {
  return (
    <div className="flex w-[1000px] mr-[77px] items-center h-full max-h-screen overflow-y-auto flex-col scroll-smooth">
      <div className="flex flex-col text-[12px] w-[600px]">
        {contentData.map((content) => (
          <div
            key={content.data.id}
            className="flex w-full h-[400px] border-zinc-900 border-b-[1px] border-t-2 items-center justify-center"
          >
            <ContentSelect content={content} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const ContentSelect = ({
  content: { data, type },
}: {
  content: TContentData;
}) => {
  switch (type) {
    case "Project":
      return isTProject(data) ? <ProjectMiniView data={data} /> : null;
    case "Problem":
      return isTProblem(data) ? <ProblemMiniView data={data} /> : null;
    case "Post":
      return isTPost(data) ? <PostMiniView data={data} /> : null;
    case "Spot":
      return isTSpot(data) ? <SpotMiniView data={data} /> : null;
    case "CarItem":
      return isTCarItem(data) ? <CarItemMiniView data={data} /> : null;
    default:
      return null;
  }
};
