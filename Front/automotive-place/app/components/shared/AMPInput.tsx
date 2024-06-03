import React, { CSSProperties, FC } from "react";

interface IAMPInput<TValue> {
  value: TValue;
  setValue: (value: TValue) => void;
  htmlFor?: string;
  type?: React.HTMLInputTypeAttribute;
  name: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  errorText?: string | null;
  additionalTailwindCss?: string;
  inputStyles?: CSSProperties;
  marginBotton?: string;
}

export const AMPInput: FC<IAMPInput<string | number>> = ({
  errorText,
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
}) => {
  return (
    <label htmlFor={htmlFor} className={`${marginBotton}`}>
      <span>{name}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(text) => setValue(text.target.value)}
        id={id}
        style={inputStyles}
        className={`${additionalTailwindCss} w-full bg-custom-primary rounded border-b outline-none border-gray-300 text-custom-secend text-sm focus:ring-teal-500 focus:border-teal-500 block dark:border-zinc-800 dark:placeholder-gray-500 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-800bg-inherit p-3 shadow mt-2 appearance-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer`}
        placeholder={placeholder}
        required={required}
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
      />
      {errorText && (
        <span className="mt-2 text-[11px] text-red-600 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
          {errorText}
        </span>
      )}
    </label>
  );
};
