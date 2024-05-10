import React, {FC, ReactNode} from "react";

interface AMPTableProps {
  items: JSX.Element[];
  title?: string;
  titleSize?: number;
  wrapItemTailwindStyles?: string;
  headerOptions?: JSX.Element[];
  tableView: "elements" | "rows";
}

export const AMPTable: FC<AMPTableProps> = ({
  title,
  items,
  wrapItemTailwindStyles,
  titleSize = 16,
  headerOptions,
  tableView,
}) => {
  return (
    <main className="flex flex-col gap-1 w-full p-1 shadow-md rounded-md">
      <div className="flex items-center justify-between w-full">
        <h3 className="font-semibold text-lg">{title}</h3>

        <div className="flex items-center gap-1">{headerOptions}</div>
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
