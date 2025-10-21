"use client";

import { CarItem } from "@/app/components/carItem";
import { CreateCarItemView } from "@/app/components/createCarItem";
import AMPModal from "@/app/components/shared/AMPModal";
import { AMPTable } from "@/app/components/shared/AMPTable";
import useOnScreen from "@/app/hooks/useOnScreen";
import { getAllCarItems } from "@/app/services/carItem";
import { TTableView } from "@/app/utils/types";
import Link from "next/link";
import { carItems as initialCarItems } from "../../../app/utils/data/carItem";

import { useEffect, useRef, useState } from "react";
import { TCarItem } from "@/app/utils/types/carItem";
import { BiSolidCarGarage } from "react-icons/bi";
import { FaListUl } from "react-icons/fa";
import { FiGrid } from "react-icons/fi";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [carItemsData, setCarItemsData] = useState<TCarItem[]>([]);
  const [loadingItems, setLoadingItems] = useState<TCarItem[]>([]);
  const [hasMore, setHasMore] = useState<null | boolean>(null);
  const [tableView, setTableView] = useState<TTableView>("elements");
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const loadMoreItems = async () => {
    setLoadingItems([...initialCarItems, ...initialCarItems]);
    setIsLoading(true);

    // const carItems: any = await getAllCarItems();
    // setHasMore(carItems.hasMore);

    // if (carItemsData.length == 0) {
    //   setCarItemsData(carItems.data);
    // } else {
    //   setCarItemsData((prevCarItemsData) => [
    //     ...prevCarItemsData,
    //     ...carItems.data,
    //   ]);
    // }

    // setLoadingItems([]);
    // setIsLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (carItemsData.length === 0 && hasMore === null) {
      loadMoreItems();
    }
  }, [carItemsData, hasMore]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    console.log("isVisible", isVisible);
    if (isVisible && hasMore === true) {
      loadMoreItems();
    }
  }, [isVisible, hasMore]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const checkIfScreenIsFilled = () => {
      if (
        document.documentElement.scrollHeight <= window.innerHeight &&
        hasMore === true
      ) {
        loadMoreItems();
      }
    };

    checkIfScreenIsFilled();
  }, [carItemsData, hasMore]);

  const onSearch = (value: string) => {
    console.log("value", value);
  };

  return (
    <main className="flex min-h-screen bg-amp-900 dark:bg-amp-0bg-amp-000 dark:bg-amp-900 flex-col items-center gap-2 p-2">
      {/* <Notification /> */}
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center gap-3">
          <BiSolidCarGarage size={26} />
          <h1 className="font-extrabold text-[25px]">Garage</h1>
        </div>

        <button onClick={openModal}>Create car item </button>

        <AMPModal
          onClose={closeModal}
          visible={isModalOpen}
          withHeader={true}
          title="Dodawanie elementu"
          additionalTailwindCss="border-custom-secendary border-2"
        >
          <CreateCarItemView />
        </AMPModal>
      </div>

      <div className="flex w-full">
        {/* <AMPTable
          onSearch={onSearch}
          isLoading={isLoading}
          searchOptions={{ query: "", type: "local" }}
          wrapItemTailwindStyles={`w-full ${
            tableView === "elements" &&
            "sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 max-w-sm"
          }`}
          titleSize={20}
          tableView={tableView}
          footerRef={ref}
          headerOptions={[
            <div
              className="cursor-pointer visible max-sm:hidden"
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
              isLoading={false}
              showFullView={false}
            />
          ))}
          loadingItems={loadingItems.map((data, id) => (
            <CarItem
              lineClamp={2}
              key={id}
              data={data}
              tableView={tableView}
              addCarItemTailwindStyles="m-1"
              isLoading={true}
            />
          ))}
          title="Podzespoły projektu"
        /> */}
      </div>
    </main>
  );
}

const pages = [
  "garage",
  "home",
  "project",
  "profile",
  "problem",
  "event",
  "spot",
  "settings",
];
