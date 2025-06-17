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
  if (value === "0") return;

  return (
    <main className="flex flex-1 min-w-[145px] p-2 px-2 bg-amp-50 rounded-sm flex-col-reverse">
      <h1 className="font-semibold text-md">
        {value}

        <span className="text-xs font-normal ml-1">{typeValue}</span>
      </h1>

      <div className="flex flex-col">
        <h2 className="text-xs mb-[-1px] uppercase font-semibold opacity-85">
          {title}
        </h2>

        {subTitle && <p className="text-xs opacity-70">{subTitle}</p>}
      </div>
    </main>
  );
};
