import { TValidResult } from "@/app/utils/types";
import React, { CSSProperties, FC, useEffect, useState } from "react";

interface IAMPInput<TValue> {
  value: TValue;
  setValue: (value: TValue) => void;
  htmlFor?: string;
  type?: React.HTMLInputTypeAttribute;
  name: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  additionalTailwindCss?: string;
  inputStyles?: CSSProperties;
  marginBotton?: string;
  validFunction?: (value: string | number) => TValidResult[];
}

export const AMPInput: FC<IAMPInput<string | number>> = ({
  setValue,
  value,
  type = "text",
  htmlFor = "",
  name,
  id = name,
  placeholder,
  required = false,
  additionalTailwindCss,
  inputStyles,
  marginBotton = "mb-5",
  validFunction = () => {
    return [];
  },
}) => {
  const [localErrorText, setLocalErrorText] = useState("");

  // useEffect(() => {
  //   if (validFunction) {
  //     setLocalErrorText(validFunction(value).error);
  //   }
  // }, [value]);

  return (
    <label htmlFor={htmlFor} className={`${marginBotton}`}>
      <span className="font-light text-sm">{name}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(text) => {
          setValue(text.target.value);
          setLocalErrorText(validFunction(text.target.value)[0]?.error);
        }}
        id={id}
        style={inputStyles}
        className={`${additionalTailwindCss} w-full bg-custom-primary border-b outline-none border-gray-300 text-custom-secendary text-sm focus:ring-teal-500 focus:border-teal-500 block dark:border-zinc-800 dark:placeholder-gray-500 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-800bg-inherit py-3 appearance-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer`}
        placeholder={placeholder}
        required={required}
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
      />
      {localErrorText && (
        <span className="mt-2 text-[11px] text-red-400 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
          {localErrorText}
        </span>
      )}
    </label>
  );
};
