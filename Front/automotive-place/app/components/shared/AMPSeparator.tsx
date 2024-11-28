import React, { FC } from "react";

interface IAMPSeparator {
  additionalTailwindCss?: string;
}

export const AMPSeparator: FC<IAMPSeparator> = ({ additionalTailwindCss }) => {
  return (
    <div
      className={`${additionalTailwindCss} bg-amp-700 dark:bg-amp-300 opacity-65 h-0.5 w-full my-1`}
    />
  );
};
