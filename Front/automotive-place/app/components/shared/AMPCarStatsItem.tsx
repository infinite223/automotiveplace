import React, { FC } from "react";

interface IAMPCarStatsItem {
  title: string;
  subTitle?: string;
  value: string;
  typeValue: string;
}

export const AMPCarStatsItem: FC<IAMPCarStatsItem> = ({
  subTitle,
  title,
  typeValue,
  value,
}) => {
  return (
    <main className="flex flex-1 min-w-[200px] p-2 px-4 bg-amp-50 rounded-sm flex-col border-2 border-amp-300">
      <h1 className="font-semibold text-lg">
        {value}

        <span className="text-xs font-normal ml-1">{typeValue}</span>
      </h1>

      <div className="flex flex-col">
        <h2 className="text-sm mb-[-1px] uppercase font-semibold">{title}</h2>

        {subTitle && <p className="text-xs opacity-70">{subTitle}</p>}
      </div>
    </main>
  );
};
