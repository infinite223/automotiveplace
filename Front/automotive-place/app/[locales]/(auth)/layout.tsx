"use client";

import Image from "next/image";
import Logo from "../../../asets/logo_2.png";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-dvh w-full justify-between font-inter bg-gradient-to-tl from-white via-amp-900 to-amp-100/10">
      {/* <Image
        src={Logo}
        alt="logo"
        width={75}
        height={75}
        className="rounded-[26%] absolute left-5 top-5"
      /> */}

      <div className="flex flex-col items-center lg:w-2/5 w-full justify-center">
        {children}
      </div>
    </main>
  );
}
