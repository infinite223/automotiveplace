"use client";

import {TCarItem} from "@/app/utils/types";
import React, {FC} from "react";
import {HeaderCarItem} from "./HeaderCarItem";
import {FooterCarItem} from "./FooterCarItem";

interface CarItemProps {
  data: TCarItem;
  lineClamp?: 1 | 2 | 3 | 4;
  addCarItemTailwindStyles?: string;
  isLoading: boolean;
}

export const CarItem: FC<CarItemProps> = ({
  data,
  lineClamp = 3,
  addCarItemTailwindStyles,
  isLoading,
}) => {
  return (
    <main
      className={`${
        isLoading && "animate-pulse "
      } flex rounded-md flex-col p-2 gap-1.5 shadow-md ${addCarItemTailwindStyles}`}
    >
      <HeaderCarItem
        itemType={data.itemType}
        name={data.name}
        isLoading={isLoading}
      />
      <div
        className={`${"line-clamp-" + lineClamp} leading-4 text-sm ${
          isLoading && "w-full bg-zinc-100 rounded-md h-[50px]"
        }`}
      >
        {!isLoading && data.description}
      </div>
      <FooterCarItem
        isLoading={isLoading}
        authorName={data.author?.name}
        createdAt={data.createdAt}
      />
    </main>
  );
};
