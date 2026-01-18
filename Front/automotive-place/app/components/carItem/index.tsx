"use client";

import { TTableView } from "@/app/utils/types";
import React, { FC, useState } from "react";
import { HeaderCarItem } from "./HeaderCarItem";
import { AMPFooterItem } from "../shared/AMPFooterItem";
import { TCarItemBaseOnProject } from "@/app/utils/types/carItem";

interface CarItemProps {
  data: TCarItemBaseOnProject;
  lineClamp?: 1 | 2 | 3 | 4;
  addCarItemTailwindStyles?: string;
  isLoading: boolean;
  tableView: TTableView;
  showFullView?: boolean;
}

export const CarItem: FC<CarItemProps> = ({
  data,
  lineClamp = 3,
  addCarItemTailwindStyles,
  isLoading,
  tableView,
  showFullView = true,
}) => {
  const isMyCarElement = true;

  const [localData, setLocalData] = useState(data);
  const lineClampsVariants: Record<number, string> = {
    2: "line-clamp-2",
    3: "line-clamp-3",
    4: "line-clamp-4",
  };

  const handleClickLike = () => {
    // send req to API
    // update state
    // if (!isMyCarElement) {
    //   if (localData.isLikedByAuthUser) {
    //     setLocalData({
    //       ...localData,
    //       isLikedByAuthUser: false,
    //     });
    //   } else {
    //     setLocalData({
    //       ...localData,
    //       isLikedByAuthUser: true,
    //     });
    //   }
    // }
  };

  return (
    <main
      className={`${
        isLoading && "animate-pulse "
      } flex select-none rounded-md p-2 gap-1.5  ${addCarItemTailwindStyles} ${
        tableView === "rows" ? "w-full grid grid-cols-4" : "flex-col"
      }`}
    >
      <HeaderCarItem
        itemType={localData.itemType}
        id={data.id}
        isMyCarElement={isMyCarElement}
        name={localData.name}
        isLoading={isLoading}
        tableView={tableView}
      />
      {showFullView && (
        <>
          <div
            className={`${lineClampsVariants[lineClamp]} ${
              tableView === "rows" && "col-span-2"
            } leading-4 text-[12px] ${
              isLoading &&
              "w-full bg-amp-800 dark:bg-amp-100 rounded-md h-[50px]"
            }`}
          >
            {!isLoading && data.description}
          </div>
          <AMPFooterItem
            isLoading={isLoading}
            handleClickLike={handleClickLike}
            data={{ createdAt: new Date(), likesCount: 21 }}
            tableView={tableView}
            isMyElement={isMyCarElement}
          />
        </>
      )}
    </main>
  );
};
