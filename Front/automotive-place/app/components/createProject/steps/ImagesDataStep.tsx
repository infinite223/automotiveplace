import React, { useEffect } from "react";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    registerGetData?.(() => ({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="flex flex-col gap-4"></div>;
};
