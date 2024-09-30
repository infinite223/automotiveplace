import React, { FC } from "react";

interface IAMPSeparator {
  additionalTailwindCss?: string;
}

export const AMPSeparator: FC<IAMPSeparator> = ({ additionalTailwindCss }) => {
  return (
    <div
      className={`${additionalTailwindCss} bg-custom-secendary opacity-65 h-0.5 w-full my-1`}
    />
  );
};
