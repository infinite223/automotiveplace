"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function TestNavigation() {
  const pathname = usePathname();
  console.log(pathname, "tutaj");
  return (
    <nav className="flex flex-col gap-2 w-full p-2">
      <h1 className="text-lg">Page for testing</h1>
      <div className="flex flex-wrap gap-2">
        {options.map(({ name, path }, id) => (
          <Link
            key={id}
            href={path}
            className={`border {${path === pathname ? " border border-teal-700" : " border border-zinc-700"}  py-1 p-2 rounded-sm text-sm cursor-pointer`}
          >
            {name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default TestNavigation;

const options = [
  {
    name: "Pages",
    path: "/test",
  },
  {
    name: "Components",
    path: "/test/components",
  },
  {
    name: "Tests",
    path: "/test/tests",
  },
  {
    name: "MiniViews",
    path: "/test/miniViews",
  },
];
