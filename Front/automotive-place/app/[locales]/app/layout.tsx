import type { Metadata } from "next";
import { HomeHeader } from "./HomeHeader";
import { SideBar } from "../../components/shared/Sidebar";
import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getLocale } from "next-intl/server";
import { TbMessage2Up } from "react-icons/tb";
import { IoNotifications, IoPersonCircle } from "react-icons/io5";

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
    <div className="flex h-screen flex-col bg-custom-primary text-custom-primary">
      {/* <HomeHeader /> */}
      <div className="flex lg:h-[calc(100%-0px)] h-[calc(100%-170px)] w-full justify-between flex-col-reverse lg:flex-row">
        <SideBar />
        {children}
        {/* TODO - left bar for some data, add mobile view */}
        <div className="h-full w-[150px] pt-4">
          <div className="text-md flex items-center gap-5">
            <TbMessage2Up size={22} />
            <IoNotifications size={22} />
            <IoPersonCircle size={29} />
          </div>
        </div>
      </div>
    </div>
  );
}
