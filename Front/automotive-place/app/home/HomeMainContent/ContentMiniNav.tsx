import { TContentTypes } from "@/app/utils/types";
import { TUser } from "@/app/utils/types/user";
import moment from "moment";
import { BiDotsVertical } from "react-icons/bi";

interface IContentMiniNav {
  title: string;
  author?: TUser;
  createdAt: Date;
  type: TContentTypes;
}

export const ContentMiniNav = ({
  author,
  createdAt,
  title,
  type,
}: IContentMiniNav) => {
  return (
    <nav className="flex text-custom-primary items-center w-full justify-between">
      <div className="flex flex-col gap-2">
        <p className="text-[11px] text-custom-secend opacity-65">
          {type} dodany: {moment(createdAt, "YYYYMMDD").fromNow()}
        </p>

        <div className="flex items-center gap-4">
          {author?.imageUrl && (
            <img
              alt="author-image"
              src={author?.imageUrl}
              className="h-7 w-7 rounded-full"
            />
          )}
          <div className="flex flex-col leading-4	">
            <h4 className="text-[14px]">{title}</h4>
            <span className="text-[11px] text-custom-secend">
              {author?.name}
            </span>
          </div>
        </div>
      </div>

      <div>
        <BiDotsVertical size={22} />
      </div>
    </nav>
  );
};
