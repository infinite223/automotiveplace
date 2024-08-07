import React, { FC, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

export type TMenuItem = {
  name: string;
  handleClick?: () => void;
  icon?: JSX.Element;
  isDisable?: boolean;
};

interface IAMPMenuProps {
  items: TMenuItem[];
  isLoading: boolean;
}

export const AMPMenu: FC<IAMPMenuProps> = ({ items, isLoading }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <main className="relative">
      {showMenu && (
        <div
          className="absolute w-[300px] top-[-100px] left-[-60px] h-[300px]"
          onClick={() => setShowMenu(!showMenu)}
        />
      )}

      <div
        className={`${
          isLoading &&
          "bg-custom-secendary text-custom-primary w-7 h-7 rounded-md"
        }`}
      >
        {!isLoading && (
          <>
            <BsThreeDotsVertical
              onClick={() => setShowMenu(!showMenu)}
              className="cursor-pointer"
            />
          </>
        )}{" "}
      </div>

      {showMenu && (
        <ul
          role="menu"
          data-popover="menu"
          data-popover-placement="bottom"
          className="absolute bg-custom-3 text-[11px] z-10 min-w-[180px] overflow-auto rounded-md border border-zinc-200 dark:border-zinc-800 bg-custom-secendary  p-1 font-sans font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
        >
          {items.map(({ name, handleClick, icon, isDisable }, i) => (
            <li
              onClick={!isDisable ? handleClick : () => {}}
              key={i}
              role="menuitem"
              className={`${isDisable ? "opacity-65" : "cursor-pointer hover:bg-zinc-300 dark:hover:bg-zinc-600 hover:text-blue-gray-900"} w-full flex items-center gap-2 select-none rounded-sm px-3 pt-[5px] pb-1.5 text-start leading-tight transition-all focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900`}
            >
              {icon}
              <span>{name}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};
