import { TSearchOptions } from "@/app/utils/types";
import React, { FC, JSX, RefObject } from "react";
import { AMPSearch } from "./AMPSearch";

interface AMPTableProps {
  items: JSX.Element[];
  title?: string;
  titleSize?: number;
  wrapItemTailwindStyles?: string;
  headerOptions?: JSX.Element[];
  tableView: "elements" | "rows";
  searchOptions?: TSearchOptions;
  isLoading: boolean;
  onSearch?: (value: string) => void;
  footerRef?: RefObject<HTMLDivElement>;
  loadingItems?: JSX.Element[];
}

export const AMPTable: FC<AMPTableProps> = ({
  title,
  items,
  wrapItemTailwindStyles,
  searchOptions = { query: "", type: "local" },
  titleSize = 16,
  headerOptions,
  tableView,
  isLoading,
  onSearch,
  footerRef,
  loadingItems,
}) => {
  return (
    <main className="flex flex-col gap-1 w-full p-1 pb-2 border border-amp-800 dark:border-amp-100 rounded-md">
      <div className="flex flex-col gap-1 items-start w-full pr-2 pl-2">
        <div className="flex items-center justify-between w-full">
          <h3 className="font-semibold text-lg">{title}</h3>

          <div className="flex items-center gap-1">{headerOptions}</div>
        </div>
        {onSearch && (
          <AMPSearch
            onSearch={onSearch}
            isLoading={isLoading}
            placeholder="Szukaj"
            additionalOptions={<div></div>}
          />
        )}
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

        {loadingItems?.map((item, index) => (
          <div key={index} className={`${wrapItemTailwindStyles}`}>
            {item}
          </div>
        ))}
      </div>
      {footerRef && <div ref={footerRef}></div>}
    </main>
  );
};
