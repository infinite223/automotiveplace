"use client";

import React from "react";
import { IoNotifications, IoPersonCircle } from "react-icons/io5";
import { TbMessage2Up } from "react-icons/tb";
import { SlMenu } from "react-icons/sl";
import { iconSizes } from "@/app/utils/constants";

export const HomeHeader = () => {
  return (
    <div className="flex w-full z-10 items-center justify-between p-2 border-b-0 border-zinc-100 dark:border-zinc-900 gap-6">
      <div className="flex items-center gap-2">
        <div className="px-4 ml-1 2xl:hidden">
          <SlMenu size={iconSizes.base} />
        </div>
        <div className="flex flex-col pl-1">
          <h2 className="m-0 p-0 text-2xl font-extrabold tracking-[2px]">
            <span className="text-amp-700 dark:text-amp-300">A</span>MP
          </h2>
          <p className="text-sm p-0 m-0 mt-[-5px]">
            <span>Auto</span>
            <span className="text-amp-700 dark:text-amp-300 uppercase font-bold">
              motiveplace
            </span>
          </p>
        </div>
      </div>{" "}
      {/* <div className="w-[600px]">
        <HomeSearchBar onSearch={() => {}} isLoading={false} />
      </div> */}
      <div className="text-md flex items-center gap-5">
        <TbMessage2Up size={22} />
        <IoNotifications size={22} />
        <IoPersonCircle size={29} />
      </div>
    </div>
  );
};
