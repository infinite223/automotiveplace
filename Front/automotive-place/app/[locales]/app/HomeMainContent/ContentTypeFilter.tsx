"use client";

import React, { useEffect, useState } from "react";
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

const iconSize = iconSizes.small - 4;

export const ContentTypeFilter = ({ active, onChange }: Props) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const parent = document.getElementById("content-container");
    if (!parent) return;

    const handleScroll = () => {
      // Jeśli przewinięcie jest większe niż 44px (tailwind top-44)
      setIsSticky(parent.scrollTop > 44);
    };

    parent.addEventListener("scroll", handleScroll, { passive: true });

    return () => parent.removeEventListener("scroll", handleScroll);
  }, []);

  const iconMap: Record<ContentType | "All", JSX.Element> = {
    All: <FaThLarge size={iconSize} />,
    [ContentType.Project]: <ProjectIcon size={iconSize} />,
    [ContentType.Post]: <PostIcon size={iconSize} />,
    [ContentType.Problem]: <ProblemIcon size={iconSize} />,
    [ContentType.Spot]: <SpotIcon size={iconSize} />,
    [ContentType.Event]: <EventIcon size={iconSize} />,
    [ContentType.Trip]: <TripIcon size={iconSize} />,
  };

  const items: { label: string; type: ContentType | "All" }[] = [
    { label: "Projects", type: ContentType.Project },
    { label: "Posts", type: ContentType.Post },
    { label: "Spots", type: ContentType.Spot },
    { label: "Trips", type: ContentType.Trip },
    { label: "Problems", type: ContentType.Problem },
    { label: "Events", type: ContentType.Event },
    { label: "All", type: "All" },
  ];

  return (
    <div
      className={`
        fixed
        z-[80] bg-black/80 backdrop-blur-md
        md:ml-[-30px]
        w-fit max-w-[100vw] mx-auto flex gap-2 py-3 px-3
        overflow-x-auto no-scrollbar
        transition-all duration-300
        ${isSticky ? "top-0" : "max-md:top-11 md:top-2"}
      `}
    >
      {items.map((item) => {
        const isActive = active === item.type;

        return (
          <button
            key={item.type}
            type="button"
            onClick={() => onChange(item.type)}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-full whitespace-nowrap
              transition-colors
              ${
                isActive
                  ? "bg-amp-500 text-white"
                  : "bg-amp-200/40 text-amp-700/70 hover:bg-amp-200/70"
              }
            `}
          >
            <span
              className={`flex items-center ${isActive ? "text-white" : "text-amp-700/70"}`}
            >
              {iconMap[item.type]}
            </span>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
