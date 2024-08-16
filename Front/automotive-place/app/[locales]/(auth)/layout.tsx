"use client";

import { DevLogin } from "../../components/devLogin";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen bg-custom-primary text-custom-primary w-full justify-between font-inter">
      <DevLogin />
      <div className="flex items-center justify-center lg:w-3/5 w-0 bg-gradient-to-tl from-slate-600 via-teal-100/50 to-neutral-900 h-screen"></div>
      <div className="flex flex-col items-center lg:w-2/5 w-full justify-center">
        {children}
      </div>
    </main>
  );
}
