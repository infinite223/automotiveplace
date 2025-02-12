import useFetchData from "@/app/hooks/useFetchData";
import { getPopularProjects } from "@/app/services/project";
import { TBasicPopularProject } from "@/app/utils/types/project";
import React from "react";

function AMPPopularProjects() {
  const { data, loading, error } = useFetchData<TBasicPopularProject[]>(() =>
    getPopularProjects()
  );

  return (
    <div>
      <h2 className="">Popularne projekty</h2>
    </div>
  );
}

export default AMPPopularProjects;
