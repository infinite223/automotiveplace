import React, { CSSProperties, FC } from "react";

interface IAMPSwitch {
  value: boolean;
  setValue: (value: boolean) => void;
  name: string;
  id?: string;
  required?: boolean;
  additionalTailwindCss?: string;
  inputStyles?: CSSProperties;
}

export const AMPSwitch: FC<IAMPSwitch> = ({
  setValue,
  value,
  name,
  id = name,
  required = false,
  additionalTailwindCss,
  inputStyles,
}) => {
  return (
    <label className="inline-flex items-center justify-between cursor-pointer gap-2 w-full">
      <span className="text-[13px] font-medium text-custom-primary leading-4">
        {name}
      </span>
      <input
        type="checkbox"
        onChange={() => setValue(!value)}
        checked={value}
        className="sr-only peer"
        style={inputStyles}
      />
      <div
        className={`${additionalTailwindCss} relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-600 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600`}
      ></div>
    </label>
  );
};
