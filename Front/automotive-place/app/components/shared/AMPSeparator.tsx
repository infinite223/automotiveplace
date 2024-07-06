import React, { FC } from "react";

interface IAMPSeparator {
  additionalTailwindCss?: string;
}

export const AMPSeparator: FC<IAMPSeparator> = ({ additionalTailwindCss }) => {
  return (
    <div
      className={`${additionalTailwindCss} bg-custom-secend h-0.5 w-full my-1`}
    />
  );
};
