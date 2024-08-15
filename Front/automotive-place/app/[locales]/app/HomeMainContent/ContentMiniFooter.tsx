import { TContentTypes } from "@/app/utils/types";
import { CgShare } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { MediumIconSize } from ".";
import { TTag } from "@/app/utils/types/tag";

interface IContentMiniFooter {
  type: TContentTypes;
  likesCount: number;
  isLikedByAuthUser: boolean;
  actions?: JSX.Element;
  tags?: TTag[];
}

export const ContentMiniFooter = ({
  type,
  likesCount,
  isLikedByAuthUser,
  actions,
  tags,
}: IContentMiniFooter) => {
  const isLoading = false;

  const handleClickLike = () => {};
  return (
    <nav className="flex text-custom-primary items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <CgShare size={MediumIconSize} />
        <div className="flex flex-col gap-2">
          {!isLoading && (
            <div
              className={`flex rounded-md bg-custom-primary  h-min gap-2.5 pl-1 pr-1 pt-0.5 pb-0.5 items-center ${
                true && "cursor-pointer"
              }`}
              onClick={handleClickLike}
            >
              <FaHeart
                size={MediumIconSize}
                color={isLikedByAuthUser ? "#df1515" : "gray"}
                className={`cursor-pointer transition-colors duration-300 ease-in-out ${
                  isLikedByAuthUser ? "transform scale-95" : ""
                }`}
              />
              <span className="text-custom-secendary text-sm">
                {likesCount}
              </span>
            </div>
          )}
        </div>
      </div>

      {actions}
    </nav>
  );
};
