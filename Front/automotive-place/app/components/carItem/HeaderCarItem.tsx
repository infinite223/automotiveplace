"use client";

import {ItemTypes, TTableView} from "@/app/utils/types";
import React, {FC, useState} from "react";
import {IconFromItemType} from "./IconFromItemType";
import {BsThreeDotsVertical} from "react-icons/bs";
import {AMPMenu} from "../shared/AMPMenu";

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
      className={`flex text-zinc-900 gap-2 items-center ${
        isLoading && "animate-pulse"
      }`}
    >
      <AMPMenu
        isLoading={isLoading}
        items={[
          {
            name: "Napisz do twórcy",
            handleClick: () => alert("navigate to chat"),
          },
          {
            name: "Zgłoś element",
            handleClick: () => alert("navigate to report"),
          },
        ]}
      />
      <div className="flex gap-2">
        <IconFromItemType itemType={itemType} isLoading={isLoading} />
        <div className={`${isLoading && "bg-zinc-100 rounded-md w-[70px]"}`}>
          {!isLoading && (
            <>
              <h3 className="font-bold">{name}</h3>
              <p className="text-[10px] mt-[-5px]">{itemType}</p>
            </>
          )}
        </div>
      </div>
      ,
    </main>
  );
};
