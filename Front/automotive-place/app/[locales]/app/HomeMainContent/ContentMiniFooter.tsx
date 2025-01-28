import { TContentTypes } from "@/app/utils/types";
import { CgShare } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { TBasicTag } from "@/app/utils/types/tag";
import { iconSizes } from "@/app/utils/constants";
import { AMPTag } from "@/app/components/shared/AMPTag";
import { TbMessageCircleUp } from "react-icons/tb";
import { AMPSeparator } from "@/app/components/shared/AMPSeparator";
import { createLike, deleteLike } from "@/app/services/like";
import { useState } from "react";

interface IContentMiniFooter {
  type: TContentTypes;
  likesCount: number;
  isLikedByAuthUser: boolean;
  actions?: JSX.Element;
  tags?: TBasicTag[];
  contentId: string;
}

export const ContentMiniFooter = ({
  contentId,
  type,
  likesCount,
  isLikedByAuthUser,
  actions,
  tags,
}: IContentMiniFooter) => {
  const [currentLikesCount, setCurrentLikesCount] = useState(likesCount);
  const [currentIsLiked, setCurrentIsLiked] = useState(isLikedByAuthUser);

  const handleClickLike = async () => {
    if (currentIsLiked) {
      setCurrentLikesCount((prev) => prev - 1);
      setCurrentIsLiked(false);

      try {
        await deleteLike(contentId);
      } catch (error) {
        console.error("Error while deleting like", error);
        setCurrentLikesCount((prev) => prev + 1);
        setCurrentIsLiked(true);
      }
    } else {
      setCurrentLikesCount((prev) => prev + 1);
      setCurrentIsLiked(true);

      try {
        await createLike(contentId, type);
      } catch (error) {
        console.error("Error while creating like", error);
        setCurrentLikesCount((prev) => prev - 1);
        setCurrentIsLiked(false);
      }
    }
  };

  return (
    <nav className="flex flex-col items-center justify-between w-full">
      <AMPSeparator />
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-2">
            <div
              className={`flex rounded-md h-min gap-2.5 pl-1 pr-1 pt-0.5 pb-0.5 items-center cursor-pointer`}
              onClick={handleClickLike}
            >
              <FaHeart
                size={iconSizes.base}
                color={currentIsLiked ? "#df1515" : "gray"}
                className={`cursor-pointer transition-colors duration-300 ease-in-out ${
                  currentIsLiked ? "transform scale-95" : ""
                }`}
              />
              <span className="text-sm">{currentLikesCount}</span>
            </div>
          </div>
          <CgShare size={iconSizes.base} />
          <TbMessageCircleUp size={iconSizes.base} />
        </div>

        {actions}
      </div>

      <div className="flex flex-wrap gap-2 w-full mt-2">
        {tags?.map((tag) => <AMPTag name={tag.name} key={tag.id} />)}
      </div>
    </nav>
  );
};
