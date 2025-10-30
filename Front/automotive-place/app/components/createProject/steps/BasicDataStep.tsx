import React, { useEffect } from "react";

export const BasicDataStep = ({ setIsValid }: any) => {
  useEffect(() => {
    setIsValid(true);
  }, [setIsValid]);

  return <div>BasicDataStep</div>;
};
