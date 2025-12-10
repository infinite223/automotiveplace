import { useTranslations } from "next-intl";
import React, { CSSProperties, FC, useState } from "react";

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
  additionalTailwindCss = "",
  inputStyles,
  resize = "resize-none",
  error = null,
}) => {
  const t = useTranslations();
  const [touched, setTouched] = useState(false);

  const safeTranslate = (maybeKeyOrText?: string | null) => {
    if (!maybeKeyOrText) return null;

    const looksLikeLiteral =
      /\s|\(|\)|\{|\}|\[|\]|%|:|,/.test(maybeKeyOrText) ||
      maybeKeyOrText.length > 40;

    if (looksLikeLiteral) return maybeKeyOrText;

    try {
      const translated = t(maybeKeyOrText);
      return translated ?? maybeKeyOrText;
    } catch {
      return maybeKeyOrText;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value as any);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const errorToShow = touched
    ? safeTranslate(errorText ?? null) ?? safeTranslate(error)
    : null;

  return (
    <label htmlFor={htmlFor} className="mb-5">
      <span className="font-semibold text-sm">{name}</span>
      {required && <span className="text-amp-500 ml-1">*</span>}
      <textarea
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        id={id}
        style={inputStyles}
        className={`${additionalTailwindCss} ${resize} w-full border-b outline-none border-gray-300 text-sm focus:ring-amp-800/50 focus:border-amp-800/50 block dark:border-amp-200/70 dark:placeholder-gray-500 dark:text-white/80 dark:focus:ring-amp-900/50 dark:focus:border-amp-900/50 bg-inherit py-3 shadow mt-2 appearance-none peer`}
        placeholder={placeholder}
        required={required}
      />
      {errorToShow && (
        <span className="mt-2 text-[11px] text-red-400">{errorToShow}</span>
      )}
    </label>
  );
};
