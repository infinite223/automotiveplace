"use client";

import { miniViewsList } from "./miniViewsList";

export default function Page() {
  return (
    <main className="flex min-h-screen bg-amp-900 dark:bg-amp-0bg-amp-000 dark:bg-amp-900 flex-col gap-2 p-2">
      <div className="w-[500px]">{miniViewsList.map((data) => data.value)}</div>
    </main>
  );
}
