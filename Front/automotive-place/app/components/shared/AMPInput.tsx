import { TValidResult } from "@/app/utils/types";
import { useTranslations } from "next-intl";
import React, { CSSProperties, FC, useEffect, useState } from "react";
import { createSafeTranslate } from "./createSafeTranslate";

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
  const [localErrorText, setLocalErrorText] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const t = useTranslations();

  const themeAMPButtonStyles = () => {
    if (themeOption === "auto") {
      return "border-gray-300 focus:ring-amp-500 focus:border-amp-500/70 dark:border-amp-200/70 dark:placeholder-gray-500 dark:text-white/80";
    } else if (themeOption === "white") {
      return "bg-none border-gray-300 text-black/80";
    } else {
      return "border-gray-800 text-white/80";
    }
  };

  useEffect(() => {
    const firstLocal = validFunction(String(value || ""))[0]?.error ?? null;
    setLocalErrorText(firstLocal);
  }, [value, validFunction]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as any);
    const firstLocal = validFunction(e.target.value)[0]?.error ?? null;
    setLocalErrorText(firstLocal);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    const firstLocal = validFunction(String(value || ""))[0]?.error ?? null;
    setLocalErrorText(firstLocal);
  };

  const safeTranslate = createSafeTranslate(t);

  const errorToShow = touched ? safeTranslate(error) : null;

  return (
    <label htmlFor={htmlFor} className={`${marginBotton}`}>
      <span className="font-semibold text-sm">{name}</span>
      {required && <span className="text-amp-500 ml-1">*</span>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        id={id}
        style={inputStyles}
        className={`${themeAMPButtonStyles()} ${additionalTailwindCss} w-full border-b mt-1 outline-none text-sm block dark:focus:ring-amp-900/50 dark:focus:border-amp-900/50 bg-inherit py-2 appearance-none peer`}
        placeholder={placeholder}
        required={required}
      />
      {errorToShow && (
        <span className="mt-2 text-[11px] text-red-400">{errorToShow}</span>
      )}
    </label>
  );
};
