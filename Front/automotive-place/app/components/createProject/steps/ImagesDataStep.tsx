import React, { useEffect, useState } from "react";
import { AMPTextarea } from "../../shared/AMPTextarea";
import { AMPInput } from "../../shared/AMPInput";
import { IInputValue } from "..";

interface BasicDataStepProps {
  onPrev: () => void;
  setIsValid: (isValid: boolean) => void;
  registerGetData?: (fn: () => unknown) => void;
}

export const ImagesDataStep = ({
  setIsValid,
  registerGetData,
}: BasicDataStepProps) => {
  useEffect(() => {
    setIsValid(true);
  }, [setIsValid]);

  useEffect(() => {
    registerGetData?.(() => ({}));
  }, [registerGetData]);

  return <div className="flex flex-col gap-4"></div>;
};
