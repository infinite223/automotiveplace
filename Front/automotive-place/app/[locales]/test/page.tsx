"use client";

import Link from "next/link";

export default function Page() {
  return (
    <main className="flex bg-amp-900 dark:bg-amp-0bg-amp-000 dark:bg-amp-900 flex-col items-center gap-2 p-2">
      <main className="flex w-full">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {pages.map((pageName, id) => (
              <Link href={`/${pageName}`} key={id}>
                <div
                  className={`border-zinc-700 border py-1 p-2 rounded-sm text-sm`}
                >
                  {pageName}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer></footer>
    </main>
  );
}

const pages = [
  "garage",
  "home",
  "project",
  "profile",
  "problem",
  "event",
  "spot",
  "settings",
];
