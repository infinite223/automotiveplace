"use client";

import React from "react";
import { HomeSearchBar } from "./HomeSearchBar";
import { IoNotifications, IoPersonCircle } from "react-icons/io5";
import { TbMessage2Up } from "react-icons/tb";

export const HomeHeader = () => {
  return (
    <div className="flex w-full items-center justify-between p-2 border-b-0 border-zinc-100 dark:border-zinc-900 gap-6">
      <div className="flex flex-col pl-1">
        <h2 className="m-0 p-0 text-2xl font-extrabold tracking-[2px]">
          <span className="text-baseColor">A</span>MP
        </h2>
        <p className="text-sm p-0 m-0 mt-[-5px]">
          <span>Auto</span>
          <span className="text-baseColor">motiveplace</span>
        </p>
      </div>

      <div className="w-[600px]">
        <HomeSearchBar onSearch={() => {}} isLoading={false} />
      </div>

      <div className="text-md flex items-center gap-5">
        <TbMessage2Up size={22} />
        <IoNotifications size={22} />
        <IoPersonCircle size={29} />
      </div>
    </div>
  );
};
