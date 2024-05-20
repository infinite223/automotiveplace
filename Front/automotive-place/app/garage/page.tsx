"use client";

import {useEffect, useRef, useState} from "react";
import {carItems} from "../utils/data/carItem";
import {CarItem} from "../components/carItem";
import {TCarItem, TTableView} from "../utils/types";
import {AMPTable} from "../components/shared/AMPTable";
import {FaListUl} from "react-icons/fa6";
import {FiGrid} from "react-icons/fi";
import {BiSolidCarGarage} from "react-icons/bi";
import useOnScreen from "../hooks/useOnScreen";
import AMPModal from "../components/shared/AMPModal";
import {AMPInput} from "../components/shared/AMPInput";
import {CreateCarItemView} from "../components/createCarItem";

export default function Garage() {
  const [isLoading, setIsLoading] = useState(true);
  const [carItemsData, setCarItemsData] = useState<TCarItem[]>(carItems);
  const [tableView, setTableView] = useState<TTableView>("elements");
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (isVisible) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setCarItemsData((prevCarItemsData) => [
          ...prevCarItemsData,
          ...carItems,
        ]);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }

    setIsLoading(false);
  }, [isVisible]);

  const onSearch = (value: string) => {
    console.log("value", value);
  };

  return (
    <main className="flex min-h-screen bg-custom-primary text-custom-primary flex-col items-center gap-2 p-2">
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center gap-3">
          <BiSolidCarGarage size={26} />
          <h1 className="font-extrabold text-[25px]">Garage</h1>
        </div>

        <button onClick={openModal}>Create car item </button>

        {isModalOpen && (
          <AMPModal
            onClose={closeModal}
            withHeader={true}
            title="Dodawanie elementu"
          >
            <CreateCarItemView />
          </AMPModal>
        )}
      </div>

      <div className="flex w-full">
        <AMPTable
          onSearch={onSearch}
          isLoading={isLoading}
          searchOptions={{query: "", type: "local"}}
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
              isLoading={isLoading}
            />
          ))}
          title="Podzespoły projektu"
        />
      </div>
    </main>
  );
}
