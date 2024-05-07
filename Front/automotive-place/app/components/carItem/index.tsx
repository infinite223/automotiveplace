"use client";

import {TCarItem} from "@/app/utils/types";
import React, {FC} from "react";
import {HeaderCarItem} from "./HeaderCarItem";

interface CarItemProps {
  data: TCarItem;
}

export const CarItem: FC<CarItemProps> = ({data}) => {
  return (
    <main className="flex rounded-md flex-col p-2 shadow-md min-w-[200px]">
      <HeaderCarItem itemType={data.itemType} name={data.name} />
      <div></div>
    </main>
  );
};
