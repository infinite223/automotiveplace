"use client";

import { ItemTypes } from "@/app/utils/types/carItem";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

interface IconFromItemTypeProps {
  itemType: ItemTypes;
  isLoading: boolean;
}

export const IconFromItemType: FC<IconFromItemTypeProps> = ({
  itemType,
  isLoading,
}) => {
  const [iconUrl, setIconUrl] = useState("");

  useEffect(() => {
    if (itemType === "Turbo") {
      setIconUrl(
        "https://cdn1.iconfinder.com/data/icons/car-parts-glyph-1/64/Turbo-1024.png"
      );
    } else if (itemType === "Audio") {
      setIconUrl(
        "https://cdn2.iconfinder.com/data/icons/squircle-ui/32/Sound-1024.png"
      );
    }
  }, [itemType]);

  return (
    <div
      className={`${isLoading && "bg-amp-800 dark:bg-amp-100 w-7 h-7 rounded-full"}`}
    >
      {!isLoading && (
        <>
          <Image
            className={`${
              isLoading && "bg-amp-800 dark:bg-amp-100 rounded-md"
            } w-8 h-8 rounded-sm dark:invert`}
            alt="car item tyoe image"
            src={iconUrl}
            width={10}
            height={10}
          />
        </>
      )}
    </div>
  );
};
