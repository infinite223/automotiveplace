"use client";

import React from "react";
import Link from "next/link";
import { getPopularProjects } from "@/app/services/project";
import { TBasicPopularProject } from "@/app/utils/types/project";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../loading/LoadingSpinner";
import { EngineParameter } from "@/app/utils/enums";
import AMPImage from "./AMPImage";
import { getProjectImageSrcByFileId } from "@/app/utils/helpers/storageHelper";
import { FiChevronRight } from "react-icons/fi";

export const QUERY_KEY_POPULAR_PROJECTS = "popular-projects";

function AMPPopularProjects() {
  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery<TBasicPopularProject[]>({
    queryKey: [QUERY_KEY_POPULAR_PROJECTS],
    queryFn: getPopularProjects,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading)
    return (
      <div className="flex w-full h-[200px] items-center justify-center opacity-75">
        <LoadingSpinner />
      </div>
    );

  if (isError) return <div>Error loading projects</div>;

  return (
    <div>
      <h2 className="px-2 font-semibold">Popularne projekty</h2>
      <div className="max-h-[85vh] overflow-y-auto custom-scrollbar flex flex-col mt-2">
        {projects?.map((project) => {
          const imgFullPath = getProjectImageSrcByFileId(project.images?.[0]);

          return (
            <Link href={`./project/${project.id}`} key={project.id}>
              <div className="group text-sm flex items-center justify-between p-2 hover:bg-amp-200 rounded-sm cursor-pointer transition">
                <div className="flex gap-3 items-start">
                  <div className="rounded-md w-[90px] h-full bg-amp-50 flex items-center justify-center">
                    <AMPImage
                      src={imgFullPath}
                      alt="Project image 1"
                      width={90}
                      height={70}
                      className="rounded-sm"
                    />
                  </div>

                  <div className="leading-4">
                    <div className="font-semibold">
                      {project.carMake} {project.carModel}
                    </div>
                    <div className="text-xs leading-[15px]">
                      <div>{project.stageName}</div>
                      <div>
                        {EngineParameter.PowerPs}: {project.currentHp}
                      </div>
                      <div>
                        {EngineParameter.TorqueNm}: {project.currentNm}
                      </div>
                    </div>
                  </div>
                </div>

                <FiChevronRight
                  size={20}
                  className="
        text-amp-600
        opacity-0
        group-hover:opacity-100
        group-hover:translate-x-1
        transition-all
        duration-200
        flex-shrink-0
        mr-2
      "
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default AMPPopularProjects;
