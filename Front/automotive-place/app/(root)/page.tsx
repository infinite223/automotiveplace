"use client";

import { HomeMainContent } from "./HomeMainContent";
import { contentData } from "../utils/data/contentData";

export default function Page() {
  return (
    <div className="flex w-full items-center justify-center">
      <HomeMainContent contentData={contentData} />
    </div>
  );
}
