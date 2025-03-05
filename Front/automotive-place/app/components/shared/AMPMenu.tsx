import { FC, useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import useKeyboardShortcut from "@/app/hooks/useKeydown";
import { iconSizes, shortcutConfigs } from "@/app/utils/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "@/app/hooks/useClickOutside";

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
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const buttonRef = useRef<HTMLDivElement | null>(null);

  useKeyboardShortcut(() => setShowMenu(false), shortcutConfigs.escape);
  const menuRef = useClickOutside<HTMLUListElement>(() => {
    setShowMenu(false);
  });

  useEffect(() => {
    if (showMenu && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const menuWidth = menuRef.current?.offsetWidth ?? 180;
      const menuHeight = menuRef.current?.offsetHeight ?? 0;

      let top = buttonRect.bottom + 5;
      let left = buttonRect.left;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (left + menuWidth > viewportWidth) {
        left = viewportWidth - menuWidth - 10;
      }

      if (top + menuHeight > viewportHeight) {
        top = buttonRect.top - menuHeight - 5;
      }

      setMenuPosition({ top, left });
    }
  }, [showMenu]);

  return (
    <main className="relative" ref={buttonRef}>
      <div
        className={`${isLoading && "bg-amp-800 dark:bg-amp-100 w-7 h-7 rounded-md"}`}
      >
        {!isLoading && (
          <BsThreeDotsVertical
            onClick={() => setShowMenu(!showMenu)}
            className="cursor-pointer"
            size={size ?? iconSizes.base}
          />
        )}
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.ul
            ref={menuRef} // Dodajemy ref do obsługi zamykania menu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0 }}
            role="menu"
            data-popover="menu"
            style={{
              position: "fixed",
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
              zIndex: 1000,
            }}
            className="bg-amp-800 dark:bg-amp-50 text-[11px] min-w-[180px] overflow-auto rounded-md border border-amp-800/50 dark:border-amp-200/50 py-1 font-sans font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10"
          >
            {items.map(({ name, handleClick, icon, isDisable }, i) => (
              <li
                key={i}
                onClick={() => {
                  if (!isDisable) {
                    handleClick?.();
                    setShowMenu(false);
                  }
                }}
                role="menuitem"
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md ${
                  isDisable
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:bg-amp-700 dark:hover:bg-amp-200"
                }`}
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
