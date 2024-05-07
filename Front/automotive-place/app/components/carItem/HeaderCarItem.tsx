"use client";

import {ItemTypes} from "@/app/utils/types";
import React, {FC} from "react";
import {IconFromItemType} from "./IconFromItemType";

interface HeaderCarItemProps {
  itemType: ItemTypes;
  name: string;
}

export const HeaderCarItem: FC<HeaderCarItemProps> = ({itemType, name}) => {
  return (
    <main className="flex text-zinc-900 gap-2">
      <IconFromItemType itemType={itemType} />

      <div>
        <h3 className="font-bold">{name}</h3>
        <p className="text-sm">{itemType}</p>
      </div>
    </main>
  );
};
