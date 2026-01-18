"use client";

import { TTableView } from "@/app/utils/types";
import React, { FC } from "react";
import { IconFromItemType } from "./IconFromItemType";
import { AMPMenu } from "../shared/AMPMenu";
import { removeCarItem } from "@/app/services/carItem";
import { ItemTypes } from "@/app/utils/types/carItem";
import { useDispatch } from "react-redux";
import { addNotification } from "@/lib/features/notifications/notificationsSlice";

interface IHeaderCarItemProps {
  itemType: ItemTypes;
  name: string;
  isLoading: boolean;
  tableView: TTableView;
  isMyCarElement: boolean;
  id: string;
}

export const HeaderCarItem: FC<IHeaderCarItemProps> = ({
  itemType,
  name,
  isLoading,
  tableView,
  isMyCarElement = false,
  id,
}) => {
  const dispatch = useDispatch();

  return (
    <main
      className={`flex dark:text-amp-900 gap-2 items-center ${
        isLoading && "animate-pulse"
      }`}
    >
      <AMPMenu
        isLoading={isLoading}
        items={[
          {
            isDisable: isMyCarElement,
            name: "Napisz do twórcy",
            handleClick: () => alert("navigate to chat"),
          },
          {
            name: "Zgłoś element",
            handleClick: () => alert("navigate to report"),
          },
          {
            isDisable: !isMyCarElement,
            name: "Usuń element",
            handleClick: async () => {
              const result = await removeCarItem(id);

              if (result.notification) {
                dispatch(addNotification(JSON.stringify(result.notification)));
              }
            },
          },
        ]}
      />
      <div className="flex gap-3">
        <IconFromItemType itemType={itemType} isLoading={isLoading} />
        <div
          className={`${isLoading && "bg-amp-800 dark:bg-amp-100 rounded-md w-[70px]"}`}
        >
          {!isLoading && (
            <>
              <h3 className="font-bold">{name}</h3>
              <p className="text-[10px] mt-[-5px]">{itemType}</p>
            </>
          )}
        </div>
      </div>
    </main>
  );
};
