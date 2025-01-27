import { TBasicUser } from "@/app/utils/types/user";
import moment from "moment";
import "moment/locale/pl";
import Image from "next/image";
import { MdSaveAlt } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { MdOutlineReport } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { AMPMenu } from "@/app/components/shared/AMPMenu";
import { iconSizes } from "@/app/utils/constants";
import { FaHeart } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { CiTrash } from "react-icons/ci";

moment.locale("pl");

interface IContentMiniNav {
  title: string;
  author?: TBasicUser;
  createdAt: Date;
  typeName: string;
  isUserContent?: boolean;
}

// Update the TMenuItem type to include the optionForAuthor property
interface TMenuItem {
  icon: JSX.Element;
  name: string;
  isDisable: boolean;
  handleClick: () => void;
  optionForAuthor?: boolean; // Add this property
}

const menuItems: TMenuItem[] = [
  {
    icon: <MdSaveAlt size={iconSizes.small} />,
    name: "Zapisz",
    isDisable: false,
    handleClick: () => {
      // Handle save action
    },
  },
  {
    icon: <FaHeart size={iconSizes.small} className="opacity-60" />,
    name: "Polub",
    isDisable: false,
    handleClick: () => {
      // Handle follow action
    },
  },
  {
    icon: <IoMdShare size={iconSizes.small} />,
    name: "Udostępnij",
    isDisable: false,
    handleClick: () => {
      // Handle share action
    },
  },
  {
    icon: <MdOutlineEdit size={iconSizes.small} />,
    name: "Edytuj",
    isDisable: false,
    handleClick: () => {
      // Handle edit action
    },
    optionForAuthor: true, // Only for author
  },
  {
    icon: <IoMdClose size={iconSizes.small} />,
    name: "Nie interesuje mnie",
    isDisable: false,
    handleClick: () => {
      // Handle block action
    },
  },
  {
    icon: <CiTrash size={iconSizes.small} />,
    name: "Usuń",
    isDisable: false,
    handleClick: () => {
      // Handle delete action
    },
    optionForAuthor: true, // Only for author
  },
  {
    icon: <MdOutlineReport size={iconSizes.small} />,
    name: "Zgłoś ",
    isDisable: false,
    handleClick: () => {},
  },
];

export const ContentMiniNav = ({
  author,
  createdAt,
  title,
  typeName,
  isUserContent = false,
}: IContentMiniNav) => {
  const filteredMenuItems = menuItems.filter((item) => {
    if (isUserContent) {
      return true;
    }
    return !item.optionForAuthor;
  });

  return (
    <nav className="flex items-center w-full justify-between">
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
          <div className="flex flex-col leading-4	">
            <h4 className="text-[14px]">{title}</h4>
            <span className="text-[11px] opacity-70">{author?.name}</span>
          </div>
        </div>
      </div>

      <AMPMenu items={filteredMenuItems} isLoading={false} />
    </nav>
  );
};
