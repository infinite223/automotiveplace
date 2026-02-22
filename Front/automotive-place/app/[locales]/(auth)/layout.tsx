"use client";
import Image from "next/image";
import Logo from "../../../asets/logo_3.png";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-dvh w-full text-black dark:text-white justify-between font-inter bg-gradient-to-tl from-black via-amp-0/95 to-amp-0/90">
      <div className="flex flex-col items-center lg:w-2/5 w-full justify-center">
        {children}
      </div>
    </main>
  );
}
