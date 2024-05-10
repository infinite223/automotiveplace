"use client";

import {TCarItem, TTableView} from "@/app/utils/types";
import React, {FC} from "react";
import {HeaderCarItem} from "./HeaderCarItem";
import {AMPFooterItem} from "../shared/AMPFooterItem";

interface CarItemProps {
  data: TCarItem;
  lineClamp?: 1 | 2 | 3 | 4;
  addCarItemTailwindStyles?: string;
  isLoading: boolean;
  tableView: TTableView;
}

export const CarItem: FC<CarItemProps> = ({
  data,
  lineClamp = 3,
  addCarItemTailwindStyles,
  isLoading,
  tableView,
}) => {
  const lineClampsVariants: Record<number, string> = {
    2: "line-clamp-2",
    3: "line-clamp-3",
    4: "line-clamp-4",
  };

  const handleClickLike = () => {
    alert(`Like ${data.id}`);
  };

  return (
    <main
      className={`${
        isLoading && "animate-pulse "
      } flex rounded-md p-2 gap-1.5 shadow-md ${addCarItemTailwindStyles} ${
        tableView === "rows" ? "w-full grid grid-cols-4" : "flex-col"
      }`}
    >
      <HeaderCarItem
        itemType={data.itemType}
        name={data.name}
        isLoading={isLoading}
        tableView={tableView}
      />
      <div
        className={`${lineClampsVariants[lineClamp]} ${
          tableView === "rows" && "col-span-2"
        } leading-4 text-[12px] ${
          isLoading && "w-full bg-zinc-100 rounded-md h-[50px]"
        }`}
      >
        {!isLoading ? (
          data.description
        ) : (
          <span className="text-zinc-100">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            feugiat iaculis elementum.
          </span>
        )}
      </div>
      <AMPFooterItem
        isLoading={isLoading}
        authorName={data.author?.name}
        createdAt={data.createdAt}
        likes={data.likes}
        forSell={data.forSell}
        inUse={data.inUse}
        likesCount={data.likesCount}
        handleClickLike={handleClickLike}
        tableView={tableView}
      />
    </main>
  );
};
