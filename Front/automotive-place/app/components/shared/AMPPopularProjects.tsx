import useFetchData from "@/app/hooks/useFetchData";
import { getPopularProjects } from "@/app/services/project";
import { TBasicPopularProject } from "@/app/utils/types/project";
import React from "react";
import Link from "next/link";

function AMPPopularProjects() {
  const { data, loading, error } = useFetchData<TBasicPopularProject[]>(() =>
    getPopularProjects()
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading projects</div>;

  return (
    <div className="">
      <h2 className="px-2">Popularne projekty</h2>
      <div className="max-h-[85vh] overflow-y-auto custom-scrollbar flex flex-col mt-4 ">
        {data?.map((project) => (
          <Link
            href={`../project/${project.id}`}
            key={project.carMake + project.carModel}
          >
            <div className="text-sm flex flex-wrap p-2 hover:bg-amp-100 rounded-sm cursor-pointer ">
              <div className="flex gap-3 items-start">
                <div className="rounded-md w-[90px] h-full bg-amp-50 flex items-center justify-center">
                  <img
                    width={90}
                    src={project.images[0]}
                    alt={`Project image 1`}
                  />
                </div>
                <div>
                  <div className="font-semibold">
                    {project.carMake} {project.carModel}
                  </div>
                  <div>Stage: {project.stageNumber}</div>
                  <div> HP: {project.currentHp}</div>
                  <div> NM: {project.currentNm}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AMPPopularProjects;
