import React, {FC, ReactNode} from "react";

interface TableProps {
  items: JSX.Element[];
  title?: string;
  titleSize?: number;
  wrapItemTailwindStyles?: string;
}

export const Table: FC<TableProps> = ({
  title,
  items,
  wrapItemTailwindStyles,
  titleSize = 16,
}) => {
  return (
    <main className="flex flex-col gap-1">
      <h3 className="font-semibold text-lg">{title}</h3>

      <div className="flex flex-wrap">
        {items.map((item, index) => (
          <div key={index} className={`${wrapItemTailwindStyles}`}>
            {item}
          </div>
        ))}
      </div>
    </main>
  );
};
