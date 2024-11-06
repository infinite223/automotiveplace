"use client";

import { useRouter } from "next/router";

export default function Project({ params }: { params: { id: string } }) {
  // get full data about project fronm db
  return (
    <main className="flex w-full min-h-screen text-custom-primary flex-col items-center gap-2 p-2">
      <h2>Projekt</h2>

      {params.id}
    </main>
  );
}
