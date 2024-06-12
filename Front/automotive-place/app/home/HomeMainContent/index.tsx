"use client";

import React from "react";
import { contentData } from "../../utils/data/contentData";
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

export const HomeMainContent = () => {
  return (
    <div className="flex w-[1000px] mr-7 items-center h-full max-h-screen overflow-y-auto flex-col scroll-smooth">
      <div className="flex flex-col text-[12px] w-[600px]">
        {contentData.map((content) => (
          <div className="flex w-full h-[400px] border-zinc-900 border-b-[1px] border-t-2 items-center justify-center">
            <ContentSelect content={content} />
          </div>
        ))}
      </div>
    </div>
  );
};

const ContentSelect = ({
  content: { data, type },
}: {
  content: TContentData;
}) => {
  switch (type) {
    case "Project":
      if (isTProject(data)) return <ProjectMiniView data={data} />;
      else return null;

    case "Problem":
      if (isTProblem(data)) return <ProblemMiniView data={data} />;
      else return null;

    case "Post":
      if (isTPost(data)) return <PostMiniView data={data} />;
      else return null;

    case "Spot":
      if (isTSpot(data)) return <SpotMiniView data={data} />;
      else return null;

    case "CarItem":
      if (isTCarItem(data)) return <CarItemMiniView data={data} />;
      else return null;

    default:
      return null;
  }
};
