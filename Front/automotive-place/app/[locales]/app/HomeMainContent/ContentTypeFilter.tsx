"use client";

import React from "react";
import { ContentType } from "@/app/utils/enums";

import {
  FaTools,
  FaRegCommentDots,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaThLarge,
} from "react-icons/fa";
import { iconSizes } from "@/app/utils/constants";

type Props = {
  active: ContentType | "All";
  onChange: (type: ContentType | "All") => void;
};

export const ContentTypeFilter = ({ active, onChange }: Props) => {
  const iconMap: Record<ContentType | "All", JSX.Element> = {
    All: <FaThLarge size={iconSizes.small} />,
    [ContentType.Project]: <FaTools size={iconSizes.small} />,
    [ContentType.Post]: <FaRegCommentDots size={iconSizes.small} />,
    [ContentType.Problem]: <FaExclamationTriangle size={iconSizes.small} />,
    [ContentType.Spot]: <FaMapMarkerAlt size={iconSizes.small} />,
    [ContentType.Event]: <FaMapMarkerAlt size={iconSizes.small} />,
  };

  const items: { label: string; type: ContentType | "All" }[] = [
    { label: "All", type: "All" },
    { label: "Project", type: ContentType.Project },
    { label: "Post", type: ContentType.Post },
    { label: "Problem", type: ContentType.Problem },
    { label: "Spot", type: ContentType.Spot },
  ];

  return (
    <div className="flex gap-3 py-3 w-full overflow-x-auto no-scrollbar mt-2">
      {items.map((item) => {
        const isActive = active === item.type;

        return (
          <button
            key={item.type}
            type="button"
            onClick={() => onChange(item.type)}
            className="flex flex-col items-center min-w-[70px]"
          >
            <div
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all
              ${isActive ? "border-amp-700/60" : "border-amp-200 "}`}
            >
              <div
                className={`${isActive ? "text-amp-700/80" : "text-amp-700/60"}`}
              >
                {iconMap[item.type]}
              </div>
            </div>

            <span
              className={`text-xs mt-1 ${
                isActive ? "text-white" : "text-amp-700/60"
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
