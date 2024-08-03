"use client";

import { HomeMainContent } from "./HomeMainContent";
import { contentData } from "../utils/data/contentData";

export default function Page() {
  return (
    <main className="w-full items-center">
      <HomeMainContent contentData={contentData} />
    </main>
  );
}
