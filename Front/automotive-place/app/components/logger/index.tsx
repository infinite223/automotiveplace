import React, { useState } from "react";

export const LoggerView = () => {
  return (
    <main
      className="flex justify-center text-custom-primary text-sm rounded-md"
      onClick={(e) => e.stopPropagation()}
    ></main>
  );
};
