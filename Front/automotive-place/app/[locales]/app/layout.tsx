import type { Metadata } from "next";
import { HomeHeader } from "./HomeHeader";
import { SideBar } from "../../components/shared/Sidebar";
import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getLocale } from "next-intl/server";
import { TbMessage2Up } from "react-icons/tb";
import { IoNotifications, IoPersonCircle } from "react-icons/io5";
import { RightSidebar } from "@/app/components/rightSidebar";

export const metadata: Metadata = {
  title: "Home",
  description: "Główna strona automotiveplace",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getLoggedInUser();
  const locale = await getLocale();

  if (!user) return redirect(`/${locale}/sign-in`);

  return (
    <div className="flex h-screen flex-col bg-amp-900 dark:bg-amp-0 text-black dark:text-white">
      {/* <HomeHeader /> */}
      <div className="flex lg:h-[calc(100%-0px)] h-[calc(100%)] w-full justify-between flex-col-reverse lg:flex-row">
        <SideBar />
        {/* Botton naviagtion */}
        {children}
        <RightSidebar />
      </div>
    </div>
  );
}
