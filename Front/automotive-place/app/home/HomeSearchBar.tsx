"use client";

import useDebounce from "@/app/hooks/useDebounce";
import React, { FC, useEffect, useState } from "react";
import { AMPInput } from "../components/shared/AMPInput";
import { LuSearch } from "react-icons/lu";

interface HomeSearchBarProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  additionalOptions?: JSX.Element;
  isLoading: boolean;
}

export const HomeSearchBar: FC<HomeSearchBarProps> = ({
  additionalOptions,
  onSearch,
  placeholder = "",
  isLoading,
}) => {
  const tryOnSearch = () => {};
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 1000);

  //   useEffect(() => {
  //     if (debouncedSearch) {
  //       onSearch(searchValue);
  //     }
  //   }, [debouncedSearch]);

  return (
    <main className={`flex w-full `}>
      {/* <AMPInput
        name=""
        placeholder="Szukaj projektów, wydarzeń, firm, problemów"
        setValue={(text) => setSearchValue(text.toString())}
        value={searchValue}
        marginBotton="mb-0"
      /> */}

      <div className="w-full bg-custom-primary rounded-full border flex items-center gap-4 border-zinc-800 pl-4 pr-4 p-3">
        <LuSearch
          size={20}
          className="text-custom-secend text-red-300"
          color="gray"
        />
        <input
          onClick={() => {}}
          placeholder="Szukaj projektów, wydarzeń, firm, problemów"
          className={`outline-none border-gray-300 rounded-full bg-custom-primary text-custom-secend text-sm focus:ring-teal-500 focus:border-teal-500 block dark:border-zinc-800 dark:placeholder-gray-500 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-800bg-inherit appearance-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer`}
        />
      </div>
      {/* 
      <div className="flex items-center w-full justify-between">
        <div className="flex flex-wrap gap-1 w-3/6">
          {searchOptions.map((option, i) => (
            <div
              key={i}
              className="text-[11px] rounded-full bg-custom-secend p-1 pr-2 pl-2"
            >
              {option.name}
            </div>
          ))}
        </div>
      </div> */}
    </main>
  );
};

const searchOptions = [
  { name: "Wszystko" },
  { name: "Projekt" },
  { name: "Wydarzenie" },
  { name: "Problem" },
  { name: "Element" },
  { name: "Firma" },
  { name: "Grupa" },
];
