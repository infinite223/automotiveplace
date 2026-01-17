import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { TValidResult } from "@/app/utils/types";
import { FiChevronDown } from "react-icons/fi";

interface IAMPSelect<TValue> {
  value: TValue;
  setValue: (value: TValue) => void;
  options: { label: string; value: TValue }[];
  title: string;
  leftIcon?: JSX.Element;
  id?: string;
  required?: boolean;
  additionalTailwindCss?: string;
  selectStyles?: CSSProperties;
  marginBottom?: string;
  validFunction?: (value: TValue) => TValidResult[];
  error?: string | null;
}

export const AMPSelect = <TValue extends string | number>({
  value,
  setValue,
  options,
  title,
  leftIcon,
  id = title,
  required = false,
  additionalTailwindCss,
  selectStyles,
  marginBottom = "mb-5",
  validFunction = () => [],
  error,
}: IAMPSelect<TValue>) => {
  const [localError, setLocalError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const firstLocal = validFunction(value)[0]?.error ?? null;
    setLocalError(firstLocal);
  }, [value, validFunction]);

  const handleSelect = (val: TValue) => {
    setValue(val);
    setOpen(false);
    const firstLocal = validFunction(val)[0]?.error ?? null;
    setLocalError(firstLocal);
  };

  const errorToShow = touched ? localError || error : null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`${marginBottom} relative inline-block w-full`}
      ref={containerRef}
    >
      <span className="font-semibold text-sm">{title}</span>
      {required && <span className="text-amp-500 ml-1">*</span>}

      <div className="mt-1 cursor-pointer">
        <div
          className="flex items-center justify-between w-full bg-amp-800 dark:bg-amp-50 border-b border-amp-300 dark:border-amp-200 px-3 py-2"
          onClick={() => setOpen(!open)}
        >
          <div className="flex items-center gap-2">
            {leftIcon && <div className="w-8">{leftIcon}</div>}
            <span>
              {options.find((opt) => opt.value == value)?.label || "Wybierz..."}
            </span>
          </div>
          <FiChevronDown size={16} className="text-gray-400" />
        </div>

        {open && (
          <div className="absolute top-full left-0 w-full bg-amp-800 dark:bg-amp-50 border border-amp-300 dark:border-amp-200 rounded-sm shadow-lg max-h-60 overflow-auto custom-scrollbar z-[101]">
            {options.map((opt) => {
              const isSelected = opt.value == value;
              return (
                <div
                  key={opt.value.toString()}
                  onClick={() => handleSelect(opt.value)}
                  className={`px-3 py-2 cursor-pointer hover:bg-amp-700 dark:hover:bg-amp-200 ${
                    isSelected ? "bg-amp-700 dark:bg-amp-100 font-semibold" : ""
                  }`}
                >
                  {opt.label}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {errorToShow && (
        <span className="mt-1 text-[11px] text-amp-500">{errorToShow}</span>
      )}
    </div>
  );
};
