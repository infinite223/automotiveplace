"use client";

import React, { FC } from "react";
import { SearchTypes } from "./HomeSearchBar";
import { AnimatePresence, motion } from "framer-motion";

interface IHomeSearchBarFilterView {
  type: SearchTypes;
  showFilterOptions: boolean;
}

export const HomeSearchBarFilterView: FC<IHomeSearchBarFilterView> = ({
  type,
  showFilterOptions,
}) => {
  if (type === SearchTypes.All) return;

  return (
    <AnimatePresence>
      {showFilterOptions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          key="searchBarFilterOption"
          className="flex rounded-md items-start w-[300px] sm:w-[640px] lg:w-[1024px] md:w-[768px] xl:w-[1280px-100px] max-h-screen justify-start p-2 pr-3 pl-3 absolute top-[125px] self-center bg-zinc-200 dark:bg-zinc-900 z-30"
        >
          <div className="flex items-center w-full justify-between">
            <div className="flex w-full gap-3 items-center justify-end">
              {type === SearchTypes.Project && (
                <div className="text-sm font-thin h-[350px]">
                  {/* Filtruj wyszukiwanie projektu */}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
