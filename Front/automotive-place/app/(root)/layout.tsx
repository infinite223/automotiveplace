import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { HomeHeader } from "./HomeHeader";
import { SideBar } from "../components/shared/Sidebar";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Home",
  description: "Główna strona automotiveplace",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = false;
  if (!loggedIn) redirect("/sign-in");
  return (
    // <html lang="en">
    //   <body className={inter.className}>
    //     <Providers>
    <div className="flex h-screen flex-col bg-custom-primary text-custom-primary">
      <HomeHeader />
      <div className="flex h-full" style={{ height: `calc(100% - ${70}px)` }}>
        <SideBar />

        {children}
      </div>
    </div>
    //     </Providers>
    //   </body>
    // </html>
  );
}
