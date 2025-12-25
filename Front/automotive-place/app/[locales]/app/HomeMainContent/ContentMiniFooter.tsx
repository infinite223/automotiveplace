import { TContentTypes } from "@/app/utils/types";
import { CgShare } from "react-icons/cg";
import { TBasicTag } from "@/app/utils/types/tag";
import { iconSizes } from "@/app/utils/constants";
import { TbMessageCircleUp } from "react-icons/tb";

import { FaRegHeart } from "react-icons/fa6";
import { AMPTag } from "@/app/components/shared/AMPTag";
import { useEffect } from "react";
import { FaHeart } from "react-icons/fa";

interface IContentMiniFooter {
  type: TContentTypes;
  actions?: JSX.Element;
  tags?: TBasicTag[];
  currentIsLiked: boolean;
  currentLikesCount: number;
  handleClickLike: () => void;
  handleClickShare?: () => void;
  isUserContent?: boolean;
  isLoading?: boolean;
}

export const ContentMiniFooter = ({
  currentIsLiked,
  actions,
  currentLikesCount,
  tags,
  handleClickLike,
  handleClickShare,
  isUserContent,
  isLoading = false,
}: IContentMiniFooter) => {
  return (
    <nav className="flex flex-col items-center justify-between w-full mt-1 pb-2 pl-2 pr-1">
      <div className="flex items-center justify-between w-full text-zinc-700  dark:text-zinc-300">
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-2">
            <div
              className={`flex rounded-md h-min gap-2.5 pl-1 pr-1 pt-0.5 pb-0.5 items-center
    transition-colors duration-300 ease-in-out
    ${
      isLoading
        ? "cursor-wait pointer-events-none"
        : "cursor-pointer hover:bg-red-500/10"
    }`}
              onClick={handleClickLike}
            >
              {currentIsLiked ? (
                <FaHeart
                  size={iconSizes.base}
                  className="text-amp-500 transition-transform duration-300 scale-95"
                />
              ) : (
                <FaRegHeart
                  size={iconSizes.base}
                  className="transition-transform duration-300"
                />
              )}

              <span className="text-sm">{currentLikesCount}</span>
            </div>
          </div>

          <CgShare size={iconSizes.base} onClick={handleClickShare} />
          {!isUserContent && <TbMessageCircleUp size={iconSizes.base} />}
        </div>

        {actions}
      </div>

      {tags?.length !== 0 && tags?.[0].name && (
        <div className="flex flex-wrap gap-2 w-full mt-2">
          {tags?.map((tag) => <AMPTag name={tag.name} key={tag.id} />)}
        </div>
      )}
    </nav>
  );
};
