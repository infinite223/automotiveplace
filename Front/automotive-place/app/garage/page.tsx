"use client";

import {useEffect, useState} from "react";
import {carItems} from "../utils/data/carItem";
import {CarItem} from "../components/carItem";
import {Table} from "../components/table";
import {TCarItem} from "../utils/types";

export default function Garage() {
  const [isLoading, setIsLoading] = useState(true);
  const [carItemsData, setCarItemsData] = useState<TCarItem[]>(carItems);

  useEffect(() => {
    setTimeout(() => {
      setCarItemsData(carItems);
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <main className="flex min-h-screen text-zinc-900 flex-col items-center justify-between p-24">
      <h1 className="font-extrabold text-[25px]">Garage</h1>

      <div className="flex">
        <Table
          wrapItemTailwindStyles="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 max-w-sm"
          titleSize={20}
          items={carItemsData.map((data, id) => (
            <CarItem
              lineClamp={2}
              key={id}
              data={data}
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
