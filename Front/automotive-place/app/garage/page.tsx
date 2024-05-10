"use client";

import {useEffect, useState} from "react";
import {carItems} from "../utils/data/carItem";
import {CarItem} from "../components/carItem";
import {TCarItem} from "../utils/types";
import {AMPTable} from "../components/shared/AMPTable";
import {FaListUl} from "react-icons/fa6";
import {BsGrid3X2GapFill} from "react-icons/bs";
import {BsGrid} from "react-icons/bs";

export default function Garage() {
  const [isLoading, setIsLoading] = useState(true);
  const [carItemsData, setCarItemsData] = useState<TCarItem[]>(carItems);
  const [tableView, setTableView] = useState<"elements" | "rows">("elements");
  useEffect(() => {
    setTimeout(() => {
      setCarItemsData(carItems);
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <main className="flex min-h-screen text-zinc-900 flex-col items-center gap-2 p-24">
      <h1 className="font-extrabold text-[25px]">Garage</h1>

      <div className="flex">
        <AMPTable
          wrapItemTailwindStyles={`w-full ${
            tableView === "elements" &&
            "sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 max-w-sm"
          }`}
          titleSize={20}
          tableView={tableView}
          headerOptions={[
            <div
              className="cursor-pointer"
              onClick={() =>
                setTableView(tableView === "elements" ? "rows" : "elements")
              }
            >
              {tableView === "rows" ? (
                <BsGrid size={20} />
              ) : (
                <FaListUl size={20} />
              )}
            </div>,
          ]}
          items={carItemsData.map((data, id) => (
            <CarItem
              lineClamp={2}
              key={id}
              data={data}
              tableView={tableView}
              addCarItemTailwindStyles="m-1"
              isLoading={isLoading}
            />
          ))}
          title="Podzespoły projektu"
        />
      </div>
    </main>
  );
}
