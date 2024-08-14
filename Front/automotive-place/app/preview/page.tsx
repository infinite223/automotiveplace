import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex h-screen flex-col items-center gap-8 justify-center">
      <h1 className="text-5xl font-bold">
        <span className="text-baseColor-secendary">Automotive</span> place
      </h1>
      <div className="flex gap-4">
        <Link
          href={"/sign-up"}
          className="border-zinc-600 border-2 py-1.5 px-4 rounded-sm text-sm"
        >
          Utwórz konto
        </Link>
        <Link
          href={"/sign-in"}
          className="bg-baseColor-secendary text-white py-1.5 px-4 rounded-sm text-sm"
        >
          Zaloguj się
        </Link>
      </div>
    </div>
  );
}
