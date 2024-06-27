import { TContentTypes } from "@/app/utils/types";
import { TUser } from "@/app/utils/types/user";
import moment from "moment";
import { BiDotsVertical } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";

interface IContentMiniFooter {
  type: TContentTypes;
  likesCount: number;
  isLikedByAuthUser: boolean;
}

export const ContentMiniFooter = ({
  type,
  likesCount,
  isLikedByAuthUser,
}: IContentMiniFooter) => {
  const isLoading = false;

  const handleClickLike = () => {};
  return (
    <nav className="flex text-custom-primary items-center w-full justify-between">
      <div className="flex flex-col gap-2">
        {!isLoading && (
          <div
            className={`flex rounded-md bg-custom-primary h-min gap-2.5 pl-1 pr-1 pt-0.5 pb-0.5 items-center ${
              true && "cursor-pointer"
            }`}
            onClick={handleClickLike}
          >
            <FaHeart
              size={20}
              color={isLikedByAuthUser ? "#df1515" : "gray"}
              className={`cursor-pointer transition-colors duration-300 ease-in-out ${
                isLikedByAuthUser ? "transform scale-95" : ""
              }`}
            />
            <span className="text-custom-secend text-sm">{likesCount}</span>
          </div>
        )}
      </div>

      <div>
        <BiDotsVertical size={22} />
      </div>
    </nav>
  );
};
