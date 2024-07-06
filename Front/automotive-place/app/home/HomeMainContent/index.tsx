"use client";

import React, { useEffect, useState } from "react";
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
import { getMainContentDataForUser } from "@/app/services/content";

export const HomeMainContent = ({
  contentData,
}: {
  contentData: TContentData[];
}) => {
  const [_content, setContent] = useState<TContentData[] | []>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await getMainContentDataForUser();
      setContent(res.data);
      console.log(res, "tutaj");
      setLoading(false);
    };

    getData();
  }, []);

  console.log(_content);
  if (isLoading) return <p className="text-sm font-thin">Loading...</p>;

  return (
    <div className="flex w-[1000px] max-2xl:mr-[80px] mr-[160px] items-center h-full max-h-screen custom-scrollbar overflow-y-auto flex-col scroll-smooth">
      <div className="flex flex-col text-[12px] w-[600px]">
        {_content.map((content) => {
          return (
            <div
              key={content.data.id}
              className="flex w-full border-zinc-900 border-b-[1px] border-t-0 items-center justify-center"
            >
              <ContentSelect content={content} />
            </div>
          );
        })}
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
      console.log(data, type, "jalooo ", isTProject(data));

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
