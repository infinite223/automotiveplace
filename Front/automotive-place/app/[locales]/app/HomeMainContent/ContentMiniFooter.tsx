import { TContentTypes } from "@/app/utils/types";
import { CgShare } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { TBasicTag, TTag } from "@/app/utils/types/tag";
import { iconSizes } from "@/app/utils/constants";
import { AMPTag } from "@/app/components/shared/AMPTag";
import { AMPSeparator } from "@/app/components/shared/AMPSeparator";

interface IContentMiniFooter {
  type: TContentTypes;
  likesCount: number;
  isLikedByAuthUser: boolean;
  actions?: JSX.Element;
  tags?: TBasicTag[];
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
    <nav className="flex flex-col items-center justify-between w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <CgShare size={iconSizes.base} />
          <div className="flex flex-col gap-2">
            {!isLoading && (
              <div
                className={`flex rounded-md h-min gap-2.5 pl-1 pr-1 pt-0.5 pb-0.5 items-center ${
                  true && "cursor-pointer"
                }`}
                onClick={handleClickLike}
              >
                <FaHeart
                  size={iconSizes.base}
                  color={isLikedByAuthUser ? "#df1515" : "gray"}
                  className={`cursor-pointer transition-colors duration-300 ease-in-out ${
                    isLikedByAuthUser ? "transform scale-95" : ""
                  }`}
                />
                <span className="text-sm">{likesCount}</span>
              </div>
            )}
          </div>
        </div>

        {actions}
      </div>

      <div className="flex flex-wrap gap-2 w-full mt-2">
        {tags?.map((tag) => <AMPTag name={tag.name} key={tag.id} />)}
      </div>
    </nav>
  );
};
