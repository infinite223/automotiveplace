"use client";

import Link from "next/link";

export default function Test() {
  return (
    <main className="flex bg-custom-primary text-custom-primary flex-col items-center gap-2 p-2">
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
  "Garage",
  "Home",
  "Project",
  "Profile",
  "Problem",
  "Wydarzenie",
  "Spot",
  "Settings",
];
