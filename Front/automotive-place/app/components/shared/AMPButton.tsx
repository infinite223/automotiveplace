"use client";

import React, { FC } from "react";

type ButtonType = "primary" | "secondary" | "tertiary" | "none";

interface IAMPButton {
  name?: string;
  onClick?: () => void;
  disabled?: boolean;
  additionalTailwindCss?: string;
  type?: ButtonType;
  icon?: React.ReactNode;
  isSubmit?: boolean;
}

const buttonTypeClasses: Record<ButtonType, string> = {
  primary: "bg-amp-500 text-white p-1.5 px-3 rounded-sm",
  secondary: "bg-amp-300 text-white p-1.5 px-3 rounded-sm",
  tertiary: "text-white p-1.5 px-3 rounded-sm",
  none: "p-1.5 px-3",
};

export const AMPButton: FC<IAMPButton> = ({
  name,
  onClick,
  disabled = false,
  additionalTailwindCss = "",
  type = "primary",
  isSubmit = false,
  icon,
}) => {
  return (
    <button
      type={isSubmit ? "submit" : "button"}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={`
        ${disabled ? "opacity-35 cursor-not-allowed" : "md:hover:opacity-70"}
        ${buttonTypeClasses[type]}
        ${additionalTailwindCss}
        flex items-center
      `}
    >
      {icon && <span className={name ? "mr-2" : ""}>{icon}</span>}
      {name}
    </button>
  );
};
