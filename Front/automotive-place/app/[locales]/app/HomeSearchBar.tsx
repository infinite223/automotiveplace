import useDebounce from "@/app/hooks/useDebounce";
import React, { FC, useEffect, useRef, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { HomeSearchBarFilterView } from "./HomeSearchBarFilterView";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";
import useKeyboardShortcut from "../../hooks/useKeydown";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearchBarOpen } from "@/lib/features/searchBar/searchBarSlice";
import { RootState } from "@/lib/store";
import { shortcutConfigs } from "@/app/utils/constants";

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
  const dispatch = useDispatch();
  const tryOnSearch = () => {};
  const [searchValue, setSearchValue] = useState("");
  const { isSearchBarOpen } = useSelector(
    (state: RootState) => state.searchBar
  );
  const inputRef = useRef<any>(null);

  const debouncedSearch = useDebounce(searchValue, 1000);
  const [isFocused, setIsFocused] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [searchTypeOption, setSearchTypeOption] = useState<TSearchTypesOptions>(
    searchTypesOptions[1]
  );

  useEffect(() => {
    if (isSearchBarOpen) {
      openSearchBar();
    } else {
      closeSearchBar();
    }
  }, [isSearchBarOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch(setIsSearchBarOpen(false));
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const openSearchBar = () => {
    setIsFocused(true);
    inputRef.current?.focus();
  };

  const closeSearchBar = () => {
    setIsFocused(false);
    setShowFilterOptions(false);
    inputRef.current?.blur();
  };

  useKeyboardShortcut(() => {
    dispatch(setIsSearchBarOpen(true));
  }, shortcutConfigs.search);
  useKeyboardShortcut(() => {
    dispatch(setIsSearchBarOpen(false));
  }, shortcutConfigs.escape);

  return (
    <main className={`flex w-full flex-col relative`}>
      <div className="flex flex-col items-center gap-3">
        <div
          onClick={() => {
            dispatch(setIsSearchBarOpen(true));
          }}
          onFocus={() => setIsFocused(true)}
          tabIndex={0}
          className={`w-full z-10 bg-amp-900 dark:bg-amp-0rounded-full border flex items-center gap-4 pl-4 pr-3 p-2.5 ${
            isFocused
              ? "border-zinc-500"
              : "border-zinc-300 dark:border-zinc-800"
          } hover:border-zinc-400 focus-within:border-zinc-500`}
        >
          <input
            ref={inputRef}
            onFocus={() => setIsFocused(true)}
            placeholder="Szukaj projektów, wydarzeń, firm, problemów"
            className="outline-none border-gray-300 w-full bg-amp-900 dark:bg-amp-0bg-amp-800 dark:bg-amp-100 text-[13px] focus:ring-teal-500 focus:border-teal-500 block dark:border-zinc-800 dark:placeholder-gray-500 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-800 appearance-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer bg-inherit"
          />
          <LuSearch
            size={22}
            className="bg-amp-800 dark:bg-amp-100 text-red-300 mr-1"
          />
        </div>
        {/* <div
          className={`flex items-center gap-1 bg-amp-800 dark:bg-amp-100 text-[10px] opacity-50 cursor-pointer`}
        >
          {searchTypeOption.name.toUpperCase()}
          <FaLongArrowAltDown />
        </div> */}
      </div>
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            key="searchBarMain"
            className={`flex rounded-md items-start justify-start p-2 pr-3 pl-3 absolute top-[70px] self-center bg-zinc-200 dark:bg-zinc-900 z-30`}
          >
            <div className="flex items-center w-full justify-between">
              <div className="flex w-full gap-3 items-center justify-end">
                {searchTypesOptions.map((type, i) => (
                  <div
                    key={i}
                    onClick={() => setSearchTypeOption(type)}
                    className={`${
                      searchTypeOption.value === type.value
                        ? "text-teal-500"
                        : "text-zinc-500"
                    } text-[14px]  p-1 pr-2 pl-2 hover:text-teal-500 cursor-pointer`}
                  >
                    {type.name}
                  </div>
                ))}

                {showFilterOptions ? (
                  <GoChevronUp
                    size={22}
                    className="hover:opacity-40 cursor-pointer"
                    onClick={() => setShowFilterOptions(false)}
                  />
                ) : (
                  <GoChevronDown
                    size={22}
                    className="hover:opacity-40 cursor-pointer"
                    onClick={() => setShowFilterOptions(true)}
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <HomeSearchBarFilterView
        type={searchTypeOption.value}
        showFilterOptions={showFilterOptions}
      />

      {isFocused && (
        <div
          className="fixed w-full h-full bg-transparent blur-lg left-0 top-0 z-0"
          onClick={() => {
            dispatch(setIsSearchBarOpen(false));
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
  { name: "Projekty", value: SearchTypes.Project },
  { name: "Wydarzenia", value: SearchTypes.Event },
  { name: "Problemy", value: SearchTypes.Problem },
  { name: "Elementy", value: SearchTypes.Element },
  { name: "Firmy", value: SearchTypes.Company },
  { name: "Grupy", value: SearchTypes.Group },
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
