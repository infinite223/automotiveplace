"use client";

import React, { useState } from "react";
import { IoNotifications, IoPersonCircle } from "react-icons/io5";
import { TbMessage2Up } from "react-icons/tb";
import { RightSidebarModal, TContentType } from "./RightSidebarModal";
import useKeyboardShortcut from "@/app/hooks/useKeydown";
import { iconSizes, shortcutConfigs } from "@/app/utils/constants";
import { useClickOutside } from "@/app/hooks/useClickOutside";

export const RightSidebar = () => {
  const [selectedContent, setSelectedContent] = useState<TContentType>(null);

  useKeyboardShortcut(() => onClickHandler(null), shortcutConfigs.escape);

  const onClickHandler = (type: TContentType) => {
    setSelectedContent(type);
  };

  const modalRef = useClickOutside<HTMLDivElement>(() => {
    setSelectedContent(null);
  });

  return (
    <div className="h-full px-4 w-[280px] pt-4 fixed right-0 hidden lg:block bg-amp-0 text-amp-300 dark:text-amp-700/80">
      <div className="text-md flex items-center w-full justify-end gap-3">
        <OptionItem
          selected={selectedContent === "chat"}
          icon={<TbMessage2Up size={iconSizes.base} />}
          onClickHandler={() => onClickHandler("chat")}
        />
        <OptionItem
          selected={selectedContent === "notifications"}
          icon={<IoNotifications size={iconSizes.base} />}
          onClickHandler={() => onClickHandler("notifications")}
        />
        <OptionItem
          selected={selectedContent === "user"}
          icon={<IoPersonCircle size={iconSizes.base} />}
          onClickHandler={() => onClickHandler("user")}
        />
      </div>
      <div className="my-4">
        <h2 className="">Popularne projekty</h2>
      </div>

      <div ref={modalRef}>
        <RightSidebarModal contentType={selectedContent} />
      </div>
    </div>
  );
};

const OptionItem = ({
  icon,
  onClickHandler,
  selected,
}: {
  icon: React.ReactNode;
  onClickHandler: () => void;
  selected: boolean;
}) => {
  return (
    <div
      onClick={onClickHandler}
      className={`flex items-center p-2 rounded-full bg-amp-700 dark:bg-amp-300 hover:opacity-70 cursor-pointer transition-transform-opacity ${
        selected && "opacity-70"
      }`}
    >
      {icon}
    </div>
  );
};
