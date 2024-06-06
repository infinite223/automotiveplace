"use client";

import Link from "next/link";
import { getGenerateStartData } from "./services/data";
import { AMPButton } from "./components/shared/AMPButton";

export default async function Home() {
  return (
    <main className="flex text-zinc-900 min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-[25px]">AMP</h2>
        <h3 className="text-rose-700 font-extrabold text-[20px]">
          AutoMotive place
        </h3>
      </div>

      <div className="flex flex-col gap-3 items-center justify-center">
        <h2>Pages: </h2>

        <div className="flex flex-wrap gap-2">
          <Link href={"/garage"}>
            <div className="border-blue-400 p-2 rounded-sm border">
              Go to garage
            </div>
          </Link>

          <Link href={"/home"}>
            <div className="border-blue-400 p-2 rounded-sm border">
              Go to home
            </div>
          </Link>
        </div>
      </div>

      <AMPButton
        name="Generate data"
        onClick={getGenerateStartData}
        // disabled={true}
      />

      <div className="flex flex-col"></div>
    </main>
  );
}
