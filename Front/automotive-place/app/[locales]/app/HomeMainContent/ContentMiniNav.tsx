import { TBasicUser } from "@/app/utils/types/user";
import moment from "moment";
import "moment/locale/pl";
import Image from "next/image";
import { AMPMenu, TMenuItem } from "@/app/components/shared/AMPMenu";
moment.locale("pl");

interface IContentMiniNav {
  title: string;
  author?: TBasicUser;
  createdAt: Date;
  typeName: string;
}

const menuItems: TMenuItem[] = [
  {
    name: "Zgłoś ",
    isDisable: false,
    handleClick: () => {},
  },
  {
    name: "Udostępnij",
    isDisable: false,
    handleClick: () => {
      // Handle share action
    },
  },
  {
    name: "Zapisz",
    isDisable: false,
    handleClick: () => {
      // Handle save action
    },
  },
  {
    name: "Obserwuj",
    isDisable: false,
    handleClick: () => {
      // Handle follow action
    },
  },
  {
    name: "Edytuj",
    isDisable: false,
    handleClick: () => {
      // Handle edit action
    },
  },
  {
    name: "Usuń",
    isDisable: false,
    handleClick: () => {
      // Handle delete action
    },
  },
  {
    name: "Nie interesuje mnie",
    isDisable: false,
    handleClick: () => {
      // Handle block action
    },
  },
];

export const ContentMiniNav = ({
  author,
  createdAt,
  title,
  typeName,
}: IContentMiniNav) => {
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

      <AMPMenu items={menuItems} isLoading={false} />
    </nav>
  );
};
