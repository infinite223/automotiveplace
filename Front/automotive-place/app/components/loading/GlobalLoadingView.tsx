"use client";

import { RootState } from "@/lib/store";
import React from "react";
import { useSelector } from "react-redux";
import { LoadingSpinner } from "./LoadingSpinner";

export const GlobalLoadingView = () => {
  const { isLoading, loadingText } = useSelector(
    (state: RootState) => state.globalLoading
  );
  if (!isLoading) return;

  return (
    <div className="z-[99] fixed flex items-center justify-center w-full h-svh bg-black bg-opacity-80">
      <div role="status" className="flex flex-col gap-3 items-center">
        <LoadingSpinner />
        <span className="sr-only">Loading...</span>
        {loadingText && (
          <h3 className="text-white animate-pulse opacity-70">{loadingText}</h3>
        )}
      </div>
    </div>
  );
};
