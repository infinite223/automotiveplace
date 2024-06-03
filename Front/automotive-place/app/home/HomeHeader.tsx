import React from "react";

export const HomeHeader = () => {
  return (
    <div className="flex w-full items-center justify-between p-2 border-b-2 border-zinc-100 dark:border-zinc-900">
      <div className="flex flex-col">
        <h2 className="m-0 p-0 text-2xl font-extrabold tracking-[3px]">
          <span className="text-teal-500">A</span>MP
        </h2>
        <p className="text-sm p-0 m-0 mt-[-5px]">
          <span>Auto</span>
          <span className="text-teal-500">motiveplace</span>
        </p>
      </div>
    </div>
  );
};
