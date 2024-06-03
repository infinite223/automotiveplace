"use client";

import { HomeHeader } from "./HomeHeader";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-custom-primary text-custom-primary flex-col items-center gap-2 p-2">
      <HomeHeader />
    </main>
  );
}
