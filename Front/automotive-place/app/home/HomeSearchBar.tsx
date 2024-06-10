"use client";

import useDebounce from "@/app/hooks/useDebounce";
import React, { FC, useEffect, useRef, useState } from "react";
import { AMPInput } from "../components/shared/AMPInput";
import { LuSearch } from "react-icons/lu";
import useKeyboardShortcut from "../hooks/useKeydown";
import { HomeSearchBarFilterView } from "./HomeSearchBarFilterView";
import { GoChevronDown } from "react-icons/go";
import { FALSE } from "sass";
import { KeyObject } from "crypto";

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
  const [isFocused, setIsFocused] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [searchTypeOption, setSearchTypeOption] = useState<TSearchTypesOptions>(
    searchTypesOptions[1]
  );

  // const a = useKeyboardShortcut(
  //   () => {
  //     setIsFocused(true);
  //     inputRef.current?.focus();
  //   },
  //   { code: "KeyF", ctrlKey: true }
  // );

  // useEffect(() => {
  //   if (debouncedSearch) {
  //     onSearch(searchValue);
  //   }
  // }, [debouncedSearch]);

  const inputRef = useRef<any>(null);

  useEffect(() => {
    const handleKeydown = (event: any) => {
      if (event.ctrlKey && event.keyCode === 70) {
        event.preventDefault();
        setIsFocused(true);
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <main className={`flex w-full flex-col relative`}>
      <div
        onClick={() => {
          setIsFocused(true);
          inputRef.current?.focus();
        }}
        tabIndex={0}
        className={`w-full bg-custom-primary rounded-sm border flex items-center gap-4 border-zinc-800 pl-3 pr-3 p-3 ${
          isFocused ? "ring-1 ring-zinc-500" : ""
        } hover:ring-1 hover:ring-zinc-500 focus:ring-1 focus:ring-zinc-500`}
      >
        <LuSearch
          size={20}
          className="text-custom-secend text-red-300"
          color="gray"
        />
        <input
          ref={inputRef}
          placeholder="Szukaj projektów, wydarzeń, firm, problemów"
          className="outline-none border-gray-300 w-full bg-custom-primary text-custom-secend text-[13px] focus:ring-teal-500 focus:border-teal-500 block dark:border-zinc-800 dark:placeholder-gray-500 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-800 appearance-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer bg-inherit"
        />
        <div
          className={`text-custom-secend text-[11px]  p-1 pr-2 pl-2 cursor-pointer`}
        >
          {searchTypeOption.name.toUpperCase()}
        </div>
      </div>
      {isFocused && (
        <div
          className={`flex rounded-md items-start justify-start p-2 pr-3 pl-3 absolute top-[70px] self-center bg-zinc-900 z-30`}
        >
          <div className="flex items-center w-full justify-between">
            <div className="flex w-full gap-3 items-center justify-end">
              {searchTypesOptions.map((type, i) => (
                <div
                  key={i}
                  onClick={() => setSearchTypeOption(type)}
                  className={`${searchTypeOption.value === type.value ? "text-teal-500" : "text-zinc-500"} text-[14px]  p-1 pr-2 pl-2 hover:text-teal-500 cursor-pointer`}
                >
                  {type.name}
                </div>
              ))}

              <GoChevronDown
                size={22}
                className="hover:opacity-40 cursor-pointer"
                onClick={() => setShowFilterOptions(!showFilterOptions)}
              />
            </div>
          </div>
        </div>
      )}

      {showFilterOptions && (
        <HomeSearchBarFilterView type={searchTypeOption.value} />
      )}

      {isFocused && (
        <div
          className="fixed w-full h-full bg-transparent blur-lg left-0 top-0"
          onClick={() => {
            setIsFocused(false);
            setShowFilterOptions(false);
          }}
        ></div>
      )}
    </main>
  );
};

export enum SearchTypes {
  All = "All",
  Project = "Project",
  Event = "Event",
  Problem = "Problem",
  Element = "Element",
  Company = "Company",
  Group = "Group",
}

const searchTypesOptions = [
  { name: "Wszystko", value: SearchTypes.All },
  { name: "Projekt", value: SearchTypes.Project },
  { name: "Wydarzenie", value: SearchTypes.Event },
  { name: "Problem", value: SearchTypes.Problem },
  { name: "Element", value: SearchTypes.Element },
  { name: "Firma", value: SearchTypes.Company },
  { name: "Grupa", value: SearchTypes.Group },
];

export type TSearchTypesOptions = {
  name: string;
  value: SearchTypes;
};

export type TSearchTypes =
  | SearchTypes.All
  | SearchTypes.Company
  | SearchTypes.Element
  | SearchTypes.Event
  | SearchTypes.Group
  | SearchTypes.Problem
  | SearchTypes.Project;
