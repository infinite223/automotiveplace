import { TContentTypes } from "@/app/utils/types";
import { TUser } from "@/app/utils/types/user";
import moment from "moment";
import { BiDotsVertical } from "react-icons/bi";
import "moment/locale/pl";
import { MediumIconSize } from ".";
import Image from "next/image";
moment.locale("pl");

interface IContentMiniNav {
  title: string;
  author?: TUser;
  createdAt: Date;
  typeName: string;
}

export const ContentMiniNav = ({
  author,
  createdAt,
  title,
  typeName,
}: IContentMiniNav) => {
  return (
    <nav className="flex text-custom-primary items-center w-full justify-between">
      <div className="flex flex-col gap-2">
        <p className="text-[11px] text-custom-secendary opacity-65">
          {typeName} dodany: {moment(createdAt, "YYYYMMDD").fromNow()}
        </p>

        <div className="flex items-center gap-4">
          {author?.imageUrl && (
            <Image
              alt="author-image"
              src={author?.imageUrl}
              className="h-8 w-8 rounded-full"
            />
          )}
          <div className="flex flex-col leading-4	">
            <h4 className="text-[14px]">{title}</h4>
            <span className="text-[11px] text-custom-secendary">
              {author?.name}
            </span>
          </div>
        </div>
      </div>

      <div>
        <BiDotsVertical size={MediumIconSize} />
      </div>
    </nav>
  );
};
