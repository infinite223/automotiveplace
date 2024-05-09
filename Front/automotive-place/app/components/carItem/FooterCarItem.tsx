"use client";

import {TCarItemLikes} from "@/app/utils/types";
import React, {FC, useOptimistic} from "react";
import {FaHeart} from "react-icons/fa";
import {MdOutlineAttachMoney, MdOutlineMoneyOff} from "react-icons/md";
import {Tooltip} from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface FooterCarItemProps {
  authorName?: string;
  createdAt: Date;
  isLoading: boolean;
  likesCount: number;
  likes?: TCarItemLikes;
  forSell?: boolean;
  inUse?: boolean;
  handleClickLike?: () => void;
}

export const FooterCarItem: FC<FooterCarItemProps> = ({
  authorName,
  createdAt,
  isLoading,
  likesCount,
  forSell,
  handleClickLike,
}) => {
  return (
    <main
      className={`${
        isLoading && "animate-pulse w-[70px] bg-zinc-100 rounded-md h-[20px]"
      } flex text-zinc-600 gap-2 items-center justify-between`}
    >
      <div className="flex items-center gap-1">
        <div
          className={`flex rounded-md bg-zinc-200 h-min gap-1 pl-1 pr-1 pt-0.5 pb-0.5 items-center ${
            handleClickLike && "cursor-pointer"
          }`}
          onClick={handleClickLike}
        >
          <FaHeart size={17} />
          <span className="text-zinc-600 text-sm">{likesCount}</span>
        </div>

        <div className="text-[10px]">
          {forSell ? (
            <MdOutlineAttachMoney size={18} color="#129943" />
          ) : (
            <MdOutlineMoneyOff size={18} className="opacity-50" />
          )}
        </div>
      </div>
      {!isLoading && (
        <div className={`text-[10px] leading-3`}>
          {authorName && (
            <div>
              Autor:{" "}
              <span className="text-blue-600 font-semibold cursor-pointer">
                {authorName}
              </span>
            </div>
          )}

          <span className="text-zinc-500">{createdAt.toDateString()}</span>
        </div>
      )}
    </main>
  );
};
