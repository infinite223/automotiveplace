import { FC, useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import useKeyboardShortcut from "@/app/hooks/useKeydown";
import { iconSizes, shortcutConfigs } from "@/app/utils/constants";
import { AnimatePresence, motion } from "framer-motion";

export type TMenuItem = {
  name: string;
  handleClick?: () => void;
  icon?: JSX.Element;
  isDisable?: boolean;
};

interface IAMPMenuProps {
  items: TMenuItem[];
  isLoading: boolean;
  size?: number;
}

export const AMPMenu: FC<IAMPMenuProps> = ({ items, isLoading, size }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null); // Referencja do menu
  useKeyboardShortcut(() => setShowMenu(false), shortcutConfigs.escape);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <main className="relative" ref={menuRef}>
      <div
        className={`${
          isLoading &&
          "bg-amp-800 dark:bg-amp-100 bg-amp-000 w-7 h-7 rounded-md"
        }`}
      >
        {!isLoading && (
          <>
            <BsThreeDotsVertical
              onClick={() => setShowMenu(!showMenu)}
              className="cursor-pointer"
              size={size ?? iconSizes.base}
            />
          </>
        )}
      </div>
      <AnimatePresence>
        {showMenu && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0 }}
            role="menu"
            data-popover="menu"
            data-popover-placement="bottom"
            className="absolute bg-amp-800 dark:bg-amp-100 text-[11px] z-10 min-w-[180px] overflow-auto rounded-sm border border-amp-800/50 dark:border-amp-200/50  py-1 font-sans font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
          >
            {items.map(({ name, handleClick, icon, isDisable }, i) => (
              <li
                onClick={!isDisable ? handleClick : () => {}}
                key={i}
                role="menuitem"
                className={`${
                  isDisable
                    ? "opacity-65"
                    : "cursor-pointer hover:bg-amp-700 dark:hover:bg-zinc-600 hover:text-blue-gray-900"
                } w-full flex items-center gap-2 select-none rounded-sm px-3 pt-[5px] pb-1.5 text-start leading-tight transition-all focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900`}
              >
                {icon}
                <span>{name}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </main>
  );
};
