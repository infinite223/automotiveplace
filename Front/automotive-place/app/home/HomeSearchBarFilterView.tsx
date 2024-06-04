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
    <div className="flex items-center h-full max-h-screen overflow-y-auto flex-col scroll-smooth">
      <div className="flex rounded-md items-start justify-start p-2 pr-3 pl-3 absolute bottom-[-125px] self-center bg-zinc-900 z-30">
        <div className="flex items-center w-full justify-between">
          <div className="flex w-full gap-3 items-center justify-end">
            {type === SearchTypes.Project && (
              <div className="text-sm font-thin p-2">
                Filtruj wyszukiwanie projektu
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
