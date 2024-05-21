"use client";

import {getGenerateStartData} from "@/app/services/data";
import React, {FC} from "react";

interface IAMPButton {
  name: string;
}

export const AMPButton: FC<IAMPButton> = ({name}) => {
  return <button onClick={() => getGenerateStartData()}>{name}</button>;
};
