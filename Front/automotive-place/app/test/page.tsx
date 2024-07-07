"use client";

import Link from "next/link";
import { CarItem } from "../components/carItem";
import { AMPSeparator } from "../components/shared/AMPSeparator";

export default function Test() {
  return (
    <main className="flex min-h-screen bg-custom-primary text-custom-primary flex-col items-center gap-2 p-2">
      <nav className="flex flex-col gap-2 w-full">
        <h1 className="text-lg">Page for testing</h1>
        <div className="flex flex-wrap gap-2">
          {options.map(({ name }) => (
            <div className="border-zinc-700 border py-1 p-2 rounded-md text-sm cursor-pointer">
              {name}
            </div>
          ))}
        </div>
      </nav>
      <AMPSeparator />
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

const options = [
  {
    name: "Pages",
  },
  {
    name: "Components",
  },
  {
    name: "Tests",
  },
  {
    name: "MiniViews",
  },
];

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
