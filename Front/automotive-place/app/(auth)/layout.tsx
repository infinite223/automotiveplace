"use client";

import Image from "next/image";
import { DevLogin } from "../components/devLogin";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen bg-custom-primary text-custom-primary w-full justify-between font-inter">
      <DevLogin />
      <div className="flex items-center justify-center w-3/5 bg-gradient-to-tl from-slate-600 via-teal-100/50 to-neutral-900 h-screen"></div>
      <div className="flex flex-col items-center w-2/5 justify-center">
        {children}
      </div>
    </main>
  );
}
