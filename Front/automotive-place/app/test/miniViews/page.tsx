"use client";

import { ProjectMiniView } from "@/app/home/HomeMainContent/ProjectMiniView";
import { miniViewsList } from "./miniViewsList";

export default function Page() {
  return (
    <main className="flex min-h-screen bg-custom-primary text-custom-primary flex-col gap-2 p-2">
      <div className="w-[500px]">{miniViewsList.map((data) => data.value)}</div>
    </main>
  );
}
