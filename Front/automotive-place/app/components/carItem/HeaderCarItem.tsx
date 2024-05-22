"use client";

import {ItemTypes, TTableView} from "@/app/utils/types";
import React, {FC, useEffect, useState} from "react";
import {IconFromItemType} from "./IconFromItemType";
import {AMPMenu, TMenuItem} from "../shared/AMPMenu";
import {BiEdit} from "react-icons/bi";
import {removeCarItem} from "@/app/services/carItem";

interface IHeaderCarItemProps {
  itemType: ItemTypes;
  name: string;
  isLoading: boolean;
  tableView: TTableView;
  isMyCarElement: boolean;
  id: string;
}

const _options: TMenuItem[] = [
  {
    name: "Napisz do twórcy",
    handleClick: () => alert("navigate to chat"),
  },
  {
    name: "Zgłoś element",
    handleClick: () => alert("navigate to report"),
  },
];

const getOptionsMenu = (isMy: boolean, id: string) => {
  let customOptions: TMenuItem[] = [];
  const additionalOption = {
    name: "Edytuj",
    handleClick: () => alert("navigate to edit"),
    icon: <BiEdit size={17} />,
  };

  const additionalOption_2 = {
    name: "Usuń element",
    handleClick: () => removeCarItem(id),
  };

  if (isMy) {
    customOptions = [_options[1], additionalOption];
  } else {
    customOptions = [..._options, additionalOption_2];
  }

  return customOptions;
};

export const HeaderCarItem: FC<IHeaderCarItemProps> = ({
  itemType,
  name,
  isLoading,
  tableView,
  isMyCarElement = false,
  id,
}) => {
  const [options, setOptions] = useState<TMenuItem[]>([]);

  useEffect(() => {
    if (!isLoading) {
      setOptions(getOptionsMenu(isMyCarElement, id));
    }
  }, [isLoading]);

  return (
    <main
      className={`flex text-custom-primary gap-2 items-center ${
        isLoading && "animate-pulse"
      }`}
    >
      <AMPMenu isLoading={isLoading} items={options} />
      <div className="flex gap-2">
        <IconFromItemType itemType={itemType} isLoading={isLoading} />
        <div
          className={`${isLoading && "bg-custom-secend rounded-md w-[70px]"}`}
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
