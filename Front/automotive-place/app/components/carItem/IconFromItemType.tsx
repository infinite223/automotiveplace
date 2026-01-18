"use client";

import React, { FC } from "react";
import { ITEM_TYPE_ICON_MAP, ItemTypes } from "@/app/utils/types/carItem";

interface IconFromItemTypeProps {
  itemType: ItemTypes;
  isLoading: boolean;
}

export const IconFromItemType: FC<IconFromItemTypeProps> = ({
  itemType,
  isLoading,
}) => {
  const Icon = ITEM_TYPE_ICON_MAP[itemType];

  if (isLoading) {
    return (
      <div className="w-8 h-8 rounded-full bg-amp-800 dark:bg-amp-100 animate-pulse" />
    );
  }

  if (!Icon) return null;

  return (
    <Icon
      className="w-7 h-7 text-zinc-800 dark:text-zinc-100"
      aria-label={itemType}
    />
  );
};
