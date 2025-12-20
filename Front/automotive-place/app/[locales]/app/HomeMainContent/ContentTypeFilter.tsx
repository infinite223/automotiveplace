"use client";

import React from "react";
import { ContentType } from "@/app/utils/enums";

import { FaThLarge } from "react-icons/fa";
import {
  EventIcon,
  iconSizes,
  PostIcon,
  ProblemIcon,
  ProjectIcon,
  SpotIcon,
  TripIcon,
} from "@/app/utils/constants";

type Props = {
  active: ContentType | "All";
  onChange: (type: ContentType | "All") => void;
};

export const ContentTypeFilter = ({ active, onChange }: Props) => {
  const iconMap: Record<ContentType | "All", JSX.Element> = {
    All: <FaThLarge size={iconSizes.small} />,
    [ContentType.Project]: <ProjectIcon size={iconSizes.small} />,
    [ContentType.Post]: <PostIcon size={iconSizes.small} />,
    [ContentType.Problem]: <ProblemIcon size={iconSizes.small} />,
    [ContentType.Spot]: <SpotIcon size={iconSizes.small} />,
    [ContentType.Event]: <EventIcon size={iconSizes.small} />,
    [ContentType.Trip]: <TripIcon size={iconSizes.small} />,
  };

  const items: { label: string; type: ContentType | "All" }[] = [
    { label: "Project", type: ContentType.Project },
    { label: "Post", type: ContentType.Post },
    { label: "Problem", type: ContentType.Problem },
    { label: "Spot", type: ContentType.Spot },
    { label: "Event", type: ContentType.Event },
    { label: "Trips", type: ContentType.Trip },
    { label: "All", type: "All" },
  ];

  return (
    <div className="flex gap-1 py-3 w-full overflow-x-auto no-scrollbar mt-2">
      {items.map((item) => {
        const isActive = active === item.type;

        return (
          <button
            key={item.type}
            type="button"
            onClick={() => onChange(item.type)}
            className="flex flex-col items-center min-w-[70px] group"
          >
            <div
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all
      ${isActive ? "border-amp-700/60" : "border-amp-200"}
      group-hover:border-amp-700/80`}
            >
              <div
                className={`transition-colors
        ${isActive ? "text-amp-700/80" : "text-amp-700/60"}
        group-hover:text-amp-700/80`}
              >
                {iconMap[item.type]}
              </div>
            </div>

            <span
              className={`text-xs mt-1 transition-colors
      ${isActive ? "text-white" : "text-amp-700/60"}
      group-hover:text-amp-700/80`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
