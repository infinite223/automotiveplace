import useDebounce from "@/app/hooks/useDebounce";
import React, { FC, useEffect, useState } from "react";

interface AMPSearchProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  additionalOptions?: JSX.Element;
  isLoading: boolean;
}

export const AMPSearch: FC<AMPSearchProps> = ({
  additionalOptions,
  onSearch,
  placeholder = "",
  isLoading,
}) => {
  const tryOnSearch = () => {};
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (debouncedSearch) {
      onSearch(searchValue);
    }
  }, [debouncedSearch]);

  return (
    <main
      className={`flex w-full mb-2 mt-2 ${
        isLoading &&
        "animate-pulse bg-custom-secend text-custom-primary w-full h-7 rounded-md"
      }`}
    >
      {!isLoading && (
        <form className="flex items-center w-full gap-2" action={tryOnSearch}>
          <label className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="mr-2 bg-custom-primary border-b outline-none border-gray-300 text-custom-secend text-sm focus:ring-teal-500 focus:border-teal-500 block w-full ps-10 p-2.5 dark:border-gray-800 dark:placeholder-gray-500 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-800"
              placeholder={placeholder}
              required
              onChange={(text) => setSearchValue(text.target.value)}
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ms-2 text-sm font-medium text-white bg-teal-600 rounded-lg border border-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
      )}

      {!isLoading && <div>{additionalOptions}</div>}
    </main>
  );
};
