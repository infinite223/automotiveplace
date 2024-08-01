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
}) => {
  return (
    <label htmlFor={htmlFor} className="mb-5">
      <span>{name}</span>
      <textarea
        name={name}
        value={value}
        onChange={(text) => setValue(text.target.value)}
        id={id}
        style={inputStyles}
        className={`${additionalTailwindCss} ${resize} w-full bg-custom-primary rounded border-b outline-none border-gray-300 text-custom-secendary text-sm focus:ring-teal-500 focus:border-teal-500 block dark:border-gray-800 dark:placeholder-gray-500 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-800bg-inherit p-3 shadow mt-2 appearance-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer`}
        placeholder={placeholder}
        required={required}
      />
      {errorText && (
        <span className="mt-2 text-[11px] text-red-600 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
          {errorText}
        </span>
      )}
    </label>
  );
};
