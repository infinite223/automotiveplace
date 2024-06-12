"use client";

import React from "react";
import { contentData } from "../utils/data/contentData";
import { TContentData, TContentTypes } from "../utils/types";
import { TProject, isTProject } from "../utils/types/project";

export const HomeMainContent = () => {
  const content = contentData;
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
  console.log(isTProject(data), "tutaj");
  switch (type) {
    case "Project":
      if (isTProject(data)) return <ProjectMiniView data={data} />;
      else return null;
    default:
      return null;
  }
};

const ProjectMiniView = ({ data }: { data: TProject }) => {
  return (
    <div className="flex">
      <nav>
        <h2>
          {data.carMake} " " {data.model}
        </h2>
      </nav>
      <p>{data.engineStockHp}</p>
    </div>
  );
};
