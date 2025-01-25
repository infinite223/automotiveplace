import React from "react";
import { IoNotifications, IoPersonCircle } from "react-icons/io5";
import { TbMessage2Up } from "react-icons/tb";
import { RightSidebarModal } from "./RightSidebarModal";

export const RightSidebar = () => {
  return (
    <div className="h-full px-4 w-[280px] pt-4 fixed right-0 hidden lg:block bg-amp-0 text-amp-300 dark:text-amp-700/80">
      <div className="text-md flex items-center w-full justify-end gap-3">
        <OptionItem icon={<TbMessage2Up size={22} />} />
        <OptionItem icon={<IoNotifications size={22} />} />
        <OptionItem icon={<IoPersonCircle size={22} />} />
      </div>

      <div className="my-4">
        <h2 className="">Popularne projekty</h2>
      </div>

      <RightSidebarModal />
    </div>
  );
};

const OptionItem = ({ icon }: { icon: React.ReactNode }) => {
  return (
    <div className="flex items-center p-2 rounded-full bg-amp-700 dark:bg-amp-300 hover:opacity-70 cursor-pointer transition-transform-opacity">
      {icon}
    </div>
  );
};
