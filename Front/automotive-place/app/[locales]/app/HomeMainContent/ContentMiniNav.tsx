import { TBasicUser } from "@/app/utils/types/user";
import moment from "moment";
import "moment/locale/pl";
import Image from "next/image";
import { MdSaveAlt, MdOutlineReport, MdOutlineEdit } from "react-icons/md";
import { IoMdShare, IoMdClose } from "react-icons/io";
import { CiTrash } from "react-icons/ci";
import { AMPMenu } from "@/app/components/shared/AMPMenu";
import { iconSizes } from "@/app/utils/constants";
import { LuMinus, LuPlus } from "react-icons/lu";

moment.locale("pl");

interface IContentMiniNav {
  title: string;
  author?: TBasicUser;
  createdAt: Date;
  typeName: string;
  isUserContent?: boolean;
  handleClickInterestingContent?: () => void;
  handleClickShare?: () => void;
}

enum Visibility {
  ALL = "all",
  AUTHOR = "author",
  USER = "user",
}

interface TMenuItem {
  icon: JSX.Element;
  name: string;
  isDisable: boolean;
  handleClick: () => void;
  visibility: Visibility;
}

const menuItems: TMenuItem[] = [
  {
    icon: <MdSaveAlt size={iconSizes.small} />,
    name: "Zapisz",
    isDisable: false,
    handleClick: () => {},
    visibility: Visibility.ALL,
  },
  {
    icon: <LuPlus size={iconSizes.small} />,
    name: "Interesuje mnie",
    isDisable: false,
    handleClick: () => {},
    visibility: Visibility.USER,
  },
  {
    icon: <LuMinus size={iconSizes.small} />,
    name: "Nie interesuje mnie",
    isDisable: false,
    handleClick: () => {},
    visibility: Visibility.USER,
  },
  {
    icon: <IoMdShare size={iconSizes.small} />,
    name: "Udostępnij",
    isDisable: false,
    handleClick: () => {},
    visibility: Visibility.ALL,
  },
  {
    icon: <MdOutlineEdit size={iconSizes.small} />,
    name: "Edytuj",
    isDisable: false,
    handleClick: () => {},
    visibility: Visibility.AUTHOR,
  },
  {
    icon: <CiTrash size={iconSizes.small} />,
    name: "Usuń",
    isDisable: false,
    handleClick: () => {},
    visibility: Visibility.AUTHOR,
  },
  {
    icon: <MdOutlineReport size={iconSizes.small} />,
    name: "Zgłoś",
    isDisable: false,
    handleClick: () => {},
    visibility: Visibility.USER,
  },
];

export const ContentMiniNav = ({
  author,
  createdAt,
  title,
  typeName,
  isUserContent = false,
  handleClickInterestingContent,
  handleClickShare,
}: IContentMiniNav) => {
  const filteredMenuItems = menuItems
    .map((item) => {
      if (item.name === "Interesuje mnie") {
        return { ...item, handleClick: handleClickInterestingContent };
      }
      if (item.name === "Nie nteresuje mnie") {
        return { ...item, handleClick: handleClickInterestingContent };
      }
      if (item.name === "Udostępnij") {
        return { ...item, handleClick: handleClickShare };
      }
      return item;
    })
    .filter((item) => {
      if (item.visibility === Visibility.ALL) return true;
      if (item.visibility === Visibility.AUTHOR && isUserContent) return true;
      if (item.visibility === Visibility.USER && !isUserContent) return true;
      return false;
    });

  return (
    <nav className="flex items-center w-full justify-between pt-2 pl-3 pr-1">
      <div className="flex flex-col gap-2">
        <p className="text-[11px] bg-amp-800 dark:bg-amp-100 opacity-65">
          {typeName} dodany: {moment(createdAt, "YYYYMMDD").fromNow()}
        </p>

        <div className="flex items-center gap-4">
          {author?.imageUrl && (
            <Image
              alt="author-image"
              src={author?.imageUrl}
              className="h-8 w-8 rounded-full"
              width={200}
              height={200}
            />
          )}
          <div className="flex flex-col leading-4">
            <h4 className="text-[14px]">{title}</h4>
            <span className="text-[11px] opacity-70">{author?.name}</span>
          </div>
        </div>
      </div>

      <AMPMenu items={filteredMenuItems} isLoading={false} />
    </nav>
  );
};
