"use client";

import { ReactNode } from "react";
import { IconType } from "react-icons";
import { AMPButton } from "./AMPButton";

interface AMPEmptyStateProps {
  icon: IconType;
  title: string;
  description: string;
  isMyProject?: boolean;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

export function AMPEmptyState({
  icon: Icon,
  title,
  description,
  isMyProject,
  buttonLabel,
  onButtonClick,
}: AMPEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 rounded-md bg-amp-900/50 dark:bg-amp-50">
      <Icon size={48} className="mb-4 opacity-20 text-white" />

      <p className="text-lg font-medium text-center px-4 text-white">{title}</p>

      <p className="text-sm opacity-80 mb-6 text-center max-w-[320px] mt-1">
        {description}
      </p>

      {isMyProject && buttonLabel && onButtonClick && (
        <AMPButton
          name={buttonLabel}
          additionalTailwindCss="text-sm px-6"
          onClick={onButtonClick}
        />
      )}
    </div>
  );
}
