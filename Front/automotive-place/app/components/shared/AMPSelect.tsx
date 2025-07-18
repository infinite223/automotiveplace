import React, { FC } from "react";

interface IAMPSelect<TValue> {
  value: TValue;
  setValue: (value: TValue) => void;
  options: { label: string; value: TValue }[];
  title: string;
  leftIcon?: JSX.Element;
}

export const AMPSelect: FC<IAMPSelect<string | number>> = ({
  value,
  setValue,
  options,
  title,
  leftIcon,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <label
        htmlFor="amp-select"
        className="block text-sm font-medium text-gray-900 dark:text-white"
      >
        {title}
      </label>
      <div className="flex items-center gap-2">
        <div className="w-10">{leftIcon}</div>
        <select
          id="amp-select"
          className="w-full dark:bg-amp-0border-b outline-none border-gray-300 bg-amp-800 dark:bg-amp-100 text-sm focus:ring-amp-500 focus:border-teal-500 block dark:border-gray-800 dark:placeholder-gray-500 dark:text-white dark:focus:ring-amp-500 bg-inherit p-3 shadow mt-2 appearance-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
            <option
              key={option.value.toString()}
              value={option.value}
              className="rounded-none"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
