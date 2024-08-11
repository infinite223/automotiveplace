import type { Metadata } from "next";
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
  return (
    <div className="flex h-screen flex-col bg-custom-primary text-custom-primary">
      <HomeHeader />
      <div className="flex lg:h-[calc(100%-70px)] h-[calc(100%-170px)] w-full justify-between flex-col-reverse lg:flex-row">
        <SideBar />
        {children}
      </div>
    </div>
  );
}
