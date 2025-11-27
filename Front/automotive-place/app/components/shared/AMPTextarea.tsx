import { useTranslations } from "next-intl";
import React, { CSSProperties, FC } from "react";

interface IAMPTextarea<TValue> {
  value: TValue;
  setValue: (value: TValue) => void;
  htmlFor?: string;
  name: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  errorText?: string | null;
  additionalTailwindCss?: string;
  inputStyles?: CSSProperties;
  resize?: "resize-y" | "resize-none";
  error?: string | null;
}

export const AMPTextarea: FC<IAMPTextarea<string | number>> = ({
  errorText,
  setValue,
  value,
  htmlFor = "",
  name,
  id = name,
  placeholder,
  required = false,
  additionalTailwindCss,
  inputStyles,
  resize = "resize-none",
  error = null,
}) => {
  const t = useTranslations();

  return (
    <label htmlFor={htmlFor} className="mb-5">
      <span>{name}</span>
      <textarea
        name={name}
        value={value}
        onChange={(text) => setValue(text.target.value)}
        id={id}
        style={inputStyles}
        className={`${additionalTailwindCss} ${resize} w-full border-b outline-none border-gray-300 text-sm focus:ring-amp-800/50 focus:border-amp-800/50 block dark:border-amp-200/70 dark:placeholder-gray-500 dark:text-white/80 dark:focus:ring-amp-900/50 dark:focus:border-amp-900/50 bg-inherit py-3 shadow mt-2 appearance-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer`}
        placeholder={placeholder}
        required={required}
      />
      {errorText && (
        <span className="mt-2 text-[11px] text-red-600 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
          {errorText}
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
