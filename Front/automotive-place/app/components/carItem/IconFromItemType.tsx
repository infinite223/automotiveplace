"use client";

import {ItemTypes, TCarItem} from "@/app/utils/types";
import React, {FC, useEffect, useState} from "react";

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
    }
  }, []);

  return (
    <div className={`${isLoading && "bg-zinc-100 w-7 h-7 rounded-full"}`}>
      {!isLoading && (
        <>
          <img
            className={`${
              isLoading && "bg-zinc-100 rounded-md"
            } w-10 h-10 rounded-sm`}
            alt="car item tyoe image"
            src={iconUrl}
          />
        </>
      )}
    </div>
  );
};
