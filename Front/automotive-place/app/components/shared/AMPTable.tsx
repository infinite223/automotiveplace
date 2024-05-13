import {TSearchOptions} from "@/app/utils/types";
import React, {FC} from "react";
import {AMPSearch} from "./AMPSearch";

interface AMPTableProps {
  items: JSX.Element[];
  title?: string;
  titleSize?: number;
  wrapItemTailwindStyles?: string;
  headerOptions?: JSX.Element[];
  tableView: "elements" | "rows";
  searchOptions?: TSearchOptions;
}

export const AMPTable: FC<AMPTableProps> = ({
  title,
  items,
  wrapItemTailwindStyles,
  searchOptions = {query: "", type: "local"},
  titleSize = 16,
  headerOptions,
  tableView,
}) => {
  const onSearch = () => {};

  return (
    <main className="flex flex-col gap-1 w-full p-1 pb-2 shadow-md shadow-zinc-200 dark:shadow-zinc-900 rounded-md">
      <div className="flex flex-col gap-1 items-start w-full">
        <div className="flex items-center justify-between w-full">
          <h3 className="font-semibold text-lg">{title}</h3>

          <div className="flex items-center gap-1">{headerOptions}</div>
        </div>
        <AMPSearch onSearch={onSearch} />
      </div>

      <div
        className={`flex w-full ${
          tableView === "rows" ? "flex-col " : "flex-wrap"
        }`}
      >
        {items.map((item, index) => (
          <div key={index} className={`${wrapItemTailwindStyles}`}>
            {item}
          </div>
        ))}
      </div>
    </main>
  );
};
