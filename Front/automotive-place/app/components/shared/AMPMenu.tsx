import React, {FC, useState} from "react";
import {BsThreeDotsVertical} from "react-icons/bs";

export type TMenuItem = {
  name: string;
  handleClick: () => void;
};

interface IAMPMenuProps {
  items: TMenuItem[];
  isLoading: boolean;
}

export const AMPMenu: FC<IAMPMenuProps> = ({items, isLoading}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <main>
      <div className={`${isLoading && "bg-zinc-100 w-7 h-7 rounded-md"}`}>
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
          className="absolute text-[11px] z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-1 font-sans font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
        >
          {items.map(({name, handleClick}, i) => (
            <li
              onClick={handleClick}
              key={i}
              role="menuitem"
              className="block w-full cursor-pointer select-none rounded-md px-3 pt-[5px] pb-1.5 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};
