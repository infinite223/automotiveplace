"use client";

import React, { FC } from "react";

interface IAMPButton {
  name?: string;
  onClick?: () => void;
  disabled?: boolean;
  additionalTailwindCss?: string;
  type?: "primary" | "secondary" | "tertiary" | "none";
  icon?: React.ReactNode;
  isSubmit?: boolean;
}

const buttonTypeClasses = {
  primary: "bg-amp-500 text-white p-1.5 px-3 rounded-sm",
  secondary: "bg-amp-300 text-white p-1.5 px-3 rounded-sm",
  tertiary: " text-white p-1.5 px-3 rounded-sm",
  none: "p-1.5 px-3",
};

export const AMPButton: FC<IAMPButton> = ({
  name,
  onClick,
  disabled,
  additionalTailwindCss,
  type = "primary",
  isSubmit = false,
  icon,
}) => {
  const typeClass = buttonTypeClasses[type];

  return (
    <button
      disabled={disabled}
      type={isSubmit ? "submit" : "button"}
      onClick={onClick}
      className={`${disabled ? "opacity-35" : ""} ${typeClass} ${additionalTailwindCss} hover:opacity-70 flex items-center rounded-[3px]`}
    >
      {icon && <span className={name ? "mr-2" : ""}>{icon}</span>}
      {name}
    </button>
  );
};
