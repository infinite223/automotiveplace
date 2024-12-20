import React, { useState } from "react";

export const LoggerView = () => {
  return (
    <main
      className="flex justify-center bg-amp-000 dark:bg-amp-900 text-sm rounded-md"
      onClick={(e) => e.stopPropagation()}
    ></main>
  );
};
