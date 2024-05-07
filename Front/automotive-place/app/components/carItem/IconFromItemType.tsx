"use client";

import {ItemTypes, TCarItem} from "@/app/utils/types";
import React, {FC, useEffect, useState} from "react";

interface IconFromItemTypeProps {
  itemType: ItemTypes;
}

export const IconFromItemType: FC<IconFromItemTypeProps> = ({itemType}) => {
  const [iconUrl, setIconUrl] = useState("");

  useEffect(() => {
    if (itemType === "Turbo") {
      setIconUrl(
        "https://cdn1.iconfinder.com/data/icons/car-parts-glyph-1/64/Turbo-1024.png"
      );
    }
  }, []);

  return (
    <img
      className="w-10 h-10 rounded-sm"
      alt="car item tyoe image"
      src={iconUrl}
    />
  );
};
