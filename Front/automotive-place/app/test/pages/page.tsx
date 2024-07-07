"use client";

import Link from "next/link";

export default function TestPages() {
  return (
    <main className="flex min-h-screen bg-custom-primary text-custom-primary flex-col items-center gap-2 p-2">
      <main className="flex w-full">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {pages.map((pageName) => (
              <Link href={`/${pageName}`}>
                <div className="border-teal-700 border py-1 p-2 rounded-md text-sm">
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
