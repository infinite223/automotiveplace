"use client";

import {ItemTypes} from "@/app/utils/types";
import React, {FC} from "react";
import {IconFromItemType} from "./IconFromItemType";

interface FooterCarItemProps {
  authorName?: string;
  createdAt: Date;
  isLoading: boolean;
}

export const FooterCarItem: FC<FooterCarItemProps> = ({
  authorName,
  createdAt,
  isLoading,
}) => {
  return (
    <main
      className={`${
        isLoading && "animate-pulse w-[70px] bg-zinc-100 rounded-md h-[20px]"
      } flex text-zinc-600 gap-2`}
    >
      {!isLoading && (
        <p className={`text-[11px]`}>
          {authorName && <div>dodany przez: {authorName}</div>}

          <div className="text-zinc-500">{createdAt.toDateString()}</div>
        </p>
      )}
    </main>
  );
};
