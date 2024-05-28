import React, {FC} from "react";

interface IAMPSelect<TValue> {
  value: TValue;
  setValue: (value: TValue) => void;
  options: {label: string; value: TValue}[];
}

export const AMPSelect: FC<IAMPSelect<string | number>> = ({
  value,
  setValue,
  options,
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
        Rodzaj elementu:
      </label>
      <select
        id="amp-select"
        className="w-full bg-custom-primary border-b outline-none border-gray-300 text-custom-secend text-sm focus:ring-teal-500 focus:border-teal-500 block dark:border-gray-800 dark:placeholder-gray-500 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-800bg-inherit p-3 shadow mt-2 appearance-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
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
  );
};
