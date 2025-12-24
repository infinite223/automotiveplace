import { useTranslations } from "next-intl";
import React, { CSSProperties, FC, useState, useEffect } from "react";
import { TValidResult } from "@/app/utils/types";

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
  validFunction?: (value: string | number) => TValidResult[];
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
  validFunction = () => [],
}) => {
  const t = useTranslations();
  const [touched, setTouched] = useState(false);
  const [localErrorText, setLocalErrorText] = useState<string | null>(null);

  useEffect(() => {
    const firstLocal = validFunction(String(value || ""))[0]?.error ?? null;
    setLocalErrorText(firstLocal);
  }, [value, validFunction]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value as any);

    if (touched) {
      const firstLocal = validFunction(e.target.value)[0]?.error ?? null;
      setLocalErrorText(firstLocal);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    const firstLocal = validFunction(String(value || ""))[0]?.error ?? null;
    setLocalErrorText(firstLocal);
  };

  const errorToShow = touched ? error || localErrorText : null;

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
