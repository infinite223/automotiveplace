"use client";

import React, { FC } from "react";
import { SearchTypes } from "./HomeSearchBar";

interface IHomeSearchBarFilterView {
  type: SearchTypes;
}

export const HomeSearchBarFilterView: FC<IHomeSearchBarFilterView> = ({
  type,
}) => {
  if (type === SearchTypes.All) return;

  return (
    <div className="flex rounded-md items-start w-[300px] sm:w-[640px] lg:w-[1024px] md:w-[768px] xl:w-[1280px] max-h-screen justify-start p-2 pr-3 pl-3 absolute top-[125px] self-center bg-zinc-200 dark:bg-zinc-900 z-30">
      <div className="flex items-center w-full justify-between">
        <div className="flex w-full gap-3 items-center justify-end">
          {type === SearchTypes.Project && (
            <div className="text-sm font-thin h-[350px]">
              {/* Filtruj wyszukiwanie projektu */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
