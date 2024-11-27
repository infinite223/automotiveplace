import React, { FC } from "react";

interface IAMPCarStatsItem {
  title: string;
  subTitle?: string;
  value: string;
}

export const AMPCarStatsItem: FC<IAMPCarStatsItem> = ({
  subTitle,
  title,
  value,
}) => {
  return (
    <main className="flex flex-1 min-w-[200px] p-2 px-4 bg-amp-100/75 rounded-sm flex-col gap-1">
      <h1 className="font-semibold text-lg">{value}</h1>

      <div className="flex flex-col">
        <h2 className="text-sm mb-[-1px]">{title}</h2>

        {subTitle && <p className="text-xs opacity-70">{subTitle}</p>}
      </div>
    </main>
  );
};
