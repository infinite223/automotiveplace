"use client";

import { TCarItemLikes, TTableView } from "@/app/utils/types";
import React, { FC } from "react";
import { FaHeart } from "react-icons/fa";
import { MdOutlineAttachMoney, MdOutlineMoneyOff } from "react-icons/md";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import moment from "moment";

interface AMPFooterItemProps {
  isLoading: boolean;
  tableView: TTableView;
  handleClickLike?: () => void;
  isMyElement?: boolean;

  data: {
    authorName?: string;
    createdAt: Date;
    likes?: TCarItemLikes;
    forSell?: boolean;
    inUse?: boolean;
    likesCount: number;
    isLikedByAuthUser?: boolean;
  };
}

export const AMPFooterItem: FC<AMPFooterItemProps> = ({
  isLoading,
  handleClickLike,
  tableView,
  isMyElement,
  data: {
    createdAt,
    authorName,
    forSell,
    inUse,
    likes,
    isLikedByAuthUser,
    likesCount,
  },
}) => {
  return (
    <main
      className={`${
        isLoading && "animate-pulse"
      } flex text-zinc-600 gap-2 items-center ${
        tableView === "rows" ? "flex-row-reverse" : "justify-between"
      } `}
    >
      <div
        className={`flex items-center gap-1 ${
          isLoading && "w-[70px] bg-amp-800 dark:bg-amp-100 rounded-md h-[20px]"
        }`}
      >
        {!isLoading && (
          <div
            className={`flex rounded-md bg-amp-900 dark:bg-amp-0h-min gap-1.5 pl-1 pr-1 pt-0.5 pb-0.5 items-center ${
              handleClickLike && "cursor-pointer"
            }`}
            onClick={handleClickLike}
          >
            <FaHeart
              size={17}
              color={isLikedByAuthUser ? "#df1515" : "gray"}
              className={`cursor-pointer transition-colors duration-300 ease-in-out ${
                isLikedByAuthUser ? "transform scale-95" : ""
              }`}
            />
            <span className="bg-amp-800 dark:bg-amp-100 text-sm">
              {likesCount}
            </span>
          </div>
        )}

        {!isLoading && (
          <div
            className="text-[10px] cursor-pointer"
            data-tooltip-id="forsell-option-item-1"
            data-tooltip-content={
              forSell
                ? "Jest na sprzedaż, napisz do użytkownika o więcej informacji"
                : "Nie jest na sprzedaż"
            }
          >
            {forSell ? (
              <MdOutlineAttachMoney size={18} color="#129943" />
            ) : (
              <MdOutlineMoneyOff size={18} className="opacity-50" />
            )}
          </div>
        )}
        <Tooltip id="forsell-option-item-1" style={{ fontSize: "11px" }} />
      </div>
      <div
        className={`${
          isLoading && "w-[55px] text_primary rounded-md h-[20px]"
        }`}
      >
        {!isLoading && (
          <div className={`text-[10px] leading-3 bg-amp-800 dark:bg-amp-100`}>
            {!authorName && (
              <div>
                Autor:{" "}
                <span className="text-blue-600 font-semibold cursor-pointer">
                  Dawid {authorName}
                </span>
              </div>
            )}

            <span className="text_secendary">
              {moment(createdAt, "YYYYMMDD").fromNow()}
            </span>
          </div>
        )}
      </div>
    </main>
  );
};
