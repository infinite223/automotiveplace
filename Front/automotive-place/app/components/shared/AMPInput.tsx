import { TValidResult } from "@/app/utils/types";
import { useTranslations } from "next-intl";
import React, { CSSProperties, FC, useState } from "react";

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
  themeOption?: "auto" | "dark" | "white";
  error?: string | null;
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
  themeOption = "auto",
  marginBotton = "mb-5",
  validFunction = () => {
    return [];
  },
  error,
}) => {
  const [localErrorText, setLocalErrorText] = useState("");
  const t = useTranslations();

  const themeAMPButtonStyles = () => {
    if (themeOption === "auto") {
      return "bg-amp-900 dark:bg-amp-0border-gray-300 focus:ring-teal-500 focus:border-teal-500 dark:border-amp-200 dark:placeholder-gray-500 dark:text-white";
    } else if (themeOption === "white") {
      return "bg-white border-gray-300 text-black";
    } else {
      return "bg-black border-gray-800 text-white";
    }
  };

  return (
    <label htmlFor={htmlFor} className={`${marginBotton}`}>
      <span className="font-semibold text-sm">{name}</span>
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
        className={`${additionalTailwindCss} ${themeAMPButtonStyles()} w-full border-b outline-none text-sm block dark:focus:ring-teal-500 dark:focus:border-teal-800 bg-inherit py-3 appearance-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer`}
        placeholder={placeholder}
        required={required}
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
      />
      {localErrorText && (
        <span className="mt-2 text-[11px] text-red-400 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
          {localErrorText}
        </span>
      )}

      {error && (
        <span className="mt-2 text-[11px] text-red-400 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
          {t(error)}
        </span>
      )}
    </label>
  );
};
