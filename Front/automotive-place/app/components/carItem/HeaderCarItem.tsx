"use client";

import {ItemTypes, TTableView} from "@/app/utils/types";
import React, {FC} from "react";
import {IconFromItemType} from "./IconFromItemType";

interface HeaderCarItemProps {
  itemType: ItemTypes;
  name: string;
  isLoading: boolean;
  tableView: TTableView;
}

export const HeaderCarItem: FC<HeaderCarItemProps> = ({
  itemType,
  name,
  isLoading,
  tableView,
}) => {
  return (
    <main
      className={`flex text-zinc-900 gap-2 ${isLoading && "animate-pulse"}`}
    >
      <IconFromItemType itemType={itemType} isLoading={isLoading} />

      <div className={`${isLoading && "bg-zinc-100 rounded-md w-[70px]"}`}>
        {!isLoading && (
          <>
            <h3 className="font-bold">{name}</h3>
            <p className="text-sm">{itemType}</p>
          </>
        )}
      </div>
    </main>
  );
};
