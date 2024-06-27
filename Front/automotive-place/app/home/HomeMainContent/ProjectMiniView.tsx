"use client";

import { TProject } from "@/app/utils/types/project";
import { useEffect, useState } from "react";
import { ContentMiniNav } from "./ContentMiniNav";

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
        <div className="flex flex-col w-full h-full py-2">
          <ContentMiniNav
            createdAt={data.createdAt}
            title={data.carMake + " " + data.model}
            type="Project"
            author={data.author}
          />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
