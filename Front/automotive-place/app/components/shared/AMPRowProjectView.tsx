"use client";

import React, { FC } from "react";

interface IAMPButton {
  name: string;
  onClick: () => void;
  disabled?: boolean;
}

export const AMPRowProjectView: FC<IAMPButton> = ({
  name,
  onClick,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${disabled ? "opacity-35" : ""}`}
    >
      {name}
    </button>
  );
};
