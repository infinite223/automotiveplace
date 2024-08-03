"use client";

import React, { FC } from "react";

interface IAMPButton {
  name: string;
  onClick: () => void;
  disabled?: boolean;
  additionalTailwindCss?: string;
}

export const AMPButton: FC<IAMPButton> = ({
  name,
  onClick,
  disabled,
  additionalTailwindCss,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${disabled ? "opacity-35" : ""} ${additionalTailwindCss}`}
    >
      {name}
    </button>
  );
};
