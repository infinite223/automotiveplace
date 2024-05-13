"use client";

import {useEffect, useState} from "react";
import {carItems} from "../utils/data/carItem";
import {CarItem} from "../components/carItem";
import {TCarItem, TTableView} from "../utils/types";
import {AMPTable} from "../components/shared/AMPTable";
import {FaListUl} from "react-icons/fa6";
import {FiGrid} from "react-icons/fi";
import {BiSolidCarGarage} from "react-icons/bi";

export default function Garage() {
  const [isLoading, setIsLoading] = useState(true);
  const [carItemsData, setCarItemsData] = useState<TCarItem[]>(carItems);
  const [tableView, setTableView] = useState<TTableView>("elements");

  useEffect(() => {
    setTimeout(() => {
      setCarItemsData(carItems);
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <main className="flex min-h-screen bg-custom-primary text-custom-primary flex-col items-center gap-2 p-2">
      <div className="flex items-center gap-3 w-full">
        <BiSolidCarGarage size={26} />
        <h1 className="font-extrabold text-[25px]">Garage</h1>
      </div>

      <div className="flex w-full">
        <AMPTable
          searchOptions={{query: "", type: "local"}}
          wrapItemTailwindStyles={`w-full ${
            tableView === "elements" &&
            "sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 max-w-sm"
          }`}
          titleSize={20}
          tableView={tableView}
          headerOptions={[
            <div
              className="cursor-pointer"
              key="1"
              onClick={() =>
                setTableView(tableView === "elements" ? "rows" : "elements")
              }
            >
              {tableView === "rows" ? (
                <FiGrid size={19} />
              ) : (
                <FaListUl size={18} />
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
