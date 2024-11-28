"use client";

import { DevLogin } from "../../components/devLogin";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter bg-gradient-to-tl from-white via-amp-900 to-amp-500/30">
      <div className="flex items-center justify-center lg:w-3/5 w-0  h-screen"></div>
      <div className="flex flex-col items-center lg:w-2/5 w-full justify-center">
        {children}
      </div>
    </main>
  );
}
